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

  // Sample data for Network Traffic area chart
  const networkTrafficSeries = [
    {
      title: 'Site 1',
      type: 'area' as const,
      data: [
        { x: new Date(2023, 0, 1), y: 35000 },
        { x: new Date(2023, 0, 2), y: 38000 },
        { x: new Date(2023, 0, 3), y: 42000 },
        { x: new Date(2023, 0, 4), y: 45000 },
        { x: new Date(2023, 0, 5), y: 47000 },
        { x: new Date(2023, 0, 6), y: 48000 },
        { x: new Date(2023, 0, 7), y: 50000 },
        { x: new Date(2023, 0, 8), y: 51000 },
        { x: new Date(2023, 0, 9), y: 52000 },
        { x: new Date(2023, 0, 10), y: 54000 },
        { x: new Date(2023, 0, 11), y: 55000 },
        { x: new Date(2023, 0, 12), y: 53000 },
      ],
    },
    {
      title: 'Site 2',
      type: 'area' as const,
      data: [
        { x: new Date(2023, 0, 1), y: 25000 },
        { x: new Date(2023, 0, 2), y: 27000 },
        { x: new Date(2023, 0, 3), y: 30000 },
        { x: new Date(2023, 0, 4), y: 33000 },
        { x: new Date(2023, 0, 5), y: 35000 },
        { x: new Date(2023, 0, 6), y: 37000 },
        { x: new Date(2023, 0, 7), y: 38000 },
        { x: new Date(2023, 0, 8), y: 39000 },
        { x: new Date(2023, 0, 9), y: 41000 },
        { x: new Date(2023, 0, 10), y: 42000 },
        { x: new Date(2023, 0, 11), y: 43000 },
        { x: new Date(2023, 0, 12), y: 40000 },
      ],
    },
  ];

  // Sample data for Credit Usage bar chart
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
            <Container header={<Header variant="h2">Network traffic</Header>}>
              <AreaChart
                series={networkTrafficSeries}
                xScaleType="time"
                yTitle="y-axis"
                xTitle="Day"
                height={300}
                hideFilter
                hideLegend={false}
                statusType="finished"
                i18nStrings={{
                  filterLabel: 'Filter displayed data',
                  filterPlaceholder: 'Filter data',
                  legendAriaLabel: 'Legend',
                  chartAriaRoleDescription: 'area chart',
                  yTickFormatter: value => `y${Math.round(value / 10000)}`,
                }}
              />
            </Container>

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
                yTitle="y-axis"
                xTitle="Day"
                height={300}
                hideFilter
                hideLegend={false}
                statusType="finished"
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
                id: 'select',
                header: '',
                cell: () => <input type="checkbox" />,
                width: 50,
              },
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
            sortingDisabled={false}
            filter={
              <TextFilter
                filteringText={filteringText}
                filteringPlaceholder="Placeholder"
                onChange={({ detail }) => setFilteringText(detail.filteringText)}
              />
            }
            pagination={
              <Pagination
                currentPageIndex={1}
                pagesCount={5}
                onChange={({ detail }) => console.log(detail.currentPageIndex)}
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
