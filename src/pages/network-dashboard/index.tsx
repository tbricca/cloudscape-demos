// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app';
import { applyMode, Density } from '@cloudscape-design/global-styles';

import '@cloudscape-design/global-styles/index.css';

applyMode(Density.Comfortable);

const root = createRoot(document.getElementById('app')!);
root.render(<App />);
