import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const NotificationSystem = () => {
  const [notifications, setNotifications] = useState([]);
  const [isVisible, setIsVisible] = useState(true);

  const notificationTypes = {
    critical: {
      icon: 'AlertTriangle',
      color: 'text-error',
      bgColor: 'bg-error/10',
      borderColor: 'border-error/20'
    },
    warning: {
      icon: 'AlertCircle',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      borderColor: 'border-warning/20'
    },
    info: {
      icon: 'Info',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      borderColor: 'border-accent/20'
    },
    success: {
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/10',
      borderColor: 'border-success/20'
    }
  };

  const sampleNotifications = [
    {
      id: 'N001',
      type: 'critical',
      title: 'Emergency Override Required',
      message: 'Train T001 approaching occupied section. Immediate action required.',
      timestamp: new Date(),
      autoClose: false,
      actions: [
        { label: 'Emergency Stop', action: () => console.log('Emergency stop activated') },
        { label: 'Override', action: () => console.log('Override activated') }
      ]
    },
    {
      id: 'N002',
      type: 'warning',
      title: 'Schedule Conflict Detected',
      message: 'Potential delay for Express 101 due to freight train precedence.',
      timestamp: new Date(Date.now() - 30000),
      autoClose: true,
      duration: 10000
    },
    {
      id: 'N003',
      type: 'info',
      title: 'System Update',
      message: 'AI recommendation engine updated with new optimization algorithms.',
      timestamp: new Date(Date.now() - 120000),
      autoClose: true,
      duration: 8000
    }
  ];

  useEffect(() => {
    // Simulate real-time notifications
    const interval = setInterval(() => {
      const randomNotifications = [
        {
          id: `N${Date.now()}`,
          type: 'info',
          title: 'Train Status Update',
          message: `Train T00${Math.floor(Math.random() * 9) + 1} status updated to on-time.`,
          timestamp: new Date(),
          autoClose: true,
          duration: 5000
        },
        {
          id: `N${Date.now()}`,
          type: 'warning',
          title: 'Weather Alert',
          message: 'Heavy rain detected. Monitor train speeds in affected sections.',
          timestamp: new Date(),
          autoClose: true,
          duration: 8000
        }
      ];

      if (Math.random() > 0.7) { // 30% chance every interval
        const notification = randomNotifications?.[Math.floor(Math.random() * randomNotifications?.length)];
        setNotifications(prev => [notification, ...prev?.slice(0, 4)]); // Keep max 5 notifications
      }
    }, 15000);

    // Initialize with sample notifications
    setNotifications(sampleNotifications);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Auto-close notifications
    notifications?.forEach(notification => {
      if (notification?.autoClose && notification?.duration) {
        const timer = setTimeout(() => {
          removeNotification(notification?.id);
        }, notification?.duration);

        return () => clearTimeout(timer);
      }
    });
  }, [notifications]);

  const removeNotification = (id) => {
    setNotifications(prev => prev?.filter(n => n?.id !== id));
  };

  const handleAction = (action, notificationId) => {
    action();
    removeNotification(notificationId);
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    return timestamp?.toLocaleTimeString('en-US', { hour12: false });
  };

  if (!isVisible || notifications?.length === 0) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed top-4 right-4 p-3 bg-primary text-primary-foreground rounded-full shadow-modal hover:bg-primary/90 transition-micro z-300"
        title="Show notifications"
      >
        <Icon name="Bell" size={20} />
        {notifications?.length > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-error-foreground text-xs rounded-full flex items-center justify-center">
            {notifications?.length}
          </span>
        )}
      </button>
    );
  }

  return (
    <div className="fixed top-4 right-4 w-96 z-300 space-y-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-foreground">System Notifications</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="p-1 rounded-md hover:bg-muted transition-micro"
        >
          <Icon name="X" size={14} className="text-muted-foreground" />
        </button>
      </div>
      {notifications?.map((notification) => {
        const typeConfig = notificationTypes?.[notification?.type];
        
        return (
          <div
            key={notification?.id}
            className={`p-4 rounded-lg border backdrop-blur-glass shadow-modal ${typeConfig?.bgColor} ${typeConfig?.borderColor} animate-in slide-in-from-right duration-300`}
          >
            <div className="flex items-start space-x-3">
              <Icon 
                name={typeConfig?.icon} 
                size={20} 
                className={`${typeConfig?.color} flex-shrink-0 mt-0.5`}
              />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-medium text-foreground truncate">
                    {notification?.title}
                  </h4>
                  <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                    {formatTimestamp(notification?.timestamp)}
                  </span>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">
                  {notification?.message}
                </p>
                
                <div className="flex items-center justify-between">
                  {notification?.actions ? (
                    <div className="flex space-x-2">
                      {notification?.actions?.map((action, index) => (
                        <button
                          key={index}
                          onClick={() => handleAction(action?.action, notification?.id)}
                          className={`px-3 py-1 text-xs font-medium rounded-md transition-micro ${
                            index === 0 
                              ? `${typeConfig?.color} bg-background hover:bg-muted`
                              : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                          }`}
                        >
                          {action?.label}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div></div>
                  )}
                  
                  <button
                    onClick={() => removeNotification(notification?.id)}
                    className="p-1 rounded-md hover:bg-muted transition-micro"
                  >
                    <Icon name="X" size={12} className="text-muted-foreground" />
                  </button>
                </div>
              </div>
            </div>
            {/* Auto-close progress bar */}
            {notification?.autoClose && notification?.duration && (
              <div className="mt-3 w-full bg-border rounded-full h-1">
                <div
                  className={`h-1 rounded-full ${typeConfig?.color?.replace('text-', 'bg-')} animate-pulse`}
                  style={{
                    animation: `shrink ${notification?.duration}ms linear forwards`
                  }}
                ></div>
              </div>
            )}
          </div>
        );
      })}
      <style jsx>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
        
        @keyframes slide-in-from-right {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .animate-in {
          animation-fill-mode: both;
        }
        
        .slide-in-from-right {
          animation-name: slide-in-from-right;
        }
      `}</style>
    </div>
  );
};

export default NotificationSystem;