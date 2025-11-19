# Network Administration Dashboard

An interactive and fully editable dashboard for monitoring network traffic, credit usage, and managing devices.

## Features

### 1. **Network Traffic Chart (Area Chart)**
- Displays two data series: Site 1 and Site 2
- Shows performance goal threshold line
- **Editable**: Click "Randomize Data" button to generate new random data
- Responsive and interactive visualization

### 2. **Credit Usage Chart (Bar Chart)**
- Displays credit usage across 5 time periods
- **Editable**: Click "Randomize Data" button to generate new random data
- Visual representation with blue bars

### 3. **My Devices Table**
- Displays device information in a multi-column table
- **Fully Editable**:
  - Click on any cell to edit its value
  - Press Enter to save changes
  - Press Escape to cancel editing
  - Select multiple rows using checkboxes
  - Add new devices using "Add Device" button
  - Remove selected devices using "Remove" button
- Features:
  - Multi-select capability
  - Sortable columns
  - Search/filter functionality
  - Pagination support
  - Settings button for additional options

### 4. **Dashboard Controls**
- Breadcrumb navigation (Service > Administrative Dashboard)
- Warning message banner (dismissible)
- "Refresh Data" button in the main header
- Filter/search input for the devices table
- Pagination controls (5 pages)

## Component Structure

```
network-admin-dashboard/
├── app.tsx                              # Main dashboard layout
├── index.tsx                            # Entry point
├── root.tsx                             # Root component wrapper
└── components/
    ├── network-traffic-chart.tsx        # Area chart for network traffic
    ├── credit-usage-chart.tsx           # Bar chart for credit usage
    └── devices-table.tsx                # Editable devices data table
```

## Usage

The dashboard is accessible at `/network-admin-dashboard` route and is listed in the Dashboards category on the main index page.

### Making the Dashboard Your Own

1. **Customize Chart Data**: Modify the initial data in `network-traffic-chart.tsx` and `credit-usage-chart.tsx`
2. **Add Table Columns**: Update the column definitions in `devices-table.tsx`
3. **Modify Table Data**: Change the initial device data in `devices-table.tsx`
4. **Add More Features**: The dashboard is built with Cloudscape components, making it easy to extend

## Technologies Used

- **React** with TypeScript
- **Cloudscape Design System** components
- **State Management**: React useState hooks
- **Responsive Design**: Cloudscape Grid system

## Editable Features Summary

✅ Click cells in the table to edit  
✅ Add new devices to the table  
✅ Remove selected devices  
✅ Randomize chart data with buttons  
✅ Filter devices with search  
✅ Dismiss warning banner  
✅ Sort table columns  
✅ Multi-select table rows  

The dashboard provides a complete example of an interactive, data-driven admin interface using AWS Cloudscape Design System components.
