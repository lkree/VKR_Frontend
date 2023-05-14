import React from 'react';
import { createRoot } from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.min.css';

import { EntryPoint } from '~/app';

import { appStarted } from '~/shared/config';

void appStarted();

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <EntryPoint />
  </React.StrictMode>
);
