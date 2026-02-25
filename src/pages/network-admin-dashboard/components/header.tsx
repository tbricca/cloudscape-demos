// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import Button from '@cloudscape-design/components/button';
import Header from '@cloudscape-design/components/header';
import Pagination from '@cloudscape-design/components/pagination';
import SpaceBetween from '@cloudscape-design/components/space-between';
import TextFilter from '@cloudscape-design/components/text-filter';

import styles from './header.module.scss';

export function NetworkAdminHeader() {
  const [filterText, setFilterText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <SpaceBetween size="m">
      <Header
        variant="h1"
        description="Network Traffic, Credit Usage, and Your Devices"
        actions={
          <Button variant="primary" iconName="external" iconAlign="right">
            Refresh Data
          </Button>
        }
      >
        Network Adminstration Dashboard
      </Header>
      <div className={styles['search-pagination-row']}>
        <div className={styles['search-input']}>
          <TextFilter
            filteringText={filterText}
            filteringPlaceholder="Placeholder"
            filteringAriaLabel="Filter resources"
            onChange={({ detail }) => setFilterText(detail.filteringText)}
          />
        </div>
        <Pagination
          currentPageIndex={currentPage}
          pagesCount={5}
          onChange={({ detail }) => setCurrentPage(detail.currentPageIndex)}
          ariaLabels={{
            nextPageLabel: 'Next page',
            previousPageLabel: 'Previous page',
            pageLabel: n => `Page ${n}`,
          }}
        />
      </div>
    </SpaceBetween>
  );
}
