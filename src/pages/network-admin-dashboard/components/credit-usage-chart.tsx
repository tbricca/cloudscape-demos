// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import BarChart from '@cloudscape-design/components/bar-chart';
import Box from '@cloudscape-design/components/box';

export default function CreditUsageChart() {
  // Generate slightly randomized data for interactive feel
  const generateData = () => {
    const baseData = [45, 63, 52, 30, 51];
    return baseData.map((val, i) => ({
      x: `x${i + 1}`,
      y: val + Math.floor(Math.random() * 10 - 5),
    }));
  };

  const series = [
    {
      title: 'Site 1',
      type: 'bar' as const,
      data: generateData(),
      valueFormatter: (value: number) => `${value} credits`,
    },
  ];

  return (
    <Container
      header={
        <Header variant="h2">
          Credit Usage
        </Header>
      }
    >
      <BarChart
        series={series}
        height={300}
        xScaleType="categorical"
        yTitle="Credits"
        xTitle="Day"
        ariaLabel="Credit usage bar chart"
        i18nStrings={{
          legendAriaLabel: 'Legend',
          chartAriaRoleDescription: 'bar chart',
          yTickFormatter: (value) => `y${Math.round(value / 12)}`,
        }}
        hideFilter
        statusType="finished"
      />
      <Box textAlign="center" margin={{ top: 's' }}>
        <Box variant="small" color="text-label">
          Day
        </Box>
      </Box>
    </Container>
  );
}
