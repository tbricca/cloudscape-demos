// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import Container from '@cloudscape-design/components/container';
import BarChart from '@cloudscape-design/components/bar-chart';
import Box from '@cloudscape-design/components/box';

export function CreditUsageChart() {
  const [data, setData] = useState([
    { x: 'x1', y: 183 },
    { x: 'x2', y: 257 },
    { x: 'x3', y: 213 },
    { x: 'x4', y: 122 },
    { x: 'x5', y: 210 },
  ]);

  return (
    <Container>
      <BarChart
        series={[
          {
            title: 'Site 1',
            type: 'bar',
            data: data.map(d => ({ x: d.x, y: d.y })),
            color: '#688AE8',
          },
        ]}
        xDomain={data.map(d => d.x)}
        yDomain={[0, 300]}
        height={300}
        xTitle="Day"
        yTitle="Credit Usage"
        ariaLabel="Credit usage bar chart"
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
