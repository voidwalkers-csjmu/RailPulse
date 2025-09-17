import React from 'react';
import Icon from '../../../components/AppIcon';

const TrainInfoPanel = ({ train }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'text-error bg-error/10 border-error/20';
      case 'Medium':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'Low':
        return 'text-success bg-success/10 border-success/20';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Passenger':
        return 'Users';
      case 'Freight':
        return 'Package';
      case 'Express':
        return 'Zap';
      default:
        return 'Train';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Icon name={getTypeIcon(train?.type)} size={20} color="white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">{train?.number}</h2>
            <p className="text-sm text-muted-foreground">{train?.name}</p>
          </div>
        </div>
        
        <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(train?.priority)}`}>
          {train?.priority} Priority
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-foreground uppercase tracking-wider">Basic Information</h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Type</span>
              <span className="text-sm font-medium text-foreground">{train?.type}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Length</span>
              <span className="text-sm font-medium text-foreground">{train?.length}m</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Max Speed</span>
              <span className="text-sm font-medium text-foreground">{train?.maxSpeed} km/h</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Capacity</span>
              <span className="text-sm font-medium text-foreground">{train?.capacity}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium text-foreground uppercase tracking-wider">Route Information</h3>
          
          <div className="space-y-3">
            <div>
              <span className="text-sm text-muted-foreground">Origin</span>
              <div className="flex items-center space-x-2 mt-1">
                <Icon name="MapPin" size={14} className="text-success" />
                <span className="text-sm font-medium text-foreground">{train?.origin}</span>
              </div>
            </div>
            
            <div>
              <span className="text-sm text-muted-foreground">Destination</span>
              <div className="flex items-center space-x-2 mt-1">
                <Icon name="Flag" size={14} className="text-error" />
                <span className="text-sm font-medium text-foreground">{train?.destination}</span>
              </div>
            </div>
            
            <div>
              <span className="text-sm text-muted-foreground">Current Location</span>
              <div className="flex items-center space-x-2 mt-1">
                <Icon name="Navigation" size={14} className="text-primary" />
                <span className="text-sm font-medium text-foreground">{train?.currentLocation}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium text-foreground uppercase tracking-wider">Operational Details</h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Operator</span>
              <span className="text-sm font-medium text-foreground">{train?.operator}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Service Class</span>
              <span className="text-sm font-medium text-foreground">{train?.serviceClass}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Track Assignment</span>
              <span className="text-sm font-medium text-foreground">Track {train?.trackNumber}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Driver ID</span>
              <span className="text-sm font-medium text-foreground">{train?.driverId}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainInfoPanel;