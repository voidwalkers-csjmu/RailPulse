import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ComparisonView = ({ 
  currentState = null, 
  simulationResults = null, 
  isLoading = false 
}) => {
  const [viewMode, setViewMode] = useState('side-by-side'); // 'side-by-side' | 'tabbed'

  const mockCurrentState = {
    totalTrains: 12,
    onTimePerformance: 87.5,
    averageDelay: 4.2,
    capacityUtilization: 78,
    conflicts: 3,
    throughput: 145,
    trains: [
      {
        id: 'TR001',
        name: 'Express 001',
        status: 'On Time',
        delay: 0,
        priority: 'High',
        eta: '14:30',
        platform: 'A1'
      },
      {
        id: 'TR002',
        name: 'Local 002',
        status: 'Delayed',
        delay: 8,
        priority: 'Medium',
        eta: '14:38',
        platform: 'B2'
      },
      {
        id: 'TR003',
        name: 'Freight 003',
        status: 'On Time',
        delay: 0,
        priority: 'Low',
        eta: '15:15',
        platform: 'C1'
      }
    ]
  };

  const mockSimulationResults = simulationResults || {
    totalTrains: 12,
    onTimePerformance: 92.3,
    averageDelay: 2.8,
    capacityUtilization: 82,
    conflicts: 1,
    throughput: 158,
    improvements: {
      onTimeImprovement: 4.8,
      delayReduction: 1.4,
      conflictReduction: 2,
      throughputIncrease: 13
    },
    trains: [
      {
        id: 'TR001',
        name: 'Express 001',
        status: 'On Time',
        delay: 0,
        priority: 'High',
        eta: '14:30',
        platform: 'A1',
        changed: false
      },
      {
        id: 'TR002',
        name: 'Local 002',
        status: 'On Time',
        delay: 2,
        priority: 'Medium',
        eta: '14:32',
        platform: 'B1',
        changed: true
      },
      {
        id: 'TR003',
        name: 'Freight 003',
        status: 'On Time',
        delay: 0,
        priority: 'Low',
        eta: '15:20',
        platform: 'C2',
        changed: true
      }
    ]
  };

  const currentData = currentState || mockCurrentState;
  const simulationData = mockSimulationResults;

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'on time':
        return 'text-success';
      case 'delayed':
        return 'text-warning';
      case 'critical':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const getImprovementColor = (value) => {
    return value > 0 ? 'text-success' : value < 0 ? 'text-error' : 'text-muted-foreground';
  };

  const MetricsCard = ({ title, current, simulated, unit = '', improvement = null }) => (
    <div className="bg-surface border border-border rounded-lg p-4">
      <h4 className="text-sm font-medium text-foreground mb-3">{title}</h4>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Current</span>
          <span className="text-sm font-semibold text-foreground">{current}{unit}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Simulated</span>
          <span className="text-sm font-semibold text-accent">{simulated}{unit}</span>
        </div>
        {improvement !== null && (
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <span className="text-xs text-muted-foreground">Change</span>
            <div className="flex items-center space-x-1">
              <Icon 
                name={improvement > 0 ? "TrendingUp" : improvement < 0 ? "TrendingDown" : "Minus"} 
                size={12} 
                className={getImprovementColor(improvement)}
              />
              <span className={`text-xs font-medium ${getImprovementColor(improvement)}`}>
                {improvement > 0 ? '+' : ''}{improvement}{unit}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const TrainComparisonRow = ({ train, simulatedTrain }) => (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg border ${
      simulatedTrain?.changed ? 'border-accent bg-accent/5' : 'border-border bg-surface'
    }`}>
      {/* Current State */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h5 className="text-sm font-medium text-foreground">{train?.name}</h5>
          <span className={`text-xs font-medium ${getStatusColor(train?.status)}`}>
            {train?.status}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <span className="text-muted-foreground">Delay:</span>
            <span className="ml-1 font-medium text-foreground">{train?.delay}min</span>
          </div>
          <div>
            <span className="text-muted-foreground">ETA:</span>
            <span className="ml-1 font-medium text-foreground">{train?.eta}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Priority:</span>
            <span className="ml-1 font-medium text-foreground">{train?.priority}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Platform:</span>
            <span className="ml-1 font-medium text-foreground">{train?.platform}</span>
          </div>
        </div>
      </div>

      {/* Simulated State */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h5 className="text-sm font-medium text-accent">{simulatedTrain?.name || train?.name}</h5>
          <div className="flex items-center space-x-2">
            {simulatedTrain?.changed && (
              <Icon name="ArrowRight" size={12} className="text-accent" />
            )}
            <span className={`text-xs font-medium ${getStatusColor(simulatedTrain?.status || train?.status)}`}>
              {simulatedTrain?.status || train?.status}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <span className="text-muted-foreground">Delay:</span>
            <span className={`ml-1 font-medium ${
              simulatedTrain?.changed ? 'text-accent' : 'text-foreground'
            }`}>
              {simulatedTrain?.delay ?? train?.delay}min
            </span>
          </div>
          <div>
            <span className="text-muted-foreground">ETA:</span>
            <span className={`ml-1 font-medium ${
              simulatedTrain?.changed ? 'text-accent' : 'text-foreground'
            }`}>
              {simulatedTrain?.eta || train?.eta}
            </span>
          </div>
          <div>
            <span className="text-muted-foreground">Priority:</span>
            <span className="ml-1 font-medium text-foreground">
              {simulatedTrain?.priority || train?.priority}
            </span>
          </div>
          <div>
            <span className="text-muted-foreground">Platform:</span>
            <span className={`ml-1 font-medium ${
              simulatedTrain?.changed ? 'text-accent' : 'text-foreground'
            }`}>
              {simulatedTrain?.platform || train?.platform}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="bg-card border border-border rounded-lg p-6 h-full flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto"></div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Processing Simulation</h3>
            <p className="text-sm text-muted-foreground">Analyzing scenario parameters...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
            <Icon name="GitCompare" size={18} color="white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Comparison View</h2>
            <p className="text-sm text-muted-foreground">Current vs Simulated Results</p>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === 'side-by-side' ? 'default' : 'outline'}
            size="sm"
            iconName="Columns"
            onClick={() => setViewMode('side-by-side')}
            className="hidden md:flex"
          >
            Side by Side
          </Button>
          <Button
            variant={viewMode === 'tabbed' ? 'default' : 'outline'}
            size="sm"
            iconName="Tabs"
            onClick={() => setViewMode('tabbed')}
            className="md:hidden"
          >
            Tabbed
          </Button>
        </div>
      </div>
      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Key Metrics Comparison */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center">
            <Icon name="BarChart3" size={16} className="mr-2 text-accent" />
            Key Performance Indicators
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <MetricsCard
              title="On-Time Performance"
              current={currentData?.onTimePerformance}
              simulated={simulationData?.onTimePerformance}
              unit="%"
              improvement={simulationData?.improvements?.onTimeImprovement}
            />
            <MetricsCard
              title="Average Delay"
              current={currentData?.averageDelay}
              simulated={simulationData?.averageDelay}
              unit="min"
              improvement={-simulationData?.improvements?.delayReduction}
            />
            <MetricsCard
              title="Capacity Utilization"
              current={currentData?.capacityUtilization}
              simulated={simulationData?.capacityUtilization}
              unit="%"
              improvement={simulationData?.capacityUtilization - currentData?.capacityUtilization}
            />
            <MetricsCard
              title="Active Conflicts"
              current={currentData?.conflicts}
              simulated={simulationData?.conflicts}
              improvement={-simulationData?.improvements?.conflictReduction}
            />
            <MetricsCard
              title="Hourly Throughput"
              current={currentData?.throughput}
              simulated={simulationData?.throughput}
              improvement={simulationData?.improvements?.throughputIncrease}
            />
            <MetricsCard
              title="Total Trains"
              current={currentData?.totalTrains}
              simulated={simulationData?.totalTrains}
              improvement={simulationData?.totalTrains - currentData?.totalTrains}
            />
          </div>
        </div>

        {/* Train-by-Train Comparison */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center">
            <Icon name="Train" size={16} className="mr-2 text-accent" />
            Train Status Comparison
            <span className="ml-2 text-xs text-muted-foreground">
              ({simulationData?.trains?.filter(t => t?.changed)?.length} changes)
            </span>
          </h3>
          
          <div className="space-y-4">
            {currentData?.trains?.map((train) => {
              const simulatedTrain = simulationData?.trains?.find(st => st?.id === train?.id);
              return (
                <TrainComparisonRow
                  key={train?.id}
                  train={train}
                  simulatedTrain={simulatedTrain}
                />
              );
            })}
          </div>
        </div>

        {/* Summary Impact */}
        <div className="mt-8 bg-accent/10 border border-accent/20 rounded-lg p-6">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center">
            <Icon name="TrendingUp" size={16} className="mr-2 text-accent" />
            Simulation Impact Summary
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Improvements</h4>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center text-success">
                  <Icon name="Check" size={14} className="mr-2" />
                  {simulationData?.improvements?.onTimeImprovement}% better on-time performance
                </li>
                <li className="flex items-center text-success">
                  <Icon name="Check" size={14} className="mr-2" />
                  {simulationData?.improvements?.delayReduction} minutes average delay reduction
                </li>
                <li className="flex items-center text-success">
                  <Icon name="Check" size={14} className="mr-2" />
                  {simulationData?.improvements?.conflictReduction} fewer conflicts
                </li>
                <li className="flex items-center text-success">
                  <Icon name="Check" size={14} className="mr-2" />
                  {simulationData?.improvements?.throughputIncrease} trains/hour increase
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Key Changes</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li className="flex items-center">
                  <Icon name="ArrowRight" size={14} className="mr-2 text-accent" />
                  2 trains rerouted to optimize flow
                </li>
                <li className="flex items-center">
                  <Icon name="ArrowRight" size={14} className="mr-2 text-accent" />
                  1 priority adjustment implemented
                </li>
                <li className="flex items-center">
                  <Icon name="ArrowRight" size={14} className="mr-2 text-accent" />
                  Platform reassignments for efficiency
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonView;