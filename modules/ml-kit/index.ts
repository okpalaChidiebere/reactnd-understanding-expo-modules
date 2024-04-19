import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to MlKit.web.ts
// and on native platforms to MlKit.ts
import MlKitModule from './src/MlKitModule';
import MlKitView from './src/MlKitView';
import { ChangeEventPayload, MlKitViewProps } from './src/MlKit.types';

// Get the native constant value.
export const PI = MlKitModule.PI;

export function hello(): string {
  return MlKitModule.hello();
}

export async function setValueAsync(value: string) {
  return await MlKitModule.setValueAsync(value);
}

const emitter = new EventEmitter(MlKitModule ?? NativeModulesProxy.MlKit);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { MlKitView, MlKitViewProps, ChangeEventPayload };
