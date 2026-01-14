// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import Table from '@cloudscape-design/components/table';
import Box from '@cloudscape-design/components/box';

interface DevicesTableProps {
  filteringText: string;
}

interface Device {
  id: string;
  col1: string;
  col2: string;
  col3: string;
  col4: string;
  col5: string;
  col6: string;
  col7: string;
}

const generateDevices = (): Device[] => {
  const devices: Device[] = [];
  for (let i = 1; i <= 12; i++) {
    devices.push({
      id: `device-${i}`,
      col1: 'Cell Value',
      col2: 'Cell Value',
      col3: 'Cell Value',
      col4: 'Cell Value',
      col5: 'Cell Value',
      col6: 'Cell Value',
      col7: 'Cell Value',
    });
  }
  return devices;
};

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
      items={filteredDevices}
      loadingText="Loading devices"
      selectionType="multi"
      trackBy="id"
      empty={
        <Box textAlign="center" color="inherit">
          <Box padding={{ bottom: 's' }} variant="p" color="inherit">
            <b>No devices</b>
          </Box>
          <Box variant="p" color="inherit">
            No devices to display.
          </Box>
        </Box>
      }
      selectedItems={selectedItems}
      onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
      ariaLabels={{
        selectionGroupLabel: 'Items selection',
        allItemsSelectionLabel: () => 'select all',
        itemSelectionLabel: (data, row) => `select ${row.id}`,
      }}
      variant="embedded"
    />
  );
}
