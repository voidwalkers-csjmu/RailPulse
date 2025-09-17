import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ActionControlsPanel = ({ train, onAction }) => {
  const [activeAction, setActiveAction] = useState(null);
  const [actionData, setActionData] = useState({
    priority: train?.priority,
    speedLimit: train?.maxSpeed,
    route: train?.route,
    rationale: ''
  });
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);

  const priorityOptions = [
    { value: 'Low', label: 'Low Priority' },
    { value: 'Medium', label: 'Medium Priority' },
    { value: 'High', label: 'High Priority' },
    { value: 'Critical', label: 'Critical Priority' }
  ];

  const routeOptions = [
    { value: 'main', label: 'Main Line' },
    { value: 'alternate1', label: 'Alternate Route 1' },
    { value: 'alternate2', label: 'Alternate Route 2' },
    { value: 'bypass', label: 'Bypass Route' }
  ];

  const actionTypes = [
    {
      id: 'priority',
      label: 'Adjust Priority',
      icon: 'TrendingUp',
      description: 'Change train priority level',
      variant: 'primary',
      requiresRationale: true
    },
    {
      id: 'speed',
      label: 'Speed Restriction',
      icon: 'Gauge',
      description: 'Apply speed limitations',
      variant: 'warning',
      requiresRationale: true
    },
    {
      id: 'route',
      label: 'Route Modification',
      icon: 'Navigation',
      description: 'Change train route',
      variant: 'secondary',
      requiresRationale: true
    },
    {
      id: 'hold',
      label: 'Hold Position',
      icon: 'Pause',
      description: 'Stop train at current location',
      variant: 'warning',
      requiresRationale: true
    },
    {
      id: 'emergency',
      label: 'Emergency Stop',
      icon: 'AlertTriangle',
      description: 'Immediate emergency stop',
      variant: 'destructive',
      requiresRationale: true,
      isEmergency: true
    }
  ];

  const handleActionSelect = (actionId) => {
    const action = actionTypes?.find(a => a?.id === actionId);
    if (action?.isEmergency) {
      const confirmed = window.confirm(
        `EMERGENCY ACTION CONFIRMATION\n\nYou are about to execute: ${action?.label}\n\nThis action will immediately affect train operations and cannot be undone.\n\nConfirm emergency action?`
      );
      if (!confirmed) return;
      setIsEmergencyMode(true);
    }
    setActiveAction(actionId);
  };

  const handleActionSubmit = () => {
    if (!actionData?.rationale?.trim()) {
      alert('Please provide a rationale for this action.');
      return;
    }

    const actionDetails = {
      type: activeAction,
      trainId: train?.id,
      data: actionData,
      timestamp: new Date()?.toISOString(),
      controller: 'Current User'
    };

    if (onAction) {
      onAction(actionDetails);
    } else {
      console.log('Action submitted:', actionDetails);
    }

    // Reset form
    setActiveAction(null);
    setActionData({
      priority: train?.priority,
      speedLimit: train?.maxSpeed,
      route: train?.route,
      rationale: ''
    });
    setIsEmergencyMode(false);
  };

  const handleCancel = () => {
    setActiveAction(null);
    setIsEmergencyMode(false);
    setActionData({
      priority: train?.priority,
      speedLimit: train?.maxSpeed,
      route: train?.route,
      rationale: ''
    });
  };

  const getVariantStyles = (variant) => {
    switch (variant) {
      case 'destructive':
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

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Action Controls</h3>
        {isEmergencyMode && (
          <div className="flex items-center space-x-2 px-3 py-1 bg-error/10 border border-error/20 rounded-full">
            <Icon name="AlertTriangle" size={14} className="text-error" />
            <span className="text-xs font-medium text-error">EMERGENCY MODE</span>
          </div>
        )}
      </div>
      {!activeAction ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {actionTypes?.map((action) => (
            <button
              key={action?.id}
              onClick={() => handleActionSelect(action?.id)}
              className={`p-4 rounded-lg border transition-micro text-left ${getVariantStyles(action?.variant)}`}
            >
              <div className="flex items-center space-x-3 mb-2">
                <Icon name={action?.icon} size={20} />
                <span className="font-medium">{action?.label}</span>
              </div>
              <p className="text-sm opacity-80">{action?.description}</p>
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center space-x-3 p-4 bg-muted/50 rounded-lg">
            <Icon 
              name={actionTypes?.find(a => a?.id === activeAction)?.icon} 
              size={20} 
              className="text-primary"
            />
            <div>
              <h4 className="font-medium text-foreground">
                {actionTypes?.find(a => a?.id === activeAction)?.label}
              </h4>
              <p className="text-sm text-muted-foreground">
                {actionTypes?.find(a => a?.id === activeAction)?.description}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeAction === 'priority' && (
              <Select
                label="New Priority Level"
                options={priorityOptions}
                value={actionData?.priority}
                onChange={(value) => setActionData(prev => ({ ...prev, priority: value }))}
                required
              />
            )}

            {activeAction === 'speed' && (
              <Input
                label="Speed Limit (km/h)"
                type="number"
                value={actionData?.speedLimit}
                onChange={(e) => setActionData(prev => ({ ...prev, speedLimit: e?.target?.value }))}
                min="0"
                max={train?.maxSpeed}
                required
              />
            )}

            {activeAction === 'route' && (
              <Select
                label="New Route"
                options={routeOptions}
                value={actionData?.route}
                onChange={(value) => setActionData(prev => ({ ...prev, route: value }))}
                required
              />
            )}

            <div className="md:col-span-2">
              <Input
                label="Rationale"
                type="text"
                placeholder="Provide detailed reasoning for this action..."
                value={actionData?.rationale}
                onChange={(e) => setActionData(prev => ({ ...prev, rationale: e?.target?.value }))}
                description="Required: Explain the reason for this operational decision"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-border">
            <div className="text-sm text-muted-foreground">
              <Icon name="Info" size={14} className="inline mr-1" />
              This action will be logged in the audit trail with your user ID and timestamp.
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                variant={isEmergencyMode ? "destructive" : "default"}
                onClick={handleActionSubmit}
                iconName={isEmergencyMode ? "AlertTriangle" : "Check"}
                iconPosition="left"
              >
                {isEmergencyMode ? 'Execute Emergency Action' : 'Apply Action'}
              </Button>
            </div>
          </div>
        </div>
      )}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={16} className="text-success" />
            <span className="text-muted-foreground">Safety protocols active</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} className="text-primary" />
            <span className="text-muted-foreground">Actions logged in real-time</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Users" size={16} className="text-accent" />
            <span className="text-muted-foreground">Supervisor notification enabled</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionControlsPanel;