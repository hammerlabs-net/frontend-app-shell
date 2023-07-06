const fs = require('fs');
const util = require('util');
const path = require('path');
const exec = util.promisify(require('child_process').exec);
const shellDir = process.cwd();
const parentDir = path.resolve(shellDir, `../`);

async function runShellCommand(cmd) {
  const { stdout, stderr } = await exec(cmd);
  console.log(stdout);
  console.error(stderr);
}

const localModulesConfig = {
  localModules: [
    {
      moduleName: '@edx/frontend-platform',
      dir: '../frontend-platform', 
      dist: 'dist',
    },
    {
      moduleName: '@edx/frontend-build',
      dir: '../frontend-build', 
    },
  ]
};


const repositories = [
  'frontend-build',
  'paragon',
  'frontend-platform',
  'frontend-lib-special-exams',
];

async function processRepo(repo) {
  console.log(`Processing: ${repo}`);
  const pathToRepo = path.resolve(shellDir, `../${repo}`);
  if (fs.existsSync(pathToRepo)) {
    console.log("Already Installed. Exiting");
    process.exit(1);
  }
  process.chdir(parentDir);
  await runShellCommand(`git clone https://github.com/hammerlabs-net/${repo}.git`);
  process.chdir(pathToRepo);
  await runShellCommand(`git checkout develop && npm install`);
  if (repo !== 'frontend-build') {
    await runShellCommand(`npm run build`);
  }
  process.chdir(shellDir);
}

const dependentRepositories = [
  'frontend-component-footer',
  'frontend-component-header',
  'frontend-app-account',
  'frontend-app-learning'
];

async function processDependentRepo(repo) {
  console.log(`Processing: ${repo}`);
  const pathToRepo = path.resolve(shellDir, `../${repo}`);

  process.chdir(parentDir);
  await runShellCommand(`git clone https://github.com/hammerlabs-net/${repo}.git`);
  process.chdir(pathToRepo);
  await runShellCommand(`git checkout develop && npm install`);
  if (repo === 'frontend-app-learning') {
    localModulesConfig.localModules.push(
      { 
        moduleName: '@edx/frontend-lib-special-exams', 
        dir: '../frontend-lib-special-exams', 
        dist: 'dist' 
      },
    )
  }
  fs.writeFileSync(`${pathToRepo}/module.config.js`, 'module.exports = ' + JSON.stringify(localModulesConfig, null, 2));
  await runShellCommand(`npm install && npm run build`);
  process.chdir(shellDir);
}

(async () => {
  for (const repo of repositories) {
    await processRepo(repo);
  }
  fs.writeFileSync('module.config.js', 'module.exports = ' + JSON.stringify(localModulesConfig, null, 2));
  await runShellCommand(`npm install && npm run build`);
  for (const repo of dependentRepositories) {
    await processDependentRepo(repo);
  }
})().catch(e => console.error(e));