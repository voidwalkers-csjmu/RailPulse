import React from 'react';
import Icon from '../../../components/AppIcon';

const ScheduleTimeline = ({ schedule }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return { icon: 'CheckCircle', color: 'text-success' };
      case 'current':
        return { icon: 'Clock', color: 'text-primary' };
      case 'delayed':
        return { icon: 'AlertCircle', color: 'text-error' };
      case 'early':
        return { icon: 'TrendingUp', color: 'text-warning' };
      default:
        return { icon: 'Circle', color: 'text-muted-foreground' };
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success/10 border-success/20';
      case 'current':
        return 'bg-primary/10 border-primary/20';
      case 'delayed':
        return 'bg-error/10 border-error/20';
      case 'early':
        return 'bg-warning/10 border-warning/20';
      default:
        return 'bg-muted border-border';
    }
  };

  const formatTime = (timeString) => {
    return new Date(timeString)?.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const calculateDelay = (scheduled, actual) => {
    const scheduledTime = new Date(scheduled);
    const actualTime = new Date(actual);
    const diffMinutes = Math.round((actualTime - scheduledTime) / (1000 * 60));
    return diffMinutes;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Schedule Timeline</h3>
        <div className="flex items-center space-x-4 text-xs">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span className="text-muted-foreground">Completed</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span className="text-muted-foreground">Current</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-error rounded-full"></div>
            <span className="text-muted-foreground">Delayed</span>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        {schedule?.map((stop, index) => {
          const statusInfo = getStatusIcon(stop?.status);
          const delay = stop?.actualTime ? calculateDelay(stop?.scheduledTime, stop?.actualTime) : 0;
          
          return (
            <div key={index} className="relative">
              {/* Timeline line */}
              {index < schedule?.length - 1 && (
                <div className="absolute left-4 top-8 w-0.5 h-16 bg-border"></div>
              )}
              <div className={`flex items-start space-x-4 p-4 rounded-lg border ${getStatusColor(stop?.status)}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  stop?.status === 'completed' ? 'bg-success' :
                  stop?.status === 'current' ? 'bg-primary' :
                  stop?.status === 'delayed' ? 'bg-error' :
                  stop?.status === 'early' ? 'bg-warning' : 'bg-muted'
                }`}>
                  <Icon 
                    name={statusInfo?.icon} 
                    size={16} 
                    color="white"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-semibold text-foreground">{stop?.station}</h4>
                    <div className="flex items-center space-x-2">
                      {stop?.platform && (
                        <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                          Platform {stop?.platform}
                        </span>
                      )}
                      <span className="text-xs text-muted-foreground">
                        {stop?.distance} km
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Scheduled:</span>
                      <div className="font-medium text-foreground">
                        Arr: {formatTime(stop?.scheduledTime)}
                        {stop?.departureTime && (
                          <span className="ml-2">Dep: {formatTime(stop?.departureTime)}</span>
                        )}
                      </div>
                    </div>

                    {stop?.actualTime && (
                      <div>
                        <span className="text-muted-foreground">Actual:</span>
                        <div className="font-medium text-foreground">
                          {formatTime(stop?.actualTime)}
                          {delay !== 0 && (
                            <span className={`ml-2 text-xs ${delay > 0 ? 'text-error' : 'text-success'}`}>
                              ({delay > 0 ? '+' : ''}{delay}min)
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    <div>
                      <span className="text-muted-foreground">Duration:</span>
                      <div className="font-medium text-foreground">
                        {stop?.stopDuration || '2'} min
                      </div>
                    </div>
                  </div>

                  {stop?.notes && (
                    <div className="mt-2 text-xs text-muted-foreground">
                      <Icon name="Info" size={12} className="inline mr-1" />
                      {stop?.notes}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Total Distance:</span>
            <div className="font-semibold text-foreground">
              {schedule?.[schedule?.length - 1]?.distance || 0} km
            </div>
          </div>
          <div>
            <span className="text-muted-foreground">Total Stops:</span>
            <div className="font-semibold text-foreground">{schedule?.length}</div>
          </div>
          <div>
            <span className="text-muted-foreground">Completed:</span>
            <div className="font-semibold text-success">
              {schedule?.filter(s => s?.status === 'completed')?.length}
            </div>
          </div>
          <div>
            <span className="text-muted-foreground">Remaining:</span>
            <div className="font-semibold text-primary">
              {schedule?.filter(s => s?.status === 'pending')?.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleTimeline;