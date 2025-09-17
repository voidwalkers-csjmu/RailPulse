import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import PrimaryNavigation from '../../components/ui/PrimaryNavigation';
import NavigationHeader from '../../components/ui/NavigationHeader';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import Icon from '../../components/AppIcon';

// Import all component panels
import UserManagementPanel from './components/UserManagementPanel';
import SystemConfigPanel from './components/SystemConfigPanel';
import PerformanceMonitoringPanel from './components/PerformanceMonitoringPanel';
import AlertConfigPanel from './components/AlertConfigPanel';
import AuditControlsPanel from './components/AuditControlsPanel';
import EmergencyProtocolsPanel from './components/EmergencyProtocolsPanel';

const SystemAdministration = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('users');

  const adminTabs = [
    {
      id: 'users',
      label: 'User Management',
      icon: 'Users',
      description: 'Manage system users and permissions',
      component: UserManagementPanel
    },
    {
      id: 'config',
      label: 'System Configuration',
      icon: 'Settings',
      description: 'Configure system parameters',
      component: SystemConfigPanel
    },
    {
      id: 'performance',
      label: 'Performance Monitoring',
      icon: 'Activity',
      description: 'Monitor system health and metrics',
      component: PerformanceMonitoringPanel
    },
    {
      id: 'alerts',
      label: 'Alert Configuration',
      icon: 'Bell',
      description: 'Configure notification rules',
      component: AlertConfigPanel
    },
    {
      id: 'audit',
      label: 'Audit Controls',
      icon: 'FileText',
      description: 'View system logs and security events',
      component: AuditControlsPanel
    },
    {
      id: 'emergency',
      label: 'Emergency Protocols',
      icon: 'Shield',
      description: 'Manage emergency procedures',
      component: EmergencyProtocolsPanel
    }
  ];

  const currentUser = {
    name: 'System Administrator',
    role: 'IT Administrator',
    id: 'ADMIN001',
    shift: 'Day Shift'
  };

  const handleLogout = () => {
    console.log('Admin logout initiated');
    // In real implementation, this would handle logout
  };

  const renderActiveTabContent = () => {
    const activeTabData = adminTabs?.find(tab => tab?.id === activeTab);
    if (!activeTabData) return null;

    const Component = activeTabData?.component;
    return <Component />;
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>System Administration - RailControl Pro</title>
        <meta name="description" content="System administration panel for managing users, configuration, and monitoring railway control system performance and security." />
      </Helmet>
      {/* Navigation */}
      <PrimaryNavigation 
        isCollapsed={isNavCollapsed}
        onToggleCollapse={() => setIsNavCollapsed(!isNavCollapsed)}
      />
      {/* Main Content Area */}
      <div className={`transition-all duration-300 ${isNavCollapsed ? 'ml-16' : 'ml-60'}`}>
        {/* Header */}
        <NavigationHeader 
          user={currentUser}
          onLogout={handleLogout}
        />

        {/* Content */}
        <main className="p-6">
          {/* Breadcrumb */}
          <div className="mb-6">
            <BreadcrumbNavigation />
          </div>

          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Settings" size={24} color="white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">System Administration</h1>
                <p className="text-muted-foreground">
                  Manage system configuration, users, and monitor operational performance
                </p>
              </div>
            </div>
          </div>

          {/* Administration Tabs */}
          <div className="bg-card border border-border rounded-lg shadow-card">
            {/* Tab Navigation */}
            <div className="border-b border-border">
              <div className="flex overflow-x-auto">
                {adminTabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium border-b-2 transition-micro whitespace-nowrap ${
                      activeTab === tab?.id
                        ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                    }`}
                  >
                    <Icon name={tab?.icon} size={16} />
                    <span className="hidden sm:inline">{tab?.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {/* Active Tab Header */}
              <div className="mb-6 lg:hidden">
                {(() => {
                  const activeTabData = adminTabs?.find(tab => tab?.id === activeTab);
                  return activeTabData ? (
                    <div className="flex items-center space-x-3">
                      <Icon name={activeTabData?.icon} size={20} className="text-primary" />
                      <div>
                        <h2 className="text-lg font-semibold text-foreground">{activeTabData?.label}</h2>
                        <p className="text-sm text-muted-foreground">{activeTabData?.description}</p>
                      </div>
                    </div>
                  ) : null;
                })()}
              </div>

              {/* Tab Content */}
              {renderActiveTabContent()}
            </div>
          </div>

          {/* System Status Footer */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Icon name="Server" size={16} className="text-success" />
                <span className="text-sm font-medium text-foreground">System Status</span>
              </div>
              <div className="text-xs text-success mt-1">Operational</div>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Icon name="Users" size={16} className="text-accent" />
                <span className="text-sm font-medium text-foreground">Active Users</span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">12 controllers online</div>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Icon name="Database" size={16} className="text-warning" />
                <span className="text-sm font-medium text-foreground">Database</span>
              </div>
              <div className="text-xs text-success mt-1">Connected</div>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={16} className="text-success" />
                <span className="text-sm font-medium text-foreground">Security</span>
              </div>
              <div className="text-xs text-success mt-1">All systems secure</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SystemAdministration;