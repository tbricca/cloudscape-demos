// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import AppLayout from '@cloudscape-design/components/app-layout';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Header from '@cloudscape-design/components/header';
import Button from '@cloudscape-design/components/button';
import Flashbar from '@cloudscape-design/components/flashbar';
import Container from '@cloudscape-design/components/container';
import Grid from '@cloudscape-design/components/grid';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Table from '@cloudscape-design/components/table';
import Box from '@cloudscape-design/components/box';
import TextFilter from '@cloudscape-design/components/text-filter';
import Pagination from '@cloudscape-design/components/pagination';

import { Breadcrumbs, Notifications } from '../commons';
import { CustomAppLayout } from '../commons/common-components';

export function App() {
  const [filteringText, setFilteringText] = useState('');
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(1);

  // Sample data for Network Traffic area chart (12 data points as in design)
  const networkTrafficSeries = [
    {
      title: 'Site 1',
      type: 'area' as const,
      data: [
        { x: new Date(2023, 0, 1), y: 140000 },
        { x: new Date(2023, 0, 2), y: 145000 },
        { x: new Date(2023, 0, 3), y: 150000 },
        { x: new Date(2023, 0, 4), y: 155000 },
        { x: new Date(2023, 0, 5), y: 158000 },
        { x: new Date(2023, 0, 6), y: 160000 },
        { x: new Date(2023, 0, 7), y: 165000 },
        { x: new Date(2023, 0, 8), y: 170000 },
        { x: new Date(2023, 0, 9), y: 172000 },
        { x: new Date(2023, 0, 10), y: 175000 },
        { x: new Date(2023, 0, 11), y: 178000 },
        { x: new Date(2023, 0, 12), y: 180000 },
      ],
    },
    {
      title: 'Site 2',
      type: 'area' as const,
      data: [
        { x: new Date(2023, 0, 1), y: 90000 },
        { x: new Date(2023, 0, 2), y: 95000 },
        { x: new Date(2023, 0, 3), y: 100000 },
        { x: new Date(2023, 0, 4), y: 105000 },
        { x: new Date(2023, 0, 5), y: 108000 },
        { x: new Date(2023, 0, 6), y: 110000 },
        { x: new Date(2023, 0, 7), y: 115000 },
        { x: new Date(2023, 0, 8), y: 120000 },
        { x: new Date(2023, 0, 9), y: 122000 },
        { x: new Date(2023, 0, 10), y: 125000 },
        { x: new Date(2023, 0, 11), y: 128000 },
        { x: new Date(2023, 0, 12), y: 130000 },
      ],
    },
  ];

  // Sample data for Credit Usage bar chart (5 bars as in design)
  const creditUsageData = [
    { x: 'x1', y: 120 },
    { x: 'x2', y: 180 },
    { x: 'x3', y: 150 },
    { x: 'x4', y: 80 },
    { x: 'x5', y: 145 },
  ];

  // Sample data for devices table
  const devicesData = Array(10)
    .fill(null)
    .map((_, index) => ({
      id: `device-${index + 1}`,
      col1: 'Cell Value',
      col2: 'Cell Value',
      col3: 'Cell Value',
      col4: 'Cell Value',
      col5: 'Cell Value',
      col6: 'Cell Value',
      col7: 'Cell Value',
    }));

  return (
    <CustomAppLayout
      content={
        <SpaceBetween size="l">
          {/* Page Header */}
          <Header
            variant="h1"
            description="Network Traffic, Credit Usage, and Your Devices"
            actions={
              <Button variant="primary" iconName="external" iconAlign="right">
                Refresh Data
              </Button>
            }
          >
            Network Adminstration Dashboard
          </Header>

          {/* Warning Banner */}
          <Flashbar
            items={[
              {
                type: 'warning',
                dismissible: true,
                dismissLabel: 'Dismiss',
                content: 'This is a warning message',
                id: 'warning-message',
              },
            ]}
          />

          {/* Charts Section */}
          <Grid gridDefinition={[{ colspan: 6 }, { colspan: 6 }]}>
            {/* Network Traffic Area Chart */}
            <Container header={<Header variant="h2">Network traffic</Header>}>
              <AreaChart
                series={networkTrafficSeries}
                xScaleType="time"
                yTitle="Network traffic"
                xTitle="Day"
                height={300}
                hideFilter
                hideLegend={false}
                statusType="finished"
                ariaLabel="Network traffic area chart"
                ariaDescription="Area chart showing network traffic over time for Site 1 and Site 2"
                i18nStrings={{
                  filterLabel: 'Filter displayed data',
                  filterPlaceholder: 'Filter data',
                  legendAriaLabel: 'Legend',
                  chartAriaRoleDescription: 'area chart',
                  xTickFormatter: (value: Date) =>
                    value
                      .toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })
                      .split(' ')
                      .reverse()
                      .join(' '),
                  yTickFormatter: value => `y${Math.round(value / 30000)}`,
                }}
              />
            </Container>

            {/* Credit Usage Bar Chart */}
            <Container header={<Header variant="h2">Credit Usage</Header>}>
              <BarChart
                series={[
                  {
                    title: 'Site 1',
                    type: 'bar',
                    data: creditUsageData,
                  },
                ]}
                xScaleType="categorical"
                yTitle="Credit Usage"
                xTitle="Day"
                height={300}
                hideFilter
                hideLegend={false}
                statusType="finished"
                ariaLabel="Credit usage bar chart"
                ariaDescription="Bar chart showing credit usage over 5 days"
                i18nStrings={{
                  filterLabel: 'Filter displayed data',
                  filterPlaceholder: 'Filter data',
                  legendAriaLabel: 'Legend',
                  chartAriaRoleDescription: 'bar chart',
                  yTickFormatter: value => `y${Math.round(value / 30)}`,
                }}
              />
            </Container>
          </Grid>

          {/* Devices Table */}
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
                id: 'col1',
                header: 'Column header',
                cell: item => item.col1,
                sortingField: 'col1',
              },
              {
                id: 'col2',
                header: 'Column header',
                cell: item => item.col2,
                sortingField: 'col2',
              },
              {
                id: 'col3',
                header: 'Column header',
                cell: item => item.col3,
                sortingField: 'col3',
              },
              {
                id: 'col4',
                header: 'Column header',
                cell: item => item.col4,
                sortingField: 'col4',
              },
              {
                id: 'col5',
                header: 'Column header',
                cell: item => item.col5,
                sortingField: 'col5',
              },
              {
                id: 'col6',
                header: 'Column header',
                cell: item => item.col6,
                sortingField: 'col6',
              },
              {
                id: 'col7',
                header: 'Column header',
                cell: item => item.col7,
                sortingField: 'col7',
              },
            ]}
            items={devicesData}
            selectedItems={selectedItems}
            onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
            selectionType="multi"
            sortingDisabled={false}
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
                pagesCount={5}
                ariaLabels={{
                  nextPageLabel: 'Next page',
                  previousPageLabel: 'Previous page',
                  pageLabel: pageNumber => `Page ${pageNumber}`,
                }}
                onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
              />
            }
            empty={
              <Box textAlign="center" color="inherit">
                <b>No devices</b>
                <Box padding={{ bottom: 's' }} variant="p" color="inherit">
                  No devices to display.
                </Box>
              </Box>
            }
          />
        </SpaceBetween>
      }
      breadcrumbs={
        <Breadcrumbs
          items={[
            { text: 'Service', href: '#/' },
            { text: 'Administrative Dashboard', href: '#/network-admin-dashboard' },
          ]}
        />
      }
      notifications={<Notifications />}
    />
  );
}
