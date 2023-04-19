# frontend-app-shell
Piral Shell for openEdx. This repository is a proof of concept for decomposing open-edx MFEs into pilets that can loaded in to a [piral](https://piral.io) shell service. This project requires two additional projects to be downloaded - forks of current open-edx MFEs - that show the conversion process for current MFEs to pilets.

[Account MFE Fork](https://github.com/hammerlabs-net/frontend-app-account-piral/tree/pilet-convert)

[Learning MFE Fork](https://github.com/hammerlabs-net/frontend-app-learning-piral/tree/pilet-convert)

## Running
Clone all three repositories to a common parent directory. After cloning switch both MFE forks to their respective `pilet-convert` branches. 

1) run `npm install && npm run build` in both MFE forked projects.
2) add the a file `module.config.js` to the root of this project with the following content:

```
module.exports = {
  localModules : [
    {
      moduleName: '@edx/frontend-app-account',
      dir: '../frontend-app-account-piral', 
      dist: 'src',
    },
    {
      moduleName: '@edx/frontend-app-learning',
      dir: '../frontend-app-learning-piral', 
      dist: 'src',
    }
  ]
}
```
3) run `npm install` on this project
4) **optional** - to develop and debug locally, run `npm link ../frontend-app-account-piral ../frontend-app-learning-piral` (note that this step needs to be repeated after every time npm install is run)
5) `npm start`


  
