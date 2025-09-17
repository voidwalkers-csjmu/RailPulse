import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import PrimaryNavigation from '../../components/ui/PrimaryNavigation';
import NavigationHeader from '../../components/ui/NavigationHeader';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import TrainInfoPanel from './components/TrainInfoPanel';
import RealTimeStatusPanel from './components/RealTimeStatusPanel';
import ScheduleTimeline from './components/ScheduleTimeline';
import EventsLogTable from './components/EventsLogTable';
import ActionControlsPanel from './components/ActionControlsPanel';
import DecisionHistoryPanel from './components/DecisionHistoryPanel';

const TrainDetailsPage = () => {
  const { trainId } = useParams();
  const navigate = useNavigate();
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);

  // Add mock user data for NavigationHeader
  const mockUser = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Train Controller'
  };

  const handleLogout = () => {
    // Mock logout functionality
    console.log('User logged out');
    navigate('/login');
  };

  // Mock train data
  const trainData = {
    id: trainId || 'TR-2501',
    number: 'TR-2501',
    name: 'Express Metro Service',
    type: 'Passenger',
    priority: 'High',
    length: 180,
    maxSpeed: 160,
    capacity: '450 passengers',
    origin: 'Central Station',
    destination: 'North Terminal',
    currentLocation: 'Junction Point Alpha',
    operator: 'Metro Rail Corp',
    serviceClass: 'Express',
    trackNumber: 'A-3',
    driverId: 'DR-445',
    currentSpeed: 95,
    delay: 8,
    nextStation: 'Midway Station',
    estimatedArrival: '2025-01-11T15:45:00Z',
    scheduledArrival: '2025-01-11T15:37:00Z',
    route: 'main'
  };

  const scheduleData = [
    {
      station: 'Central Station',
      scheduledTime: '2025-01-11T14:00:00Z',
      actualTime: '2025-01-11T14:00:00Z',
      departureTime: '2025-01-11T14:02:00Z',
      status: 'completed',
      platform: '3A',
      distance: 0,
      stopDuration: '2',
      notes: 'On-time departure'
    },
    {
      station: 'Commerce Hub',
      scheduledTime: '2025-01-11T14:15:00Z',
      actualTime: '2025-01-11T14:18:00Z',
      departureTime: '2025-01-11T14:20:00Z',
      status: 'completed',
      platform: '2B',
      distance: 12,
      stopDuration: '2',
      notes: '3-minute delay due to passenger boarding'
    },
    {
      station: 'Industrial District',
      scheduledTime: '2025-01-11T14:28:00Z',
      actualTime: '2025-01-11T14:33:00Z',
      departureTime: '2025-01-11T14:35:00Z',
      status: 'completed',
      platform: '1A',
      distance: 25,
      stopDuration: '2',
      notes: 'Extended stop for freight clearance'
    },
    {
      station: 'Midway Station',
      scheduledTime: '2025-01-11T14:45:00Z',
      actualTime: null,
      status: 'current',
      platform: '4C',
      distance: 38,
      stopDuration: '3',
      notes: 'Current location - passenger boarding in progress'
    },
    {
      station: 'Suburban Junction',
      scheduledTime: '2025-01-11T15:02:00Z',
      actualTime: null,
      status: 'pending',
      platform: '2A',
      distance: 52,
      stopDuration: '2'
    },
    {
      station: 'North Terminal',
      scheduledTime: '2025-01-11T15:20:00Z',
      actualTime: null,
      status: 'pending',
      platform: '1B',
      distance: 68,
      stopDuration: '5',
      notes: 'Final destination - extended stop for cleaning'
    }
  ];

  const eventsData = [
    {
      timestamp: '2025-01-11T14:35:12Z',
      type: 'location',
      title: 'Station Departure',
      location: 'Industrial District',
      severity: 'low',
      description: 'Train departed Industrial District station on schedule',
      additionalData: {
        platform: '1A',
        delay: '0 min'
      }
    },
    {
      timestamp: '2025-01-11T14:33:45Z',
      type: 'speed',
      title: 'Speed Reduction',
      location: 'Industrial District',
      severity: 'medium',
      description: 'Speed reduced to 40 km/h for station approach',
      additionalData: {
        previousSpeed: '95 km/h',
        newSpeed: '40 km/h'
      }
    },
    {
      timestamp: '2025-01-11T14:30:20Z',
      type: 'signal',
      title: 'Signal Clear',
      location: 'KM 23.5',
      severity: 'low',
      description: 'Received green signal for Industrial District approach',
      additionalData: {
        signalId: 'SIG-ID-23',
        aspect: 'Green'
      }
    },
    {
      timestamp: '2025-01-11T14:28:15Z',
      type: 'delay',
      title: 'Minor Delay',
      location: 'Industrial District',
      severity: 'medium',
      description: 'Freight train clearance causing 5-minute delay',
      additionalData: {
        delayReason: 'Freight clearance',
        estimatedDelay: '5 min'
      }
    },
    {
      timestamp: '2025-01-11T14:25:30Z',
      type: 'maintenance',
      title: 'Track Inspection',
      location: 'KM 20.8',
      severity: 'low',
      description: 'Routine track inspection completed - no issues found',
      additionalData: {
        inspectionType: 'Routine',
        result: 'Clear'
      }
    },
    {
      timestamp: '2025-01-11T14:20:45Z',
      type: 'location',
      title: 'Station Departure',
      location: 'Commerce Hub',
      severity: 'low',
      description: 'Departed Commerce Hub with 3-minute delay',
      additionalData: {
        platform: '2B',
        delay: '3 min'
      }
    },
    {
      timestamp: '2025-01-11T14:18:30Z',
      type: 'speed',
      title: 'Speed Increase',
      location: 'Commerce Hub',
      severity: 'low',
      description: 'Accelerating to cruising speed after station stop',
      additionalData: {
        targetSpeed: '95 km/h',
        currentSpeed: '65 km/h'
      }
    },
    {
      timestamp: '2025-01-11T14:15:10Z',
      type: 'location',
      title: 'Station Arrival',
      location: 'Commerce Hub',
      severity: 'low',
      description: 'Arrived at Commerce Hub station',
      additionalData: {
        platform: '2B',
        passengerCount: '127'
      }
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'schedule', label: 'Schedule', icon: 'Calendar' },
    { id: 'events', label: 'Events Log', icon: 'FileText' },
    { id: 'actions', label: 'Actions', icon: 'Settings' },
    { id: 'history', label: 'Decision History', icon: 'History' }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [trainId]);

  const handleAction = (actionDetails) => {
    console.log('Train action executed:', actionDetails);
    // In real implementation, this would send the action to the backend
    alert(`Action "${actionDetails?.type}" has been applied to train ${trainData?.number}`);
  };

  const handleBackToDashboard = () => {
    navigate('/main-control-dashboard');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading train details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <PrimaryNavigation 
        isCollapsed={isNavCollapsed}
        onToggleCollapse={() => setIsNavCollapsed(!isNavCollapsed)}
      />
      <div className={`transition-all duration-300 ${isNavCollapsed ? 'ml-16' : 'ml-60'}`}>
        <NavigationHeader 
          user={mockUser}
          onLogout={handleLogout}
        />
        
        <main className="p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header Section */}
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <BreadcrumbNavigation 
                  customBreadcrumbs={[
                    { label: 'Dashboard', path: '/main-control-dashboard', icon: 'Home' },
                    { label: 'Train Details', path: '/train-details', icon: 'Train', isLast: true }
                  ]}
                />
                <div className="flex items-center space-x-3">
                  <h1 className="text-2xl font-bold text-foreground">
                    Train Details - {trainData?.number}
                  </h1>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse-slow"></div>
                    <span className="text-sm text-muted-foreground">Live Tracking</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  iconName="RefreshCw"
                  iconPosition="left"
                  onClick={() => window.location?.reload()}
                >
                  Refresh
                </Button>
                <Button
                  variant="outline"
                  iconName="ArrowLeft"
                  iconPosition="left"
                  onClick={handleBackToDashboard}
                >
                  Back to Dashboard
                </Button>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="border-b border-border">
              <nav className="flex space-x-8">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center space-x-2 py-3 px-1 border-b-2 font-medium text-sm transition-micro ${
                      activeTab === tab?.id
                        ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                    }`}
                  >
                    <Icon name={tab?.icon} size={16} />
                    <span>{tab?.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="space-y-6">
              {activeTab === 'overview' && (
                <>
                  <TrainInfoPanel train={trainData} />
                  <RealTimeStatusPanel train={trainData} />
                </>
              )}

              {activeTab === 'schedule' && (
                <ScheduleTimeline schedule={scheduleData} />
              )}

              {activeTab === 'events' && (
                <EventsLogTable events={eventsData} />
              )}

              {activeTab === 'actions' && (
                <ActionControlsPanel 
                  train={trainData} 
                  onAction={handleAction}
                />
              )}

              {activeTab === 'history' && (
                <DecisionHistoryPanel trainId={trainData?.id} />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TrainDetailsPage;