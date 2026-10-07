import React from 'react';
import { AppProvider } from './context/AppContext';
import { ToastProvider } from './context/ToastContext';
import { AppLayout } from './components/AppLayout';

export default function App() {
  return (
    <AppProvider>
      <ToastProvider>
        <AppLayout />
      </ToastProvider>
    </AppProvider>
  );
}
