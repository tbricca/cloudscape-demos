// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import Table from '@cloudscape-design/components/table';
import Box from '@cloudscape-design/components/box';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Button from '@cloudscape-design/components/button';
import Header from '@cloudscape-design/components/header';
import Pagination from '@cloudscape-design/components/pagination';
import TextFilter from '@cloudscape-design/components/text-filter';
import CollectionPreferences from '@cloudscape-design/components/collection-preferences';

interface Device {
  id: string;
  name: string;
  ipAddress: string;
  status: string;
  type: string;
  location: string;
  lastSeen: string;
}

const generateDevices = (): Device[] => {
  const types = ['Router', 'Switch', 'Firewall', 'Access Point', 'Server'];
  const statuses = ['Active', 'Inactive', 'Maintenance'];
  const locations = ['Building A', 'Building B', 'Data Center', 'Remote Office'];

  return Array.from({ length: 50 }, (_, i) => ({
    id: `device-${i + 1}`,
    name: `Device ${i + 1}`,
    ipAddress: `192.168.${Math.floor(i / 255)}.${i % 255}`,
    status: statuses[i % statuses.length],
    type: types[i % types.length],
    location: locations[i % locations.length],
    lastSeen: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleString(),
  }));
};

export default function DevicesTable() {
  const [selectedItems, setSelectedItems] = useState<Device[]>([]);
  const [filteringText, setFilteringText] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortingColumn, setSortingColumn] = useState<any>({ sortingField: 'name' });
  const [isDescending, setIsDescending] = useState(false);

  const allDevices = generateDevices();
  const filteredDevices = allDevices.filter(
    (device) =>
      device.name.toLowerCase().includes(filteringText.toLowerCase()) ||
      device.ipAddress.includes(filteringText) ||
      device.status.toLowerCase().includes(filteringText.toLowerCase()) ||
      device.type.toLowerCase().includes(filteringText.toLowerCase())
  );

  // Sort devices based on sorting column
  const sortedDevices = [...filteredDevices].sort((a, b) => {
    const field = sortingColumn.sortingField as keyof Device;
    if (!field) return 0;

    const aValue = a[field];
    const bValue = b[field];

    if (aValue < bValue) return isDescending ? 1 : -1;
    if (aValue > bValue) return isDescending ? -1 : 1;
    return 0;
  });

  const paginatedDevices = sortedDevices.slice(
    (currentPageIndex - 1) * pageSize,
    currentPageIndex * pageSize
  );

  const columnDefinitions = [
    {
      id: 'name',
      header: 'Device Name',
      cell: (item: Device) => item.name,
      sortingField: 'name',
      isRowHeader: true,
    },
    {
      id: 'ipAddress',
      header: 'IP Address',
      cell: (item: Device) => item.ipAddress,
      sortingField: 'ipAddress',
    },
    {
      id: 'status',
      header: 'Status',
      cell: (item: Device) => item.status,
      sortingField: 'status',
    },
    {
      id: 'type',
      header: 'Type',
      cell: (item: Device) => item.type,
      sortingField: 'type',
    },
    {
      id: 'location',
      header: 'Location',
      cell: (item: Device) => item.location,
      sortingField: 'location',
    },
    {
      id: 'lastSeen',
      header: 'Last Seen',
      cell: (item: Device) => item.lastSeen,
      sortingField: 'lastSeen',
    },
  ];

  return (
    <Table
      columnDefinitions={columnDefinitions}
      items={paginatedDevices}
      loadingText="Loading devices"
      selectionType="multi"
      trackBy="id"
      selectedItems={selectedItems}
      onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
      sortingColumn={sortingColumn}
      sortingDescending={isDescending}
      onSortingChange={({ detail }) => {
        setSortingColumn(detail.sortingColumn);
        setIsDescending(detail.isDescending || false);
      }}
      empty={
        <Box textAlign="center" color="inherit">
          <Box padding={{ bottom: 's' }} variant="p" color="inherit">
            <b>No devices</b>
          </Box>
          <Button>Add Device</Button>
        </Box>
      }
      filter={
        <TextFilter
          filteringText={filteringText}
          filteringPlaceholder="Search devices"
          filteringAriaLabel="Filter devices"
          onChange={({ detail }) => {
            setFilteringText(detail.filteringText);
            setCurrentPageIndex(1);
          }}
        />
      }
      header={
        <Header
          counter={selectedItems.length > 0 ? `(${selectedItems.length}/${filteredDevices.length})` : `(${filteredDevices.length})`}
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
      pagination={
        <Pagination
          currentPageIndex={currentPageIndex}
          onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
          pagesCount={Math.ceil(filteredDevices.length / pageSize)}
          ariaLabels={{
            nextPageLabel: 'Next page',
            previousPageLabel: 'Previous page',
            pageLabel: (pageNumber) => `Page ${pageNumber} of all pages`,
          }}
        />
      }
      preferences={
        <CollectionPreferences
          title="Preferences"
          confirmLabel="Confirm"
          cancelLabel="Cancel"
          preferences={{
            pageSize: pageSize,
          }}
          pageSizePreference={{
            title: 'Page size',
            options: [
              { value: 10, label: '10 devices' },
              { value: 20, label: '20 devices' },
              { value: 50, label: '50 devices' },
            ],
          }}
          onConfirm={({ detail }) => {
            setPageSize(detail.pageSize || 10);
            setCurrentPageIndex(1);
          }}
        />
      }
    />
  );
}
