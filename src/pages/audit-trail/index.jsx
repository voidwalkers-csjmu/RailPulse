import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import PrimaryNavigation from '../../components/ui/PrimaryNavigation';
import NavigationHeader from '../../components/ui/NavigationHeader';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import QuickActionPanel from '../../components/ui/QuickActionPanel';
import AuditLogTable from './components/AuditLogTable';
import FilterControls from './components/FilterControls';
import SummaryStatistics from './components/SummaryStatistics';
import ExportPanel from './components/ExportPanel';
import AuditDetailModal from './components/AuditDetailModal';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const AuditTrail = () => {
  const [isNavigationCollapsed, setIsNavigationCollapsed] = useState(false);
  const [filters, setFilters] = useState({});
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [activeView, setActiveView] = useState('table'); // 'table', 'statistics', 'export'

  // Mock audit data
  const auditData = [
    {
      id: 'AUD-2024-001247',
      timestamp: new Date('2024-09-11T14:23:45'),
      controller: 'John Smith',
      controllerRole: 'Senior Traffic Controller',
      trainNumber: 'T1001',
      trainType: 'Express Passenger',
      actionType: 'Override',
      rationale: 'Manual override required due to emergency maintenance work on Track 2. Rerouted to Track 1 to maintain schedule adherence and passenger safety.',
      outcome: 'Successful',
      impact: 'Prevented 15-minute delay',
      delayMinutes: 0
    },
    {
      id: 'AUD-2024-001246',
      timestamp: new Date('2024-09-11T14:18:22'),
      controller: 'Sarah Johnson',
      controllerRole: 'Traffic Controller',
      trainNumber: 'EXP-205',
      trainType: 'High-Speed Express',
      actionType: 'Accept',
      rationale: 'AI recommendation accepted for optimal junction precedence. Train EXP-205 granted priority based on passenger load and schedule criticality.',
      outcome: 'Successful',
      impact: 'Maintained schedule',
      delayMinutes: 0
    },
    {
      id: 'AUD-2024-001245',
      timestamp: new Date('2024-09-11T14:12:18'),
      controller: 'Mike Davis',
      controllerRole: 'Traffic Controller',
      trainNumber: 'F2003',
      trainType: 'Freight',
      actionType: 'Manual',
      rationale: 'Custom decision implemented for freight train F2003. Delayed departure by 8 minutes to accommodate passenger train priority during peak hours.',
      outcome: 'Delayed',
      impact: 'Optimized passenger flow',
      delayMinutes: 8
    },
    {
      id: 'AUD-2024-001244',
      timestamp: new Date('2024-09-11T14:05:33'),
      controller: 'Emily Brown',
      controllerRole: 'Senior Traffic Controller',
      trainNumber: 'T1005',
      trainType: 'Regional Passenger',
      actionType: 'Emergency',
      rationale: 'Emergency override activated due to medical emergency on board. Granted immediate priority passage to nearest station with medical facilities.',
      outcome: 'Successful',
      impact: 'Emergency response',
      delayMinutes: 0
    },
    {
      id: 'AUD-2024-001243',
      timestamp: new Date('2024-09-11T13:58:47'),
      controller: 'David Wilson',
      controllerRole: 'Traffic Controller',
      trainNumber: 'EXP-301',
      trainType: 'Express Passenger',
      actionType: 'Accept',
      rationale: 'Standard AI recommendation accepted for junction crossing. No conflicts detected, normal precedence rules applied.',
      outcome: 'Successful',
      impact: 'Normal operation',
      delayMinutes: 0
    },
    {
      id: 'AUD-2024-001242',
      timestamp: new Date('2024-09-11T13:52:15'),
      controller: 'Lisa Garcia',
      controllerRole: 'Traffic Controller',
      trainNumber: 'T1008',
      trainType: 'Local Passenger',
      actionType: 'Override',
      rationale: 'Override decision to accommodate connecting service. T1008 delayed by 5 minutes to ensure passenger connections at Central Station.',
      outcome: 'Delayed',
      impact: 'Improved connectivity',
      delayMinutes: 5
    },
    {
      id: 'AUD-2024-001241',
      timestamp: new Date('2024-09-11T13:45:28'),
      controller: 'John Smith',
      controllerRole: 'Senior Traffic Controller',
      trainNumber: 'F2001',
      trainType: 'Heavy Freight',
      actionType: 'Manual',
      rationale: 'Manual scheduling adjustment for heavy freight train. Coordinated with maintenance window to optimize track utilization.',
      outcome: 'Successful',
      impact: 'Track optimization',
      delayMinutes: 0
    },
    {
      id: 'AUD-2024-001240',
      timestamp: new Date('2024-09-11T13:38:41'),
      controller: 'Sarah Johnson',
      controllerRole: 'Traffic Controller',
      trainNumber: 'EXP-102',
      trainType: 'High-Speed Express',
      actionType: 'Accept',
      rationale: 'AI recommendation accepted for high-speed express priority. Clear track conditions and optimal timing for maximum efficiency.',
      outcome: 'Successful',
      impact: 'Optimal efficiency',
      delayMinutes: 0
    }
  ];

  const [filteredData, setFilteredData] = useState(auditData);

  useEffect(() => {
    // Apply filters to data
    setIsLoading(true);
    setTimeout(() => {
      let filtered = auditData;
      
      if (filters?.searchKeyword) {
        const keyword = filters?.searchKeyword?.toLowerCase();
        filtered = filtered?.filter(entry => 
          entry?.trainNumber?.toLowerCase()?.includes(keyword) ||
          entry?.controller?.toLowerCase()?.includes(keyword) ||
          entry?.rationale?.toLowerCase()?.includes(keyword)
        );
      }
      
      if (filters?.controller) {
        filtered = filtered?.filter(entry => 
          entry?.controller?.toLowerCase()?.includes(filters?.controller?.toLowerCase())
        );
      }
      
      if (filters?.actionType) {
        filtered = filtered?.filter(entry => 
          entry?.actionType?.toLowerCase() === filters?.actionType?.toLowerCase()
        );
      }
      
      if (filters?.outcome) {
        filtered = filtered?.filter(entry => 
          entry?.outcome?.toLowerCase() === filters?.outcome?.toLowerCase()
        );
      }
      
      if (filters?.dateFrom && filters?.dateTo) {
        const fromDate = new Date(filters.dateFrom);
        const toDate = new Date(filters.dateTo);
        toDate?.setHours(23, 59, 59, 999);
        
        filtered = filtered?.filter(entry => 
          entry?.timestamp >= fromDate && entry?.timestamp <= toDate
        );
      }
      
      setFilteredData(filtered);
      setIsLoading(false);
    }, 500);
  }, [filters]);

  const handleRowClick = (entry) => {
    setSelectedEntry(entry);
    setIsDetailModalOpen(true);
  };

  const handleExport = (exportConfig) => {
    setIsExporting(true);
    console.log('Exporting with config:', exportConfig);
    
    // Simulate export process
    setTimeout(() => {
      setIsExporting(false);
      alert(`Export completed! ${exportConfig?.format?.toUpperCase()} file has been generated with ${filteredData?.length} records.`);
    }, 3000);
  };

  const handleEmergencyOverride = () => {
    const confirmed = window.confirm(
      'EMERGENCY OVERRIDE\n\nThis will activate emergency protocols and notify all supervisors.\n\nConfirm activation?'
    );
    if (confirmed) {
      console.log('Emergency override activated from audit trail');
    }
  };

  const viewTabs = [
    { id: 'table', label: 'Audit Log', icon: 'Table' },
    { id: 'statistics', label: 'Statistics', icon: 'BarChart3' },
    { id: 'export', label: 'Export', icon: 'Download' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Audit Trail - RailControl Pro</title>
        <meta name="description" content="Comprehensive decision history and compliance reporting for railway operations oversight and analysis" />
      </Helmet>
      {/* Navigation */}
      <PrimaryNavigation 
        isCollapsed={isNavigationCollapsed}
        onToggleCollapse={() => setIsNavigationCollapsed(!isNavigationCollapsed)}
      />
      {/* Main Content */}
      <div className={`transition-all duration-300 ${isNavigationCollapsed ? 'ml-16' : 'ml-60'}`}>
        {/* Header */}
        <NavigationHeader 
          user={{ name: 'Current User', role: 'Traffic Controller' }}
          onLogout={() => console.log('Logout initiated')}
          onEmergencyAlert={handleEmergencyOverride}
        />

        {/* Content Area */}
        <div className="p-6 space-y-6">
          {/* Breadcrumb */}
          <BreadcrumbNavigation />

          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon name="FileText" size={32} className="text-primary" />
              <div>
                <h1 className="text-3xl font-bold text-foreground">Audit Trail</h1>
                <p className="text-muted-foreground">
                  Comprehensive decision history and compliance reporting
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                iconName="RefreshCw"
                iconPosition="left"
                onClick={() => window.location?.reload()}
              >
                Refresh Data
              </Button>
              <QuickActionPanel 
                position="floating"
                onEmergencyOverride={handleEmergencyOverride}
                onSystemAlert={() => console.log('System alert triggered')}
                onBulkDecision={() => console.log('Bulk decision triggered')}
              />
            </div>
          </div>

          {/* View Tabs */}
          <div className="flex border-b border-border">
            {viewTabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveView(tab?.id)}
                className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium transition-micro ${
                  activeView === tab?.id
                    ? 'text-primary border-b-2 border-primary bg-primary/5' : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                <span>{tab?.label}</span>
              </button>
            ))}
          </div>

          {/* Content based on active view */}
          {activeView === 'table' && (
            <>
              <FilterControls 
                onFiltersChange={setFilters}
                resultsCount={filteredData?.length}
                isLoading={isLoading}
              />
              <AuditLogTable 
                auditData={filteredData}
                onRowClick={handleRowClick}
                isLoading={isLoading}
              />
            </>
          )}

          {activeView === 'statistics' && (
            <SummaryStatistics statisticsData={filteredData} />
          )}

          {activeView === 'export' && (
            <ExportPanel 
              onExport={handleExport}
              isExporting={isExporting}
            />
          )}

          {/* Real-time Status */}
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-success rounded-full animate-pulse-slow"></div>
                <span className="text-sm font-medium text-foreground">
                  Real-time Audit Logging Active
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                Last entry: {new Date()?.toLocaleTimeString('en-US', { hour12: false })}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Detail Modal */}
      <AuditDetailModal 
        auditEntry={selectedEntry}
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedEntry(null);
        }}
      />
    </div>
  );
};

export default AuditTrail;