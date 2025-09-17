import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AuditControlsPanel = () => {
  const [auditLogs, setAuditLogs] = useState([
    {
      id: 1,
      timestamp: "2025-01-11 16:45:32",
      user: "admin@railcontrol.com",
      action: "User Created",
      resource: "User Management",
      details: "Created new user account for john.smith@railcontrol.com",
      ipAddress: "192.168.1.100",
      severity: "info"
    },
    {
      id: 2,
      timestamp: "2025-01-11 16:30:15",
      user: "supervisor@railcontrol.com",
      action: "Configuration Changed",
      resource: "System Settings",
      details: "Modified AI recommendation threshold from 80% to 85%",
      ipAddress: "192.168.1.105",
      severity: "warning"
    },
    {
      id: 3,
      timestamp: "2025-01-11 16:15:08",
      user: "controller@railcontrol.com",
      action: "Emergency Override",
      resource: "Decision System",
      details: "Emergency override activated for Train ID: EXP-2301",
      ipAddress: "192.168.1.110",
      severity: "critical"
    },
    {
      id: 4,
      timestamp: "2025-01-11 15:58:42",
      user: "system",
      action: "Security Event",
      resource: "Authentication",
      details: "Failed login attempt detected from IP: 203.0.113.45",
      ipAddress: "203.0.113.45",
      severity: "warning"
    },
    {
      id: 5,
      timestamp: "2025-01-11 15:45:20",
      user: "admin@railcontrol.com",
      action: "Database Backup",
      resource: "System Maintenance",
      details: "Automated database backup completed successfully",
      ipAddress: "192.168.1.100",
      severity: "info"
    }
  ]);

  const [securityEvents, setSecurityEvents] = useState([
    {
      id: 1,
      timestamp: "2025-01-11 16:40:12",
      eventType: "Login Failure",
      user: "unknown",
      ipAddress: "203.0.113.45",
      details: "Multiple failed login attempts (5 attempts in 2 minutes)",
      riskLevel: "high"
    },
    {
      id: 2,
      timestamp: "2025-01-11 16:25:33",
      eventType: "Privilege Escalation",
      user: "controller@railcontrol.com",
      ipAddress: "192.168.1.110",
      details: "User attempted to access admin-only configuration panel",
      riskLevel: "medium"
    },
    {
      id: 3,
      timestamp: "2025-01-11 15:55:18",
      eventType: "Unusual Activity",
      user: "supervisor@railcontrol.com",
      ipAddress: "192.168.1.105",
      details: "User logged in from new device/location",
      riskLevel: "low"
    }
  ]);

  const [configChanges, setConfigChanges] = useState([
    {
      id: 1,
      timestamp: "2025-01-11 16:30:15",
      user: "supervisor@railcontrol.com",
      component: "AI Engine",
      parameter: "recommendation_threshold",
      oldValue: "80",
      newValue: "85",
      reason: "Improving decision accuracy based on recent performance analysis"
    },
    {
      id: 2,
      timestamp: "2025-01-11 14:20:45",
      user: "admin@railcontrol.com",
      component: "Alert System",
      parameter: "critical_delay_threshold",
      oldValue: "10",
      newValue: "15",
      reason: "Reducing false positive alerts during peak hours"
    },
    {
      id: 3,
      timestamp: "2025-01-11 12:15:30",
      user: "admin@railcontrol.com",
      component: "Session Management",
      parameter: "timeout_minutes",
      oldValue: "45",
      newValue: "30",
      reason: "Enhanced security policy implementation"
    }
  ]);

  const [filterType, setFilterType] = useState("");
  const [filterSeverity, setFilterSeverity] = useState("");
  const [filterUser, setFilterUser] = useState("");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  const logTypeOptions = [
    { value: "", label: "All Log Types" },
    { value: "User Created", label: "User Management" },
    { value: "Configuration Changed", label: "Configuration" },
    { value: "Emergency Override", label: "Emergency Actions" },
    { value: "Security Event", label: "Security Events" },
    { value: "Database Backup", label: "System Maintenance" }
  ];

  const severityOptions = [
    { value: "", label: "All Severities" },
    { value: "info", label: "Info" },
    { value: "warning", label: "Warning" },
    { value: "critical", label: "Critical" }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical':
        return 'bg-error text-error-foreground';
      case 'warning':
        return 'bg-warning text-warning-foreground';
      case 'info':
        return 'bg-accent text-accent-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getRiskLevelColor = (riskLevel) => {
    switch (riskLevel) {
      case 'high':
        return 'bg-error text-error-foreground';
      case 'medium':
        return 'bg-warning text-warning-foreground';
      case 'low':
        return 'bg-success text-success-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const handleExportLogs = (type) => {
    console.log(`Exporting ${type} logs`);
    // In real implementation, this would generate and download a report
  };

  const filteredLogs = auditLogs?.filter(log => {
    const matchesType = !filterType || log?.action === filterType;
    const matchesSeverity = !filterSeverity || log?.severity === filterSeverity;
    const matchesUser = !filterUser || log?.user?.toLowerCase()?.includes(filterUser?.toLowerCase());
    return matchesType && matchesSeverity && matchesUser;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Audit Controls</h3>
          <p className="text-sm text-muted-foreground">
            Monitor system logs, security events, and configuration changes
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            iconName="Download"
            onClick={() => handleExportLogs('audit')}
          >
            Export Audit Logs
          </Button>
          <Button
            variant="outline"
            iconName="Shield"
            onClick={() => handleExportLogs('security')}
          >
            Security Report
          </Button>
        </div>
      </div>
      {/* Filters */}
      <div className="bg-muted/50 rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Select
            placeholder="Filter by type"
            options={logTypeOptions}
            value={filterType}
            onChange={setFilterType}
          />
          
          <Select
            placeholder="Filter by severity"
            options={severityOptions}
            value={filterSeverity}
            onChange={setFilterSeverity}
          />
          
          <Input
            type="text"
            placeholder="Filter by user"
            value={filterUser}
            onChange={(e) => setFilterUser(e?.target?.value)}
          />
          
          <Input
            type="date"
            placeholder="Start date"
            value={dateRange?.start}
            onChange={(e) => setDateRange(prev => ({ ...prev, start: e?.target?.value }))}
          />
          
          <Input
            type="date"
            placeholder="End date"
            value={dateRange?.end}
            onChange={(e) => setDateRange(prev => ({ ...prev, end: e?.target?.value }))}
          />
        </div>
      </div>
      {/* Audit Logs Table */}
      <div className="bg-card border border-border rounded-lg">
        <div className="p-6 border-b border-border">
          <h4 className="text-md font-semibold text-foreground">System Audit Logs</h4>
          <p className="text-sm text-muted-foreground mt-1">
            Comprehensive log of all system activities and user actions
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-4 font-medium text-foreground">Timestamp</th>
                <th className="text-left p-4 font-medium text-foreground">User</th>
                <th className="text-left p-4 font-medium text-foreground">Action</th>
                <th className="text-left p-4 font-medium text-foreground">Resource</th>
                <th className="text-left p-4 font-medium text-foreground">Details</th>
                <th className="text-left p-4 font-medium text-foreground">Severity</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs?.map((log, index) => (
                <tr key={log?.id} className={index % 2 === 0 ? 'bg-background' : 'bg-muted/20'}>
                  <td className="p-4 text-sm font-mono text-foreground">
                    {new Date(log.timestamp)?.toLocaleString()}
                  </td>
                  <td className="p-4 text-sm text-foreground">{log?.user}</td>
                  <td className="p-4 text-sm font-medium text-foreground">{log?.action}</td>
                  <td className="p-4 text-sm text-muted-foreground">{log?.resource}</td>
                  <td className="p-4 text-sm text-muted-foreground max-w-xs truncate">
                    {log?.details}
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(log?.severity)}`}>
                      {log?.severity?.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Security Events */}
      <div className="bg-card border border-border rounded-lg">
        <div className="p-6 border-b border-border">
          <h4 className="text-md font-semibold text-foreground">Security Events</h4>
          <p className="text-sm text-muted-foreground mt-1">
            Security-related incidents and potential threats
          </p>
        </div>

        <div className="divide-y divide-border">
          {securityEvents?.map((event) => (
            <div key={event?.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <Icon name="Shield" size={16} className="text-error" />
                    <h5 className="text-sm font-semibold text-foreground">{event?.eventType}</h5>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskLevelColor(event?.riskLevel)}`}>
                      {event?.riskLevel?.toUpperCase()} RISK
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-foreground">User:</span>
                      <div className="text-muted-foreground">{event?.user}</div>
                    </div>
                    <div>
                      <span className="font-medium text-foreground">IP Address:</span>
                      <div className="text-muted-foreground font-mono">{event?.ipAddress}</div>
                    </div>
                    <div>
                      <span className="font-medium text-foreground">Time:</span>
                      <div className="text-muted-foreground">{new Date(event.timestamp)?.toLocaleString()}</div>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <span className="font-medium text-foreground text-sm">Details:</span>
                    <div className="text-sm text-muted-foreground mt-1">{event?.details}</div>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  iconName="Eye"
                  onClick={() => console.log('Viewing security event details')}
                >
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Configuration Changes */}
      <div className="bg-card border border-border rounded-lg">
        <div className="p-6 border-b border-border">
          <h4 className="text-md font-semibold text-foreground">Configuration Changes</h4>
          <p className="text-sm text-muted-foreground mt-1">
            History of system configuration modifications
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-4 font-medium text-foreground">Timestamp</th>
                <th className="text-left p-4 font-medium text-foreground">User</th>
                <th className="text-left p-4 font-medium text-foreground">Component</th>
                <th className="text-left p-4 font-medium text-foreground">Parameter</th>
                <th className="text-left p-4 font-medium text-foreground">Change</th>
                <th className="text-left p-4 font-medium text-foreground">Reason</th>
              </tr>
            </thead>
            <tbody>
              {configChanges?.map((change, index) => (
                <tr key={change?.id} className={index % 2 === 0 ? 'bg-background' : 'bg-muted/20'}>
                  <td className="p-4 text-sm font-mono text-foreground">
                    {new Date(change.timestamp)?.toLocaleString()}
                  </td>
                  <td className="p-4 text-sm text-foreground">{change?.user}</td>
                  <td className="p-4 text-sm font-medium text-foreground">{change?.component}</td>
                  <td className="p-4 text-sm font-mono text-muted-foreground">{change?.parameter}</td>
                  <td className="p-4 text-sm">
                    <span className="text-error line-through">{change?.oldValue}</span>
                    <Icon name="ArrowRight" size={12} className="inline mx-2 text-muted-foreground" />
                    <span className="text-success font-medium">{change?.newValue}</span>
                  </td>
                  <td className="p-4 text-sm text-muted-foreground max-w-xs truncate">
                    {change?.reason}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AuditControlsPanel;