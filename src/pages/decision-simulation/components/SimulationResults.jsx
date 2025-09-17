import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SimulationResults = ({ 
  results = null, 
  onApplyChanges, 
  onSaveScenario, 
  onDiscardResults,
  isApplying = false 
}) => {
  const [showDetailedAnalysis, setShowDetailedAnalysis] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState('overview');

  const mockResults = results || {
    scenarioName: 'Priority Optimization Test',
    executionTime: 2.3,
    timestamp: new Date()?.toISOString(),
    status: 'completed',
    confidence: 94.2,
    metrics: {
      onTimePerformance: {
        current: 87.5,
        projected: 92.3,
        improvement: 4.8,
        unit: '%'
      },
      averageDelay: {
        current: 4.2,
        projected: 2.8,
        improvement: -1.4,
        unit: 'min'
      },
      throughput: {
        current: 145,
        projected: 158,
        improvement: 13,
        unit: 'trains/hour'
      },
      capacityUtilization: {
        current: 78,
        projected: 82,
        improvement: 4,
        unit: '%'
      },
      conflicts: {
        current: 3,
        projected: 1,
        improvement: -2,
        unit: 'conflicts'
      },
      energyEfficiency: {
        current: 76.8,
        projected: 79.2,
        improvement: 2.4,
        unit: '%'
      }
    },
    impactAnalysis: {
      affectedTrains: 8,
      routeChanges: 3,
      priorityAdjustments: 2,
      platformReassignments: 4,
      estimatedSavings: 12500,
      passengerImpact: 'Positive - 15% reduction in wait times'
    },
    risks: [
      {
        level: 'Low',
        description: 'Minor platform congestion during peak hours',
        mitigation: 'Additional staff deployment recommended'
      },
      {
        level: 'Medium',
        description: 'Freight train delay may affect cargo schedule',
        mitigation: 'Coordinate with logistics partners'
      }
    ],
    recommendations: [
      'Implement changes during off-peak hours for smoother transition',
      'Monitor freight operations closely for first 24 hours',
      'Prepare contingency plans for platform B2 congestion',
      'Update passenger information systems with new schedules'
    ]
  };

  const data = mockResults;

  const getImprovementColor = (value) => {
    if (value > 0) return 'text-success';
    if (value < 0) return 'text-error';
    return 'text-muted-foreground';
  };

  const getImprovementIcon = (value) => {
    if (value > 0) return 'TrendingUp';
    if (value < 0) return 'TrendingDown';
    return 'Minus';
  };

  const getRiskColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'low':
        return 'text-success bg-success/10 border-success/20';
      case 'medium':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'high':
        return 'text-error bg-error/10 border-error/20';
      default:
        return 'text-muted-foreground bg-muted/10 border-border';
    }
  };

  const MetricCard = ({ title, metric, isHighlighted = false }) => (
    <div className={`bg-surface border rounded-lg p-4 ${
      isHighlighted ? 'border-accent ring-2 ring-accent/20' : 'border-border'
    }`}>
      <h4 className="text-sm font-medium text-foreground mb-3">{title}</h4>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Current</span>
          <span className="text-sm font-semibold text-foreground">
            {metric?.current}{metric?.unit}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Projected</span>
          <span className="text-sm font-semibold text-accent">
            {metric?.projected}{metric?.unit}
          </span>
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <span className="text-xs text-muted-foreground">Change</span>
          <div className="flex items-center space-x-1">
            <Icon 
              name={getImprovementIcon(metric?.improvement)} 
              size={12} 
              className={getImprovementColor(metric?.improvement)}
            />
            <span className={`text-xs font-medium ${getImprovementColor(metric?.improvement)}`}>
              {metric?.improvement > 0 ? '+' : ''}{metric?.improvement}{metric?.unit}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const handleApplyChanges = () => {
    const confirmed = window.confirm(
      `Apply simulation results?\n\nThis will implement the following changes:\n• ${data?.impactAnalysis?.routeChanges} route modifications\n• ${data?.impactAnalysis?.priorityAdjustments} priority adjustments\n• ${data?.impactAnalysis?.platformReassignments} platform reassignments\n\nConfirm implementation?`
    );
    
    if (confirmed && onApplyChanges) {
      onApplyChanges(data);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-success rounded-lg flex items-center justify-center">
            <Icon name="CheckCircle" size={18} color="white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Simulation Results</h2>
            <p className="text-sm text-muted-foreground">
              {data?.scenarioName} • Completed in {data?.executionTime}s
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2 px-3 py-1 bg-success/10 text-success rounded-full">
            <Icon name="Zap" size={14} />
            <span className="text-xs font-medium">{data?.confidence}% Confidence</span>
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Key Metrics Overview */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center">
            <Icon name="BarChart3" size={16} className="mr-2 text-accent" />
            Performance Impact
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <MetricCard
              title="On-Time Performance"
              metric={data?.metrics?.onTimePerformance}
              isHighlighted={data?.metrics?.onTimePerformance?.improvement > 4}
            />
            <MetricCard
              title="Average Delay"
              metric={data?.metrics?.averageDelay}
              isHighlighted={data?.metrics?.averageDelay?.improvement < -1}
            />
            <MetricCard
              title="Hourly Throughput"
              metric={data?.metrics?.throughput}
              isHighlighted={data?.metrics?.throughput?.improvement > 10}
            />
            <MetricCard
              title="Capacity Utilization"
              metric={data?.metrics?.capacityUtilization}
            />
            <MetricCard
              title="Active Conflicts"
              metric={data?.metrics?.conflicts}
              isHighlighted={data?.metrics?.conflicts?.improvement < -1}
            />
            <MetricCard
              title="Energy Efficiency"
              metric={data?.metrics?.energyEfficiency}
            />
          </div>
        </div>

        {/* Impact Analysis */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center">
            <Icon name="Target" size={16} className="mr-2 text-accent" />
            Impact Analysis
          </h3>
          <div className="bg-surface border border-border rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <h4 className="text-sm font-medium text-foreground mb-3">Operational Changes</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Affected Trains:</span>
                    <span className="font-medium text-foreground">{data?.impactAnalysis?.affectedTrains}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Route Changes:</span>
                    <span className="font-medium text-foreground">{data?.impactAnalysis?.routeChanges}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Priority Adjustments:</span>
                    <span className="font-medium text-foreground">{data?.impactAnalysis?.priorityAdjustments}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Platform Changes:</span>
                    <span className="font-medium text-foreground">{data?.impactAnalysis?.platformReassignments}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-foreground mb-3">Financial Impact</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Estimated Savings:</span>
                    <span className="font-medium text-success">
                      ${data?.impactAnalysis?.estimatedSavings?.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Implementation Cost:</span>
                    <span className="font-medium text-foreground">$2,400</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Net Benefit:</span>
                    <span className="font-medium text-success">
                      ${(data?.impactAnalysis?.estimatedSavings - 2400)?.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">ROI:</span>
                    <span className="font-medium text-success">420%</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-foreground mb-3">Passenger Impact</h4>
                <div className="text-sm">
                  <p className="text-muted-foreground mb-2">Overall Assessment:</p>
                  <p className="text-foreground">{data?.impactAnalysis?.passengerImpact}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Risk Assessment */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center">
            <Icon name="AlertTriangle" size={16} className="mr-2 text-warning" />
            Risk Assessment
          </h3>
          <div className="space-y-3">
            {data?.risks?.map((risk, index) => (
              <div key={index} className="bg-surface border border-border rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRiskColor(risk?.level)}`}>
                    {risk?.level} Risk
                  </span>
                  <div className="flex-1">
                    <p className="text-sm text-foreground mb-2">{risk?.description}</p>
                    <p className="text-xs text-muted-foreground">
                      <strong>Mitigation:</strong> {risk?.mitigation}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center">
            <Icon name="Lightbulb" size={16} className="mr-2 text-accent" />
            Implementation Recommendations
          </h3>
          <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
            <ul className="space-y-2">
              {data?.recommendations?.map((recommendation, index) => (
                <li key={index} className="flex items-start space-x-2 text-sm">
                  <Icon name="Check" size={14} className="text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{recommendation}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="default"
            onClick={handleApplyChanges}
            loading={isApplying}
            iconName="Check"
            iconPosition="left"
            className="flex-1"
          >
            {isApplying ? 'Applying Changes...' : 'Apply Changes'}
          </Button>
          
          <Button
            variant="outline"
            onClick={() => onSaveScenario && onSaveScenario(data)}
            iconName="Save"
            iconPosition="left"
            className="flex-1"
          >
            Save Scenario
          </Button>
          
          <Button
            variant="outline"
            onClick={() => onDiscardResults && onDiscardResults()}
            iconName="X"
            iconPosition="left"
            className="flex-1 text-error hover:text-error hover:border-error"
          >
            Discard Results
          </Button>
        </div>
      </div>
      {/* Footer */}
      <div className="border-t border-border p-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Simulation completed at {new Date(data.timestamp)?.toLocaleString()}</span>
          <span>Confidence: {data?.confidence}%</span>
        </div>
      </div>
    </div>
  );
};

export default SimulationResults;