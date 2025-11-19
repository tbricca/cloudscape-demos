// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import Table from '@cloudscape-design/components/table';
import Box from '@cloudscape-design/components/box';
import Input from '@cloudscape-design/components/input';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import Button from '@cloudscape-design/components/button';
import SpaceBetween from '@cloudscape-design/components/space-between';
import TextFilter from '@cloudscape-design/components/text-filter';
import Pagination from '@cloudscape-design/components/pagination';
import { TableProps } from '@cloudscape-design/components/table';

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

interface DevicesTableProps {
  filteringText: string;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export function DevicesTable({ filteringText, currentPage, onPageChange }: DevicesTableProps) {
  const [selectedItems, setSelectedItems] = useState<Device[]>([]);
  const [items, setItems] = useState<Device[]>([
    { id: '1', column1: 'Cell Value', column2: 'Cell Value', column3: 'Cell Value', column4: 'Cell Value', column5: 'Cell Value', column6: 'Cell Value', column7: 'Cell Value' },
    { id: '2', column1: 'Cell Value', column2: 'Cell Value', column3: 'Cell Value', column4: 'Cell Value', column5: 'Cell Value', column6: 'Cell Value', column7: 'Cell Value' },
    { id: '3', column1: 'Cell Value', column2: 'Cell Value', column3: 'Cell Value', column4: 'Cell Value', column5: 'Cell Value', column6: 'Cell Value', column7: 'Cell Value' },
    { id: '4', column1: 'Cell Value', column2: 'Cell Value', column3: 'Cell Value', column4: 'Cell Value', column5: 'Cell Value', column6: 'Cell Value', column7: 'Cell Value' },
    { id: '5', column1: 'Cell Value', column2: 'Cell Value', column3: 'Cell Value', column4: 'Cell Value', column5: 'Cell Value', column6: 'Cell Value', column7: 'Cell Value' },
    { id: '6', column1: 'Cell Value', column2: 'Cell Value', column3: 'Cell Value', column4: 'Cell Value', column5: 'Cell Value', column6: 'Cell Value', column7: 'Cell Value' },
    { id: '7', column1: 'Cell Value', column2: 'Cell Value', column3: 'Cell Value', column4: 'Cell Value', column5: 'Cell Value', column6: 'Cell Value', column7: 'Cell Value' },
    { id: '8', column1: 'Cell Value', column2: 'Cell Value', column3: 'Cell Value', column4: 'Cell Value', column5: 'Cell Value', column6: 'Cell Value', column7: 'Cell Value' },
    { id: '9', column1: 'Cell Value', column2: 'Cell Value', column3: 'Cell Value', column4: 'Cell Value', column5: 'Cell Value', column6: 'Cell Value', column7: 'Cell Value' },
    { id: '10', column1: 'Cell Value', column2: 'Cell Value', column3: 'Cell Value', column4: 'Cell Value', column5: 'Cell Value', column6: 'Cell Value', column7: 'Cell Value' },
    { id: '11', column1: 'Cell Value', column2: 'Cell Value', column3: 'Cell Value', column4: 'Cell Value', column5: 'Cell Value', column6: 'Cell Value', column7: 'Cell Value' },
    { id: '12', column1: 'Cell Value', column2: 'Cell Value', column3: 'Cell Value', column4: 'Cell Value', column5: 'Cell Value', column6: 'Cell Value', column7: 'Cell Value' },
  ]);

  const [editingCell, setEditingCell] = useState<{ rowId: string; columnId: string } | null>(null);
  const [editValue, setEditValue] = useState('');

  const addDevice = () => {
    const newId = (items.length + 1).toString();
    setItems([
      ...items,
      {
        id: newId,
        column1: 'New Device',
        column2: 'Cell Value',
        column3: 'Cell Value',
        column4: 'Cell Value',
        column5: 'Cell Value',
        column6: 'Cell Value',
        column7: 'Cell Value',
      },
    ]);
  };

  const removeDevices = () => {
    setItems(items.filter(item => !selectedItems.includes(item)));
    setSelectedItems([]);
  };

  const handleCellEdit = (rowId: string, columnId: string, currentValue: string) => {
    setEditingCell({ rowId, columnId });
    setEditValue(currentValue);
  };

  const handleCellSave = () => {
    if (editingCell) {
      setItems(prevItems =>
        prevItems.map(item =>
          item.id === editingCell.rowId
            ? { ...item, [editingCell.columnId]: editValue }
            : item
        )
      );
      setEditingCell(null);
      setEditValue('');
    }
  };

  const handleCellCancel = () => {
    setEditingCell(null);
    setEditValue('');
  };

  const filteredItems = items.filter(item =>
    Object.values(item).some(value =>
      value.toLowerCase().includes(filteringText.toLowerCase())
    )
  );

  const columnDefinitions: TableProps.ColumnDefinition<Device>[] = [
    {
      id: 'column1',
      header: 'Column header',
      cell: item => {
        if (editingCell?.rowId === item.id && editingCell?.columnId === 'column1') {
          return (
            <div style={{ display: 'flex', gap: '4px' }}>
              <Input
                value={editValue}
                onChange={({ detail }) => setEditValue(detail.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') handleCellSave();
                  if (e.key === 'Escape') handleCellCancel();
                }}
                autoFocus
              />
            </div>
          );
        }
        return (
          <div onClick={() => handleCellEdit(item.id, 'column1', item.column1)} style={{ cursor: 'pointer' }}>
            {item.column1}
          </div>
        );
      },
      sortingField: 'column1',
    },
    {
      id: 'column2',
      header: 'Column header',
      cell: item => {
        if (editingCell?.rowId === item.id && editingCell?.columnId === 'column2') {
          return (
            <Input
              value={editValue}
              onChange={({ detail }) => setEditValue(detail.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') handleCellSave();
                if (e.key === 'Escape') handleCellCancel();
              }}
              autoFocus
            />
          );
        }
        return (
          <div onClick={() => handleCellEdit(item.id, 'column2', item.column2)} style={{ cursor: 'pointer' }}>
            {item.column2}
          </div>
        );
      },
      sortingField: 'column2',
    },
    {
      id: 'column3',
      header: 'Column header',
      cell: item => {
        if (editingCell?.rowId === item.id && editingCell?.columnId === 'column3') {
          return (
            <Input
              value={editValue}
              onChange={({ detail }) => setEditValue(detail.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') handleCellSave();
                if (e.key === 'Escape') handleCellCancel();
              }}
              autoFocus
            />
          );
        }
        return (
          <div onClick={() => handleCellEdit(item.id, 'column3', item.column3)} style={{ cursor: 'pointer' }}>
            {item.column3}
          </div>
        );
      },
      sortingField: 'column3',
    },
    {
      id: 'column4',
      header: 'Column header',
      cell: item => {
        if (editingCell?.rowId === item.id && editingCell?.columnId === 'column4') {
          return (
            <Input
              value={editValue}
              onChange={({ detail }) => setEditValue(detail.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') handleCellSave();
                if (e.key === 'Escape') handleCellCancel();
              }}
              autoFocus
            />
          );
        }
        return (
          <div onClick={() => handleCellEdit(item.id, 'column4', item.column4)} style={{ cursor: 'pointer' }}>
            {item.column4}
          </div>
        );
      },
      sortingField: 'column4',
    },
    {
      id: 'column5',
      header: 'Column header',
      cell: item => {
        if (editingCell?.rowId === item.id && editingCell?.columnId === 'column5') {
          return (
            <Input
              value={editValue}
              onChange={({ detail }) => setEditValue(detail.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') handleCellSave();
                if (e.key === 'Escape') handleCellCancel();
              }}
              autoFocus
            />
          );
        }
        return (
          <div onClick={() => handleCellEdit(item.id, 'column5', item.column5)} style={{ cursor: 'pointer' }}>
            {item.column5}
          </div>
        );
      },
      sortingField: 'column5',
    },
    {
      id: 'column6',
      header: 'Column header',
      cell: item => {
        if (editingCell?.rowId === item.id && editingCell?.columnId === 'column6') {
          return (
            <Input
              value={editValue}
              onChange={({ detail }) => setEditValue(detail.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') handleCellSave();
                if (e.key === 'Escape') handleCellCancel();
              }}
              autoFocus
            />
          );
        }
        return (
          <div onClick={() => handleCellEdit(item.id, 'column6', item.column6)} style={{ cursor: 'pointer' }}>
            {item.column6}
          </div>
        );
      },
      sortingField: 'column6',
    },
    {
      id: 'column7',
      header: 'Column header',
      cell: item => {
        if (editingCell?.rowId === item.id && editingCell?.columnId === 'column7') {
          return (
            <Input
              value={editValue}
              onChange={({ detail }) => setEditValue(detail.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') handleCellSave();
                if (e.key === 'Escape') handleCellCancel();
              }}
              autoFocus
            />
          );
        }
        return (
          <div onClick={() => handleCellEdit(item.id, 'column7', item.column7)} style={{ cursor: 'pointer' }}>
            {item.column7}
          </div>
        );
      },
      sortingField: 'column7',
    },
  ];

  return (
    <Container
      header={
        <Header
          variant="h2"
          description="Devices on your local network"
          counter={`(${filteredItems.length})`}
          actions={
            <SpaceBetween size="xs" direction="horizontal">
              <Button disabled={selectedItems.length === 0} onClick={removeDevices}>
                Remove
              </Button>
              <Button variant="primary" iconName="external" onClick={addDevice}>
                Add Device
              </Button>
            </SpaceBetween>
          }
        >
          My Devices
        </Header>
      }
    >
      <SpaceBetween size="m">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <TextFilter filteringText="" filteringPlaceholder="Placeholder" onChange={() => {}} />
          </Box>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <Pagination
              currentPageIndex={currentPage}
              onChange={({ detail }) => onPageChange(detail.currentPageIndex)}
              pagesCount={5}
            />
            <div
              style={{
                width: '2px',
                height: '32px',
                background: 'var(--color-border-divider-default)',
              }}
            />
            <Button variant="icon" iconName="settings" />
          </div>
        </div>
        <Table
          columnDefinitions={columnDefinitions}
          items={filteredItems}
          selectionType="multi"
          selectedItems={selectedItems}
          onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
          sortingDisabled={false}
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
    </Container>
  );
}
