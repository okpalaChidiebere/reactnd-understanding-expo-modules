import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { MlKitViewProps } from './MlKit.types';

const NativeView: React.ComponentType<MlKitViewProps> =
  requireNativeViewManager('MlKit');

export default function MlKitView(props: MlKitViewProps) {
  return <NativeView {...props} />;
}
