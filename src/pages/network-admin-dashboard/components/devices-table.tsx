// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import Table from '@cloudscape-design/components/table';
import Box from '@cloudscape-design/components/box';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Button from '@cloudscape-design/components/button';
import Header from '@cloudscape-design/components/header';

interface Device {
  id: string;
  column1: string;
  column2: string;
  column3: string;
  column4: string;
  column5: string;
  column6: string;
  column7: string;
}

const generateDevices = (): Device[] => {
  const devices: Device[] = [];
  for (let i = 1; i <= 12; i++) {
    devices.push({
      id: `device-${i}`,
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

interface DevicesTableProps {
  filteringText: string;
}

export function DevicesTable({ filteringText }: DevicesTableProps) {
  const [selectedItems, setSelectedItems] = useState<Device[]>([]);
  const allDevices = generateDevices();

  const filteredDevices = allDevices.filter(device =>
    Object.values(device).some(value => value.toLowerCase().includes(filteringText.toLowerCase())),
  );

  return (
    <Table
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
      items={filteredDevices}
      loadingText="Loading devices"
      selectionType="multi"
      trackBy="id"
      empty={
        <Box textAlign="center" color="inherit">
          <Box padding={{ bottom: 's' }} variant="p" color="inherit">
            <b>No devices</b>
          </Box>
          <Button>Add device</Button>
        </Box>
      }
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
      selectedItems={selectedItems}
      onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
    />
  );
}
