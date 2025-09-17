import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TimelineVisualization = ({ 
  currentSchedule = null, 
  simulatedSchedule = null, 
  timeRange = '4h' 
}) => {
  const [viewMode, setViewMode] = useState('overlay'); // 'overlay' | 'split'
  const [selectedTrain, setSelectedTrain] = useState(null);

  // Mock timeline data
  const mockCurrentSchedule = currentSchedule || [
    {
      id: 'TR001',
      name: 'Express 001',
      type: 'Express',
      priority: 'High',
      color: '#DC2626',
      events: [
        { time: '14:00', type: 'departure', station: 'Mumbai Central', status: 'completed' },
        { time: '14:30', type: 'arrival', station: 'Thane', status: 'on-time' },
        { time: '14:35', type: 'departure', station: 'Thane', status: 'scheduled' },
        { time: '15:15', type: 'arrival', station: 'Nashik', status: 'scheduled' }
      ]
    },
    {
      id: 'TR002',
      name: 'Local 002',
      type: 'Local',
      priority: 'Medium',
      color: '#D97706',
      events: [
        { time: '14:15', type: 'departure', station: 'Delhi Junction', status: 'delayed' },
        { time: '14:45', type: 'arrival', station: 'Ghaziabad', status: 'delayed' },
        { time: '14:50', type: 'departure', station: 'Ghaziabad', status: 'scheduled' },
        { time: '15:30', type: 'arrival', station: 'Agra', status: 'scheduled' }
      ]
    },
    {
      id: 'TR003',
      name: 'Freight 003',
      type: 'Freight',
      priority: 'Low',
      color: '#059669',
      events: [
        { time: '14:30', type: 'departure', station: 'Kolkata Port', status: 'on-time' },
        { time: '15:00', type: 'arrival', station: 'Howrah', status: 'scheduled' },
        { time: '15:10', type: 'departure', station: 'Howrah', status: 'scheduled' },
        { time: '16:00', type: 'arrival', station: 'Kharagpur', status: 'scheduled' }
      ]
    }
  ];

  const mockSimulatedSchedule = simulatedSchedule || [
    {
      id: 'TR001',
      name: 'Express 001',
      type: 'Express',
      priority: 'High',
      color: '#DC2626',
      changed: false,
      events: [
        { time: '14:00', type: 'departure', station: 'Mumbai Central', status: 'completed' },
        { time: '14:30', type: 'arrival', station: 'Thane', status: 'on-time' },
        { time: '14:35', type: 'departure', station: 'Thane', status: 'scheduled' },
        { time: '15:15', type: 'arrival', station: 'Nashik', status: 'scheduled' }
      ]
    },
    {
      id: 'TR002',
      name: 'Local 002',
      type: 'Local',
      priority: 'Medium',
      color: '#D97706',
      changed: true,
      events: [
        { time: '14:15', type: 'departure', station: 'Delhi Junction', status: 'on-time' },
        { time: '14:40', type: 'arrival', station: 'Ghaziabad', status: 'on-time' },
        { time: '14:45', type: 'departure', station: 'Ghaziabad', status: 'scheduled' },
        { time: '15:25', type: 'arrival', station: 'Agra', status: 'scheduled' }
      ]
    },
    {
      id: 'TR003',
      name: 'Freight 003',
      type: 'Freight',
      priority: 'Low',
      color: '#059669',
      changed: true,
      events: [
        { time: '14:35', type: 'departure', station: 'Kolkata Port', status: 'scheduled' },
        { time: '15:05', type: 'arrival', station: 'Howrah', status: 'scheduled' },
        { time: '15:15', type: 'departure', station: 'Howrah', status: 'scheduled' },
        { time: '16:05', type: 'arrival', station: 'Kharagpur', status: 'scheduled' }
      ]
    }
  ];

  const currentData = mockCurrentSchedule;
  const simulatedData = mockSimulatedSchedule;

  // Generate time slots for the timeline
  const timeSlots = useMemo(() => {
    const slots = [];
    const startTime = new Date();
    startTime?.setHours(14, 0, 0, 0);
    
    for (let i = 0; i < 16; i++) { // 4 hours in 15-minute intervals
      const time = new Date(startTime.getTime() + i * 15 * 60 * 1000);
      slots?.push({
        time: time?.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
        timestamp: time?.getTime()
      });
    }
    return slots;
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success';
      case 'on-time':
        return 'bg-primary';
      case 'delayed':
        return 'bg-warning';
      case 'scheduled':
        return 'bg-muted-foreground';
      default:
        return 'bg-muted-foreground';
    }
  };

  const getEventIcon = (type) => {
    switch (type) {
      case 'departure':
        return 'ArrowRight';
      case 'arrival':
        return 'ArrowDown';
      default:
        return 'Circle';
    }
  };

  const TrainTimeline = ({ train, isSimulated = false, showChanges = false }) => (
    <div className={`relative ${isSimulated ? 'opacity-80' : ''}`}>
      <div className="flex items-center space-x-3 mb-2">
        <div 
          className="w-4 h-4 rounded-full"
          style={{ backgroundColor: train?.color }}
        ></div>
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <h4 className="text-sm font-medium text-foreground">{train?.name}</h4>
            {showChanges && train?.changed && (
              <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full">
                Modified
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground">{train?.type} • {train?.priority} Priority</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          iconName={selectedTrain === train?.id ? "ChevronUp" : "ChevronDown"}
          onClick={() => setSelectedTrain(selectedTrain === train?.id ? null : train?.id)}
        />
      </div>

      {/* Timeline Bar */}
      <div className="relative h-8 bg-muted rounded-lg mb-4 overflow-hidden">
        {train?.events?.map((event, index) => {
          const timeSlot = timeSlots?.find(slot => slot?.time === event?.time);
          if (!timeSlot) return null;

          const position = ((timeSlot?.timestamp - timeSlots?.[0]?.timestamp) / 
                          (timeSlots?.[timeSlots?.length - 1]?.timestamp - timeSlots?.[0]?.timestamp)) * 100;

          return (
            <div
              key={index}
              className="absolute top-0 bottom-0 flex items-center"
              style={{ left: `${position}%` }}
            >
              <div 
                className={`w-3 h-3 rounded-full border-2 border-card ${getStatusColor(event?.status)}`}
                title={`${event?.type} at ${event?.station} - ${event?.time}`}
              ></div>
            </div>
          );
        })}
      </div>

      {/* Event Details */}
      {selectedTrain === train?.id && (
        <div className="bg-surface border border-border rounded-lg p-4 mb-4">
          <h5 className="text-sm font-semibold text-foreground mb-3">Event Details</h5>
          <div className="space-y-2">
            {train?.events?.map((event, index) => (
              <div key={index} className="flex items-center space-x-3 text-sm">
                <Icon 
                  name={getEventIcon(event?.type)} 
                  size={14} 
                  className={getStatusColor(event?.status)?.replace('bg-', 'text-')}
                />
                <span className="font-mono text-foreground">{event?.time}</span>
                <span className="text-muted-foreground capitalize">{event?.type}</span>
                <span className="text-foreground">{event?.station}</span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  event?.status === 'completed' ? 'bg-success/10 text-success' :
                  event?.status === 'on-time' ? 'bg-primary/10 text-primary' :
                  event?.status === 'delayed'? 'bg-warning/10 text-warning' : 'bg-muted text-muted-foreground'
                }`}>
                  {event?.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-card border border-border rounded-lg h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
            <Icon name="Calendar" size={18} color="white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Timeline Visualization</h2>
            <p className="text-sm text-muted-foreground">Schedule comparison over {timeRange}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === 'overlay' ? 'default' : 'outline'}
            size="sm"
            iconName="Layers"
            onClick={() => setViewMode('overlay')}
          >
            Overlay
          </Button>
          <Button
            variant={viewMode === 'split' ? 'default' : 'outline'}
            size="sm"
            iconName="Split"
            onClick={() => setViewMode('split')}
          >
            Split
          </Button>
        </div>
      </div>
      {/* Time Scale */}
      <div className="px-6 py-4 border-b border-border">
        <div className="flex justify-between text-xs text-muted-foreground">
          {timeSlots?.filter((_, index) => index % 4 === 0)?.map((slot) => (
            <span key={slot?.time} className="font-mono">{slot?.time}</span>
          ))}
        </div>
      </div>
      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {viewMode === 'overlay' ? (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center">
                <Icon name="Clock" size={16} className="mr-2 text-primary" />
                Current Schedule
              </h3>
              {currentData?.map((train) => (
                <TrainTimeline key={`current-${train?.id}`} train={train} />
              ))}
            </div>

            <div className="border-t border-border pt-6">
              <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center">
                <Icon name="Zap" size={16} className="mr-2 text-accent" />
                Simulated Schedule
              </h3>
              {simulatedData?.map((train) => (
                <TrainTimeline 
                  key={`simulated-${train?.id}`} 
                  train={train} 
                  isSimulated={true}
                  showChanges={true}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center">
                <Icon name="Clock" size={16} className="mr-2 text-primary" />
                Current Schedule
              </h3>
              {currentData?.map((train) => (
                <TrainTimeline key={`current-${train?.id}`} train={train} />
              ))}
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center">
                <Icon name="Zap" size={16} className="mr-2 text-accent" />
                Simulated Schedule
              </h3>
              {simulatedData?.map((train) => (
                <TrainTimeline 
                  key={`simulated-${train?.id}`} 
                  train={train} 
                  isSimulated={true}
                  showChanges={true}
                />
              ))}
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="mt-8 bg-muted/50 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-foreground mb-3">Legend</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-success"></div>
              <span className="text-muted-foreground">Completed</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              <span className="text-muted-foreground">On Time</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-warning"></div>
              <span className="text-muted-foreground">Delayed</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-muted-foreground"></div>
              <span className="text-muted-foreground">Scheduled</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineVisualization;