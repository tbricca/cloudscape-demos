// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

/**
 * Network Administration Dashboard
 *
 * This component provides a comprehensive dashboard for monitoring and managing network infrastructure.
 * It displays real-time network traffic metrics, credit usage analytics, and device inventory management.
 *
 * Key Features:
 * - Network traffic visualization using area charts for multi-site comparison
 * - Credit usage tracking with bar charts showing performance against goals
 * - Device management table with filtering, sorting, and pagination capabilities
 * - Dismissible warning notifications for system alerts
 * - Responsive grid layout that adapts to different screen sizes
 */

import React, { useState } from 'react';
import { useCollection } from '@cloudscape-design/collection-hooks';

// Core Layout Components
// These components provide the foundational structure for the dashboard page
import AppLayout from '@cloudscape-design/components/app-layout';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Grid from '@cloudscape-design/components/grid';
import SpaceBetween from '@cloudscape-design/components/space-between';

// UI Components
// Interactive elements and containers for content organization
import Button from '@cloudscape-design/components/button';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import Flashbar from '@cloudscape-design/components/flashbar';
import Box from '@cloudscape-design/components/box';

// Data Display Components
// Components for visualizing and managing data
import Table from '@cloudscape-design/components/table';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import TextFilter from '@cloudscape-design/components/text-filter';
import Pagination from '@cloudscape-design/components/pagination';
import Link from '@cloudscape-design/components/link';

// Shared Utilities
// Common chart configurations and formatters used across dashboard widgets
import { commonChartProps, dateFormatter, barChartInstructions } from '../dashboard/widgets/chart-commons';

/**
 * Mock Device Data
 *
 * Simulates a collection of network devices for demonstration purposes.
 * In a production environment, this would be replaced with data from an API endpoint.
 *
 * Each device contains:
 * - id: Unique identifier for the device
 * - name: Human-readable device name
 * - column1-6: Placeholder data representing various device properties
 *              (e.g., IP address, MAC address, status, uptime, etc.)
 */
const MOCK_DEVICES = Array.from({ length: 12 }, (_, i) => ({
  id: `device-${i + 1}`,
  name: `Device ${i + 1}`,
  column1: 'Cell Value',
  column2: 'Cell Value',
  column3: 'Cell Value',
  column4: 'Cell Value',
  column5: 'Cell Value',
  column6: 'Cell Value',
}));

/**
 * Network Traffic Time Series Data
 *
 * Contains historical network traffic measurements across multiple sites.
 * This data powers the area chart visualization showing traffic patterns over time.
 *
 * Data Structure:
 * - x: Time period identifier (x1 through x12 representing daily measurements)
 * - y1: Traffic volume for Site 1 (in arbitrary units)
 * - y2: Traffic volume for Site 2 (in arbitrary units)
 *
 * The data demonstrates typical network traffic patterns with variations
 * that help identify trends, peaks, and potential issues.
 */
const networkTrafficData = [
  { x: 'x1', y1: 120, y2: 100 },
  { x: 'x2', y1: 140, y2: 110 },
  { x: 'x3', y1: 135, y2: 125 },
  { x: 'x4', y1: 145, y2: 135 },
  { x: 'x5', y1: 150, y2: 140 },
  { x: 'x6', y1: 148, y2: 145 },
  { x: 'x7', y1: 155, y2: 148 },
  { x: 'x8', y1: 160, y2: 150 },
  { x: 'x9', y1: 165, y2: 155 },
  { x: 'x10', y1: 170, y2: 160 },
  { x: 'x11', y1: 168, y2: 165 },
  { x: 'x12', y1: 150, y2: 155 },
];

/**
 * Network Traffic Chart Series Configuration
 *
 * Defines the data series displayed in the network traffic area chart.
 * The chart visualizes traffic patterns for multiple sites with a performance threshold.
 *
 * Series Components:
 * 1. Site 1: Area chart showing traffic volume over time for the primary site
 * 2. Site 2: Area chart showing traffic volume for the secondary site
 * 3. Performance Goal: Horizontal threshold line at y=150 indicating target traffic level
 *
 * The area chart type provides visual emphasis on volume and trends, making it easy
 * to identify periods of high/low traffic and compare performance across sites.
 *
 * Users can filter series visibility using the chart's filter dropdown to focus
 * on specific sites or compare them against the performance goal.
 */
const networkTrafficSeries: any[] = [
  {
    title: 'Site 1',
    type: 'area',
    data: networkTrafficData.map((d, i) => ({ x: i + 1, y: d.y1 })),
    valueFormatter: (value: number) => `${value.toFixed(0)}`,
  },
  {
    title: 'Site 2',
    type: 'area',
    data: networkTrafficData.map((d, i) => ({ x: i + 1, y: d.y2 })),
    valueFormatter: (value: number) => `${value.toFixed(0)}`,
  },
  {
    title: 'Performance goal',
    type: 'threshold',
    y: 150,
    valueFormatter: (value: number) => `${value.toFixed(0)}`,
  },
];

/**
 * Credit Usage Time Series Data
 *
 * Tracks credit consumption across different sites over time.
 * This data is used to monitor resource usage and ensure sites stay within allocated limits.
 *
 * Data Structure:
 * - x: Time period identifier (x1 through x5 representing measurement periods)
 * - site1: Credit units consumed by Site 1
 * - site2: Credit units consumed by Site 2
 *
 * Credit tracking helps with:
 * - Budget management and cost optimization
 * - Identifying unusual consumption patterns
 * - Planning for capacity needs
 * - Ensuring compliance with usage quotas
 */
const creditUsageData = [
  { x: 'x1', site1: 425, site2: 380 },
  { x: 'x2', site1: 512, site2: 490 },
  { x: 'x3', site1: 498, site2: 460 },
  { x: 'x4', site1: 330, site2: 350 },
  { x: 'x5', site1: 505, site2: 470 },
];

/**
 * Credit Usage Chart Series Configuration
 *
 * Configures the bar chart that displays credit consumption patterns.
 * Bar charts are ideal for comparing discrete values across categories and time periods.
 *
 * Series Components:
 * 1. Site 1 Bar Series: Shows credit consumption for the primary site
 * 2. Site 2 Bar Series: Shows credit consumption for the secondary site
 * 3. Performance Goal Threshold: Horizontal line at y=450 representing the target/limit
 *
 * The grouped bar layout allows for easy side-by-side comparison between sites
 * for each time period. The threshold line helps quickly identify periods where
 * usage exceeded or approached the performance goal.
 *
 * Features:
 * - Interactive filtering to show/hide individual sites
 * - Value formatters for consistent number display
 * - Categorical x-axis for distinct time periods
 * - Threshold indicator for performance monitoring
 */
const creditUsageSeries: any[] = [
  {
    title: 'Site 1',
    type: 'bar',
    data: creditUsageData.map((d, i) => ({ x: i + 1, y: d.site1 })),
    valueFormatter: (value: number) => `${value.toFixed(0)}`,
  },
  {
    title: 'Site 2',
    type: 'bar',
    data: creditUsageData.map((d, i) => ({ x: i + 1, y: d.site2 })),
    valueFormatter: (value: number) => `${value.toFixed(0)}`,
  },
  {
    title: 'Performance goal',
    type: 'threshold',
    y: 450,
    valueFormatter: (value: number) => `${value.toFixed(0)}`,
  },
];

/**
 * Device Table Column Definitions
 *
 * Defines the structure and behavior of columns in the devices table.
 * Each column specifies how device data should be displayed and sorted.
 *
 * Column Properties:
 * - id: Unique identifier for the column
 * - header: Display text shown in the column header
 * - cell: Function that extracts and formats the cell value from device data
 * - sortingField: Property name used when sorting the table by this column
 *
 * In a production environment, these columns would be configured to display:
 * - Device hostname or identifier
 * - IP address and MAC address
 * - Connection status (online/offline)
 * - Device type (router, switch, workstation, etc.)
 * - Last seen timestamp
 * - Bandwidth usage or other metrics
 * - Actions or configuration options
 *
 * The current implementation uses placeholder "Cell Value" data for demonstration.
 */
const columnDefinitions = [
  {
    id: 'name',
    header: 'Column header',
    cell: (item: any) => item.column1,
    sortingField: 'column1',
  },
  {
    id: 'column2',
    header: 'Column header',
    cell: (item: any) => item.column2,
    sortingField: 'column2',
  },
  {
    id: 'column3',
    header: 'Column header',
    cell: (item: any) => item.column3,
    sortingField: 'column3',
  },
  {
    id: 'column4',
    header: 'Column header',
    cell: (item: any) => item.column4,
    sortingField: 'column4',
  },
  {
    id: 'column5',
    header: 'Column header',
    cell: (item: any) => item.column5,
    sortingField: 'column5',
  },
  {
    id: 'column6',
    header: 'Column header',
    cell: (item: any) => item.column6,
    sortingField: 'column6',
  },
  {
    id: 'column7',
    header: 'Column header',
    cell: (item: any) => item.name,
    sortingField: 'name',
  },
];

/**
 * Main Application Component
 *
 * This is the primary component for the Network Administration Dashboard.
 * It orchestrates the entire page layout including navigation, notifications,
 * charts, and device management table.
 *
 * Component Structure:
 * 1. State Management: Controls visibility of notifications and table interactions
 * 2. Collection Hook: Manages table data with filtering, sorting, and pagination
 * 3. Layout: Uses AppLayout for consistent page structure with breadcrumbs
 * 4. Content Areas:
 *    - Header with page title and refresh action
 *    - Warning notification banner (dismissible)
 *    - Search/filter bar for global filtering
 *    - Side-by-side charts for traffic and credit monitoring
 *    - Device inventory table with full CRUD capabilities
 *
 * @returns {JSX.Element} The complete dashboard interface
 */
export function App() {
  /**
   * Flashbar Visibility State
   *
   * Controls whether the warning notification banner is displayed at the top of the page.
   * Users can dismiss the notification, which sets this to false and hides the banner.
   *
   * Default: true (banner is visible on initial load)
   *
   * This pattern allows for temporary alerts that users can acknowledge and dismiss,
   * improving the user experience by reducing visual clutter once alerts are addressed.
   */
  const [flashbarVisible, setFlashbarVisible] = useState(true);

  /**
   * Table Collection Hook
   *
   * The useCollection hook from Cloudscape provides comprehensive table management:
   *
   * Returned Properties:
   * - items: Filtered and paginated subset of devices to display
   * - actions: Methods to programmatically control table state (setFiltering, etc.)
   * - filteredItemsCount: Number of items matching current filter criteria
   * - collectionProps: Props to spread onto the Table component (selectedItems, etc.)
   * - filterProps: Props for the TextFilter component (filteringText, onChange, etc.)
   * - paginationProps: Props for the Pagination component (currentPageIndex, etc.)
   *
   * Configuration:
   * - filtering: Defines empty states and no-match messaging
   * - pagination: Sets items per page (10 devices)
   * - sorting: Enables column-based sorting
   * - selection: Enables multi-select checkboxes for bulk actions
   *
   * This hook eliminates the need for manual state management of common table features,
   * providing a consistent and accessible user experience out of the box.
   */
  const { items, actions, filteredItemsCount, collectionProps, filterProps, paginationProps } = useCollection(
    MOCK_DEVICES,
    {
      filtering: {
        // Empty state shown when there are no devices in the system
        empty: (
          <Box textAlign="center" color="inherit">
            <b>No devices</b>
            <Box variant="p" color="inherit">
              No devices to display.
            </Box>
          </Box>
        ),
        // No match state shown when filter returns zero results
        noMatch: (
          <Box textAlign="center" color="inherit">
            <b>No matches</b>
            <Box variant="p" color="inherit">
              We can't find a match.
            </Box>
            <Button onClick={() => actions.setFiltering('')}>Clear filter</Button>
          </Box>
        ),
      },
      pagination: { pageSize: 10 }, // Display 10 devices per page
      sorting: {}, // Enable sorting on all sortable columns
      selection: {}, // Enable multi-row selection with checkboxes
    },
  );

  return (
    <AppLayout
      // Hide navigation and tools panels for a focused, full-width dashboard view
      navigationHide
      toolsHide
      /**
       * Breadcrumb Navigation
       *
       * Provides hierarchical navigation showing the user's current location:
       * Service > Administrative Dashboard
       *
       * This helps users understand their context within the application and
       * provides quick navigation back to parent sections.
       */
      breadcrumbs={
        <BreadcrumbGroup
          items={[
            { text: 'Service', href: '#' },
            { text: 'Administrative Dashboard', href: '#' },
          ]}
        />
      }
      /**
       * Notification Banner (Flashbar)
       *
       * Displays important system alerts and warnings at the top of the page.
       * The banner is conditionally rendered based on flashbarVisible state.
       *
       * Features:
       * - Warning type: Uses amber/yellow styling to indicate caution
       * - Dismissible: Users can close the notification via the X button
       * - Persistent: Remains visible across page interactions until dismissed
       *
       * In a production system, this would display real-time alerts such as:
       * - Network outages or degraded performance
       * - Maintenance windows or planned downtime
       * - Security advisories or policy updates
       * - Quota or threshold warnings
       */
      notifications={
        flashbarVisible ? (
          <Flashbar
            items={[
              {
                type: 'warning',
                dismissible: true,
                onDismiss: () => setFlashbarVisible(false),
                content: 'This is a warning message',
              },
            ]}
          />
        ) : null
      }
      /**
       * Main Content Area
       *
       * Contains all dashboard content including header, charts, and device table.
       * Uses ContentLayout for consistent spacing and responsive behavior.
       */
      content={
        <ContentLayout
          /**
           * Page Header
           *
           * Displays the dashboard title, description, and primary actions.
           * The "Refresh Data" button would trigger a reload of all metrics
           * and device information in a production environment.
           */
          header={
            <SpaceBetween size="m">
              <Header
                variant="h1"
                description="Network Traffic, Credit Usage, and Your Devices"
                actions={
                  <Button variant="primary" iconName="external">
                    Refresh Data
                  </Button>
                }
              >
                Network Administration Dashboard
              </Header>
            </SpaceBetween>
          }
        >
          <SpaceBetween size="l">
            {/*
              Global Search/Filter Bar

              Provides a centralized search interface for filtering content across
              the entire dashboard. In a production implementation, this could filter:
              - Device names and identifiers
              - Network traffic by site or time period
              - Credit usage by category

              Currently non-functional as it's a placeholder for demonstration.
            */}
            <TextFilter filteringPlaceholder="Placeholder" filteringText="" onChange={() => {}} />

            {/*
              Analytics Charts Grid

              Two-column grid layout displaying key performance metrics.
              The grid automatically stacks on smaller screens for responsive design.

              Chart 1 (Left): Network Traffic - Area chart showing traffic trends
              Chart 2 (Right): Credit Usage - Bar chart comparing consumption

              Both charts are configured with equal heights and matching filters
              to provide a consistent and balanced visual experience.
            */}
            <Grid gridDefinition={[{ colspan: 6 }, { colspan: 6 }]}>
              {/*
                Network Traffic Visualization

                Area chart displaying network traffic patterns across multiple sites.

                Key Features:
                - Multi-series area chart with Site 1 and Site 2 data
                - Performance goal threshold line for target monitoring
                - Interactive legend for toggling series visibility
                - Filter dropdown to focus on specific sites
                - Hover tooltips showing exact values at each point
                - 12-day time range (x1 through x12)
                - Y-axis range: 0-200 units

                Use Cases:
                - Identifying traffic spikes or unusual patterns
                - Comparing performance across sites
                - Monitoring compliance with performance goals
                - Capacity planning based on traffic trends
              */}
              <Container header={<Header variant="h2">Network traffic</Header>}>
                {/*
                  Area Chart Configuration

                  - series: Array of data series (Site 1, Site 2, Performance goal)
                  - height: Fixed at 300px to match Credit Usage chart
                  - xDomain: Days 1-12 representing the time range
                  - yDomain: 0-200 units for traffic volume scale
                  - hideFilter: false - Shows dropdown filter for series selection
                  - hideLegend: false - Displays legend below chart
                  - Accessibility: Includes aria labels for screen readers
                  - Tooltips: Shows exact values on hover via detailPopoverSeriesContent
                  - i18nStrings: Provides localized strings for UI elements
                */}
                <AreaChart
                  {...commonChartProps}
                  series={networkTrafficSeries}
                  height={300}
                  xDomain={[1, 12]}
                  yDomain={[0, 200]}
                  xTitle="Day"
                  yTitle="y6"
                  hideFilter={false}
                  hideLegend={false}
                  ariaLabel="Network traffic chart"
                  i18nStrings={{
                    ...commonChartProps.i18nStrings,
                    filterLabel: 'Filter displayed sites',
                    filterPlaceholder: 'Filter sites',
                    xTickFormatter: value => `x${value}`,
                  }}
                  detailPopoverSeriesContent={({ series, y }) => ({
                    key: series.title,
                    value: y,
                  })}
                />
              </Container>

              {/*
                Credit Usage Monitoring

                Bar chart displaying credit consumption across sites over time.

                Key Features:
                - Grouped bar chart comparing Site 1 and Site 2 consumption
                - Performance goal threshold at 450 units
                - Interactive filter to show/hide individual sites
                - Categorical x-axis for discrete time periods (x1-x5)
                - Y-axis range: 0-600 units to accommodate peak usage
                - Height matched to Network Traffic chart (300px)

                Use Cases:
                - Budget tracking and cost management
                - Identifying consumption anomalies or spikes
                - Comparing usage patterns between sites
                - Ensuring compliance with allocated quotas
                - Planning for future capacity needs

                The bar chart format makes it easy to compare exact values
                between sites for each time period, unlike area charts which
                emphasize trends and cumulative volume.
              */}
              <Container header={<Header variant="h2">Credit Usage</Header>}>
                {/*
                  Bar Chart Configuration

                  - series: Site 1, Site 2 bar data plus performance threshold
                  - height: 300px (matches Network Traffic chart)
                  - xDomain: Array of 5 time periods for categorical axis
                  - yDomain: 0-600 units to show full range of consumption
                  - xScaleType: 'categorical' for discrete bar groupings
                  - hideFilter: false - Enables series filtering
                  - Accessibility: Includes detailed aria description for screen readers
                  - Navigation: Supports keyboard navigation per barChartInstructions
                */}
                <BarChart
                  {...commonChartProps}
                  series={creditUsageSeries}
                  height={300}
                  xDomain={[1, 2, 3, 4, 5]}
                  yDomain={[0, 600]}
                  xTitle="Day"
                  yTitle="y6"
                  hideFilter={false}
                  hideLegend={false}
                  xScaleType="categorical"
                  ariaLabel="Credit usage chart"
                  ariaDescription={`Bar chart showing credit usage. ${barChartInstructions}`}
                  i18nStrings={{
                    ...commonChartProps.i18nStrings,
                    filterLabel: 'Filter displayed sites',
                    filterPlaceholder: 'Filter sites',
                    xTickFormatter: value => `x${value}`,
                  }}
                  detailPopoverSeriesContent={({ series, y }) => ({
                    key: series.title,
                    value: y,
                  })}
                />
              </Container>
            </Grid>

            {/*
              Device Inventory Management Table

              Comprehensive table for viewing and managing network devices.

              Features:
              - Multi-select: Checkboxes allow bulk selection for batch operations
              - Filtering: Text-based search across device properties
              - Sorting: Click column headers to sort (ascending/descending)
              - Pagination: Navigate through large device lists (10 per page)
              - Empty States: Helpful messaging when no devices or no matches
              - Actions: "Add Device" button for provisioning new devices

              Column Layout:
              - 7 columns displaying various device attributes
              - Sortable by any column
              - Resizable columns for customized views

              Use Cases:
              - Monitor device status and health
              - Search for specific devices by name or properties
              - Select multiple devices for bulk configuration changes
              - Add new devices to the network inventory
              - Export or report on device data

              In production, this table would connect to a device management API
              and display real-time information such as:
              - Hostname, IP address, MAC address
              - Device type (router, switch, access point, etc.)
              - Connection status (online, offline, degraded)
              - Last seen timestamp
              - Firmware version and configuration state
              - Associated site or location
              - Security compliance status
            */}
            <Table
              {...collectionProps}
              columnDefinitions={columnDefinitions}
              items={items}
              selectionType="multi"
              header={
                <Header
                  variant="h2"
                  description="Devices on your local network"
                  actions={
                    <Button variant="primary" iconName="add-plus">
                      Add Device
                    </Button>
                  }
                >
                  My Devices
                </Header>
              }
              filter={
                <TextFilter
                  {...filterProps}
                  filteringPlaceholder="Find devices"
                  countText={`${filteredItemsCount} ${filteredItemsCount === 1 ? 'match' : 'matches'}`}
                />
              }
              pagination={<Pagination {...paginationProps} />}
            />
          </SpaceBetween>
        </ContentLayout>
      }
    />
  );
}
