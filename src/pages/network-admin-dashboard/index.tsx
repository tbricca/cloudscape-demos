// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, { useState } from 'react';
import AppLayout from '@cloudscape-design/components/app-layout';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Box from '@cloudscape-design/components/box';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Button from '@cloudscape-design/components/button';
import Container from '@cloudscape-design/components/container';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Flashbar from '@cloudscape-design/components/flashbar';
import Grid from '@cloudscape-design/components/grid';
import Header from '@cloudscape-design/components/header';
import Pagination from '@cloudscape-design/components/pagination';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Table from '@cloudscape-design/components/table';
import TextFilter from '@cloudscape-design/components/text-filter';

import '../../styles/base.scss';

const NETWORK_DAYS = ['x1', 'x2', 'x3', 'x4', 'x5', 'x6', 'x7', 'x8', 'x9', 'x10', 'x11', 'x12'];

const networkSite1Data = [1.8, 2.2, 2.5, 2.6, 3.1, 3.4, 3.8, 3.6, 3.9, 4.1, 4.6, 3.1].map((y, i) => ({
  x: NETWORK_DAYS[i],
  y,
}));

const networkSite2Data = [3.2, 3.5, 4.0, 4.1, 4.7, 4.4, 3.5, 3.8, 4.3, 4.5, 5.1, 4.3].map((y, i) => ({
  x: NETWORK_DAYS[i],
  y,
}));

const CREDIT_DAYS = ['x1', 'x2', 'x3', 'x4', 'x5'];

const creditSite1Data = [4.0, 5.8, 5.0, 3.2, 4.6].map((y, i) => ({
  x: CREDIT_DAYS[i],
  y,
}));

const DEVICE_COLUMN_HEADERS = ['Device Name', 'IP Address', 'MAC Address', 'Status', 'Type', 'Last Seen', 'Location'];

const DEVICE_ROWS = Array.from({ length: 14 }, (_, i) => ({
  id: `device-${i}`,
  col0: 'Cell Value',
  col1: 'Cell Value',
  col2: 'Cell Value',
  col3: 'Cell Value',
  col4: 'Cell Value',
  col5: 'Cell Value',
  col6: 'Cell Value',
}));

type DeviceRow = (typeof DEVICE_ROWS)[0];

const CHART_Y_FORMAT = (value: number) => (value > 0 && Number.isInteger(value) ? `y${value}` : '');

const AREA_CHART_I18N = {
  filterLabel: 'Filter displayed series',
  filterPlaceholder: 'Filter series',
  filterSelectedAriaLabel: 'selected',
  legendAriaLabel: 'Legend',
  chartContainerLabel: 'Network traffic chart',
  xAxisAriaRoleDescription: 'axis',
  yAxisAriaRoleDescription: 'axis',
  detailTotalLabel: 'Total',
  detailPopoverDismissAriaLabel: 'Dismiss',
  xTickFormatter: (v: string) => v,
  yTickFormatter: CHART_Y_FORMAT,
};

const BAR_CHART_I18N = {
  filterLabel: 'Filter displayed series',
  filterPlaceholder: 'Filter series',
  filterSelectedAriaLabel: 'selected',
  legendAriaLabel: 'Legend',
  chartContainerLabel: 'Credit usage chart',
  xAxisAriaRoleDescription: 'axis',
  yAxisAriaRoleDescription: 'axis',
  detailTotalLabel: 'Total',
  detailPopoverDismissAriaLabel: 'Dismiss',
  xTickFormatter: (v: string) => v,
  yTickFormatter: CHART_Y_FORMAT,
};

const DEVICE_TABLE_COLUMNS = DEVICE_COLUMN_HEADERS.map((col, i) => ({
  id: `col${i}`,
  header: col,
  cell: (item: DeviceRow) => item[`col${i}` as keyof DeviceRow],
}));

export default function NetworkAdminDashboard() {
  const [warningDismissed, setWarningDismissed] = useState(false);
  const [deviceFilter, setDeviceFilter] = useState('');
  const [devicePage, setDevicePage] = useState(1);
  const [selectedDevices, setSelectedDevices] = useState<DeviceRow[]>([]);
  const [toolbarPage, setToolbarPage] = useState(1);
  const itemsPerPage = 10;

  const filteredDevices = DEVICE_ROWS.filter(row =>
    Object.values(row).some(v => typeof v === 'string' && v.toLowerCase().includes(deviceFilter.toLowerCase())),
  );
  const paginatedDevices = filteredDevices.slice((devicePage - 1) * itemsPerPage, devicePage * itemsPerPage);

  return (
    <AppLayout
      navigationHide
      toolsHide
      breadcrumbs={
        <BreadcrumbGroup
          items={[
            { text: 'Service', href: '/' },
            { text: 'Administrative Dashboard', href: '#' },
          ]}
          ariaLabel="Breadcrumbs"
        />
      }
      notifications={
        !warningDismissed ? (
          <Flashbar
            items={[
              {
                type: 'warning',
                content: 'This is a warning message',
                dismissible: true,
                onDismiss: () => setWarningDismissed(true),
                id: 'warning-banner',
              },
            ]}
          />
        ) : undefined
      }
      content={
        <ContentLayout
          header={
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
          }
        >
          <SpaceBetween size="l">
            {/* Search + Pagination toolbar */}
            <div className="network-toolbar">
              <div className="network-toolbar__search">
                <TextFilter
                  filteringText=""
                  filteringPlaceholder="Placeholder"
                  filteringAriaLabel="Filter dashboard"
                  onChange={() => {}}
                />
              </div>
              <Pagination
                currentPageIndex={toolbarPage}
                pagesCount={5}
                onChange={({ detail }) => setToolbarPage(detail.currentPageIndex)}
                ariaLabels={{
                  nextPageLabel: 'Next page',
                  previousPageLabel: 'Previous page',
                  pageLabel: n => `Page ${n}`,
                }}
              />
            </div>

            {/* Charts row */}
            <Grid gridDefinition={[{ colspan: { default: 12, m: 6 } }, { colspan: { default: 12, m: 6 } }]}>
              <Container
                header={
                  <Header variant="h3">Network traffic</Header>
                }
              >
                <AreaChart
                  series={[
                    {
                      title: 'Site 1',
                      type: 'area',
                      data: networkSite1Data,
                      color: '#688AE8',
                    },
                    {
                      title: 'Site 2',
                      type: 'area',
                      data: networkSite2Data,
                      color: '#C33D69',
                    },
                    {
                      title: 'Performance goal',
                      type: 'threshold',
                      y: 3.4,
                      color: '#5F6B7A',
                    },
                  ]}
                  xDomain={NETWORK_DAYS}
                  yDomain={[0, 6]}
                  i18nStrings={AREA_CHART_I18N}
                  ariaLabel="Network traffic area chart"
                  height={240}
                  hideFilter
                  xTitle="Day"
                />
              </Container>

              <Container
                header={
                  <Header variant="h3">Credit Usage</Header>
                }
              >
                <BarChart
                  series={[
                    {
                      title: 'Site 1',
                      type: 'bar',
                      data: creditSite1Data,
                      color: '#688AE8',
                    },
                    {
                      title: 'Performance goal',
                      type: 'threshold',
                      y: 4.0,
                      color: '#5F6B7A',
                    },
                  ]}
                  xDomain={CREDIT_DAYS}
                  yDomain={[0, 6]}
                  i18nStrings={BAR_CHART_I18N}
                  ariaLabel="Credit usage bar chart"
                  height={240}
                  hideFilter
                  xTitle="Day"
                />
              </Container>
            </Grid>

            {/* My Devices table */}
            <Table
              header={
                <Header
                  variant="h2"
                  description="Devices on your local network"
                  counter={`(${DEVICE_ROWS.length})`}
                  actions={
                    <Button variant="primary" iconName="external" iconAlign="right">
                      Add Device
                    </Button>
                  }
                >
                  My Devices
                </Header>
              }
              columnDefinitions={DEVICE_TABLE_COLUMNS}
              items={paginatedDevices}
              selectionType="multi"
              selectedItems={selectedDevices}
              onSelectionChange={({ detail }) => setSelectedDevices(detail.selectedItems)}
              trackBy="id"
              filter={
                <TextFilter
                  filteringText={deviceFilter}
                  filteringPlaceholder="Search devices"
                  filteringAriaLabel="Filter devices"
                  countText={`${filteredDevices.length} matches`}
                  onChange={({ detail }) => {
                    setDeviceFilter(detail.filteringText);
                    setDevicePage(1);
                  }}
                />
              }
              pagination={
                <Pagination
                  currentPageIndex={devicePage}
                  pagesCount={Math.max(1, Math.ceil(filteredDevices.length / itemsPerPage))}
                  onChange={({ detail }) => setDevicePage(detail.currentPageIndex)}
                  ariaLabels={{
                    nextPageLabel: 'Next page',
                    previousPageLabel: 'Previous page',
                    pageLabel: n => `Page ${n}`,
                  }}
                />
              }
              loadingText="Loading devices"
              empty={
                <Box textAlign="center" color="inherit" padding="l">
                  No devices found
                </Box>
              }
            />
          </SpaceBetween>
        </ContentLayout>
      }
    />
  );
}
