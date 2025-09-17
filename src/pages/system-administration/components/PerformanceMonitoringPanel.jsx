import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const PerformanceMonitoringPanel = () => {
  const [systemMetrics, setSystemMetrics] = useState({
    cpu: 45,
    memory: 68,
    disk: 32,
    network: 78
  });

  const [connectionStatus, setConnectionStatus] = useState({
    websocket: 'connected',
    database: 'connected',
    externalServices: 'connected',
    apiGateway: 'connected'
  });

  const [userActivity, setUserActivity] = useState([
    { time: '14:00', activeUsers: 12, decisions: 45 },
    { time: '14:30', activeUsers: 15, decisions: 52 },
    { time: '15:00', activeUsers: 18, decisions: 38 },
    { time: '15:30', activeUsers: 14, decisions: 41 },
    { time: '16:00', activeUsers: 16, decisions: 47 },
    { time: '16:30', activeUsers: 13, decisions: 35 }
  ]);

  const [performanceData, setPerformanceData] = useState([
    { name: 'Response Time', value: 120, unit: 'ms', status: 'good' },
    { name: 'Throughput', value: 450, unit: 'req/min', status: 'good' },
    { name: 'Error Rate', value: 0.2, unit: '%', status: 'good' },
    { name: 'Uptime', value: 99.8, unit: '%', status: 'excellent' }
  ]);

  const [serviceHealth, setServiceHealth] = useState([
    { name: 'AI Engine', status: 'healthy', responseTime: 85, lastCheck: '2025-01-11 16:50:00' },
    { name: 'Database', status: 'healthy', responseTime: 12, lastCheck: '2025-01-11 16:50:30' },
    { name: 'WebSocket Server', status: 'healthy', responseTime: 8, lastCheck: '2025-01-11 16:51:00' },
    { name: 'External API', status: 'warning', responseTime: 245, lastCheck: '2025-01-11 16:49:15' },
    { name: 'Notification Service', status: 'healthy', responseTime: 34, lastCheck: '2025-01-11 16:50:45' }
  ]);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setSystemMetrics(prev => ({
        cpu: Math.max(20, Math.min(90, prev?.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(30, Math.min(95, prev?.memory + (Math.random() - 0.5) * 8)),
        disk: Math.max(10, Math.min(80, prev?.disk + (Math.random() - 0.5) * 5)),
        network: Math.max(40, Math.min(100, prev?.network + (Math.random() - 0.5) * 15))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy': case'connected': case'good': case'excellent':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'error': case'disconnected':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy': case'connected':
        return 'CheckCircle';
      case 'warning':
        return 'AlertTriangle';
      case 'error': case'disconnected':
        return 'XCircle';
      default:
        return 'Circle';
    }
  };

  const getMetricColor = (value, type) => {
    if (type === 'cpu' || type === 'memory') {
      if (value > 80) return 'text-error';
      if (value > 60) return 'text-warning';
      return 'text-success';
    }
    if (type === 'disk') {
      if (value > 70) return 'text-warning';
      return 'text-success';
    }
    return 'text-success';
  };

  const pieChartData = [
    { name: 'Available', value: 100 - systemMetrics?.cpu, fill: '#059669' },
    { name: 'Used', value: systemMetrics?.cpu, fill: '#DC2626' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Performance Monitoring</h3>
          <p className="text-sm text-muted-foreground">
            Real-time system health and performance metrics
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            iconName="RefreshCw"
            onClick={() => window.location?.reload()}
          >
            Refresh
          </Button>
          <Button
            variant="outline"
            iconName="Download"
            onClick={() => console.log('Exporting performance report')}
          >
            Export Report
          </Button>
        </div>
      </div>
      {/* System Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(systemMetrics)?.map(([key, value]) => (
          <div key={key} className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-foreground capitalize">{key} Usage</h4>
              <Icon 
                name={key === 'cpu' ? 'Cpu' : key === 'memory' ? 'HardDrive' : key === 'disk' ? 'Database' : 'Wifi'} 
                size={16} 
                className="text-muted-foreground" 
              />
            </div>
            <div className="flex items-end space-x-2">
              <span className={`text-2xl font-bold ${getMetricColor(value, key)}`}>
                {Math.round(value)}%
              </span>
            </div>
            <div className="mt-2 bg-muted rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-500 ${
                  getMetricColor(value, key) === 'text-error' ? 'bg-error' :
                  getMetricColor(value, key) === 'text-warning' ? 'bg-warning' : 'bg-success'
                }`}
                style={{ width: `${value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      {/* Connection Status */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="text-md font-semibold text-foreground mb-4">Connection Status</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(connectionStatus)?.map(([service, status]) => (
            <div key={service} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
              <Icon 
                name={getStatusIcon(status)} 
                size={20} 
                className={getStatusColor(status)}
              />
              <div>
                <div className="text-sm font-medium text-foreground capitalize">
                  {service?.replace(/([A-Z])/g, ' $1')?.trim()}
                </div>
                <div className={`text-xs ${getStatusColor(status)} capitalize`}>
                  {status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Activity Chart */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h4 className="text-md font-semibold text-foreground mb-4">User Activity</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={userActivity}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="time" stroke="#64748B" />
                <YAxis stroke="#64748B" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--color-popover)', 
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
                <Line type="monotone" dataKey="activeUsers" stroke="#1E3A8A" strokeWidth={2} name="Active Users" />
                <Line type="monotone" dataKey="decisions" stroke="#0EA5E9" strokeWidth={2} name="Decisions" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CPU Usage Pie Chart */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h4 className="text-md font-semibold text-foreground mb-4">CPU Usage Distribution</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieChartData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.fill} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--color-popover)', 
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* Performance Metrics */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="text-md font-semibold text-foreground mb-4">Performance Metrics</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {performanceData?.map((metric, index) => (
            <div key={index} className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-foreground mb-1">
                {metric?.value}
                <span className="text-sm font-normal text-muted-foreground ml-1">
                  {metric?.unit}
                </span>
              </div>
              <div className="text-sm text-muted-foreground mb-2">{metric?.name}</div>
              <div className={`text-xs font-medium ${getStatusColor(metric?.status)} capitalize`}>
                {metric?.status}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Service Health */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="text-md font-semibold text-foreground mb-4">Service Health</h4>
        <div className="space-y-3">
          {serviceHealth?.map((service, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon 
                  name={getStatusIcon(service?.status)} 
                  size={20} 
                  className={getStatusColor(service?.status)}
                />
                <div>
                  <div className="text-sm font-medium text-foreground">{service?.name}</div>
                  <div className="text-xs text-muted-foreground">
                    Last check: {new Date(service.lastCheck)?.toLocaleTimeString()}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-foreground">
                  {service?.responseTime}ms
                </div>
                <div className={`text-xs ${getStatusColor(service?.status)} capitalize`}>
                  {service?.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PerformanceMonitoringPanel;