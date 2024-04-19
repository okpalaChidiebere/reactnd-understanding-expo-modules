import * as React from 'react';

import { MlKitViewProps } from './MlKit.types';

export default function MlKitView(props: MlKitViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
