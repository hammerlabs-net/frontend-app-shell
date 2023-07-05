#!/bin/bash

PIRAL_DIR=`pwd`
cd ..

INSTALLED=`ls | grep frontend-build`

if [ "$INSTALLED" != "" ]; then
  cd $PIRAL_DIR
  echo >&2 "Already Installed. Exiting"
  exit 1
fi

git clone https://github.com/hammerlabs-net/frontend-build.git && cd frontend-build
git checkout develop && npm install && cd ..

git clone https://github.com/hammerlabs-net/paragon.git && cd paragon
git checkout develop && npm install && npm run build && cd ..

git clone https://github.com/hammerlabs-net/frontend-platform.git && cd frontend-platform
git checkout develop && npm install && npm run build && cd ..

git clone https://github.com/hammerlabs-net/frontend-lib-special-exams.git && cd frontend-lib-special-exams
git checkout develop && npm install && npm run build && cd ..

cd $PIRAL_DIR
echo "
module.exports = {
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
" > module.config.js
npm install && npm run build && cd ..

git clone https://github.com/hammerlabs-net/frontend-component-footer.git && cd frontend-component-footer && git checkout develop
echo "
module.exports = {
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
" > module.config.js
npm install && npm run build && cd ..

git clone https://github.com/hammerlabs-net/frontend-component-header.git && cd frontend-component-header && git checkout develop
echo "
module.exports = {
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
" > module.config.js
npm install && npm run build && cd ..

git clone https://github.com/hammerlabs-net/frontend-app-account.git && cd frontend-app-account && git checkout develop
echo "
module.exports = {
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
" > module.config.js
npm install && npm run build && cd ..

git clone https://github.com/hammerlabs-net/frontend-app-learning.git && cd frontend-app-learning && git checkout develop
echo "
module.exports = {
  localModules: [
    { 
      moduleName: '@edx/frontend-platform', 
      dir: '../frontend-platform', 
      dist: 'dist' 
    },
    { 
      moduleName: '@edx/frontend-build', 
      dir: '../frontend-build', 
    },
    { 
      moduleName: '@edx/frontend-lib-special-exams', 
      dir: '../frontend-lib-special-exams', 
      dist: 'dist' 
    },
  ],
};
" > module.config.js
npm install && npm run build && cd ..

cd $PIRAL_DIR
