import { PiralPlugin } from 'piral-core';
import { 
  mergeMessages as platformMergeMessages, 
  mergeConfig as platformMergeConfig, 
  getConfig as platformGetConfig,
  getAuthenticatedUser as platformGetAuthenticatedUser,
  ensureConfig as platformEnsureConfig

} from '@edx/frontend-platform'
import { MessageDescriptor } from '@formatjs/intl';


interface PlatformApi {
  mergeMessages(messages: Array<MessageDescriptor>): void;
  mergeConfig(config: Object, key: String): void;
}

/**
 * Plugin functions to expose Open edX Frontend-platform methods. 
 * This helps us decouple MFE initialization from the platform 
 * initialization which is now done during Piral instantiation, not
 * MFE (pilet) instantiation
 */
export function createPlatformApi(): PiralPlugin<PlatformApi> {
  return (context) => (api) => ({
    ensureConfig() {
      platformEnsureConfig();
    },
    getConfig() {
      return platformGetConfig();
    },
    mergeConfig(config, key) {
      platformMergeConfig(config, key);
    },
    getAuthenticatedUser() {
      return platformGetAuthenticatedUser();
    },
    mergeMessages(messages) {
      platformMergeMessages(messages);
    },
  });
}