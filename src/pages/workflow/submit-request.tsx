// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, { useState } from 'react';
import {
  Container,
  Header,
  SpaceBetween,
  FormField,
  Input,
  Textarea,
  Select,
  Button,
  Form,
  Alert,
} from '@cloudscape-design/components';

interface RequestFormData {
  title: string;
  description: string;
  requestType: { label: string; value: string } | null;
  priority: { label: string; value: string } | null;
  department: string;
  estimatedBudget: string;
  justification: string;
}

interface SubmitRequestProps {
  onSubmitSuccess: () => void;
}

const requestTypes = [
  { label: 'Budget Approval', value: 'budget' },
  { label: 'Resource Request', value: 'resource' },
  { label: 'Policy Change', value: 'policy' },
  { label: 'Access Request', value: 'access' },
  { label: 'Software Purchase', value: 'software' },
];

const priorities = [
  { label: 'Low', value: 'low' },
  { label: 'Medium', value: 'medium' },
  { label: 'High', value: 'high' },
  { label: 'Critical', value: 'critical' },
];

export function SubmitRequest({ onSubmitSuccess }: SubmitRequestProps) {
  const [formData, setFormData] = useState<RequestFormData>({
    title: '',
    description: '',
    requestType: null,
    priority: null,
    department: '',
    estimatedBudget: '',
    justification: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof RequestFormData, string>>>({});
  const [submitError, setSubmitError] = useState<string>('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof RequestFormData, string>> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.requestType) {
      newErrors.requestType = 'Request type is required';
    }

    if (!formData.priority) {
      newErrors.priority = 'Priority is required';
    }

    if (!formData.department.trim()) {
      newErrors.department = 'Department is required';
    }

    if (!formData.justification.trim()) {
      newErrors.justification = 'Justification is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitSuccess(false);

    if (!validateForm()) {
      setSubmitError('Please fix the errors in the form');
      return;
    }

    try {
      // Get existing requests from localStorage
      const existingRequests = JSON.parse(localStorage.getItem('workflowRequests') || '[]');

      // Create new request
      const newRequest = {
        id: Date.now().toString(),
        ...formData,
        requestType: formData.requestType?.value,
        requestTypeLabel: formData.requestType?.label,
        priority: formData.priority?.value,
        priorityLabel: formData.priority?.label,
        status: 'pending',
        submittedAt: new Date().toISOString(),
        submittedBy: 'Current User', // In a real app, this would be the logged-in user
      };

      // Add to array and save
      existingRequests.push(newRequest);
      localStorage.setItem('workflowRequests', JSON.stringify(existingRequests));

      // Reset form
      setFormData({
        title: '',
        description: '',
        requestType: null,
        priority: null,
        department: '',
        estimatedBudget: '',
        justification: '',
      });

      setSubmitSuccess(true);
      setTimeout(() => {
        onSubmitSuccess();
      }, 2000);
    } catch (error) {
      setSubmitError('Failed to submit request. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Form
        actions={
          <SpaceBetween direction="horizontal" size="xs">
            <Button formAction="none" variant="link" onClick={() => window.history.back()}>
              Cancel
            </Button>
            <Button variant="primary" formAction="submit">
              Submit Request
            </Button>
          </SpaceBetween>
        }
        errorText={submitError}
      >
        <SpaceBetween size="l">
          {submitSuccess && (
            <Alert type="success" dismissible onDismiss={() => setSubmitSuccess(false)}>
              Request submitted successfully! Redirecting to approvals page...
            </Alert>
          )}

          <Container header={<Header variant="h2">Request Information</Header>}>
            <SpaceBetween size="l">
              <FormField label="Request Title" errorText={errors.title} stretch>
                <Input
                  value={formData.title}
                  onChange={({ detail }) => setFormData({ ...formData, title: detail.value })}
                  placeholder="Enter a descriptive title for your request"
                />
              </FormField>

              <FormField label="Request Type" errorText={errors.requestType} stretch>
                <Select
                  selectedOption={formData.requestType}
                  onChange={({ detail }) => setFormData({ ...formData, requestType: detail.selectedOption })}
                  options={requestTypes}
                  placeholder="Select request type"
                  selectedAriaLabel="Selected"
                />
              </FormField>

              <FormField label="Priority" errorText={errors.priority} stretch>
                <Select
                  selectedOption={formData.priority}
                  onChange={({ detail }) => setFormData({ ...formData, priority: detail.selectedOption })}
                  options={priorities}
                  placeholder="Select priority level"
                  selectedAriaLabel="Selected"
                />
              </FormField>

              <FormField label="Description" errorText={errors.description} stretch>
                <Textarea
                  value={formData.description}
                  onChange={({ detail }) => setFormData({ ...formData, description: detail.value })}
                  placeholder="Provide a detailed description of your request"
                  rows={4}
                />
              </FormField>
            </SpaceBetween>
          </Container>

          <Container header={<Header variant="h2">Additional Details</Header>}>
            <SpaceBetween size="l">
              <FormField label="Department" errorText={errors.department} stretch>
                <Input
                  value={formData.department}
                  onChange={({ detail }) => setFormData({ ...formData, department: detail.value })}
                  placeholder="Enter your department name"
                />
              </FormField>

              <FormField
                label="Estimated Budget"
                description="Optional: Provide estimated cost if applicable"
                stretch
              >
                <Input
                  value={formData.estimatedBudget}
                  onChange={({ detail }) => setFormData({ ...formData, estimatedBudget: detail.value })}
                  placeholder="e.g., $5,000"
                  type="text"
                />
              </FormField>

              <FormField
                label="Business Justification"
                errorText={errors.justification}
                description="Explain why this request is necessary"
                stretch
              >
                <Textarea
                  value={formData.justification}
                  onChange={({ detail }) => setFormData({ ...formData, justification: detail.value })}
                  placeholder="Provide business justification for this request"
                  rows={4}
                />
              </FormField>
            </SpaceBetween>
          </Container>
        </SpaceBetween>
      </Form>
    </form>
  );
}
