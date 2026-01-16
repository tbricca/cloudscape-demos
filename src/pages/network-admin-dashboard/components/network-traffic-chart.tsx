// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import Container from '@cloudscape-design/components/container';
import AreaChart from '@cloudscape-design/components/area-chart';
import Box from '@cloudscape-design/components/box';

export function NetworkTrafficChart() {
  return (
    <Container>
      <AreaChart
        series={[
          {
            title: 'Site 1',
            type: 'area',
            data: [
              { x: 'x1', y: 3 },
              { x: 'x2', y: 3.2 },
              { x: 'x3', y: 3.5 },
              { x: 'x4', y: 3.8 },
              { x: 'x5', y: 4.2 },
              { x: 'x6', y: 4.8 },
              { x: 'x7', y: 5.2 },
              { x: 'x8', y: 5 },
              { x: 'x9', y: 5.3 },
              { x: 'x10', y: 5.5 },
              { x: 'x11', y: 5.2 },
              { x: 'x12', y: 4.8 },
            ],
            valueFormatter: value => `${value}`,
          },
          {
            title: 'Site 2',
            type: 'area',
            data: [
              { x: 'x1', y: 2.5 },
              { x: 'x2', y: 2.8 },
              { x: 'x3', y: 2.6 },
              { x: 'x4', y: 2.9 },
              { x: 'x5', y: 3.2 },
              { x: 'x6', y: 3.5 },
              { x: 'x7', y: 2.8 },
              { x: 'x8', y: 2.2 },
              { x: 'x9', y: 2.5 },
              { x: 'x10', y: 1.8 },
              { x: 'x11', y: 1.5 },
              { x: 'x12', y: 2.2 },
            ],
            valueFormatter: value => `${value}`,
          },
        ]}
        xDomain={['x1', 'x2', 'x3', 'x4', 'x5', 'x6', 'x7', 'x8', 'x9', 'x10', 'x11', 'x12']}
        yDomain={[0, 6]}
        i18nStrings={{
          filterLabel: 'Filter displayed data',
          filterPlaceholder: 'Filter data',
          filterSelectedAriaLabel: 'selected',
          detailPopoverDismissAriaLabel: 'Dismiss',
          legendAriaLabel: 'Legend',
          chartAriaRoleDescription: 'area chart',
          xTickFormatter: value => value,
          yTickFormatter: value => `y${value}`,
        }}
        ariaLabel="Network traffic area chart"
        height={300}
        xScaleType="categorical"
        xTitle="Day"
        yTitle="Network traffic"
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
    </Container>
  );
}
