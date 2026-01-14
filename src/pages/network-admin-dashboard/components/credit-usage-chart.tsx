// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import BarChart from '@cloudscape-design/components/bar-chart';
import Box from '@cloudscape-design/components/box';

export function CreditUsageChart() {
  const series = [
    {
      title: 'Site 1',
      type: 'bar' as const,
      data: [
        { x: 'x1', y: 183 },
        { x: 'x2', y: 257 },
        { x: 'x3', y: 213 },
        { x: 'x4', y: 122 },
        { x: 'x5', y: 210 },
      ],
      valueFormatter: (value: number) => `${value}`,
    },
  ];

  return (
    <Container
      header={<Header variant="h3">Credit Usage</Header>}
      fitHeight
    >
      <BarChart
        series={series}
        xDomain={['x1', 'x2', 'x3', 'x4', 'x5']}
        yDomain={[0, 300]}
        height={300}
        ariaLabel="Credit usage chart"
        xTitle="Day"
        yTitle=""
        i18nStrings={{
          filterLabel: 'Filter displayed data',
          filterPlaceholder: 'Filter data',
          legendAriaLabel: 'Legend',
          chartAriaRoleDescription: 'bar chart',
          xTickFormatter: (value: string) => value,
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
                background: '#688AE8',
              }}
            />
            <span>Site 1</span>
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
