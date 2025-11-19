// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import Container from '@cloudscape-design/components/container';
import AreaChart from '@cloudscape-design/components/area-chart';
import Box from '@cloudscape-design/components/box';

export function NetworkTrafficChart() {
  const [data, setData] = useState([
    { x: 'x1', y1: 3, y2: 5 },
    { x: 'x2', y1: 3.2, y2: 5.2 },
    { x: 'x3', y1: 3.5, y2: 5.5 },
    { x: 'x4', y1: 3.8, y2: 5.8 },
    { x: 'x5', y1: 4, y2: 6 },
    { x: 'x6', y1: 4.5, y2: 6.5 },
    { x: 'x7', y1: 5, y2: 7 },
    { x: 'x8', y1: 4.8, y2: 6.8 },
    { x: 'x9', y1: 4.5, y2: 6.5 },
    { x: 'x10', y1: 4, y2: 6 },
    { x: 'x11', y1: 3.5, y2: 5.5 },
    { x: 'x12', y1: 3.8, y2: 5.8 },
  ]);

  return (
    <Container>
      <AreaChart
        series={[
          {
            title: 'Site 1',
            type: 'area',
            data: data.map(d => ({ x: d.x, y: d.y1 })),
            color: '#688AE8',
          },
          {
            title: 'Site 2',
            type: 'area',
            data: data.map(d => ({ x: d.x, y: d.y2 })),
            color: '#C33D69',
          },
          {
            title: 'Performance goal',
            type: 'threshold',
            y: 3,
            color: '#5F6B7A',
          },
        ]}
        xDomain={data.map(d => d.x)}
        yDomain={[0, 8]}
        height={300}
        xTitle="Day"
        yTitle="Network traffic"
        ariaLabel="Network traffic area chart"
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
