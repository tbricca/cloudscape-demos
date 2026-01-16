// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import Container from '@cloudscape-design/components/container';
import BarChart from '@cloudscape-design/components/bar-chart';
import Box from '@cloudscape-design/components/box';

export function CreditUsageChart() {
  return (
    <Container>
      <BarChart
        series={[
          {
            title: 'Site 1',
            type: 'bar',
            data: [
              { x: 'x1', y: 183 },
              { x: 'x2', y: 257 },
              { x: 'x3', y: 213 },
              { x: 'x4', y: 122 },
              { x: 'x5', y: 210 },
            ],
            valueFormatter: value => `${value}`,
          },
        ]}
        xDomain={['x1', 'x2', 'x3', 'x4', 'x5']}
        yDomain={[0, 300]}
        i18nStrings={{
          filterLabel: 'Filter displayed data',
          filterPlaceholder: 'Filter data',
          filterSelectedAriaLabel: 'selected',
          detailPopoverDismissAriaLabel: 'Dismiss',
          legendAriaLabel: 'Legend',
          chartAriaRoleDescription: 'bar chart',
          xTickFormatter: value => value,
          yTickFormatter: value => `y${value}`,
        }}
        ariaLabel="Credit usage bar chart"
        height={300}
        xScaleType="categorical"
        xTitle="Day"
        yTitle="Credit Usage"
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
        hideFilter
      />
    </Container>
  );
}
