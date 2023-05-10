import { PiralPlugin } from 'piral-core';
import { mergeMessages as platformMergeMessages, mergeConfig as platformMergeConfig } from '@edx/frontend-platform'
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
    mergeConfig(config, key) {
      platformMergeConfig(config, key);
    },
    mergeMessages(messages) {
      platformMergeMessages(messages);
    },
  });
}