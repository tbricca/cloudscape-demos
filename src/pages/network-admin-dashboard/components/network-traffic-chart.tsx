// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import AreaChart from '@cloudscape-design/components/area-chart';
import Box from '@cloudscape-design/components/box';

export function NetworkTrafficChart() {
  const series = [
    {
      title: 'Site 1',
      type: 'area' as const,
      data: [
        { x: new Date(2023, 0, 1), y: 3 },
        { x: new Date(2023, 0, 2), y: 3.2 },
        { x: new Date(2023, 0, 3), y: 3.5 },
        { x: new Date(2023, 0, 4), y: 3.8 },
        { x: new Date(2023, 0, 5), y: 4 },
        { x: new Date(2023, 0, 6), y: 4.5 },
        { x: new Date(2023, 0, 7), y: 4.2 },
        { x: new Date(2023, 0, 8), y: 4 },
        { x: new Date(2023, 0, 9), y: 4.3 },
        { x: new Date(2023, 0, 10), y: 5 },
        { x: new Date(2023, 0, 11), y: 4.8 },
        { x: new Date(2023, 0, 12), y: 4.5 },
      ],
      valueFormatter: (value: number) => `${value.toFixed(1)}`,
    },
    {
      title: 'Site 2',
      type: 'area' as const,
      data: [
        { x: new Date(2023, 0, 1), y: 2 },
        { x: new Date(2023, 0, 2), y: 2.5 },
        { x: new Date(2023, 0, 3), y: 2.8 },
        { x: new Date(2023, 0, 4), y: 2.6 },
        { x: new Date(2023, 0, 5), y: 2.9 },
        { x: new Date(2023, 0, 6), y: 3.2 },
        { x: new Date(2023, 0, 7), y: 3.5 },
        { x: new Date(2023, 0, 8), y: 3.8 },
        { x: new Date(2023, 0, 9), y: 3.6 },
        { x: new Date(2023, 0, 10), y: 4.2 },
        { x: new Date(2023, 0, 11), y: 4 },
        { x: new Date(2023, 0, 12), y: 3.8 },
      ],
      valueFormatter: (value: number) => `${value.toFixed(1)}`,
    },
  ];

  return (
    <Container header={<Header variant="h3">Network traffic</Header>} fitHeight>
      <AreaChart
        series={series}
        xDomain={[new Date(2023, 0, 1), new Date(2023, 0, 12)]}
        yDomain={[0, 6]}
        height={300}
        ariaLabel="Network traffic chart"
        xTitle="Day"
        yTitle=""
        i18nStrings={{
          filterLabel: 'Filter displayed data',
          filterPlaceholder: 'Filter data',
          legendAriaLabel: 'Legend',
          chartAriaRoleDescription: 'area chart',
          xTickFormatter: (value: Date | number | string) => {
            const date = value instanceof Date ? value : new Date(value);
            return `x${date.getDate()}`;
          },
          yTickFormatter: (value: number) => `y${value}`,
        }}
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
      <Box margin={{ top: 's' }}>
        <div style={{ display: 'flex', gap: '16px', fontSize: '14px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div
              style={{
                width: '14px',
                height: '14px',
                borderRadius: '2px',
                border: '1px solid #688AE8',
                background: 'rgba(116, 146, 231, 0.40)',
              }}
            />
            <span>Site 1</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div
              style={{
                width: '14px',
                height: '14px',
                borderRadius: '2px',
                border: '1px solid #C33D69',
                background: 'rgba(195, 61, 105, 0.40)',
              }}
            />
            <span>Site 2</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div style={{ display: 'flex', gap: '2px' }}>
              <div style={{ width: '6px', height: '3px', borderRadius: '1px', background: '#5F6B7A' }} />
              <div style={{ width: '6px', height: '3px', borderRadius: '1px', background: '#5F6B7A' }} />
            </div>
            <span>Performance goal</span>
          </div>
        </div>
      </Box>
    </Container>
  );
}
