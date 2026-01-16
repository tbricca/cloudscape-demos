// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import AppLayout from '@cloudscape-design/components/app-layout';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Button from '@cloudscape-design/components/button';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Grid from '@cloudscape-design/components/grid';
import Box from '@cloudscape-design/components/box';
import Table from '@cloudscape-design/components/table';
import Pagination from '@cloudscape-design/components/pagination';
import TextFilter from '@cloudscape-design/components/text-filter';
import Flashbar, { FlashbarProps } from '@cloudscape-design/components/flashbar';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';

export function App() {
  const [filteringText, setFilteringText] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [flashbarItems, setFlashbarItems] = useState<FlashbarProps.MessageDefinition[]>([
    {
      type: 'warning',
      content: 'This is a warning message',
      dismissible: true,
      dismissLabel: 'Dismiss',
      onDismiss: () => setFlashbarItems([]),
      id: 'warning-message',
    },
  ]);

  // Sample data for network traffic chart
  const networkTrafficData = [
    {
      title: 'Site 1',
      type: 'area',
      data: [
        { x: 'x1', y: 3 },
        { x: 'x2', y: 3.5 },
        { x: 'x3', y: 3.8 },
        { x: 'x4', y: 4 },
        { x: 'x5', y: 4.2 },
        { x: 'x6', y: 4.5 },
        { x: 'x7', y: 5 },
        { x: 'x8', y: 5.2 },
        { x: 'x9', y: 5.5 },
        { x: 'x10', y: 5 },
        { x: 'x11', y: 4.8 },
        { x: 'x12', y: 4.5 },
      ],
    },
    {
      title: 'Site 2',
      type: 'area',
      data: [
        { x: 'x1', y: 2 },
        { x: 'x2', y: 2.2 },
        { x: 'x3', y: 2.5 },
        { x: 'x4', y: 2.8 },
        { x: 'x5', y: 3 },
        { x: 'x6', y: 3.5 },
        { x: 'x7', y: 2.8 },
        { x: 'x8', y: 3.2 },
        { x: 'x9', y: 3.8 },
        { x: 'x10', y: 3 },
        { x: 'x11', y: 2.8 },
        { x: 'x12', y: 3.5 },
      ],
    },
  ];

  // Sample data for credit usage chart
  const creditUsageData = [
    { x: 'x1', y: 183 },
    { x: 'x2', y: 257 },
    { x: 'x3', y: 213 },
    { x: 'x4', y: 122 },
    { x: 'x5', y: 210 },
  ];

  // Sample table data
  const tableItems = Array.from({ length: 12 }, (_, i) => ({
    id: `device-${i + 1}`,
    column1: 'Cell Value',
    column2: 'Cell Value',
    column3: 'Cell Value',
    column4: 'Cell Value',
    column5: 'Cell Value',
    column6: 'Cell Value',
    column7: 'Cell Value',
  }));

  const columnDefinitions = [
    {
      id: 'column1',
      header: 'Column header',
      cell: (item: any) => item.column1,
      sortingField: 'column1',
    },
    {
      id: 'column2',
      header: 'Column header',
      cell: (item: any) => item.column2,
      sortingField: 'column2',
    },
    {
      id: 'column3',
      header: 'Column header',
      cell: (item: any) => item.column3,
      sortingField: 'column3',
    },
    {
      id: 'column4',
      header: 'Column header',
      cell: (item: any) => item.column4,
      sortingField: 'column4',
    },
    {
      id: 'column5',
      header: 'Column header',
      cell: (item: any) => item.column5,
      sortingField: 'column5',
    },
    {
      id: 'column6',
      header: 'Column header',
      cell: (item: any) => item.column6,
      sortingField: 'column6',
    },
    {
      id: 'column7',
      header: 'Column header',
      cell: (item: any) => item.column7,
      sortingField: 'column7',
    },
  ];

  return (
    <AppLayout
      contentType="dashboard"
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
      notifications={<Flashbar items={flashbarItems} />}
      content={
        <SpaceBetween size="l">
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

          <Container
            header={
              <Grid
                gridDefinition={[
                  { colspan: { default: 12, xs: 12, s: 8 } },
                  { colspan: { default: 12, xs: 12, s: 4 } },
                ]}
              >
                <TextFilter
                  filteringText={filteringText}
                  filteringPlaceholder="Placeholder"
                  onChange={({ detail }) => setFilteringText(detail.filteringText)}
                />
                <Box float="right">
                  <SpaceBetween direction="horizontal" size="xs">
                    <Pagination
                      currentPageIndex={currentPageIndex}
                      onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                      pagesCount={5}
                    />
                    <Button iconName="settings" variant="icon" />
                  </SpaceBetween>
                </Box>
              </Grid>
            }
          >
            <Grid
              gridDefinition={[
                { colspan: { default: 12, s: 6 } },
                { colspan: { default: 12, s: 6 } },
              ]}
            >
              <Container>
                <AreaChart
                  series={networkTrafficData}
                  xDomain={['x1', 'x2', 'x3', 'x4', 'x5', 'x6', 'x7', 'x8', 'x9', 'x10', 'x11', 'x12']}
                  yDomain={[0, 6]}
                  i18nStrings={{
                    filterLabel: 'Filter displayed data',
                    filterPlaceholder: 'Filter data',
                    filterSelectedAriaLabel: 'selected',
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'area chart',
                    yTickFormatter: value => `y${value}`,
                  }}
                  ariaLabel="Network traffic area chart"
                  height={300}
                  xScaleType="categorical"
                  yTitle="Network traffic"
                  xTitle="Day"
                  legendTitle="Legend"
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

              <Container>
                <BarChart
                  series={[
                    {
                      title: 'Site 1',
                      type: 'bar',
                      data: creditUsageData,
                    },
                  ]}
                  xDomain={['x1', 'x2', 'x3', 'x4', 'x5']}
                  yDomain={[0, 300]}
                  i18nStrings={{
                    filterLabel: 'Filter displayed data',
                    filterPlaceholder: 'Filter data',
                    filterSelectedAriaLabel: 'selected',
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'bar chart',
                    yTickFormatter: value => `y${Math.round(value / 50)}`,
                  }}
                  ariaLabel="Credit usage bar chart"
                  height={300}
                  xScaleType="categorical"
                  yTitle="Credit Usage"
                  xTitle="Day"
                  legendTitle="Legend"
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
          </Container>

          <Table
            columnDefinitions={columnDefinitions}
            items={tableItems}
            selectionType="multi"
            selectedItems={selectedItems}
            onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
            header={
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
            }
            loadingText="Loading devices"
            trackBy="id"
            empty={
              <Box textAlign="center" color="inherit">
                <Box padding={{ bottom: 's' }} variant="p" color="inherit">
                  <b>No devices</b>
                </Box>
                <Box variant="p" color="inherit">
                  No devices to display
                </Box>
              </Box>
            }
          />
        </SpaceBetween>
      }
    />
  );
}
