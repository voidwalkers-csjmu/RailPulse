import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DemoCredentials = ({ onCredentialSelect }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const demoCredentials = [
    {
      username: 'controller.smith',
      password: 'RailCtrl2024!',
      role: 'Senior Traffic Controller',
      description: 'Full operational control access',
      icon: 'Train',
      color: 'text-primary'
    },
    {
      username: 'supervisor.jones',
      password: 'SuperRail2024!',
      role: 'Operations Supervisor',
      description: 'Oversight and management functions',
      icon: 'Users',
      color: 'text-accent'
    },
    {
      username: 'admin.wilson',
      password: 'AdminRail2024!',
      role: 'System Administrator',
      description: 'System configuration and user management',
      icon: 'Settings',
      color: 'text-secondary'
    }
  ];

  const handleCredentialClick = (credential) => {
    if (onCredentialSelect) {
      onCredentialSelect(credential?.username, credential?.password);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard?.writeText(text)?.then(() => {
      // Could add a toast notification here
      console.log('Copied to clipboard:', text);
    });
  };

  return (
    <div className="bg-muted/30 border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Icon name="Key" size={16} className="text-accent" />
          <h3 className="text-sm font-semibold text-foreground">Demo Access</h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Hide' : 'Show'}
        </Button>
      </div>
      {isExpanded && (
        <div className="space-y-3">
          <p className="text-xs text-muted-foreground mb-4">
            Click on any credential below to auto-fill the login form:
          </p>

          {demoCredentials?.map((credential, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-lg p-3 hover:bg-muted/50 transition-micro cursor-pointer"
              onClick={() => handleCredentialClick(credential)}
            >
              <div className="flex items-start space-x-3">
                <div className={`w-8 h-8 bg-muted rounded-full flex items-center justify-center`}>
                  <Icon name={credential?.icon} size={16} className={credential?.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="text-sm font-medium text-foreground">{credential?.role}</h4>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{credential?.description}</p>
                  
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-muted-foreground">Username:</span>
                      <code className="text-xs bg-muted px-2 py-1 rounded font-mono">
                        {credential?.username}
                      </code>
                      <button
                        onClick={(e) => {
                          e?.stopPropagation();
                          copyToClipboard(credential?.username);
                        }}
                        className="p-1 hover:bg-muted rounded transition-micro"
                      >
                        <Icon name="Copy" size={12} className="text-muted-foreground" />
                      </button>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-muted-foreground">Password:</span>
                      <code className="text-xs bg-muted px-2 py-1 rounded font-mono">
                        {credential?.password}
                      </code>
                      <button
                        onClick={(e) => {
                          e?.stopPropagation();
                          copyToClipboard(credential?.password);
                        }}
                        className="p-1 hover:bg-muted rounded transition-micro"
                      >
                        <Icon name="Copy" size={12} className="text-muted-foreground" />
                      </button>
                    </div>
                  </div>
                </div>
                
                <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
              </div>
            </div>
          ))}

          <div className="mt-4 p-3 bg-warning/10 border border-warning/20 rounded-lg">
            <div className="flex items-start space-x-2">
              <Icon name="AlertTriangle" size={14} className="text-warning mt-0.5" />
              <div>
                <p className="text-xs text-warning font-medium mb-1">Demo Environment</p>
                <p className="text-xs text-muted-foreground">
                  These credentials are for demonstration purposes only. In production, use your assigned railway system credentials.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DemoCredentials;