import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SystemStatus = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [systemMetrics, setSystemMetrics] = useState({
    activeControllers: 12,
    systemLoad: 'Normal',
    lastUpdate: new Date(),
    connectionStatus: 'Connected'
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      setSystemMetrics(prev => ({
        ...prev,
        lastUpdate: new Date()
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date?.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'connected': case'normal':
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
    switch (status?.toLowerCase()) {
      case 'connected':
        return 'Wifi';
      case 'normal':
        return 'CheckCircle';
      case 'warning':
        return 'AlertTriangle';
      case 'error': case'disconnected':
        return 'AlertCircle';
      default:
        return 'Circle';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center space-x-2">
        <Icon name="Activity" size={16} className="text-accent" />
        <h3 className="text-sm font-semibold text-foreground">System Status</h3>
      </div>
      {/* Current Time */}
      <div className="bg-muted/50 rounded-lg p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={14} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Current Time</span>
          </div>
          <div className="text-right">
            <div className="text-sm font-mono font-semibold text-foreground">
              {formatTime(currentTime)}
            </div>
            <div className="text-xs text-muted-foreground">
              {formatDate(currentTime)}
            </div>
          </div>
        </div>
      </div>
      {/* System Metrics */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon 
              name={getStatusIcon(systemMetrics?.connectionStatus)} 
              size={14} 
              className={getStatusColor(systemMetrics?.connectionStatus)}
            />
            <span className="text-xs text-muted-foreground">Connection</span>
          </div>
          <span className={`text-xs font-medium ${getStatusColor(systemMetrics?.connectionStatus)}`}>
            {systemMetrics?.connectionStatus}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon 
              name={getStatusIcon(systemMetrics?.systemLoad)} 
              size={14} 
              className={getStatusColor(systemMetrics?.systemLoad)}
            />
            <span className="text-xs text-muted-foreground">System Load</span>
          </div>
          <span className={`text-xs font-medium ${getStatusColor(systemMetrics?.systemLoad)}`}>
            {systemMetrics?.systemLoad}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Users" size={14} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Active Controllers</span>
          </div>
          <span className="text-xs font-medium text-foreground">
            {systemMetrics?.activeControllers}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="RefreshCw" size={14} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Last Update</span>
          </div>
          <span className="text-xs font-medium text-foreground">
            {formatTime(systemMetrics?.lastUpdate)}
          </span>
        </div>
      </div>
      {/* Status Indicator */}
      <div className="flex items-center justify-center space-x-2 pt-2 border-t border-border">
        <div className="w-2 h-2 bg-success rounded-full animate-pulse-slow"></div>
        <span className="text-xs text-success font-medium">All Systems Operational</span>
      </div>
    </div>
  );
};

export default SystemStatus;