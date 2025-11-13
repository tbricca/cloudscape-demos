// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Button from '@cloudscape-design/components/button';
import Flashbar from '@cloudscape-design/components/flashbar';
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
import CollectionPreferences from '@cloudscape-design/components/collection-preferences';
import TopNavigation from '@cloudscape-design/components/top-navigation';

import { CustomAppLayout } from '../commons/common-components';

export function App() {
  const [filteringText, setFilteringText] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);

  // Generate dynamic data for Network Traffic chart
  const generateNetworkData = () => {
    const days = ['x1', 'x2', 'x3', 'x4', 'x5', 'x6', 'x7', 'x8', 'x9', 'x10', 'x11', 'x12'];
    return days.map((day, index) => ({
      x: day,
      y1: Math.floor(Math.random() * 50) + 30,
      y2: Math.floor(Math.random() * 40) + 40,
    }));
  };

  // Generate dynamic data for Credit Usage chart
  const generateCreditData = () => {
    const days = ['x1', 'x2', 'x3', 'x4', 'x5'];
    return days.map((day) => ({
      x: day,
      y: Math.floor(Math.random() * 200) + 100,
    }));
  };

  const [networkData, setNetworkData] = useState(generateNetworkData());
  const [creditData, setCreditData] = useState(generateCreditData());

  // Sample device data
  const generateDeviceData = () => {
    const deviceTypes = ['Router', 'Switch', 'Access Point', 'Firewall', 'Server'];
    const statuses = ['Active', 'Inactive', 'Warning'];
    return Array.from({ length: 12 }, (_, i) => ({
      id: `device-${i + 1}`,
      name: `Device ${i + 1}`,
      type: deviceTypes[Math.floor(Math.random() * deviceTypes.length)],
      ipAddress: `192.168.1.${10 + i}`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      location: `Floor ${Math.floor(i / 4) + 1}`,
      lastSeen: `${Math.floor(Math.random() * 60)} min ago`,
    }));
  };

  const [devices] = useState(generateDeviceData());

  const handleRefreshData = () => {
    setNetworkData(generateNetworkData());
    setCreditData(generateCreditData());
    setRefreshKey(refreshKey + 1);
  };

  const filteredDevices = devices.filter((device) =>
    Object.values(device).some((value) => value.toLowerCase().includes(filteringText.toLowerCase()))
  );

  const paginatedDevices = filteredDevices.slice((currentPageIndex - 1) * 5, currentPageIndex * 5);

  return (
    <>
      <TopNavigation
        identity={{
          href: '#',
          title: 'Service name',
        }}
        utilities={[
          {
            type: 'button',
            iconName: 'notification',
            ariaLabel: 'Notifications',
            badge: true,
            disableUtilityCollapse: true,
          },
          { type: 'button', iconName: 'settings', title: 'Settings', ariaLabel: 'Settings' },
          {
            type: 'menu-dropdown',
            text: 'Customer name',
            description: 'customer@example.com',
            iconName: 'user-profile',
            items: [
              { id: 'profile', text: 'Profile' },
              { id: 'preferences', text: 'Preferences' },
              { id: 'security', text: 'Security' },
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
      <CustomAppLayout
        contentType="table"
        breadcrumbs={
          <BreadcrumbGroup
            items={[
              { text: 'Service', href: '#' },
              { text: 'Administrative Dashboard', href: '#' },
            ]}
            ariaLabel="Breadcrumbs"
          />
        }
        content={
          <SpaceBetween size="l">
            <Header
              variant="h1"
              actions={
                <Button variant="primary" iconName="external" onClick={handleRefreshData}>
                  Refresh Data
                </Button>
              }
              description="Network Traffic, Credit Usage, and Your Devices"
            >
              Network Administration Dashboard
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

            <Grid gridDefinition={[{ colspan: 6 }, { colspan: 6 }]}>
              <Container
                header={
                  <Header variant="h2" description="">
                    Network traffic
                  </Header>
                }
              >
                <AreaChart
                  key={`network-${refreshKey}`}
                  series={[
                    {
                      title: 'Site 1',
                      type: 'area',
                      data: networkData.map((d) => ({ x: d.x, y: d.y1 })),
                    },
                    {
                      title: 'Site 2',
                      type: 'area',
                      data: networkData.map((d) => ({ x: d.x, y: d.y2 })),
                    },
                  ]}
                  xDomain={networkData.map((d) => d.x)}
                  yDomain={[0, 100]}
                  i18nStrings={{
                    filterLabel: 'Filter displayed data',
                    filterPlaceholder: 'Filter data',
                    filterSelectedAriaLabel: 'selected',
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'area chart',
                    xTickFormatter: (value) => value,
                    yTickFormatter: (value) => `${value}`,
                  }}
                  ariaLabel="Network traffic area chart"
                  height={300}
                  xScaleType="categorical"
                  xTitle="Day"
                  yTitle="Traffic"
                  empty={
                    <Box textAlign="center" color="inherit">
                      <b>No data available</b>
                      <Box variant="p" color="inherit">
                        There is no data available
                      </Box>
                    </Box>
                  }
                  noMatch={
                    <Box textAlign="center" color="inherit">
                      <b>No matching data</b>
                      <Box variant="p" color="inherit">
                        There is no matching data to display
                      </Box>
                    </Box>
                  }
                />
              </Container>

              <Container
                header={
                  <Header variant="h2" description="">
                    Credit Usage
                  </Header>
                }
              >
                <BarChart
                  key={`credit-${refreshKey}`}
                  series={[
                    {
                      title: 'Site 1',
                      type: 'bar',
                      data: creditData,
                    },
                  ]}
                  xDomain={creditData.map((d) => d.x)}
                  yDomain={[0, 300]}
                  i18nStrings={{
                    filterLabel: 'Filter displayed data',
                    filterPlaceholder: 'Filter data',
                    filterSelectedAriaLabel: 'selected',
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'bar chart',
                    xTickFormatter: (value) => value,
                    yTickFormatter: (value) => `${value}`,
                  }}
                  ariaLabel="Credit usage bar chart"
                  height={300}
                  xScaleType="categorical"
                  xTitle="Day"
                  yTitle="Credits"
                  empty={
                    <Box textAlign="center" color="inherit">
                      <b>No data available</b>
                      <Box variant="p" color="inherit">
                        There is no data available
                      </Box>
                    </Box>
                  }
                  noMatch={
                    <Box textAlign="center" color="inherit">
                      <b>No matching data</b>
                      <Box variant="p" color="inherit">
                        There is no matching data to display
                      </Box>
                    </Box>
                  }
                />
              </Container>
            </Grid>

            <Table
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
              columnDefinitions={[
                {
                  id: 'name',
                  header: 'Device Name',
                  cell: (item) => item.name,
                  sortingField: 'name',
                },
                {
                  id: 'type',
                  header: 'Type',
                  cell: (item) => item.type,
                  sortingField: 'type',
                },
                {
                  id: 'ipAddress',
                  header: 'IP Address',
                  cell: (item) => item.ipAddress,
                  sortingField: 'ipAddress',
                },
                {
                  id: 'status',
                  header: 'Status',
                  cell: (item) => item.status,
                  sortingField: 'status',
                },
                {
                  id: 'location',
                  header: 'Location',
                  cell: (item) => item.location,
                  sortingField: 'location',
                },
                {
                  id: 'lastSeen',
                  header: 'Last Seen',
                  cell: (item) => item.lastSeen,
                },
              ]}
              items={paginatedDevices}
              selectionType="multi"
              selectedItems={selectedItems}
              onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
              filter={
                <TextFilter
                  filteringText={filteringText}
                  filteringPlaceholder="Placeholder"
                  filteringAriaLabel="Filter devices"
                  onChange={({ detail }) => {
                    setFilteringText(detail.filteringText);
                    setCurrentPageIndex(1);
                  }}
                />
              }
              pagination={
                <Pagination
                  currentPageIndex={currentPageIndex}
                  pagesCount={Math.ceil(filteredDevices.length / 5)}
                  onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                />
              }
              preferences={
                <CollectionPreferences
                  title="Preferences"
                  confirmLabel="Confirm"
                  cancelLabel="Cancel"
                  preferences={{
                    pageSize: 5,
                  }}
                />
              }
              empty={
                <Box textAlign="center" color="inherit">
                  <b>No devices</b>
                  <Box padding={{ bottom: 's' }} variant="p" color="inherit">
                    No devices to display.
                  </Box>
                  <Button>Add Device</Button>
                </Box>
              }
              loadingText="Loading devices"
            />
          </SpaceBetween>
        }
        navigationHide={true}
        toolsHide={true}
      />
    </>
  );
}
