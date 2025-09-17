import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const NavigationHeader = ({ user, onLogout, className = '' }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Simulate WebSocket connection monitoring
    const checkConnection = () => {
      // In real implementation, this would check actual WebSocket status
      const isOnline = navigator.onLine;
      setConnectionStatus(isOnline ? 'connected' : 'disconnected');
    };

    window.addEventListener('online', checkConnection);
    window.addEventListener('offline', checkConnection);
    checkConnection();

    return () => {
      window.removeEventListener('online', checkConnection);
      window.removeEventListener('offline', checkConnection);
    };
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

  const getConnectionStatusColor = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'text-success';
      case 'disconnected':
        return 'text-error';
      case 'reconnecting':
        return 'text-warning';
      default:
        return 'text-muted-foreground';
    }
  };

  const getConnectionStatusIcon = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'Wifi';
      case 'disconnected':
        return 'WifiOff';
      case 'reconnecting':
        return 'RotateCw';
      default:
        return 'Wifi';
    }
  };

  const handleEmergencyAlert = () => {
    const confirmed = window.confirm('Activate system-wide emergency alert? This will notify all controllers and supervisors.');
    if (confirmed) {
      console.log('Emergency alert activated');
      // In real implementation, this would trigger emergency protocols
    }
  };

  const defaultUser = {
    name: 'Controller Smith',
    role: 'Senior Traffic Controller',
    id: 'TC001',
    shift: 'Day Shift',
    avatar: null
  };

  const currentUser = user || defaultUser;

  return (
    <header className={`bg-card border-b border-border shadow-card ${className}`}>
      <div className="flex items-center justify-between px-6 py-3">
        {/* Left Section - System Status */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Icon 
              name={getConnectionStatusIcon()} 
              size={16} 
              className={`${getConnectionStatusColor()} ${connectionStatus === 'reconnecting' ? 'animate-spin' : ''}`}
            />
            <span className={`text-sm font-medium ${getConnectionStatusColor()}`}>
              {connectionStatus === 'connected' ? 'Online' : 
               connectionStatus === 'disconnected' ? 'Offline' : 'Reconnecting...'}
            </span>
          </div>
          
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Icon name="Clock" size={16} />
            <div className="text-sm">
              <span className="font-mono font-medium text-foreground">{formatTime(currentTime)}</span>
              <span className="ml-2">{formatDate(currentTime)}</span>
            </div>
          </div>
        </div>

        {/* Center Section - Emergency Controls */}
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            iconName="AlertTriangle"
            iconPosition="left"
            onClick={handleEmergencyAlert}
            className="border-warning text-warning hover:bg-warning hover:text-warning-foreground"
          >
            Emergency Alert
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            iconName="Radio"
            iconPosition="left"
            onClick={() => console.log('Communication panel opened')}
          >
            Comms
          </Button>
        </div>

        {/* Right Section - User Info */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="Users" size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Active Controllers: <span className="font-medium text-foreground">12</span>
            </span>
          </div>

          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-muted transition-micro"
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              <div className="text-left">
                <div className="text-sm font-medium text-foreground">{currentUser?.name}</div>
                <div className="text-xs text-muted-foreground">{currentUser?.role}</div>
              </div>
              <Icon name="ChevronDown" size={16} className="text-muted-foreground" />
            </button>

            {/* User Dropdown Menu */}
            {isUserMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-popover border border-border rounded-lg shadow-modal z-200">
                <div className="p-4 border-b border-border">
                  <div className="text-sm font-medium text-popover-foreground">{currentUser?.name}</div>
                  <div className="text-xs text-muted-foreground">{currentUser?.role}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    ID: {currentUser?.id} • {currentUser?.shift}
                  </div>
                </div>
                
                <div className="p-2">
                  <button
                    onClick={() => {
                      console.log('Profile settings opened');
                      setIsUserMenuOpen(false);
                    }}
                    className="flex items-center w-full px-3 py-2 text-sm text-popover-foreground hover:bg-muted rounded-md transition-micro"
                  >
                    <Icon name="Settings" size={16} className="mr-3" />
                    Profile Settings
                  </button>
                  
                  <button
                    onClick={() => {
                      console.log('Shift handover initiated');
                      setIsUserMenuOpen(false);
                    }}
                    className="flex items-center w-full px-3 py-2 text-sm text-popover-foreground hover:bg-muted rounded-md transition-micro"
                  >
                    <Icon name="RefreshCw" size={16} className="mr-3" />
                    Shift Handover
                  </button>
                  
                  <div className="border-t border-border my-2"></div>
                  
                  <button
                    onClick={() => {
                      if (onLogout) {
                        onLogout();
                      } else {
                        console.log('Logout initiated');
                      }
                      setIsUserMenuOpen(false);
                    }}
                    className="flex items-center w-full px-3 py-2 text-sm text-error hover:bg-error/10 rounded-md transition-micro"
                  >
                    <Icon name="LogOut" size={16} className="mr-3" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Click outside to close dropdown */}
      {isUserMenuOpen && (
        <div
          className="fixed inset-0 z-100"
          onClick={() => setIsUserMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default NavigationHeader;