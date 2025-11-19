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
import Box from '@cloudscape-design/components/box';
import Flashbar from '@cloudscape-design/components/flashbar';
import TextFilter from '@cloudscape-design/components/text-filter';
import Pagination from '@cloudscape-design/components/pagination';
import ButtonDropdown from '@cloudscape-design/components/button-dropdown';

import { Breadcrumbs, Notifications } from '../commons';
import { CustomAppLayout } from '../commons/common-components';
import { NetworkTrafficChart } from './components/network-traffic-chart';
import { CreditUsageChart } from './components/credit-usage-chart';
import { DevicesTable } from './components/devices-table';

export function App() {
  const [toolsOpen, setToolsOpen] = useState(false);
  const [filteringText, setFilteringText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <CustomAppLayout
      content={
        <ContentLayout
          header={
            <SpaceBetween size="m">
              <Header
                variant="h1"
                description="Network Traffic, Credit Usage, and Your Devices"
                actions={
                  <Button variant="primary" iconName="external">
                    Refresh Data
                  </Button>
                }
              >
                Network Adminstration Dashboard
              </Header>
              <Flashbar
                items={[
                  {
                    type: 'warning',
                    dismissible: true,
                    content: 'This is a warning message',
                    id: 'warning-message',
                  },
                ]}
              />
            </SpaceBetween>
          }
        >
          <SpaceBetween size="l">
            <Grid gridDefinition={[{ colspan: 6 }, { colspan: 6 }]}>
              <NetworkTrafficChart />
              <CreditUsageChart />
            </Grid>

            <Container
              header={
                <Header
                  variant="h2"
                  description="Devices on your local network"
                  actions={
                    <Button variant="primary" iconName="external">
                      Add Device
                    </Button>
                  }
                >
                  My Devices
                </Header>
              }
            >
              <SpaceBetween size="m">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <TextFilter
                    filteringText={filteringText}
                    filteringPlaceholder="Placeholder"
                    onChange={({ detail }) => setFilteringText(detail.filteringText)}
                  />
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <Pagination
                      currentPageIndex={currentPage}
                      onChange={({ detail }) => setCurrentPage(detail.currentPageIndex)}
                      pagesCount={5}
                    />
                    <div
                      style={{
                        width: '2px',
                        height: '32px',
                        background: 'var(--color-border-divider-default)',
                      }}
                    />
                    <Button variant="icon" iconName="settings" />
                  </div>
                </div>
                <DevicesTable filteringText={filteringText} />
              </SpaceBetween>
            </Container>
          </SpaceBetween>
        </ContentLayout>
      }
      breadcrumbs={
        <Breadcrumbs
          items={[
            { text: 'Service', href: '#/' },
            { text: 'Administrative Dashboard', href: '#/network-admin-dashboard' },
          ]}
        />
      }
      toolsOpen={toolsOpen}
      onToolsChange={({ detail }) => setToolsOpen(detail.open)}
      notifications={<Notifications />}
    />
  );
}
