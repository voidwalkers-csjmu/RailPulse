import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DecisionHistoryPanel = ({ trainId }) => {
  const [selectedDecision, setSelectedDecision] = useState(null);

  const decisionHistory = [
    {
      id: 'DEC-001',
      timestamp: '2025-01-11T14:30:00Z',
      type: 'Priority Adjustment',
      controller: 'Controller Smith',
      controllerId: 'TC001',
      action: 'Increased priority from Medium to High',
      rationale: `Train carrying medical supplies for emergency delivery to Central Hospital. Patient transport requires expedited arrival within 45 minutes.`,
      aiRecommendation: 'Medium Priority',
      decision: 'Override - High Priority',
      impact: {
        delayReduction: '12 minutes',
        affectedTrains: 3,
        costSaving: '$2,400'
      },
      status: 'completed',
      outcome: 'successful'
    },
    {
      id: 'DEC-002',
      timestamp: '2025-01-11T13:15:00Z',
      type: 'Route Modification',
      controller: 'Controller Johnson',
      controllerId: 'TC003',
      action: 'Changed route from Main Line to Alternate Route 1',
      rationale: `Signal failure on Main Line between stations KM-45 and KM-52. Alternate route ensures on-time arrival despite 8km additional distance.`,
      aiRecommendation: 'Hold at current position',
      decision: 'Override - Route Change',
      impact: {
        delayReduction: '25 minutes',
        affectedTrains: 1,
        fuelCost: '+$180'
      },
      status: 'completed',
      outcome: 'successful'
    },
    {
      id: 'DEC-003',
      timestamp: '2025-01-11T12:45:00Z',
      type: 'Speed Restriction',
      controller: 'Controller Davis',
      controllerId: 'TC002',
      action: 'Applied 60 km/h speed limit',
      rationale: `Weather alert: Heavy fog conditions reducing visibility below 200m. Safety protocol requires speed reduction until visibility improves.`,
      aiRecommendation: '80 km/h speed limit',
      decision: 'Accept with modification',
      impact: {
        delayIncrease: '8 minutes',
        safetyImprovement: 'High',
        riskReduction: '75%'
      },
      status: 'active',
      outcome: 'ongoing'
    },
    {
      id: 'DEC-004',
      timestamp: '2025-01-11T11:20:00Z',
      type: 'Schedule Adjustment',
      controller: 'AI System',
      controllerId: 'AUTO',
      action: 'Extended station stop by 3 minutes',
      rationale: `Passenger boarding delay due to wheelchair accessibility requirements. Extended stop ensures safe boarding completion.`,
      aiRecommendation: 'Extended stop - 3 minutes',
      decision: 'Auto-accepted',
      impact: {
        delayIncrease: '3 minutes',
        passengerSatisfaction: '+15%',
        complianceScore: '100%'
      },
      status: 'completed',
      outcome: 'successful'
    }
  ];

  const getDecisionIcon = (type) => {
    switch (type) {
      case 'Priority Adjustment':
        return { icon: 'TrendingUp', color: 'text-primary' };
      case 'Route Modification':
        return { icon: 'Navigation', color: 'text-accent' };
      case 'Speed Restriction':
        return { icon: 'Gauge', color: 'text-warning' };
      case 'Schedule Adjustment':
        return { icon: 'Clock', color: 'text-secondary' };
      default:
        return { icon: 'Settings', color: 'text-muted-foreground' };
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success text-success-foreground';
      case 'active':
        return 'bg-primary text-primary-foreground';
      case 'pending':
        return 'bg-warning text-warning-foreground';
      case 'cancelled':
        return 'bg-error text-error-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getOutcomeColor = (outcome) => {
    switch (outcome) {
      case 'successful':
        return 'text-success';
      case 'ongoing':
        return 'text-primary';
      case 'failed':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return {
      date: date?.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
      }),
      time: date?.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
      })
    };
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Decision History</h3>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
            onClick={() => console.log('Export decision history')}
          >
            Export
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="RefreshCw"
            onClick={() => console.log('Refresh decision history')}
          />
        </div>
      </div>
      <div className="space-y-4">
        {decisionHistory?.map((decision, index) => {
          const decisionInfo = getDecisionIcon(decision?.type);
          const timestamp = formatTimestamp(decision?.timestamp);
          const isExpanded = selectedDecision === decision?.id;
          
          return (
            <div key={index} className="border border-border rounded-lg overflow-hidden">
              <button
                onClick={() => setSelectedDecision(isExpanded ? null : decision?.id)}
                className="w-full p-4 text-left hover:bg-muted/50 transition-micro"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      decision?.status === 'completed' ? 'bg-success/10' :
                      decision?.status === 'active'? 'bg-primary/10' : 'bg-muted'
                    }`}>
                      <Icon 
                        name={decisionInfo?.icon} 
                        size={20} 
                        className={decisionInfo?.color}
                      />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-1">
                        <h4 className="font-medium text-foreground">{decision?.type}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(decision?.status)}`}>
                          {decision?.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{decision?.action}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-sm font-medium text-foreground">{timestamp?.time}</div>
                      <div className="text-xs text-muted-foreground">{timestamp?.date}</div>
                    </div>
                    <Icon 
                      name={isExpanded ? "ChevronUp" : "ChevronDown"} 
                      size={16} 
                      className="text-muted-foreground"
                    />
                  </div>
                </div>
              </button>
              {isExpanded && (
                <div className="border-t border-border p-4 bg-muted/20">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h5 className="text-sm font-medium text-foreground mb-2">Decision Details</h5>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Controller:</span>
                            <span className="text-foreground font-medium">{decision?.controller}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">ID:</span>
                            <span className="text-foreground font-medium">{decision?.controllerId}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Decision ID:</span>
                            <span className="text-foreground font-medium">{decision?.id}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Outcome:</span>
                            <span className={`font-medium ${getOutcomeColor(decision?.outcome)}`}>
                              {decision?.outcome}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h5 className="text-sm font-medium text-foreground mb-2">AI vs Controller</h5>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="text-muted-foreground">AI Recommendation:</span>
                            <div className="text-foreground mt-1">{decision?.aiRecommendation}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Controller Decision:</span>
                            <div className="text-foreground mt-1">{decision?.decision}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h5 className="text-sm font-medium text-foreground mb-2">Rationale</h5>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {decision?.rationale}
                        </p>
                      </div>

                      <div>
                        <h5 className="text-sm font-medium text-foreground mb-2">Impact Assessment</h5>
                        <div className="space-y-2 text-sm">
                          {Object.entries(decision?.impact)?.map(([key, value]) => (
                            <div key={key} className="flex justify-between">
                              <span className="text-muted-foreground capitalize">
                                {key?.replace(/([A-Z])/g, ' $1')?.trim()}:
                              </span>
                              <span className="text-foreground font-medium">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Total Decisions:</span>
            <div className="font-semibold text-foreground">{decisionHistory?.length}</div>
          </div>
          <div>
            <span className="text-muted-foreground">AI Accepted:</span>
            <div className="font-semibold text-success">
              {decisionHistory?.filter(d => d?.decision?.includes('Accept'))?.length}
            </div>
          </div>
          <div>
            <span className="text-muted-foreground">Overrides:</span>
            <div className="font-semibold text-warning">
              {decisionHistory?.filter(d => d?.decision?.includes('Override'))?.length}
            </div>
          </div>
          <div>
            <span className="text-muted-foreground">Success Rate:</span>
            <div className="font-semibold text-primary">
              {Math.round((decisionHistory?.filter(d => d?.outcome === 'successful')?.length / decisionHistory?.length) * 100)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DecisionHistoryPanel;