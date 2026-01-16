// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import AppLayout from '@cloudscape-design/components/app-layout';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Button from '@cloudscape-design/components/button';
import Grid from '@cloudscape-design/components/grid';
import Container from '@cloudscape-design/components/container';
import Flashbar from '@cloudscape-design/components/flashbar';
import TextFilter from '@cloudscape-design/components/text-filter';
import Pagination from '@cloudscape-design/components/pagination';
import Icon from '@cloudscape-design/components/icon';

import { Breadcrumbs } from '../commons';
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
        <Breadcrumbs
          items={[
            { text: 'Service', href: '/' },
            { text: 'Administrative Dashboard', href: '#' },
          ]}
        />
      }
      notifications={
        showWarning ? (
          <Flashbar
            items={[
              {
                type: 'warning',
                content: 'This is a warning message',
                dismissible: true,
                onDismiss: () => setShowWarning(false),
                dismissLabel: 'Dismiss',
              },
            ]}
          />
        ) : undefined
      }
      content={
        <ContentLayout
          header={
            <SpaceBetween size="xs">
              <Header
                variant="h1"
                description="Network Traffic, Credit Usage, and Your Devices"
                actions={
                  <Button variant="primary" iconName="external" iconAlign="right">
                    Refresh Data
                  </Button>
                }
              >
                Network Administration Dashboard
              </Header>
              <Grid gridDefinition={[{ colspan: 6 }]}>
                <TextFilter
                  filteringText={filteringText}
                  filteringPlaceholder="Placeholder"
                  filteringAriaLabel="Filter instances"
                  onChange={({ detail }) => setFilteringText(detail.filteringText)}
                />
              </Grid>
              <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '8px' }}>
                <Pagination
                  currentPageIndex={currentPageIndex}
                  onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                  pagesCount={5}
                  ariaLabels={{
                    nextPageLabel: 'Next page',
                    previousPageLabel: 'Previous page',
                    pageLabel: pageNumber => `Page ${pageNumber}`,
                  }}
                />
                <div style={{ width: '2px', height: '32px', background: '#414D5C' }} />
                <Button variant="icon" iconName="settings" />
              </div>
            </SpaceBetween>
          }
        >
          <SpaceBetween size="l">
            <Grid gridDefinition={[{ colspan: 6 }, { colspan: 6 }]}>
              <NetworkTrafficChart />
              <CreditUsageChart />
            </Grid>

            <DevicesTable filteringText={filteringText} />
          </SpaceBetween>
        </ContentLayout>
      }
    />
  );
}
