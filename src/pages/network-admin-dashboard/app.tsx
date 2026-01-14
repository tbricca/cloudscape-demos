// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import AppLayout from '@cloudscape-design/components/app-layout';
import ContentLayout from '@cloudscape-design/components/content-layout';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Header from '@cloudscape-design/components/header';
import Button from '@cloudscape-design/components/button';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Flashbar from '@cloudscape-design/components/flashbar';
import TextFilter from '@cloudscape-design/components/text-filter';
import Pagination from '@cloudscape-design/components/pagination';
import Grid from '@cloudscape-design/components/grid';
import Box from '@cloudscape-design/components/box';

import { NetworkTrafficChart } from './components/network-traffic-chart';
import { CreditUsageChart } from './components/credit-usage-chart';
import { DevicesTable } from './components/devices-table';

export function App() {
  const [filteringText, setFilteringText] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [showWarning, setShowWarning] = useState(true);

  return (
    <AppLayout
      navigationHide
      toolsHide
      breadcrumbs={
        <BreadcrumbGroup
          items={[
            { text: 'Service', href: '#' },
            { text: 'Administrative Dashboard', href: '#' },
          ]}
        />
      }
      content={
        <ContentLayout
          header={
            <Header
              variant="h1"
              description="Network Traffic, Credit Usage, and Your Devices"
              actions={
                <Button variant="primary" iconAlign="right" iconName="external">
                  Refresh Data
                </Button>
              }
            >
              Network Administration Dashboard
            </Header>
          }
        >
          <SpaceBetween size="l">
            {showWarning && (
              <Flashbar
                items={[
                  {
                    type: 'warning',
                    content: 'This is a warning message',
                    dismissible: true,
                    dismissLabel: 'Dismiss',
                    onDismiss: () => setShowWarning(false),
                  },
                ]}
              />
            )}

            <Grid
              gridDefinition={[
                { colspan: { default: 12, s: 6 } },
                { colspan: { default: 12, s: 6 } },
              ]}
            >
              <NetworkTrafficChart />
              <CreditUsageChart />
            </Grid>

            <Box>
              <SpaceBetween size="m">
                <Header
                  variant="h2"
                  description="Devices on your local network"
                  actions={
                    <Button variant="primary" iconAlign="right" iconName="external">
                      Add Device
                    </Button>
                  }
                >
                  My Devices
                </Header>

                <Grid
                  gridDefinition={[
                    { colspan: { default: 12, s: 8 } },
                    { colspan: { default: 12, s: 4 } },
                  ]}
                >
                  <TextFilter
                    filteringText={filteringText}
                    filteringPlaceholder="Placeholder"
                    filteringAriaLabel="Filter devices"
                    onChange={({ detail }) => setFilteringText(detail.filteringText)}
                  />
                  <Box textAlign="right">
                    <Pagination
                      currentPageIndex={currentPageIndex}
                      pagesCount={5}
                      onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                      ariaLabels={{
                        nextPageLabel: 'Next page',
                        previousPageLabel: 'Previous page',
                        pageLabel: pageNumber => `Page ${pageNumber}`,
                      }}
                    />
                  </Box>
                </Grid>

                <DevicesTable filteringText={filteringText} />
              </SpaceBetween>
            </Box>
          </SpaceBetween>
        </ContentLayout>
      }
    />
  );
}
