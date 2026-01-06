// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import AreaChart from '@cloudscape-design/components/area-chart';
import Box from '@cloudscape-design/components/box';

export default function NetworkTrafficChart() {
  const series = [
    {
      title: 'Site 1',
      type: 'area' as const,
      data: [
        { x: new Date(2024, 0, 1), y: 120 },
        { x: new Date(2024, 0, 2), y: 135 },
        { x: new Date(2024, 0, 3), y: 142 },
        { x: new Date(2024, 0, 4), y: 155 },
        { x: new Date(2024, 0, 5), y: 148 },
        { x: new Date(2024, 0, 6), y: 165 },
        { x: new Date(2024, 0, 7), y: 178 },
        { x: new Date(2024, 0, 8), y: 185 },
        { x: new Date(2024, 0, 9), y: 192 },
        { x: new Date(2024, 0, 10), y: 205 },
        { x: new Date(2024, 0, 11), y: 198 },
        { x: new Date(2024, 0, 12), y: 182 },
      ],
      valueFormatter: (value: number) => `${value} MB`,
    },
    {
      title: 'Site 2',
      type: 'area' as const,
      data: [
        { x: new Date(2024, 0, 1), y: 90 },
        { x: new Date(2024, 0, 2), y: 98 },
        { x: new Date(2024, 0, 3), y: 105 },
        { x: new Date(2024, 0, 4), y: 118 },
        { x: new Date(2024, 0, 5), y: 112 },
        { x: new Date(2024, 0, 6), y: 125 },
        { x: new Date(2024, 0, 7), y: 138 },
        { x: new Date(2024, 0, 8), y: 145 },
        { x: new Date(2024, 0, 9), y: 152 },
        { x: new Date(2024, 0, 10), y: 165 },
        { x: new Date(2024, 0, 11), y: 158 },
        { x: new Date(2024, 0, 12), y: 142 },
      ],
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
