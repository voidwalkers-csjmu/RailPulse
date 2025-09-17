import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import TrainDetailsPage from './pages/train-details';
import LoginPage from './pages/login';
import SystemAdministration from './pages/system-administration';
import MainControlDashboard from './pages/main-control-dashboard';
import AuditTrail from './pages/audit-trail';
import DecisionSimulation from './pages/decision-simulation';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AuditTrail />} />
        <Route path="/train-details" element={<TrainDetailsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/system-administration" element={<SystemAdministration />} />
        <Route path="/main-control-dashboard" element={<MainControlDashboard />} />
        <Route path="/audit-trail" element={<AuditTrail />} />
        <Route path="/decision-simulation" element={<DecisionSimulation />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
