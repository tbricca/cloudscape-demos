// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Table from '@cloudscape-design/components/table';

// --- Network Traffic Chart Data ---
const networkDays = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const site1TrafficData = [
  { x: 1, y: 35 },
  { x: 2, y: 42 },
  { x: 3, y: 38 },
  { x: 4, y: 55 },
  { x: 5, y: 48 },
  { x: 6, y: 62 },
  { x: 7, y: 58 },
  { x: 8, y: 70 },
  { x: 9, y: 65 },
  { x: 10, y: 72 },
  { x: 11, y: 68 },
  { x: 12, y: 75 },
];

const site2TrafficData = [
  { x: 1, y: 52 },
  { x: 2, y: 58 },
  { x: 3, y: 48 },
  { x: 4, y: 65 },
  { x: 5, y: 72 },
  { x: 6, y: 78 },
  { x: 7, y: 68 },
  { x: 8, y: 82 },
  { x: 9, y: 76 },
  { x: 10, y: 85 },
  { x: 11, y: 78 },
  { x: 12, y: 80 },
];

// --- Credit Usage Chart Data ---
const creditUsageData = [
  { x: 'x1', y: 42 },
  { x: 'x2', y: 58 },
  { x: 'x3', y: 50 },
  { x: 'x4', y: 32 },
  { x: 'x5', y: 48 },
];

// --- My Devices Table Data ---
const deviceColumns = [
  { id: 'col1', header: 'Column header', cell: () => 'Cell Value', sortingField: 'col1', width: 160 },
  { id: 'col2', header: 'Column header', cell: () => 'Cell Value', sortingField: 'col2', width: 160 },
  { id: 'col3', header: 'Column header', cell: () => 'Cell Value', sortingField: 'col3', width: 160 },
  { id: 'col4', header: 'Column header', cell: () => 'Cell Value', sortingField: 'col4', width: 160 },
  { id: 'col5', header: 'Column header', cell: () => 'Cell Value', sortingField: 'col5', width: 160 },
  { id: 'col6', header: 'Column header', cell: () => 'Cell Value', sortingField: 'col6', width: 160 },
  { id: 'col7', header: 'Column header', cell: () => 'Cell Value', sortingField: 'col7', width: 160 },
];

const deviceItems = Array.from({ length: 14 }, (_, i) => ({
  id: String(i + 1),
  col1: 'Cell Value',
  col2: 'Cell Value',
  col3: 'Cell Value',
  col4: 'Cell Value',
  col5: 'Cell Value',
  col6: 'Cell Value',
  col7: 'Cell Value',
}));

const chartEmptyState = (
  <Box textAlign="center" color="inherit">
    <b>No data available</b>
    <Box variant="p" color="inherit">
      There is no data available
    </Box>
  </Box>
);

const chartNoMatchState = (
  <Box textAlign="center" color="inherit">
    <b>No matching data</b>
    <Box variant="p" color="inherit">
      There is no matching data to display
    </Box>
  </Box>
);

function NetworkTrafficChart() {
  return (
    <Container>
      <AreaChart
        series={[
          {
            title: 'Site 1',
            type: 'area',
            data: site1TrafficData,
            color: '#688AE8',
          },
          {
            title: 'Site 2',
            type: 'area',
            data: site2TrafficData,
            color: '#C33D69',
          },
          {
            title: 'Performance goal',
            type: 'threshold',
            y: 60,
            color: '#5F6B7A',
          },
        ]}
        xDomain={networkDays}
        yDomain={[0, 100]}
        xTitle="Day"
        yTitle="Network traffic"
        ariaLabel="Network traffic area chart"
        height={300}
        hideFilter
        i18nStrings={{
          filterLabel: 'Filter displayed data',
          filterPlaceholder: 'Filter data',
          filterSelectedAriaLabel: 'selected',
          legendAriaLabel: 'Legend',
          chartAriaRoleDescription: 'area chart',
          xAxisAriaRoleDescription: 'x axis',
          yAxisAriaRoleDescription: 'y axis',
          yTickFormatter: (v: number) => `y${Math.round(v / 20) || ''}`,
          xTickFormatter: (v: number) => `x${v}`,
        }}
        empty={chartEmptyState}
        noMatch={chartNoMatchState}
      />
    </Container>
  );
}

function CreditUsageChart() {
  return (
    <Container>
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
            y: 45,
            color: '#5F6B7A',
          },
        ]}
        xDomain={['x1', 'x2', 'x3', 'x4', 'x5']}
        yDomain={[0, 70]}
        xTitle="Day"
        yTitle="Credit Usage"
        ariaLabel="Credit usage bar chart"
        height={300}
        hideFilter
        i18nStrings={{
          filterLabel: 'Filter displayed data',
          filterPlaceholder: 'Filter data',
          filterSelectedAriaLabel: 'selected',
          legendAriaLabel: 'Legend',
          chartAriaRoleDescription: 'bar chart',
          xAxisAriaRoleDescription: 'x axis',
          yAxisAriaRoleDescription: 'y axis',
          yTickFormatter: (v: number) => `y${Math.round(v / 12) || ''}`,
        }}
        empty={chartEmptyState}
        noMatch={chartNoMatchState}
      />
    </Container>
  );
}

function MyDevicesTable() {
  const [selectedItems, setSelectedItems] = useState<typeof deviceItems>([]);
  const [sortingColumn, setSortingColumn] = useState<{ sortingField: string } | null>(null);
  const [sortingDescending, setSortingDescending] = useState(false);

  return (
    <Table
      header={
        <Header
          variant="h2"
          description="Devices on your local network"
          counter={`(${deviceItems.length})`}
          actions={
            <Button variant="primary" iconName="external" iconAlign="right">
              Add Device
            </Button>
          }
        >
          My Devices
        </Header>
      }
      columnDefinitions={deviceColumns.map(col => ({
        id: col.id,
        header: col.header,
        cell: () => 'Cell Value',
        sortingField: col.sortingField,
        width: col.width,
      }))}
      items={deviceItems}
      selectionType="multi"
      selectedItems={selectedItems}
      onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
      sortingColumn={sortingColumn ?? undefined}
      sortingDescending={sortingDescending}
      onSortingChange={({ detail }) => {
        setSortingColumn(detail.sortingColumn as { sortingField: string });
        setSortingDescending(detail.isDescending ?? false);
      }}
      empty={
        <Box textAlign="center" color="inherit" padding="xl">
          <b>No devices</b>
          <Box variant="p" color="inherit">
            No devices found on your local network.
          </Box>
        </Box>
      }
      trackBy="id"
    />
  );
}

export function NetworkAdminContent() {
  return (
    <SpaceBetween size="l">
      <ColumnLayout columns={2} minColumnWidth={300}>
        <NetworkTrafficChart />
        <CreditUsageChart />
      </ColumnLayout>
      <MyDevicesTable />
    </SpaceBetween>
  );
}
