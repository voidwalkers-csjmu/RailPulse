import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const QuickActionPanel = ({ 
  isVisible = true, 
  position = 'sidebar', // 'sidebar' | 'floating'
  onEmergencyOverride,
  onSystemAlert,
  onBulkDecision,
  className = '' 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeAlerts, setActiveAlerts] = useState(3);
  const [systemStatus, setSystemStatus] = useState('operational');

  const quickActions = [
    {
      id: 'emergency',
      label: 'Emergency Override',
      icon: 'AlertTriangle',
      description: 'Activate emergency protocols',
      variant: 'emergency',
      requiresConfirmation: true,
      action: onEmergencyOverride || (() => {
        const confirmed = window.confirm(
          'EMERGENCY OVERRIDE\n\nThis will activate emergency protocols and notify all supervisors.\n\nConfirm activation?'
        );
        if (confirmed) {
          console.log('Emergency override activated');
          setSystemStatus('emergency');
        }
      })
    },
    {
      id: 'system-alert',
      label: 'System Alert',
      icon: 'Bell',
      description: 'Broadcast system-wide alert',
      variant: 'warning',
      badge: activeAlerts > 0 ? activeAlerts : null,
      action: onSystemAlert || (() => {
        console.log('System alert panel opened');
        setActiveAlerts(prev => prev + 1);
      })
    },
    {
      id: 'bulk-decision',
      label: 'Bulk Decision',
      icon: 'Layers',
      description: 'Manage multiple decisions',
      variant: 'primary',
      action: onBulkDecision || (() => {
        console.log('Bulk decision management opened');
      })
    },
    {
      id: 'communication',
      label: 'Emergency Comms',
      icon: 'Radio',
      description: 'Direct communication channel',
      variant: 'secondary',
      action: () => {
        console.log('Emergency communication channel opened');
      }
    }
  ];

  const getVariantStyles = (variant) => {
    switch (variant) {
      case 'emergency':
        return 'bg-error text-error-foreground hover:bg-error/90 border-error/20';
      case 'warning':
        return 'bg-warning text-warning-foreground hover:bg-warning/90 border-warning/20';
      case 'primary':
        return 'bg-primary text-primary-foreground hover:bg-primary/90 border-primary/20';
      case 'secondary':
        return 'bg-secondary text-secondary-foreground hover:bg-secondary/90 border-secondary/20';
      default:
        return 'bg-muted text-muted-foreground hover:bg-muted/90 border-border';
    }
  };

  const getSystemStatusColor = () => {
    switch (systemStatus) {
      case 'operational':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'emergency':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const handleQuickAction = (action) => {
    if (action?.requiresConfirmation) {
      action?.action();
    } else {
      action?.action();
    }
  };

  if (!isVisible) return null;

  if (position === 'floating') {
    return (
      <div className={`fixed bottom-6 right-6 z-300 ${className}`}>
        <div className="relative">
          <Button
            variant="default"
            size="lg"
            iconName="Zap"
            onClick={() => setIsExpanded(!isExpanded)}
            className="rounded-full shadow-modal bg-primary hover:bg-primary/90"
          >
            {!isExpanded && 'Quick Actions'}
          </Button>

          {isExpanded && (
            <div className="absolute bottom-full right-0 mb-4 w-64 bg-popover border border-border rounded-lg shadow-modal backdrop-blur-glass">
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-popover-foreground">Quick Actions</h3>
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="p-1 rounded-md hover:bg-muted transition-micro"
                  >
                    <Icon name="X" size={14} />
                  </button>
                </div>

                <div className="space-y-2">
                  {quickActions?.map((action) => (
                    <button
                      key={action?.id}
                      onClick={() => handleQuickAction(action)}
                      className={`flex items-center w-full p-3 rounded-lg border transition-micro ${getVariantStyles(action?.variant)}`}
                    >
                      <div className="relative">
                        <Icon name={action?.icon} size={16} className="mr-3" />
                        {action?.badge && (
                          <span className="absolute -top-1 -right-1 w-4 h-4 bg-error text-error-foreground text-xs rounded-full flex items-center justify-center">
                            {action?.badge}
                          </span>
                        )}
                      </div>
                      <div className="text-left">
                        <div className="text-sm font-medium">{action?.label}</div>
                        <div className="text-xs opacity-80">{action?.description}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Sidebar position (default)
  return (
    <div className={`bg-card border border-border rounded-lg p-4 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Zap" size={16} className="text-accent" />
          <h3 className="text-sm font-semibold text-foreground">Quick Actions</h3>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${getSystemStatusColor()} animate-pulse-slow`}></div>
          <span className={`text-xs font-medium ${getSystemStatusColor()}`}>
            {systemStatus?.charAt(0)?.toUpperCase() + systemStatus?.slice(1)}
          </span>
        </div>
      </div>
      <div className="space-y-2">
        {quickActions?.map((action) => (
          <button
            key={action?.id}
            onClick={() => handleQuickAction(action)}
            className={`flex items-center w-full p-3 rounded-lg border transition-micro ${getVariantStyles(action?.variant)}`}
            title={action?.description}
          >
            <div className="relative">
              <Icon name={action?.icon} size={16} className="mr-3" />
              {action?.badge && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-error text-error-foreground text-xs rounded-full flex items-center justify-center">
                  {action?.badge}
                </span>
              )}
            </div>
            <div className="flex-1 text-left">
              <div className="text-sm font-medium">{action?.label}</div>
              <div className="text-xs opacity-80">{action?.description}</div>
            </div>
            <Icon name="ChevronRight" size={14} className="opacity-60" />
          </button>
        ))}
      </div>
      {/* System Status Summary */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Active Alerts</span>
          <span className="font-medium text-foreground">{activeAlerts}</span>
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
          <span>System Load</span>
          <span className="font-medium text-success">Normal</span>
        </div>
      </div>
    </div>
  );
};

export default QuickActionPanel;