// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import AppLayout from '@cloudscape-design/components/app-layout';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Button from '@cloudscape-design/components/button';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Container from '@cloudscape-design/components/container';
import Grid from '@cloudscape-design/components/grid';
import Flashbar from '@cloudscape-design/components/flashbar';

import NetworkTrafficChart from './components/network-traffic-chart';
import CreditUsageChart from './components/credit-usage-chart';
import DevicesTable from './components/devices-table';

export function App() {
  const [flashbarItems, setFlashbarItems] = useState([
    {
      type: 'warning' as const,
      content: 'This is a warning message',
      dismissible: true,
      dismissLabel: 'Dismiss',
      onDismiss: () => setFlashbarItems([]),
      id: 'warning-message',
    },
  ]);

  const handleRefreshData = () => {
    console.log('Refreshing data...');
    // Add your refresh logic here
  };

  return (
    <AppLayout
      breadcrumbs={
        <BreadcrumbGroup
          items={[
            { text: 'Service', href: '#/' },
            { text: 'Administrative Dashboard', href: '#/network-admin-dashboard' },
          ]}
        />
      }
      navigationHide
      toolsHide
      content={
        <ContentLayout
          header={
            <Header
              variant="h1"
              description="Network Traffic, Credit Usage, and Your Devices"
              actions={
                <Button variant="primary" iconName="external" iconAlign="right" onClick={handleRefreshData}>
                  Refresh Data
                </Button>
              }
            >
              Network Administration Dashboard
            </Header>
          }
        >
          <SpaceBetween size="l">
            {flashbarItems.length > 0 && <Flashbar items={flashbarItems} />}

            <Grid gridDefinition={[{ colspan: { default: 12, xs: 12, s: 6 } }, { colspan: { default: 12, xs: 12, s: 6 } }]}>
              <NetworkTrafficChart />
              <CreditUsageChart />
            </Grid>

            <DevicesTable />
          </SpaceBetween>
        </ContentLayout>
      }
    />
  );
}
