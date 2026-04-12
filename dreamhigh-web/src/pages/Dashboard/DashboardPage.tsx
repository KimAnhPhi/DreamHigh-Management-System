import React from 'react';
import { AppLayout } from '../../design-system/components/layout/AppLayout';
import DashboardHome from './DashboardHome';

const DashboardPage: React.FC = () => {
  return (
    <AppLayout>
      <DashboardHome />
    </AppLayout>
  );
};

export default DashboardPage;
