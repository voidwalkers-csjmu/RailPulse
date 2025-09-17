import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const RealTimeStatusPanel = ({ train }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [liveData, setLiveData] = useState({
    currentSpeed: train?.currentSpeed,
    delay: train?.delay,
    nextStation: train?.nextStation,
    estimatedArrival: train?.estimatedArrival
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      
      // Simulate live data updates
      setLiveData(prev => ({
        ...prev,
        currentSpeed: Math.max(0, prev?.currentSpeed + (Math.random() - 0.5) * 10),
        delay: prev?.delay + (Math.random() - 0.7) * 0.5
      }));
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'On Time':
        return 'text-success bg-success/10 border-success/20';
      case 'Delayed':
        return 'text-error bg-error/10 border-error/20';
      case 'Early':
        return 'text-warning bg-warning/10 border-warning/20';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getDelayStatus = (delay) => {
    if (delay <= 0) return 'On Time';
    if (delay <= 5) return 'Minor Delay';
    if (delay <= 15) return 'Delayed';
    return 'Severely Delayed';
  };

  const formatTime = (timeString) => {
    return new Date(timeString)?.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Real-Time Status</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse-slow"></div>
          <span className="text-xs text-muted-foreground">Live</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Icon name="Gauge" size={16} className="text-primary" />
            <span className="text-sm font-medium text-foreground">Current Speed</span>
          </div>
          <div className="text-2xl font-bold text-foreground">
            {Math.round(liveData?.currentSpeed)} <span className="text-sm font-normal text-muted-foreground">km/h</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${(liveData?.currentSpeed / train?.maxSpeed) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} className="text-warning" />
            <span className="text-sm font-medium text-foreground">Delay Status</span>
          </div>
          <div className="text-2xl font-bold text-foreground">
            {Math.abs(Math.round(liveData?.delay))} <span className="text-sm font-normal text-muted-foreground">min</span>
          </div>
          <div className={`px-2 py-1 rounded-full text-xs font-medium border inline-block ${getStatusColor(getDelayStatus(liveData?.delay))}`}>
            {getDelayStatus(liveData?.delay)}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Icon name="MapPin" size={16} className="text-accent" />
            <span className="text-sm font-medium text-foreground">Next Station</span>
          </div>
          <div className="text-lg font-semibold text-foreground">{liveData?.nextStation}</div>
          <div className="text-sm text-muted-foreground">
            ETA: {formatTime(liveData?.estimatedArrival)}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Icon name="Calendar" size={16} className="text-secondary" />
            <span className="text-sm font-medium text-foreground">Schedule</span>
          </div>
          <div className="space-y-1">
            <div className="text-sm">
              <span className="text-muted-foreground">Scheduled:</span>
              <span className="ml-2 font-medium text-foreground">{formatTime(train?.scheduledArrival)}</span>
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">Actual:</span>
              <span className="ml-2 font-medium text-foreground">{formatTime(liveData?.estimatedArrival)}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="CheckCircle" size={16} className="text-success" />
            </div>
            <div>
              <div className="text-sm font-medium text-foreground">Signal Status</div>
              <div className="text-xs text-muted-foreground">All Clear</div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Radio" size={16} className="text-primary" />
            </div>
            <div>
              <div className="text-sm font-medium text-foreground">Communication</div>
              <div className="text-xs text-muted-foreground">Active</div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center">
              <Icon name="AlertTriangle" size={16} className="text-warning" />
            </div>
            <div>
              <div className="text-sm font-medium text-foreground">Weather Alert</div>
              <div className="text-xs text-muted-foreground">Light Rain</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeStatusPanel;