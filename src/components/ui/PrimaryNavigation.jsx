import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const PrimaryNavigation = ({ isCollapsed = false, onToggleCollapse }) => {
  const location = useLocation();
  const [isQuickActionExpanded, setIsQuickActionExpanded] = useState(false);

  const navigationItems = [
    {
      category: 'Dashboard',
      items: [
        {
          label: 'Main Control Dashboard',
          path: '/main-control-dashboard',
          icon: 'LayoutDashboard',
          tooltip: 'Real-time operational command center'
        }
      ]
    },
    {
      category: 'Operations',
      items: [
        {
          label: 'Train Details',
          path: '/train-details',
          icon: 'Train',
          tooltip: 'Active train management and tracking'
        },
        {
          label: 'Decision Simulation',
          path: '/decision-simulation',
          icon: 'GitBranch',
          tooltip: 'Scenario testing and decision modeling'
        }
      ]
    },
    {
      category: 'Reports',
      items: [
        {
          label: 'Audit Trail',
          path: '/audit-trail',
          icon: 'FileText',
          tooltip: 'Historical analysis and compliance documentation'
        }
      ]
    },
    {
      category: 'Administration',
      items: [
        {
          label: 'System Administration',
          path: '/system-administration',
          icon: 'Settings',
          tooltip: 'System configuration and user management'
        }
      ]
    }
  ];

  const quickActions = [
    {
      label: 'Emergency Override',
      icon: 'AlertTriangle',
      action: () => console.log('Emergency override activated'),
      variant: 'emergency'
    },
    {
      label: 'System Alert',
      icon: 'Bell',
      action: () => console.log('System alert triggered'),
      variant: 'warning'
    },
    {
      label: 'Bulk Decision',
      icon: 'Layers',
      action: () => console.log('Bulk decision panel opened'),
      variant: 'primary'
    }
  ];

  const isActiveRoute = (path) => {
    return location?.pathname === path;
  };

  const handleQuickAction = (action, variant) => {
    if (variant === 'emergency') {
      const confirmed = window.confirm('Are you sure you want to activate emergency override? This action requires supervisor approval.');
      if (confirmed) {
        action();
      }
    } else {
      action();
    }
  };

  return (
    <nav className={`fixed left-0 top-0 h-full bg-card border-r border-border z-100 transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-60'
    }`}>
      <div className="flex flex-col h-full">
        {/* Logo Section */}
        <div className="flex items-center p-4 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Train" size={20} color="white" />
            </div>
            {!isCollapsed && (
              <div>
                <h1 className="text-lg font-semibold text-foreground">RailControl</h1>
                <p className="text-xs text-muted-foreground">Pro</p>
              </div>
            )}
          </div>
          {onToggleCollapse && (
            <button
              onClick={onToggleCollapse}
              className="ml-auto p-1 rounded-md hover:bg-muted transition-micro"
            >
              <Icon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} size={16} />
            </button>
          )}
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto py-4">
          {navigationItems?.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-6">
              {!isCollapsed && (
                <h3 className="px-4 mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {category?.category}
                </h3>
              )}
              <div className="space-y-1">
                {category?.items?.map((item, itemIndex) => (
                  <Link
                    key={itemIndex}
                    to={item?.path}
                    className={`flex items-center px-4 py-2 mx-2 rounded-lg transition-micro group relative ${
                      isActiveRoute(item?.path)
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground hover:bg-muted hover:text-foreground'
                    }`}
                    title={isCollapsed ? item?.tooltip : ''}
                  >
                    <Icon 
                      name={item?.icon} 
                      size={20} 
                      className={`${isCollapsed ? 'mx-auto' : 'mr-3'}`}
                    />
                    {!isCollapsed && (
                      <span className="text-sm font-medium">{item?.label}</span>
                    )}
                    
                    {/* Tooltip for collapsed state */}
                    {isCollapsed && (
                      <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded-md shadow-modal opacity-0 group-hover:opacity-100 transition-tooltip pointer-events-none whitespace-nowrap z-200">
                        {item?.label}
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Action Panel */}
        <div className="border-t border-border p-4">
          {!isCollapsed && (
            <div className="mb-3">
              <button
                onClick={() => setIsQuickActionExpanded(!isQuickActionExpanded)}
                className="flex items-center justify-between w-full text-xs font-medium text-muted-foreground uppercase tracking-wider hover:text-foreground transition-micro"
              >
                Quick Actions
                <Icon 
                  name={isQuickActionExpanded ? "ChevronUp" : "ChevronDown"} 
                  size={14} 
                />
              </button>
            </div>
          )}
          
          <div className={`space-y-2 ${isCollapsed ? 'block' : isQuickActionExpanded ? 'block' : 'hidden'}`}>
            {quickActions?.map((action, index) => (
              <button
                key={index}
                onClick={() => handleQuickAction(action?.action, action?.variant)}
                className={`flex items-center w-full px-3 py-2 rounded-lg text-sm font-medium transition-micro ${
                  action?.variant === 'emergency' ?'bg-error text-error-foreground hover:bg-error/90'
                    : action?.variant === 'warning' ?'bg-warning text-warning-foreground hover:bg-warning/90' :'bg-accent text-accent-foreground hover:bg-accent/90'
                } ${isCollapsed ? 'justify-center' : 'justify-start'}`}
                title={isCollapsed ? action?.label : ''}
              >
                <Icon 
                  name={action?.icon} 
                  size={16} 
                  className={isCollapsed ? '' : 'mr-2'}
                />
                {!isCollapsed && action?.label}
              </button>
            ))}
          </div>
        </div>

        {/* System Status Indicator */}
        <div className="border-t border-border p-4">
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-2'}`}>
            <div className="w-2 h-2 bg-success rounded-full animate-pulse-slow"></div>
            {!isCollapsed && (
              <span className="text-xs text-muted-foreground">System Online</span>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default PrimaryNavigation;