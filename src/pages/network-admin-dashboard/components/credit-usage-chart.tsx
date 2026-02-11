// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import BarChart from '@cloudscape-design/components/bar-chart';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import SpaceBetween from '@cloudscape-design/components/space-between';

export function CreditUsageChart() {
  const [data, setData] = useState([
    { x: 'x1', y: 183 },
    { x: 'x2', y: 257 },
    { x: 'x3', y: 213 },
    { x: 'x4', y: 122 },
    { x: 'x5', y: 210 },
  ]);

  const generateRandomData = () => {
    const newData = Array.from({ length: 5 }, (_, i) => ({
      x: `x${i + 1}`,
      y: Math.floor(Math.random() * 250) + 50,
    }));
    setData(newData);
  };

  return (
    <Container
      header={
        <Header
          actions={
            <SpaceBetween size="xs" direction="horizontal">
              <Button onClick={generateRandomData}>Randomize Data</Button>
            </SpaceBetween>
          }
        >
          Credit Usage
        </Header>
      }
    >
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
