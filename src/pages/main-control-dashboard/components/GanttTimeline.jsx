import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const GanttTimeline = () => {
  const [timeRange, setTimeRange] = useState('4h'); // '2h' | '4h' | '8h' | '12h'
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const generateTimeSlots = () => {
    const slots = [];
    const now = new Date();
    const hoursToShow = parseInt(timeRange);
    const startTime = new Date(now.getTime() - (hoursToShow / 2) * 60 * 60 * 1000);
    
    for (let i = 0; i < hoursToShow; i++) {
      const time = new Date(startTime.getTime() + i * 60 * 60 * 1000);
      slots?.push(time);
    }
    return slots;
  };

  const trainSchedules = [
    {
      id: 'T001',
      name: 'Express 101',
      type: 'passenger',
      priority: 'high',
      scheduled: {
        start: new Date(currentTime.getTime() - 30 * 60 * 1000),
        end: new Date(currentTime.getTime() + 90 * 60 * 1000)
      },
      actual: {
        start: new Date(currentTime.getTime() - 30 * 60 * 1000),
        current: new Date(currentTime.getTime() + 15 * 60 * 1000)
      },
      status: 'on-time',
      route: 'Platform A1 → Terminal D1'
    },
    {
      id: 'T002',
      name: 'Freight 205',
      type: 'freight',
      priority: 'medium',
      scheduled: {
        start: new Date(currentTime.getTime() - 60 * 60 * 1000),
        end: new Date(currentTime.getTime() + 60 * 60 * 1000)
      },
      actual: {
        start: new Date(currentTime.getTime() - 48 * 60 * 1000),
        current: new Date(currentTime.getTime() + 30 * 60 * 1000)
      },
      status: 'delayed',
      delay: 12,
      route: 'Junction B1 → Platform A2'
    },
    {
      id: 'T003',
      name: 'Local 308',
      type: 'passenger',
      priority: 'low',
      scheduled: {
        start: new Date(currentTime.getTime() + 30 * 60 * 1000),
        end: new Date(currentTime.getTime() + 150 * 60 * 1000)
      },
      actual: {
        start: new Date(currentTime.getTime() + 30 * 60 * 1000),
        current: new Date(currentTime.getTime() + 30 * 60 * 1000)
      },
      status: 'scheduled',
      route: 'Terminal D1 → Platform A1'
    },
    {
      id: 'T004',
      name: 'Express 204',
      type: 'passenger',
      priority: 'high',
      scheduled: {
        start: new Date(currentTime.getTime() + 90 * 60 * 1000),
        end: new Date(currentTime.getTime() + 210 * 60 * 1000)
      },
      actual: {
        start: new Date(currentTime.getTime() + 90 * 60 * 1000),
        current: new Date(currentTime.getTime() + 90 * 60 * 1000)
      },
      status: 'scheduled',
      route: 'Platform A2 → Junction B1'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'on-time':
        return 'bg-success';
      case 'delayed':
        return 'bg-error';
      case 'scheduled':
        return 'bg-accent';
      case 'early':
        return 'bg-primary';
      default:
        return 'bg-muted-foreground';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'border-l-error';
      case 'medium':
        return 'border-l-warning';
      case 'low':
        return 'border-l-success';
      default:
        return 'border-l-muted-foreground';
    }
  };

  const formatTime = (date) => {
    return date?.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const calculatePosition = (time, startTime, duration) => {
    const totalMinutes = parseInt(timeRange) * 60;
    const timeFromStart = (time - startTime) / (1000 * 60);
    return Math.max(0, Math.min(100, (timeFromStart / totalMinutes) * 100));
  };

  const calculateWidth = (startTime, endTime, containerStart, duration) => {
    const totalMinutes = parseInt(timeRange) * 60;
    const durationMinutes = (endTime - startTime) / (1000 * 60);
    return Math.min(100, (durationMinutes / totalMinutes) * 100);
  };

  const timeSlots = generateTimeSlots();
  const containerStart = timeSlots?.[0];
  const containerDuration = parseInt(timeRange) * 60;

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="Calendar" size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Train Timeline</h2>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            {['2h', '4h', '8h', '12h']?.map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 text-sm rounded-md transition-micro ${
                  timeRange === range 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
          
          <button className="p-2 rounded-md hover:bg-muted transition-micro">
            <Icon name="RefreshCw" size={16} className="text-muted-foreground" />
          </button>
        </div>
      </div>
      {/* Time Header */}
      <div className="relative mb-4">
        <div className="flex justify-between text-xs text-muted-foreground border-b border-border pb-2">
          {timeSlots?.map((time, index) => (
            <div key={index} className="flex flex-col items-center">
              <span className="font-medium">{formatTime(time)}</span>
              <span className="text-xs opacity-70">
                {time?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
            </div>
          ))}
        </div>
        
        {/* Current Time Indicator */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-error z-10"
          style={{
            left: `${calculatePosition(currentTime, containerStart, containerDuration)}%`
          }}
        >
          <div className="absolute -top-2 -left-1 w-3 h-3 bg-error rounded-full"></div>
        </div>
      </div>
      {/* Timeline Content */}
      <div className="space-y-3">
        {trainSchedules?.map((train, index) => (
          <div key={train?.id} className="relative">
            <div className="flex items-center mb-2">
              <div className="w-24 flex-shrink-0">
                <div className="text-sm font-medium text-foreground">{train?.name}</div>
                <div className="text-xs text-muted-foreground">{train?.id}</div>
              </div>
              
              <div className="flex-1 relative h-8 bg-muted/30 rounded-md">
                {/* Scheduled Timeline */}
                <div
                  className="absolute top-1 h-2 bg-border rounded opacity-50"
                  style={{
                    left: `${calculatePosition(train?.scheduled?.start, containerStart, containerDuration)}%`,
                    width: `${calculateWidth(train?.scheduled?.start, train?.scheduled?.end, containerStart, containerDuration)}%`
                  }}
                ></div>
                
                {/* Actual Progress */}
                <div
                  className={`absolute top-2 h-4 rounded ${getStatusColor(train?.status)} ${getPriorityColor(train?.priority)} border-l-4`}
                  style={{
                    left: `${calculatePosition(train?.actual?.start, containerStart, containerDuration)}%`,
                    width: `${calculateWidth(train?.actual?.start, train?.actual?.current, containerStart, containerDuration)}%`
                  }}
                ></div>
                
                {/* Train Icon */}
                <div
                  className="absolute top-1 -translate-x-1/2 z-10"
                  style={{
                    left: `${calculatePosition(train?.actual?.current, containerStart, containerDuration)}%`
                  }}
                >
                  <div className={`w-6 h-6 rounded-full ${getStatusColor(train?.status)} flex items-center justify-center`}>
                    <Icon name="Train" size={12} color="white" />
                  </div>
                </div>
              </div>
              
              <div className="w-32 flex-shrink-0 ml-4 text-right">
                <div className={`text-sm font-medium ${
                  train?.status === 'delayed' ? 'text-error' : 
                  train?.status === 'on-time' ? 'text-success' : 'text-foreground'
                }`}>
                  {train?.status === 'delayed' ? `+${train?.delay}min` : train?.status}
                </div>
                <div className="text-xs text-muted-foreground capitalize">{train?.type}</div>
              </div>
            </div>
            
            <div className="ml-24 text-xs text-muted-foreground mb-2">
              {train?.route}
            </div>
          </div>
        ))}
      </div>
      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-border rounded opacity-50"></div>
              <span className="text-xs text-muted-foreground">Scheduled</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-success rounded"></div>
              <span className="text-xs text-muted-foreground">On-time</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-error rounded"></div>
              <span className="text-xs text-muted-foreground">Delayed</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-accent rounded"></div>
              <span className="text-xs text-muted-foreground">Scheduled</span>
            </div>
          </div>
          
          <div className="text-xs text-muted-foreground">
            Current Time: {formatTime(currentTime)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GanttTimeline;