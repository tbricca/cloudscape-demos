// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, { useState } from 'react';
import AppLayout from '@cloudscape-design/components/app-layout';
import TopNavigation from '@cloudscape-design/components/top-navigation';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Header from '@cloudscape-design/components/header';
import Button from '@cloudscape-design/components/button';
import Box from '@cloudscape-design/components/box';
import SpaceBetween from '@cloudscape-design/components/space-between';
import TextFilter from '@cloudscape-design/components/text-filter';
import Pagination from '@cloudscape-design/components/pagination';
import Flashbar from '@cloudscape-design/components/flashbar';
import Grid from '@cloudscape-design/components/grid';
import Container from '@cloudscape-design/components/container';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Table from '@cloudscape-design/components/table';
import Checkbox from '@cloudscape-design/components/checkbox';

// Sample data for charts
const networkTrafficData = [
  {
    title: 'Site 1',
    type: 'area',
    data: Array.from({ length: 12 }, (_, i) => ({
      x: i + 1,
      y: Math.floor(Math.random() * 60) + 40,
    })),
  },
  {
    title: 'Site 2',
    type: 'area',
    data: Array.from({ length: 12 }, (_, i) => ({
      x: i + 1,
      y: Math.floor(Math.random() * 40) + 20,
    })),
  },
];

const creditUsageData = [
  { x: 1, y: 60 },
  { x: 2, y: 85 },
  { x: 3, y: 70 },
  { x: 4, y: 40 },
  { x: 5, y: 75 },
];

// Sample device data
const generateDeviceData = () =>
  Array.from({ length: 12 }, (_, i) => ({
    id: `device-${i + 1}`,
    name: `Device ${i + 1}`,
    status: i % 3 === 0 ? 'Online' : 'Offline',
    ip: `192.168.1.${10 + i}`,
    mac: `00:1B:44:11:3A:${(i + 10).toString(16).toUpperCase().padStart(2, '0')}`,
    type: ['Router', 'Switch', 'Access Point'][i % 3],
    location: ['Building A', 'Building B', 'Building C'][i % 3],
    lastSeen: `${i + 1} hour${i !== 0 ? 's' : ''} ago`,
  }));

const App = () => {
  const [filteringText, setFilteringText] = useState('');
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [dismissedWarning, setDismissedWarning] = useState(false);
  const devices = generateDeviceData();

  const filteredDevices = devices.filter(
    device =>
      device.name.toLowerCase().includes(filteringText.toLowerCase()) ||
      device.ip.includes(filteringText) ||
      device.type.toLowerCase().includes(filteringText.toLowerCase()),
  );

  const paginatedDevices = filteredDevices.slice((currentPageIndex - 1) * 5, currentPageIndex * 5);

  return (
    <>
      <TopNavigation
        identity={{
          href: '#',
          title: 'Service name',
          logo: {
            src: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDMiIGhlaWdodD0iMzEiIHZpZXdCb3g9IjAgMCA0MyAzMSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQzIiBoZWlnaHQ9IjMxIiByeD0iMiIgZmlsbD0iI0QxRDVEQiIvPgo8dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjMDAwIj5Mb2dvPC90ZXh0Pgo8L3N2Zz4=',
            alt: 'Service Logo',
          },
        }}
        utilities={[
          {
            type: 'button',
            text: 'Link',
            href: '#',
            external: true,
            externalIconAriaLabel: '(opens in new tab)',
          },
          {
            type: 'button',
            iconName: 'notification',
            ariaLabel: 'Notifications',
            badge: true,
          },
          {
            type: 'button',
            iconName: 'settings',
            title: 'Settings',
            ariaLabel: 'Settings',
          },
          {
            type: 'menu-dropdown',
            text: 'Customer name',
            description: 'customer@example.com',
            iconName: 'user-profile',
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
        }}
      />
      <AppLayout
        contentType="default"
        navigationHide
        toolsHide
        content={
          <SpaceBetween size="l">
            <BreadcrumbGroup
              items={[
                { text: 'Service', href: '#' },
                { text: 'Administrative Dashboard', href: '#' },
              ]}
              ariaLabel="Breadcrumbs"
            />

            <Header
              variant="h1"
              description="Network Traffic, Credit Usage, and Your Devices"
              actions={
                <Button variant="primary" iconName="external">
                  Refresh Data
                </Button>
              }
            >
              Network Administration Dashboard
            </Header>

            <SpaceBetween size="m">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <TextFilter
                  filteringText={filteringText}
                  filteringPlaceholder="Placeholder"
                  filteringAriaLabel="Filter devices"
                  onChange={({ detail }) => setFilteringText(detail.filteringText)}
                />
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Pagination
                    currentPageIndex={currentPageIndex}
                    onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                    pagesCount={Math.ceil(filteredDevices.length / 5)}
                    ariaLabels={{
                      nextPageLabel: 'Next page',
                      previousPageLabel: 'Previous page',
                      pageLabel: pageNumber => `Page ${pageNumber}`,
                    }}
                  />
                  <div style={{ width: '2px', height: '32px', backgroundColor: '#414D5C' }} />
                  <Button iconName="settings" variant="icon" ariaLabel="Settings" />
                </div>
              </div>
            </SpaceBetween>

            {!dismissedWarning && (
              <Flashbar
                items={[
                  {
                    type: 'warning',
                    dismissible: true,
                    onDismiss: () => setDismissedWarning(true),
                    content: 'This is a warning message',
                  },
                ]}
              />
            )}

            <Grid gridDefinition={[{ colspan: { default: 12, xs: 6 } }, { colspan: { default: 12, xs: 6 } }]}>
              <Container>
                <SpaceBetween size="l">
                  <Box variant="h2" fontSize="heading-m" fontWeight="bold">
                    Network traffic
                  </Box>
                  <AreaChart
                    series={networkTrafficData}
                    xDomain={[1, 12]}
                    yDomain={[0, 100]}
                    i18nStrings={{
                      filterLabel: 'Filter displayed data',
                      filterPlaceholder: 'Filter data',
                      filterSelectedAriaLabel: 'selected',
                      legendAriaLabel: 'Legend',
                      chartAriaRoleDescription: 'area chart',
                      xAxisAriaRoleDescription: 'x axis',
                      yAxisAriaRoleDescription: 'y axis',
                    }}
                    ariaLabel="Network traffic area chart"
                    height={300}
                    xScaleType="linear"
                    xTitle="Day"
                    yTitle=""
                    empty={
                      <Box textAlign="center" color="inherit">
                        <b>No data available</b>
                      </Box>
                    }
                    noMatch={
                      <Box textAlign="center" color="inherit">
                        <b>No matching data</b>
                      </Box>
                    }
                  />
                  <Box fontSize="body-s" color="text-body-secondary">
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <div
                          style={{
                            width: '14px',
                            height: '14px',
                            borderRadius: '2px',
                            border: '1px solid #688AE8',
                            backgroundColor: 'rgba(116, 146, 231, 0.40)',
                          }}
                        />
                        <span>Site 1</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <div
                          style={{
                            width: '14px',
                            height: '14px',
                            borderRadius: '2px',
                            border: '1px solid #C33D69',
                            backgroundColor: 'rgba(195, 61, 105, 0.40)',
                          }}
                        />
                        <span>Site 2</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <div
                          style={{
                            width: '12px',
                            height: '3px',
                            display: 'flex',
                            gap: '2px',
                          }}
                        >
                          <div
                            style={{
                              width: '6px',
                              height: '3px',
                              borderRadius: '1px',
                              backgroundColor: '#5F6B7A',
                            }}
                          />
                          <div
                            style={{
                              width: '6px',
                              height: '3px',
                              borderRadius: '1px',
                              backgroundColor: '#5F6B7A',
                            }}
                          />
                        </div>
                        <span>Performance goal</span>
                      </div>
                    </div>
                  </Box>
                </SpaceBetween>
              </Container>

              <Container>
                <SpaceBetween size="l">
                  <Box variant="h2" fontSize="heading-m" fontWeight="bold">
                    Credit Usage
                  </Box>
                  <BarChart
                    series={[
                      {
                        title: 'Site 1',
                        type: 'bar',
                        data: creditUsageData,
                      },
                    ]}
                    xDomain={[1, 2, 3, 4, 5]}
                    yDomain={[0, 100]}
                    i18nStrings={{
                      filterLabel: 'Filter displayed data',
                      filterPlaceholder: 'Filter data',
                      filterSelectedAriaLabel: 'selected',
                      legendAriaLabel: 'Legend',
                      chartAriaRoleDescription: 'bar chart',
                      xAxisAriaRoleDescription: 'x axis',
                      yAxisAriaRoleDescription: 'y axis',
                    }}
                    ariaLabel="Credit usage bar chart"
                    height={300}
                    xScaleType="categorical"
                    xTitle="Day"
                    yTitle=""
                    empty={
                      <Box textAlign="center" color="inherit">
                        <b>No data available</b>
                      </Box>
                    }
                    noMatch={
                      <Box textAlign="center" color="inherit">
                        <b>No matching data</b>
                      </Box>
                    }
                  />
                  <Box fontSize="body-s" color="text-body-secondary">
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <div
                          style={{
                            width: '14px',
                            height: '14px',
                            borderRadius: '2px',
                            backgroundColor: '#688AE8',
                          }}
                        />
                        <span>Site 1</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <div
                          style={{
                            width: '12px',
                            height: '3px',
                            display: 'flex',
                            gap: '2px',
                          }}
                        >
                          <div
                            style={{
                              width: '6px',
                              height: '3px',
                              borderRadius: '1px',
                              backgroundColor: '#5F6B7A',
                            }}
                          />
                          <div
                            style={{
                              width: '6px',
                              height: '3px',
                              borderRadius: '1px',
                              backgroundColor: '#5F6B7A',
                            }}
                          />
                        </div>
                        <span>Performance goal</span>
                      </div>
                    </div>
                  </Box>
                </SpaceBetween>
              </Container>
            </Grid>

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

            <Table
              columnDefinitions={[
                {
                  id: 'select',
                  width: 60,
                  header: (
                    <Checkbox
                      checked={selectedItems.length === paginatedDevices.length && paginatedDevices.length > 0}
                      indeterminate={selectedItems.length > 0 && selectedItems.length < paginatedDevices.length}
                      onChange={({ detail }) => {
                        if (detail.checked) {
                          setSelectedItems(paginatedDevices);
                        } else {
                          setSelectedItems([]);
                        }
                      }}
                    />
                  ),
                  cell: item => (
                    <Checkbox
                      checked={selectedItems.includes(item)}
                      onChange={({ detail }) => {
                        if (detail.checked) {
                          setSelectedItems([...selectedItems, item]);
                        } else {
                          setSelectedItems(selectedItems.filter(i => i !== item));
                        }
                      }}
                    />
                  ),
                },
                {
                  id: 'name',
                  header: 'Column header',
                  cell: item => item.name,
                  sortingField: 'name',
                },
                {
                  id: 'status',
                  header: 'Column header',
                  cell: item => item.status,
                  sortingField: 'status',
                },
                {
                  id: 'ip',
                  header: 'Column header',
                  cell: item => item.ip,
                  sortingField: 'ip',
                },
                {
                  id: 'mac',
                  header: 'Column header',
                  cell: item => item.mac,
                  sortingField: 'mac',
                },
                {
                  id: 'type',
                  header: 'Column header',
                  cell: item => item.type,
                  sortingField: 'type',
                },
                {
                  id: 'location',
                  header: 'Column header',
                  cell: item => item.location,
                  sortingField: 'location',
                },
                {
                  id: 'lastSeen',
                  header: 'Column header',
                  cell: item => item.lastSeen,
                  sortingField: 'lastSeen',
                },
              ]}
              items={paginatedDevices}
              loadingText="Loading devices"
              selectionType="multi"
              trackBy="id"
              empty={
                <Box textAlign="center" color="inherit">
                  <b>No devices</b>
                  <Box padding={{ bottom: 's' }} variant="p" color="inherit">
                    No devices to display.
                  </Box>
                </Box>
              }
              variant="embedded"
            />
          </SpaceBetween>
        }
      />
    </>
  );
};

export default App;
