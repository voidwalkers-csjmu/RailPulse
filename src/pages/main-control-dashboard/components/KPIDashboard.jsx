import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const KPIDashboard = () => {
  const [kpiData, setKpiData] = useState({
    punctuality: 87.3,
    averageDelay: 4.2,
    throughput: 156,
    activeTrains: 23,
    sectionsOccupied: 8,
    totalSections: 15
  });

  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isLive) {
        setKpiData(prev => ({
          ...prev,
          punctuality: Math.max(75, Math.min(95, prev?.punctuality + (Math.random() - 0.5) * 2)),
          averageDelay: Math.max(0, Math.min(15, prev?.averageDelay + (Math.random() - 0.5) * 0.5)),
          throughput: Math.max(100, Math.min(200, prev?.throughput + Math.floor((Math.random() - 0.5) * 5))),
          activeTrains: Math.max(15, Math.min(35, prev?.activeTrains + Math.floor((Math.random() - 0.5) * 2))),
          sectionsOccupied: Math.max(5, Math.min(12, prev?.sectionsOccupied + Math.floor((Math.random() - 0.5) * 2)))
        }));
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isLive]);

  const kpiCards = [
    {
      title: 'Punctuality Rate',
      value: `${kpiData?.punctuality?.toFixed(1)}%`,
      icon: 'Clock',
      trend: kpiData?.punctuality > 85 ? 'up' : 'down',
      trendValue: '+2.1%',
      color: kpiData?.punctuality > 85 ? 'success' : kpiData?.punctuality > 75 ? 'warning' : 'error',
      description: 'Trains arriving on time'
    },
    {
      title: 'Average Delay',
      value: `${kpiData?.averageDelay?.toFixed(1)} min`,
      icon: 'Timer',
      trend: kpiData?.averageDelay < 5 ? 'up' : 'down',
      trendValue: '-0.3 min',
      color: kpiData?.averageDelay < 5 ? 'success' : kpiData?.averageDelay < 10 ? 'warning' : 'error',
      description: 'Per train delay time'
    },
    {
      title: 'Throughput',
      value: kpiData?.throughput?.toString(),
      icon: 'TrendingUp',
      trend: 'up',
      trendValue: '+12',
      color: 'primary',
      description: 'Trains processed today'
    },
    {
      title: 'Active Trains',
      value: kpiData?.activeTrains?.toString(),
      icon: 'Train',
      trend: 'neutral',
      trendValue: '±0',
      color: 'accent',
      description: 'Currently in system'
    }
  ];

  const getColorClasses = (color) => {
    switch (color) {
      case 'success':
        return 'text-success bg-success/10 border-success/20';
      case 'warning':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'error':
        return 'text-error bg-error/10 border-error/20';
      case 'primary':
        return 'text-primary bg-primary/10 border-primary/20';
      case 'accent':
        return 'text-accent bg-accent/10 border-accent/20';
      default:
        return 'text-foreground bg-muted border-border';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return 'TrendingUp';
      case 'down':
        return 'TrendingDown';
      default:
        return 'Minus';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="BarChart3" size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Key Performance Indicators</h2>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-success animate-pulse-slow' : 'bg-muted-foreground'}`}></div>
            <span className="text-sm text-muted-foreground">
              {isLive ? 'Live Updates' : 'Paused'}
            </span>
          </div>
          
          <button
            onClick={() => setIsLive(!isLive)}
            className="p-2 rounded-md hover:bg-muted transition-micro"
            title={isLive ? 'Pause updates' : 'Resume updates'}
          >
            <Icon name={isLive ? 'Pause' : 'Play'} size={16} className="text-muted-foreground" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {kpiCards?.map((kpi, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border transition-micro ${getColorClasses(kpi?.color)}`}
          >
            <div className="flex items-center justify-between mb-2">
              <Icon name={kpi?.icon} size={20} />
              <div className="flex items-center space-x-1 text-xs">
                <Icon name={getTrendIcon(kpi?.trend)} size={12} />
                <span>{kpi?.trendValue}</span>
              </div>
            </div>
            
            <div className="mb-1">
              <div className="text-2xl font-bold">{kpi?.value}</div>
              <div className="text-xs opacity-80">{kpi?.title}</div>
            </div>
            
            <div className="text-xs opacity-70">{kpi?.description}</div>
          </div>
        ))}
      </div>
      {/* Section Utilization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-foreground">Section Utilization</h3>
            <span className="text-sm text-muted-foreground">
              {kpiData?.sectionsOccupied}/{kpiData?.totalSections}
            </span>
          </div>
          
          <div className="w-full bg-border rounded-full h-2 mb-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${(kpiData?.sectionsOccupied / kpiData?.totalSections) * 100}%` }}
            ></div>
          </div>
          
          <div className="text-xs text-muted-foreground">
            {((kpiData?.sectionsOccupied / kpiData?.totalSections) * 100)?.toFixed(1)}% capacity utilized
          </div>
        </div>

        <div className="p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-foreground">System Health</h3>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-sm text-success">Operational</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">WebSocket</span>
              <span className="text-success">Connected</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">AI Engine</span>
              <span className="text-success">Active</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Last Update</span>
              <span className="text-foreground">{new Date()?.toLocaleTimeString('en-US', { hour12: false })}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KPIDashboard;