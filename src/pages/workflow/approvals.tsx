// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, { useState, useEffect } from 'react';
import {
  Table,
  Box,
  SpaceBetween,
  Button,
  Header,
  Badge,
  Modal,
  Textarea,
  FormField,
  Alert,
  StatusIndicator,
} from '@cloudscape-design/components';
import { format } from 'date-fns';

interface WorkflowRequest {
  id: string;
  title: string;
  description: string;
  requestType: string;
  requestTypeLabel: string;
  priority: string;
  priorityLabel: string;
  department: string;
  estimatedBudget: string;
  justification: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  submittedBy: string;
  reviewedAt?: string;
  reviewedBy?: string;
  reviewNotes?: string;
}

export function Approvals() {
  const [requests, setRequests] = useState<WorkflowRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<WorkflowRequest | null>(null);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [reviewNotes, setReviewNotes] = useState('');
  const [actionSuccess, setActionSuccess] = useState<string>('');

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = () => {
    try {
      const storedRequests = JSON.parse(localStorage.getItem('workflowRequests') || '[]');
      setRequests(storedRequests);
    } catch (error) {
      console.error('Failed to load requests:', error);
    }
  };

  const handleApprove = () => {
    if (!selectedRequest) return;

    try {
      const updatedRequests = requests.map(req =>
        req.id === selectedRequest.id
          ? {
              ...req,
              status: 'approved' as const,
              reviewedAt: new Date().toISOString(),
              reviewedBy: 'Approver', // In a real app, this would be the logged-in user
              reviewNotes,
            }
          : req,
      );

      localStorage.setItem('workflowRequests', JSON.stringify(updatedRequests));
      setRequests(updatedRequests);
      setShowApprovalModal(false);
      setSelectedRequest(null);
      setReviewNotes('');
      setActionSuccess('Request approved successfully');
      setTimeout(() => setActionSuccess(''), 3000);
    } catch (error) {
      console.error('Failed to approve request:', error);
    }
  };

  const handleReject = () => {
    if (!selectedRequest) return;

    try {
      const updatedRequests = requests.map(req =>
        req.id === selectedRequest.id
          ? {
              ...req,
              status: 'rejected' as const,
              reviewedAt: new Date().toISOString(),
              reviewedBy: 'Approver',
              reviewNotes,
            }
          : req,
      );

      localStorage.setItem('workflowRequests', JSON.stringify(updatedRequests));
      setRequests(updatedRequests);
      setShowRejectModal(false);
      setSelectedRequest(null);
      setReviewNotes('');
      setActionSuccess('Request rejected');
      setTimeout(() => setActionSuccess(''), 3000);
    } catch (error) {
      console.error('Failed to reject request:', error);
    }
  };

  const getPriorityBadge = (priority: string) => {
    const colorMap: Record<string, 'red' | 'blue' | 'grey'> = {
      critical: 'red',
      high: 'red',
      medium: 'blue',
      low: 'grey',
    };
    return <Badge color={colorMap[priority] || 'grey'}>{priority.toUpperCase()}</Badge>;
  };

  const getStatusIndicator = (status: string) => {
    const statusMap: Record<string, { type: 'pending' | 'success' | 'error'; label: string }> = {
      pending: { type: 'pending', label: 'Pending Review' },
      approved: { type: 'success', label: 'Approved' },
      rejected: { type: 'error', label: 'Rejected' },
    };
    const config = statusMap[status] || statusMap.pending;
    return <StatusIndicator type={config.type}>{config.label}</StatusIndicator>;
  };

  const pendingCount = requests.filter(r => r.status === 'pending').length;

  return (
    <SpaceBetween size="l">
      {actionSuccess && (
        <Alert type="success" dismissible onDismiss={() => setActionSuccess('')}>
          {actionSuccess}
        </Alert>
      )}

      <Table
        columnDefinitions={[
          {
            id: 'title',
            header: 'Request Title',
            cell: item => item.title,
            sortingField: 'title',
          },
          {
            id: 'requestType',
            header: 'Type',
            cell: item => item.requestTypeLabel,
          },
          {
            id: 'priority',
            header: 'Priority',
            cell: item => getPriorityBadge(item.priority),
            sortingField: 'priority',
          },
          {
            id: 'department',
            header: 'Department',
            cell: item => item.department,
          },
          {
            id: 'submittedBy',
            header: 'Submitted By',
            cell: item => item.submittedBy,
          },
          {
            id: 'submittedAt',
            header: 'Submitted',
            cell: item => format(new Date(item.submittedAt), 'MMM dd, yyyy HH:mm'),
            sortingField: 'submittedAt',
          },
          {
            id: 'status',
            header: 'Status',
            cell: item => getStatusIndicator(item.status),
            sortingField: 'status',
          },
          {
            id: 'actions',
            header: 'Actions',
            cell: item =>
              item.status === 'pending' ? (
                <SpaceBetween direction="horizontal" size="xs">
                  <Button
                    onClick={() => {
                      setSelectedRequest(item);
                      setShowApprovalModal(true);
                    }}
                  >
                    Approve
                  </Button>
                  <Button
                    onClick={() => {
                      setSelectedRequest(item);
                      setShowRejectModal(true);
                    }}
                  >
                    Reject
                  </Button>
                </SpaceBetween>
              ) : (
                <Box color="text-status-inactive">Reviewed</Box>
              ),
          },
        ]}
        items={requests}
        loadingText="Loading requests"
        sortingDisabled={false}
        empty={
          <Box textAlign="center" color="inherit">
            <Box padding={{ bottom: 's' }} variant="p" color="inherit">
              <b>No requests</b>
            </Box>
            <Box variant="p">No workflow requests have been submitted yet.</Box>
          </Box>
        }
        header={
          <Header
            counter={`(${requests.length})`}
            description="Review and approve or reject submitted requests"
            info={pendingCount > 0 ? <Badge color="red">{pendingCount} pending</Badge> : undefined}
          >
            Workflow Approvals
          </Header>
        }
      />

      {/* Approval Modal */}
      <Modal
        visible={showApprovalModal}
        onDismiss={() => {
          setShowApprovalModal(false);
          setSelectedRequest(null);
          setReviewNotes('');
        }}
        header="Approve Request"
        footer={
          <Box float="right">
            <SpaceBetween direction="horizontal" size="xs">
              <Button
                variant="link"
                onClick={() => {
                  setShowApprovalModal(false);
                  setSelectedRequest(null);
                  setReviewNotes('');
                }}
              >
                Cancel
              </Button>
              <Button variant="primary" onClick={handleApprove}>
                Approve
              </Button>
            </SpaceBetween>
          </Box>
        }
      >
        {selectedRequest && (
          <SpaceBetween size="m">
            <Box>
              <Box variant="h4">{selectedRequest.title}</Box>
              <Box variant="small" color="text-body-secondary">
                {selectedRequest.requestTypeLabel} • {selectedRequest.department}
              </Box>
            </Box>

            <FormField label="Description">
              <Box>{selectedRequest.description}</Box>
            </FormField>

            <FormField label="Justification">
              <Box>{selectedRequest.justification}</Box>
            </FormField>

            {selectedRequest.estimatedBudget && (
              <FormField label="Estimated Budget">
                <Box>{selectedRequest.estimatedBudget}</Box>
              </FormField>
            )}

            <FormField label="Approval Notes (Optional)" description="Add any notes about this approval">
              <Textarea
                value={reviewNotes}
                onChange={({ detail }) => setReviewNotes(detail.value)}
                placeholder="Enter approval notes..."
                rows={3}
              />
            </FormField>
          </SpaceBetween>
        )}
      </Modal>

      {/* Rejection Modal */}
      <Modal
        visible={showRejectModal}
        onDismiss={() => {
          setShowRejectModal(false);
          setSelectedRequest(null);
          setReviewNotes('');
        }}
        header="Reject Request"
        footer={
          <Box float="right">
            <SpaceBetween direction="horizontal" size="xs">
              <Button
                variant="link"
                onClick={() => {
                  setShowRejectModal(false);
                  setSelectedRequest(null);
                  setReviewNotes('');
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleReject}>Reject</Button>
            </SpaceBetween>
          </Box>
        }
      >
        {selectedRequest && (
          <SpaceBetween size="m">
            <Alert type="warning">You are about to reject this request.</Alert>

            <Box>
              <Box variant="h4">{selectedRequest.title}</Box>
              <Box variant="small" color="text-body-secondary">
                {selectedRequest.requestTypeLabel} • {selectedRequest.department}
              </Box>
            </Box>

            <FormField label="Description">
              <Box>{selectedRequest.description}</Box>
            </FormField>

            <FormField label="Rejection Reason (Required)" description="Explain why this request is being rejected">
              <Textarea
                value={reviewNotes}
                onChange={({ detail }) => setReviewNotes(detail.value)}
                placeholder="Enter rejection reason..."
                rows={3}
              />
            </FormField>
          </SpaceBetween>
        )}
      </Modal>
    </SpaceBetween>
  );
}
