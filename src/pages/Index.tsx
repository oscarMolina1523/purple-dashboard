
import React from 'react';
import { Navigate } from 'react-router-dom';
import MainLayout from '@/components/Layout/MainLayout';
import Dashboard from './Dashboard';
import { AppProvider } from '@/context/AppContext';

const Index = () => {
  return (
    <AppProvider>
      <MainLayout>
        <Dashboard />
      </MainLayout>
    </AppProvider>
  );
};

export default Index;
