// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import AreaChart from '@cloudscape-design/components/area-chart';
import Box from '@cloudscape-design/components/box';

export default function NetworkTrafficChart() {
  // Generate slightly randomized data for interactive feel
  const generateData = () => {
    const baseData1 = [120, 135, 142, 155, 148, 165, 178, 185, 192, 205, 198, 182];
    const baseData2 = [90, 98, 105, 118, 112, 125, 138, 145, 152, 165, 158, 142];

    return {
      site1: baseData1.map((val, i) => ({
        x: new Date(2024, 0, i + 1),
        y: val + Math.floor(Math.random() * 10 - 5),
      })),
      site2: baseData2.map((val, i) => ({
        x: new Date(2024, 0, i + 1),
        y: val + Math.floor(Math.random() * 10 - 5),
      })),
    };
  };

  const data = generateData();

  const series = [
    {
      title: 'Site 1',
      type: 'area' as const,
      data: data.site1,
      valueFormatter: (value: number) => `${value} MB`,
    },
    {
      title: 'Site 2',
      type: 'area' as const,
      data: data.site2,
      valueFormatter: (value: number) => `${value} MB`,
    },
  ];

  const performanceGoalSeries = [
    {
      title: 'Performance goal',
      type: 'threshold' as const,
      y: 150,
      valueFormatter: () => 'Performance goal: 150 MB',
    },
  ];

  return (
    <Container
      header={
        <Header variant="h2">
          Network traffic
        </Header>
      }
    >
      <AreaChart
        series={[...series, ...performanceGoalSeries]}
        height={300}
        xScaleType="time"
        yTitle="Traffic"
        xTitle="Day"
        ariaLabel="Network traffic area chart"
        i18nStrings={{
          legendAriaLabel: 'Legend',
          chartAriaRoleDescription: 'area chart',
          xTickFormatter: (value) => {
            const date = new Date(value);
            return `x${date.getDate()}`;
          },
          yTickFormatter: (value) => `y${Math.round(value / 40)}`,
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
