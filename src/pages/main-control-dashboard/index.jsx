import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import PrimaryNavigation from '../../components/ui/PrimaryNavigation';
import NavigationHeader from '../../components/ui/NavigationHeader';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import QuickActionPanel from '../../components/ui/QuickActionPanel';
import KPIDashboard from './components/KPIDashboard';
import RailwayMap from './components/RailwayMap';
import GanttTimeline from './components/GanttTimeline';
import DecisionPanel from './components/DecisionPanel';
import NotificationSystem from './components/NotificationSystem';
import Icon from '../../components/AppIcon';

const MainControlDashboard = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [activeView, setActiveView] = useState('overview'); // 'overview' | 'map' | 'timeline' | 'decisions'
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    // Simulate WebSocket connection status
    const statusInterval = setInterval(() => {
      setConnectionStatus(prev => {
        const statuses = ['connected', 'reconnecting', 'connected'];
        const currentIndex = statuses?.indexOf(prev);
        return statuses?.[(currentIndex + 1) % statuses?.length];
      });
    }, 30000);

    // Update timestamp
    const updateInterval = setInterval(() => {
      setLastUpdate(new Date());
    }, 5000);

    return () => {
      clearInterval(statusInterval);
      clearInterval(updateInterval);
    };
  }, []);

  const handleEmergencyOverride = () => {
    const confirmed = window.confirm(
      'EMERGENCY OVERRIDE\n\nThis will activate emergency protocols and notify all supervisors.\n\nConfirm activation?'
    );
    if (confirmed) {
      console.log('Emergency override activated from dashboard');
      // In real implementation, this would trigger emergency protocols
    }
  };

  const handleSystemAlert = () => {
    console.log('System alert triggered from dashboard');
    // In real implementation, this would open alert management
  };

  const handleBulkDecision = () => {
    console.log('Bulk decision management opened from dashboard');
    // In real implementation, this would open bulk decision interface
  };

  const mobileViews = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'map', label: 'Map', icon: 'Map' },
    { id: 'timeline', label: 'Timeline', icon: 'Calendar' },
    { id: 'decisions', label: 'Decisions', icon: 'Brain' }
  ];

  const renderMobileView = () => {
    switch (activeView) {
      case 'map':
        return <RailwayMap />;
      case 'timeline':
        return <GanttTimeline />;
      case 'decisions':
        return <DecisionPanel />;
      default:
        return <KPIDashboard />;
    }
  };

  return (
    <>
      <Helmet>
        <title>Main Control Dashboard - RailControl Pro</title>
        <meta name="description" content="Real-time railway control dashboard with live train tracking, AI recommendations, and comprehensive operational oversight." />
      </Helmet>
      <div className="min-h-screen bg-background">
        {/* Navigation */}
        <PrimaryNavigation 
          isCollapsed={isNavCollapsed}
          onToggleCollapse={() => setIsNavCollapsed(!isNavCollapsed)}
        />

        {/* Main Content */}
        <div className={`transition-all duration-300 ${isNavCollapsed ? 'ml-16' : 'ml-60'}`}>
          {/* Header */}
          <NavigationHeader 
            user={{
              name: 'Controller Smith',
              role: 'Senior Traffic Controller',
              id: 'TC001',
              shift: 'Day Shift'
            }}
            onLogout={() => console.log('Logout initiated')}
          />

          {/* Content Area */}
          <main className="p-6">
            {/* Breadcrumb */}
            <div className="mb-6">
              <BreadcrumbNavigation />
            </div>

            {/* Connection Status Bar */}
            <div className="mb-6 p-3 bg-card border border-border rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${
                      connectionStatus === 'connected' ? 'bg-success animate-pulse-slow' :
                      connectionStatus === 'reconnecting' ? 'bg-warning animate-spin' : 'bg-error'
                    }`}></div>
                    <span className="text-sm font-medium text-foreground">
                      WebSocket: {connectionStatus?.charAt(0)?.toUpperCase() + connectionStatus?.slice(1)}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Icon name="Database" size={14} className="text-success" />
                    <span className="text-sm text-muted-foreground">Database: Online</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Icon name="Brain" size={14} className="text-success" />
                    <span className="text-sm text-muted-foreground">AI Engine: Active</span>
                  </div>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  Last Update: {lastUpdate?.toLocaleTimeString('en-US', { hour12: false })}
                </div>
              </div>
            </div>

            {/* Mobile View Selector */}
            <div className="lg:hidden mb-6">
              <div className="flex space-x-1 bg-muted p-1 rounded-lg">
                {mobileViews?.map((view) => (
                  <button
                    key={view?.id}
                    onClick={() => setActiveView(view?.id)}
                    className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-micro ${
                      activeView === view?.id
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-background'
                    }`}
                  >
                    <Icon name={view?.icon} size={16} />
                    <span>{view?.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:block">
              <div className="grid grid-cols-12 gap-6">
                {/* Top Section - KPI Dashboard */}
                <div className="col-span-12">
                  <KPIDashboard />
                </div>

                {/* Middle Section - Map and Timeline */}
                <div className="col-span-8">
                  <div className="space-y-6">
                    <RailwayMap />
                    <GanttTimeline />
                  </div>
                </div>

                {/* Right Sidebar - Decisions and Quick Actions */}
                <div className="col-span-4">
                  <div className="space-y-6">
                    <DecisionPanel />
                    <QuickActionPanel
                      position="sidebar"
                      onEmergencyOverride={handleEmergencyOverride}
                      onSystemAlert={handleSystemAlert}
                      onBulkDecision={handleBulkDecision}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="lg:hidden">
              {renderMobileView()}
            </div>

            {/* Emergency Quick Actions (Mobile Floating) */}
            <div className="lg:hidden">
              <QuickActionPanel
                position="floating"
                onEmergencyOverride={handleEmergencyOverride}
                onSystemAlert={handleSystemAlert}
                onBulkDecision={handleBulkDecision}
              />
            </div>
          </main>
        </div>

        {/* Notification System */}
        <NotificationSystem />
      </div>
    </>
  );
};

export default MainControlDashboard;