// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import Button from '@cloudscape-design/components/button';
import Flashbar from '@cloudscape-design/components/flashbar';
import SpaceBetween from '@cloudscape-design/components/space-between';

import { Breadcrumbs } from '../commons';
import { CustomAppLayout } from '../commons/common-components';
import { NetworkAdminContent } from './components/content';
import { NetworkAdminHeader } from './components/header';

export function App() {
  const [warningDismissed, setWarningDismissed] = useState(false);

  const notifications = [
    ...(!warningDismissed
      ? [
          {
            type: 'warning' as const,
            content: 'This is a warning message',
            dismissible: true,
            dismissLabel: 'Dismiss',
            onDismiss: () => setWarningDismissed(true),
            id: 'warning-1',
          },
        ]
      : []),
  ];

  return (
    <CustomAppLayout
      navigationHide
      toolsHide
      notifications={<Flashbar items={notifications} />}
      breadcrumbs={<Breadcrumbs items={[{ text: 'Administrative Dashboard', href: '#' }]} />}
      content={
        <SpaceBetween size="l">
          <NetworkAdminHeader />
          <NetworkAdminContent />
        </SpaceBetween>
      }
    />
  );
}
