import { PiralPlugin } from 'piral-core';
import { 
  mergeMessages as platformMergeMessages, 
  mergeConfig as platformMergeConfig, 
  getConfig as platformGetConfig,
  ensureConfig as platformEnsureConfig

} from '@edx/frontend-platform';
import {  
  getAuthenticatedUser as platformGetAuthenticatedUser,
  getAuthenticatedHttpClient as platformGetAuthenticatedHttpClient,
} from '@edx/frontend-platform/auth';
import { 
  logInfo as platformLogInfo,
  logError as platformLogError
} from '@edx/frontend-platform/logging';

import { MessageDescriptor } from '@formatjs/intl';


interface PlatformApi {
  mergeMessages(messages: Array<MessageDescriptor>): void;
  mergeConfig(config: Object, key: String): void;
  getAuthenticatedUser(): Object; 
  getAuthenticatedHttpClient(): Object;
  getConfig(): Object;
  logInfo(error: Object): void;
  logError(error: Object): void; 
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
    getAuthenticatedHttpClient() {
      return platformGetAuthenticatedHttpClient();
    },
    mergeMessages(messages) {
      platformMergeMessages(messages);
    },
    logInfo(error) { 
      platformLogInfo(error);
    },
    logError(error) { 
      platformLogError(error);
    }
  });
}