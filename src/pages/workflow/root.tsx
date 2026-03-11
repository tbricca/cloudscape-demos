// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, { useState } from 'react';
import AppLayout from '@cloudscape-design/components/app-layout';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Tabs from '@cloudscape-design/components/tabs';
import { SubmitRequest } from './submit-request';
import { Approvals } from './approvals';

export default function WorkflowApp() {
  const [activeTabId, setActiveTabId] = useState('submit');

  const handleSubmitSuccess = () => {
    // Switch to approvals tab after successful submission
    setActiveTabId('approvals');
  };

  return (
    <AppLayout
      navigationHide
      toolsHide
      content={
        <ContentLayout
          header={
            <Header
              variant="h1"
              description="Submit requests and manage approvals for your workflow processes"
            >
              Workflow Management
            </Header>
          }
        >
          <SpaceBetween size="l">
            <Tabs
              activeTabId={activeTabId}
              onChange={({ detail }) => setActiveTabId(detail.activeTabId)}
              tabs={[
                {
                  id: 'submit',
                  label: 'Submit Request',
                  content: <SubmitRequest onSubmitSuccess={handleSubmitSuccess} />,
                },
                {
                  id: 'approvals',
                  label: 'Approvals',
                  content: <Approvals />,
                },
              ]}
            />
          </SpaceBetween>
        </ContentLayout>
      }
    />
  );
}
