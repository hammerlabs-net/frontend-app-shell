# frontend-app-shell

The `frontend-app-shell` repository is a proof of concept for decomposing Open edX Micro Frontends (MFEs) into pilets that can be loaded into a [Piral](https://piral.io) shell service. This project requires three additional projects to be downloaded -  two forks of current Open edX MFEs that show the conversion process for current MFEs to pilets, and Open edX component project to show single page routing between MFEs

- [Account MFE Fork](https://github.com/hammerlabs-net/frontend-app-account-piral)
- [Learning MFE Fork](https://github.com/hammerlabs-net/frontend-app-learning-piral)
- [Header Component Fork](https://github.com/hammerlabs-net/frontend-component-header-piral)

## Running

Clone all four repositories to a common parent directory. After cloning, switch all the forked repositories above to their respective `pilet-convert` branches.

1. Run `npm install && npm run build` in both MFE forked projects.
2. Add a file `module.config.js` to the root of this project with the following content:

```
module.exports = {
  localModules: [
    {
      moduleName: '@edx/frontend-app-account',
      dir: '../frontend-app-account-piral', 
      dist: 'src',
    },
    {
      moduleName: '@edx/frontend-app-learning',
      dir: '../frontend-app-learning-piral', 
      dist: 'src',
    },
    {
      moduleName: '@edx/frontend-component-header',
      dir: '../frontend-component-header-piral', 
      dist: 'src',
    }
  ]
}
```
3. Run `npm install` on this project.
4. Run `npm start`.

## Details

This proof of concept demonstrates some key features of Piral and how the framework can assist Open edX in continuing to promote modular frontend development while maintaining control over the platform architecture to support UI and UX consistency, modern single-page application design, optimized runtime builds, dependency management, and many other features that can greatly simplify MFE development by removing them from the set of concerns each MFE must implement separately. 

### Key features:

1. The Piral shell was instantiated using the `piral new --tag 0.15.8 --language js --npm-client npm --bundler webpack5 --framework piral-core` CLI command. Note the use of the `piral-core` framework, which is a smaller subset of the larger Piral framework. Piral-core provides the optimal set of features, including the ability to load MFEs at runtime (inherited from `piral-base`) with a React-based component API for registering UI components and routing between them. Piral itself adds additional and opinionated extensions to this API. In particular, Piral mandates a specific React version (piral-core only has a peer dependency). Piral also includes extensions for creating dashboards, menus, modals, notifications, and translations that are all already a part of Open edX Frontend Platform. Read about the differences [here](https://docs.piral.io/guidelines/tutorials/22-core-and-base).
2. The Piral shell is implemented as a [frontend-platform](https://github.com/openedx/frontend-platform) application. `index.jsx` implements the necessary lifecycle methods from the platform, using the `APP_READY` event to instantiate the Piral instance and render it into the page. Some discussion is warranted as to the nature of the relationship of these two projects going forward. Many of the uses of `frontend-platform` as a module could be supplanted by API methods extending the Piral API. As this POC demonstrates, the two can coexist very well, which provides a long runway for this to be examined.
3. The Piral shell does not implement a robust pilet loading strategy such as the one proposed by Piral ([a live feed service](https://docs.piral.io/reference/specifications/feed-api-specification)). Instead, pilets are loaded as dependencies of this shell. Architecture discussion is necessary to determine an optimal strategy for pilet loading for Open edX.
4. The forked MFE projects were quick "hacks" to demonstrate how simply an existing MFE can be converted into a pilet. Noteworthy are the migration of core dependencies into peer dependencies now provided by the shell, the new build target for `npm run` based on the build target of `frontend-component-xxx` projects, and the changes to `index.jsx` and `pilet.jsx`, which change how the MFE is rendered. The next features discuss the important points to note about the important differences between `pilet.jsx` and `index.jsx`.
5. The shell centralized creation of the Redux datastore by utilizing the [Redux Dynamic Modules](https://redux-dynamic-modules.js.org/#/) library. In the MFE projects, note how the changes to convert the projects into pilets removed the code to create the store. The `pilet.jsx` instead loads the reducers, sagas, and thunks using `<DynamicModuleLoader/>` provided by Redux Dynamic Modules libraries.
6. Layout for the Piral shell demonstrates some of the key capabilities of Piral to simplify frontend development, standardize UI and UX, and smooth the transition between MFEs.
    * The shell implements an API extension to allow the layout to be defined by a pilet (see notes [here](https://docs.piral.io/reference/documentation/C01-components)). This allows different pilets to be created to provide different layouts for different deployments of the platform, without requiring any changes to existing MFEs.
    * The example pilet responsible for layout uses pilet ["extensions"]([https://docs.piral.io/concepts/core-api/07-extension](https://docs.piral.io/guidelines/tutorials/24-extension-patterns)) to provide UI "slots" for components such as headers and footers and other shared layout. In this POC, both Open edX [frontend-component-header](https://github.com/openedx/frontend-component-header) and [frontend-component-footer](https://github.com/openedx/frontend-component-footer) are loaded as extension pilets to fill slots defined by the layout pilet. Note how the Footer component is wrapped by the components in `./src/pilets/footer`. The Header component is wrapped in the same manner inside the forked component project by `Pilet.jsx`. 
    * In the forked MFE projects, note how `pilet.jsx` is essentially a refactoring of `index.jsx` removing the wrappers for `frontend-platform` `AppProvider`, headers, and footers. This pattern can be extended to other components including modals, notifications, and other UI handlers.

