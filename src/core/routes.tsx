import { Routes, Route } from 'react-router-dom';

import { AppLayout } from '../components/appLayout';
import { DashboardPage } from '../components/dashboard';

export const customRoutes = (
  <Routes>
    <Route
      path="/"
      element={
        <AppLayout>
          <DashboardPage />
        </AppLayout>
      }
    />
  </Routes>
);
