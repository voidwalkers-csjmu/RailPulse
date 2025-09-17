import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EventsLogTable = ({ events }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState('all');
  const itemsPerPage = 10;

  const eventTypes = [
    { value: 'all', label: 'All Events' },
    { value: 'location', label: 'Location Updates' },
    { value: 'speed', label: 'Speed Changes' },
    { value: 'signal', label: 'Signal Events' },
    { value: 'delay', label: 'Delay Events' },
    { value: 'maintenance', label: 'Maintenance' },
    { value: 'emergency', label: 'Emergency' }
  ];

  const getEventIcon = (type) => {
    switch (type) {
      case 'location':
        return { icon: 'MapPin', color: 'text-primary' };
      case 'speed':
        return { icon: 'Gauge', color: 'text-accent' };
      case 'signal':
        return { icon: 'Radio', color: 'text-success' };
      case 'delay':
        return { icon: 'Clock', color: 'text-warning' };
      case 'maintenance':
        return { icon: 'Wrench', color: 'text-secondary' };
      case 'emergency':
        return { icon: 'AlertTriangle', color: 'text-error' };
      default:
        return { icon: 'Info', color: 'text-muted-foreground' };
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical':
        return 'bg-error text-error-foreground';
      case 'high':
        return 'bg-warning text-warning-foreground';
      case 'medium':
        return 'bg-primary text-primary-foreground';
      case 'low':
        return 'bg-success text-success-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return {
      date: date?.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      }),
      time: date?.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    };
  };

  const filteredEvents = filterType === 'all' 
    ? events 
    : events?.filter(event => event?.type === filterType);

  const totalPages = Math.ceil(filteredEvents?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEvents = filteredEvents?.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Events Log</h3>
        
        <div className="flex items-center space-x-3">
          <select
            value={filterType}
            onChange={(e) => {
              setFilterType(e?.target?.value);
              setCurrentPage(1);
            }}
            className="px-3 py-2 bg-input border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {eventTypes?.map(type => (
              <option key={type?.value} value={type?.value}>
                {type?.label}
              </option>
            ))}
          </select>
          
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
            onClick={() => console.log('Export events log')}
          >
            Export
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Time</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Type</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Event</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Location</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Severity</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Details</th>
            </tr>
          </thead>
          <tbody>
            {paginatedEvents?.map((event, index) => {
              const eventInfo = getEventIcon(event?.type);
              const timestamp = formatTimestamp(event?.timestamp);
              
              return (
                <tr key={index} className="border-b border-border hover:bg-muted/50 transition-micro">
                  <td className="py-3 px-4">
                    <div className="text-sm">
                      <div className="font-medium text-foreground">{timestamp?.time}</div>
                      <div className="text-xs text-muted-foreground">{timestamp?.date}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <Icon 
                        name={eventInfo?.icon} 
                        size={16} 
                        className={eventInfo?.color}
                      />
                      <span className="text-sm font-medium text-foreground capitalize">
                        {event?.type}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm font-medium text-foreground">
                      {event?.title}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm text-foreground">
                      {event?.location}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(event?.severity)}`}>
                      {event?.severity}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm text-muted-foreground max-w-xs truncate">
                      {event?.description}
                    </div>
                    {event?.additionalData && (
                      <div className="text-xs text-muted-foreground mt-1">
                        {Object.entries(event?.additionalData)?.map(([key, value]) => (
                          <span key={key} className="mr-3">
                            {key}: {value}
                          </span>
                        ))}
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {filteredEvents?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No events found for the selected filter.</p>
        </div>
      )}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6 pt-6 border-t border-border">
          <div className="text-sm text-muted-foreground">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredEvents?.length)} of {filteredEvents?.length} events
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="ChevronLeft"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            />
            
            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              iconName="ChevronRight"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsLogTable;