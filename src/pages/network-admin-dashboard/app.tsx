// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

/**
 * Network Administration Dashboard
 *
 * This component provides a comprehensive dashboard for monitoring and managing network infrastructure.
 * It displays real-time network traffic metrics, credit usage analytics, and device inventory management.
 *
 * Key Features:
 * - Network traffic visualization using area charts for multi-site comparison
 * - Credit usage tracking with bar charts showing performance against goals
 * - Device management table with filtering, sorting, and pagination capabilities
 * - Dismissible warning notifications for system alerts
 * - Responsive grid layout that adapts to different screen sizes
 */

import React, { useState } from 'react';
import { useCollection } from '@cloudscape-design/collection-hooks';

// Core Layout Components
// These components provide the foundational structure for the dashboard page
import AppLayout from '@cloudscape-design/components/app-layout';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Grid from '@cloudscape-design/components/grid';
import SpaceBetween from '@cloudscape-design/components/space-between';

// UI Components
// Interactive elements and containers for content organization
import Button from '@cloudscape-design/components/button';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import Flashbar from '@cloudscape-design/components/flashbar';
import Box from '@cloudscape-design/components/box';

// Data Display Components
// Components for visualizing and managing data
import Table from '@cloudscape-design/components/table';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import TextFilter from '@cloudscape-design/components/text-filter';
import Pagination from '@cloudscape-design/components/pagination';
import Link from '@cloudscape-design/components/link';

// Shared Utilities
// Common chart configurations and formatters used across dashboard widgets
import { commonChartProps, dateFormatter, barChartInstructions } from '../dashboard/widgets/chart-commons';

/**
 * Mock Device Data
 *
 * Simulates a collection of network devices for demonstration purposes.
 * In a production environment, this would be replaced with data from an API endpoint.
 *
 * Each device contains:
 * - id: Unique identifier for the device
 * - name: Human-readable device name
 * - column1-6: Placeholder data representing various device properties
 *              (e.g., IP address, MAC address, status, uptime, etc.)
 */
const MOCK_DEVICES = Array.from({ length: 12 }, (_, i) => ({
  id: `device-${i + 1}`,
  name: `Device ${i + 1}`,
  column1: 'Cell Value',
  column2: 'Cell Value',
  column3: 'Cell Value',
  column4: 'Cell Value',
  column5: 'Cell Value',
  column6: 'Cell Value',
}));

/**
 * Network Traffic Time Series Data
 *
 * Contains historical network traffic measurements across multiple sites.
 * This data powers the area chart visualization showing traffic patterns over time.
 *
 * Data Structure:
 * - x: Time period identifier (x1 through x12 representing daily measurements)
 * - y1: Traffic volume for Site 1 (in arbitrary units)
 * - y2: Traffic volume for Site 2 (in arbitrary units)
 *
 * The data demonstrates typical network traffic patterns with variations
 * that help identify trends, peaks, and potential issues.
 */
const networkTrafficData = [
  { x: 'x1', y1: 120, y2: 100 },
  { x: 'x2', y1: 140, y2: 110 },
  { x: 'x3', y1: 135, y2: 125 },
  { x: 'x4', y1: 145, y2: 135 },
  { x: 'x5', y1: 150, y2: 140 },
  { x: 'x6', y1: 148, y2: 145 },
  { x: 'x7', y1: 155, y2: 148 },
  { x: 'x8', y1: 160, y2: 150 },
  { x: 'x9', y1: 165, y2: 155 },
  { x: 'x10', y1: 170, y2: 160 },
  { x: 'x11', y1: 168, y2: 165 },
  { x: 'x12', y1: 150, y2: 155 },
];

const networkTrafficSeries: any[] = [
  {
    title: 'Site 1',
    type: 'area',
    data: networkTrafficData.map((d, i) => ({ x: i + 1, y: d.y1 })),
    valueFormatter: (value: number) => `${value.toFixed(0)}`,
  },
  {
    title: 'Site 2',
    type: 'area',
    data: networkTrafficData.map((d, i) => ({ x: i + 1, y: d.y2 })),
    valueFormatter: (value: number) => `${value.toFixed(0)}`,
  },
  {
    title: 'Performance goal',
    type: 'threshold',
    y: 150,
    valueFormatter: (value: number) => `${value.toFixed(0)}`,
  },
];

// Credit Usage data (Bar chart)
const creditUsageData = [
  { x: 'x1', site1: 425, site2: 380 },
  { x: 'x2', site1: 512, site2: 490 },
  { x: 'x3', site1: 498, site2: 460 },
  { x: 'x4', site1: 330, site2: 350 },
  { x: 'x5', site1: 505, site2: 470 },
];

const creditUsageSeries: any[] = [
  {
    title: 'Site 1',
    type: 'bar',
    data: creditUsageData.map((d, i) => ({ x: i + 1, y: d.site1 })),
    valueFormatter: (value: number) => `${value.toFixed(0)}`,
  },
  {
    title: 'Site 2',
    type: 'bar',
    data: creditUsageData.map((d, i) => ({ x: i + 1, y: d.site2 })),
    valueFormatter: (value: number) => `${value.toFixed(0)}`,
  },
  {
    title: 'Performance goal',
    type: 'threshold',
    y: 450,
    valueFormatter: (value: number) => `${value.toFixed(0)}`,
  },
];

const columnDefinitions = [
  {
    id: 'name',
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
    cell: (item: any) => item.name,
    sortingField: 'name',
  },
];

export function App() {
  const [flashbarVisible, setFlashbarVisible] = useState(true);

  const { items, actions, filteredItemsCount, collectionProps, filterProps, paginationProps } = useCollection(
    MOCK_DEVICES,
    {
      filtering: {
        empty: (
          <Box textAlign="center" color="inherit">
            <b>No devices</b>
            <Box variant="p" color="inherit">
              No devices to display.
            </Box>
          </Box>
        ),
        noMatch: (
          <Box textAlign="center" color="inherit">
            <b>No matches</b>
            <Box variant="p" color="inherit">
              We can't find a match.
            </Box>
            <Button onClick={() => actions.setFiltering('')}>Clear filter</Button>
          </Box>
        ),
      },
      pagination: { pageSize: 10 },
      sorting: {},
      selection: {},
    },
  );

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
      notifications={
        flashbarVisible ? (
          <Flashbar
            items={[
              {
                type: 'warning',
                dismissible: true,
                onDismiss: () => setFlashbarVisible(false),
                content: 'This is a warning message',
              },
            ]}
          />
        ) : null
      }
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
                Network Administration Dashboard
              </Header>
            </SpaceBetween>
          }
        >
          <SpaceBetween size="l">
            {/* Search bar */}
            <TextFilter filteringPlaceholder="Placeholder" filteringText="" onChange={() => {}} />

            {/* Charts Grid */}
            <Grid gridDefinition={[{ colspan: 6 }, { colspan: 6 }]}>
              {/* Network Traffic Chart */}
              <Container header={<Header variant="h2">Network traffic</Header>}>
                <AreaChart
                  {...commonChartProps}
                  series={networkTrafficSeries}
                  height={300}
                  xDomain={[1, 12]}
                  yDomain={[0, 200]}
                  xTitle="Day"
                  yTitle="y6"
                  hideFilter={false}
                  hideLegend={false}
                  ariaLabel="Network traffic chart"
                  i18nStrings={{
                    ...commonChartProps.i18nStrings,
                    filterLabel: 'Filter displayed sites',
                    filterPlaceholder: 'Filter sites',
                    xTickFormatter: value => `x${value}`,
                  }}
                  detailPopoverSeriesContent={({ series, y }) => ({
                    key: series.title,
                    value: y,
                  })}
                />
              </Container>

              {/* Credit Usage Chart */}
              <Container header={<Header variant="h2">Credit Usage</Header>}>
                <BarChart
                  {...commonChartProps}
                  series={creditUsageSeries}
                  height={300}
                  xDomain={[1, 2, 3, 4, 5]}
                  yDomain={[0, 600]}
                  xTitle="Day"
                  yTitle="y6"
                  hideFilter={false}
                  hideLegend={false}
                  xScaleType="categorical"
                  ariaLabel="Credit usage chart"
                  ariaDescription={`Bar chart showing credit usage. ${barChartInstructions}`}
                  i18nStrings={{
                    ...commonChartProps.i18nStrings,
                    filterLabel: 'Filter displayed sites',
                    filterPlaceholder: 'Filter sites',
                    xTickFormatter: value => `x${value}`,
                  }}
                  detailPopoverSeriesContent={({ series, y }) => ({
                    key: series.title,
                    value: y,
                  })}
                />
              </Container>
            </Grid>

            {/* My Devices Table */}
            <Table
              {...collectionProps}
              columnDefinitions={columnDefinitions}
              items={items}
              selectionType="multi"
              header={
                <Header
                  variant="h2"
                  description="Devices on your local network"
                  actions={
                    <Button variant="primary" iconName="add-plus">
                      Add Device
                    </Button>
                  }
                >
                  My Devices
                </Header>
              }
              filter={
                <TextFilter
                  {...filterProps}
                  filteringPlaceholder="Find devices"
                  countText={`${filteredItemsCount} ${filteredItemsCount === 1 ? 'match' : 'matches'}`}
                />
              }
              pagination={<Pagination {...paginationProps} />}
            />
          </SpaceBetween>
        </ContentLayout>
      }
    />
  );
}
