
import React from 'react';
import { Navigate } from 'react-router-dom';
import MainLayout from '@/components/Layout/MainLayout';
import Dashboard from './Dashboard';

const Index = () => {
  return <Navigate to="/" replace />;
};

export default Index;
