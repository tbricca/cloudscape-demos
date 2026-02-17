// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import AppLayout from '@cloudscape-design/components/app-layout';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Button from '@cloudscape-design/components/button';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Grid from '@cloudscape-design/components/grid';
import Container from '@cloudscape-design/components/container';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Table from '@cloudscape-design/components/table';
import Box from '@cloudscape-design/components/box';
import TextFilter from '@cloudscape-design/components/text-filter';
import Pagination from '@cloudscape-design/components/pagination';
import Flashbar from '@cloudscape-design/components/flashbar';
import TopNavigation from '@cloudscape-design/components/top-navigation';

// Sample data for the charts
const networkTrafficData = [
  { x: 'x1', y1: 35000, y2: 32000 },
  { x: 'x2', y1: 38000, y2: 35000 },
  { x: 'x3', y1: 42000, y2: 40000 },
  { x: 'x4', y1: 48000, y2: 45000 },
  { x: 'x5', y1: 52000, y2: 50000 },
  { x: 'x6', y1: 58000, y2: 54000 },
  { x: 'x7', y1: 60000, y2: 56000 },
  { x: 'x8', y1: 58000, y2: 55000 },
  { x: 'x9', y1: 62000, y2: 58000 },
  { x: 'x10', y1: 65000, y2: 60000 },
  { x: 'x11', y1: 58000, y2: 54000 },
  { x: 'x12', y1: 50000, y2: 48000 },
];

const creditUsageData = [
  { x: 'x1', y: 42000 },
  { x: 'x2', y: 55000 },
  { x: 'x3', y: 48000 },
  { x: 'x4', y: 32000 },
  { x: 'x5', y: 50000 },
];

// Sample table data
const generateDeviceData = () => {
  const devices = [];
  for (let i = 1; i <= 12; i++) {
    devices.push({
      id: i,
      selected: false,
      column1: 'Cell Value',
      column2: 'Cell Value',
      column3: 'Cell Value',
      column4: 'Cell Value',
      column5: 'Cell Value',
      column6: 'Cell Value',
      column7: 'Cell Value',
    });
  }
  return devices;
};

export function App() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [filteringText, setFilteringText] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [flashbarItems, setFlashbarItems] = useState([
    {
      type: 'warning' as const,
      content: 'This is a warning message',
      dismissible: true,
      dismissLabel: 'Dismiss message',
      onDismiss: () => setFlashbarItems([]),
      id: 'warning_message',
    },
  ]);

  const devices = generateDeviceData();

  return (
    <>
      <TopNavigation
        identity={{
          href: '#',
          title: 'Service name',
          logo: {
            src: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"%3E%3Crect width="40" height="40" fill="%23232f3e"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="white" font-family="sans-serif" font-size="14"%3ELogo%3C/text%3E%3C/svg%3E',
            alt: 'Service Logo',
          },
        }}
        utilities={[
          {
            type: 'button',
            text: 'Link',
            href: 'https://example.com',
            external: true,
            externalIconAriaLabel: ' (opens in a new tab)',
          },
          {
            type: 'button',
            iconName: 'notification',
            title: 'Notifications',
            ariaLabel: 'Notifications (unread)',
            badge: true,
            disableUtilityCollapse: false,
          },
          {
            type: 'button',
            iconName: 'settings',
            title: 'Settings',
            ariaLabel: 'Settings',
          },
          {
            type: 'menu-dropdown',
            iconName: 'user-profile',
            text: 'Customer name',
            items: [
              { id: 'profile', text: 'Profile' },
              { id: 'preferences', text: 'Preferences' },
              { id: 'signout', text: 'Sign out' },
            ],
          },
        ]}
        i18nStrings={{
          searchIconAriaLabel: 'Search',
          searchDismissIconAriaLabel: 'Close search',
          overflowMenuTriggerText: 'More',
          overflowMenuTitleText: 'All',
          overflowMenuBackIconAriaLabel: 'Back',
          overflowMenuDismissIconAriaLabel: 'Close menu',
        }}
      />

      <AppLayout
        navigationHide
        toolsHide
        breadcrumbs={
          <BreadcrumbGroup
            items={[
              { text: 'Service', href: '#' },
              { text: 'Administrative Dashboard', href: '#' },
            ]}
            ariaLabel="Breadcrumbs"
          />
        }
        notifications={<Flashbar items={flashbarItems} />}
        content={
          <SpaceBetween size="l">
            <Header
              variant="h1"
              description="Network Traffic, Credit Usage, and Your Devices"
              actions={
                <Button variant="primary" iconName="external" iconAlign="right" href="#">
                  Refresh Data
                </Button>
              }
            >
              Network Adminstration Dashboard
            </Header>

            <SpaceBetween size="l">
              <Grid gridDefinition={[{ colspan: 6 }, { colspan: 6 }]}>
                {/* Network Traffic Chart */}
                <Container>
                  <Box variant="h2" padding={{ bottom: 's' }}>
                    Network traffic
                  </Box>
                  <AreaChart
                    series={[
                      {
                        title: 'Site 1',
                        type: 'area',
                        data: networkTrafficData.map(d => ({ x: d.x, y: d.y1 })),
                        color: '#688AE8',
                      },
                      {
                        title: 'Site 2',
                        type: 'area',
                        data: networkTrafficData.map(d => ({ x: d.x, y: d.y2 })),
                        color: '#C33D69',
                      },
                      {
                        title: 'Performance goal',
                        type: 'threshold',
                        y: 45000,
                        color: '#5F6B7A',
                      },
                    ]}
                    xScaleType="categorical"
                    yTitle="Network traffic"
                    xTitle="Day"
                    height={300}
                    hideFilter
                    hideLegend={false}
                    ariaLabel="Network traffic chart"
                    empty={
                      <Box textAlign="center" color="inherit">
                        <b>No data available</b>
                        <Box variant="p" color="inherit">
                          There is no data available
                        </Box>
                      </Box>
                    }
                    i18nStrings={{
                      filterLabel: 'Filter displayed data',
                      filterPlaceholder: 'Filter data',
                      legendAriaLabel: 'Legend',
                      chartAriaRoleDescription: 'area chart',
                      yTickFormatter: value => `y${Math.floor(value / 10000)}`,
                    }}
                  />
                </Container>

                {/* Credit Usage Chart */}
                <Container>
                  <Box variant="h2" padding={{ bottom: 's' }}>
                    Credit Usage
                  </Box>
                  <BarChart
                    series={[
                      {
                        title: 'Site 1',
                        type: 'bar',
                        data: creditUsageData,
                        color: '#688AE8',
                      },
                      {
                        title: 'Performance goal',
                        type: 'threshold',
                        y: 45000,
                        color: '#5F6B7A',
                      },
                    ]}
                    xScaleType="categorical"
                    yTitle="Credit usage"
                    xTitle="Day"
                    height={300}
                    hideFilter
                    hideLegend={false}
                    ariaLabel="Credit usage chart"
                    empty={
                      <Box textAlign="center" color="inherit">
                        <b>No data available</b>
                        <Box variant="p" color="inherit">
                          There is no data available
                        </Box>
                      </Box>
                    }
                    i18nStrings={{
                      filterLabel: 'Filter displayed data',
                      filterPlaceholder: 'Filter data',
                      legendAriaLabel: 'Legend',
                      chartAriaRoleDescription: 'bar chart',
                      yTickFormatter: value => `y${Math.floor(value / 10000)}`,
                    }}
                  />
                </Container>
              </Grid>

              {/* My Devices Table */}
              <Table
                header={
                  <Header
                    variant="h2"
                    description="Devices on your local network"
                    actions={
                      <Button variant="primary" iconName="external" iconAlign="right">
                        Add Device
                      </Button>
                    }
                  >
                    My Devices
                  </Header>
                }
                columnDefinitions={[
                  {
                    id: 'column1',
                    header: 'Column header',
                    cell: item => item.column1,
                    sortingField: 'column1',
                  },
                  {
                    id: 'column2',
                    header: 'Column header',
                    cell: item => item.column2,
                    sortingField: 'column2',
                  },
                  {
                    id: 'column3',
                    header: 'Column header',
                    cell: item => item.column3,
                    sortingField: 'column3',
                  },
                  {
                    id: 'column4',
                    header: 'Column header',
                    cell: item => item.column4,
                    sortingField: 'column4',
                  },
                  {
                    id: 'column5',
                    header: 'Column header',
                    cell: item => item.column5,
                    sortingField: 'column5',
                  },
                  {
                    id: 'column6',
                    header: 'Column header',
                    cell: item => item.column6,
                    sortingField: 'column6',
                  },
                  {
                    id: 'column7',
                    header: 'Column header',
                    cell: item => item.column7,
                    sortingField: 'column7',
                  },
                ]}
                items={devices}
                loadingText="Loading devices"
                selectionType="multi"
                selectedItems={selectedItems}
                onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
                trackBy="id"
                empty={
                  <Box textAlign="center" color="inherit">
                    <Box padding={{ bottom: 's' }} variant="p" color="inherit">
                      <b>No devices</b>
                    </Box>
                    <Button>Add device</Button>
                  </Box>
                }
                filter={
                  <TextFilter
                    filteringText={filteringText}
                    filteringPlaceholder="Placeholder"
                    filteringAriaLabel="Filter devices"
                    onChange={({ detail }) => setFilteringText(detail.filteringText)}
                  />
                }
                pagination={
                  <Pagination
                    currentPageIndex={currentPageIndex}
                    onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                    pagesCount={3}
                    ariaLabels={{
                      nextPageLabel: 'Next page',
                      previousPageLabel: 'Previous page',
                      pageLabel: pageNumber => `Page ${pageNumber} of all pages`,
                    }}
                  />
                }
              />
            </SpaceBetween>
          </SpaceBetween>
        }
      />
    </>
  );
}
