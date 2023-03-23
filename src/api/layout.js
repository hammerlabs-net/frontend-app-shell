import { withApi } from 'piral-core';

/**
 * Plugin function to allow Layouts to be set by Pilets. 
 * @returns 
 */
export function createLayoutApi() {
  return (context) => (api) => ({
    setLayout(newComponents, newErrors) {
      context.dispatch((state) => {
        const components = {
          ...state.components,
        };
        const errorComponents = {
          ...state.errorComponents
        }
        for (const name of Object.keys(newComponents)) {
          components[name] = withApi(context, newComponents[name], api, 'unknown');
        }
        for (const name of Object.keys(newErrors)) {
          errorComponents[name] = withApi(context, newErrors[name], api, 'unknown');
        }

        return {
          ...state,
          components,
          errorComponents,
        };
      });
    },
  });
}