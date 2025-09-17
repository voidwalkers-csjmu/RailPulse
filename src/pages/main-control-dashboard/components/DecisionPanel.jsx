import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DecisionPanel = () => {
  const [decisions, setDecisions] = useState([]);
  const [selectedDecision, setSelectedDecision] = useState(null);
  const [showOverrideModal, setShowOverrideModal] = useState(false);
  const [overrideReason, setOverrideReason] = useState('');

  const aiRecommendations = [
    {
      id: 'D001',
      priority: 'high',
      type: 'precedence',
      title: 'Train Precedence Conflict',
      description: 'Express 101 and Freight 205 approaching Junction B1',
      recommendation: 'Grant precedence to Express 101 (passenger priority)',
      rationale: `Based on current analysis:\n• Express 101: 180 passengers, on-time status\n• Freight 205: Already delayed by 12 minutes\n• Passenger priority policy applies\n• Minimal additional delay to freight service`,
      confidence: 94,
      impact: {
        delayReduction: '8 minutes',
        affectedTrains: 2,
        passengerImpact: 'Minimal'
      },
      timeRemaining: 180,
      status: 'pending'
    },
    {
      id: 'D002',
      priority: 'medium',
      type: 'routing',
      title: 'Platform Assignment',
      description: 'Local 308 requires platform assignment at Terminal D1',
      recommendation: 'Assign Platform D1-A (currently available)',
      rationale: `Optimal platform selection:\n• Platform D1-A: Available, suitable length\n• Platform D1-B: Occupied until 16:45\n• Shortest passenger walking distance\n• No conflicts with scheduled departures`,
      confidence: 87,
      impact: {
        delayReduction: '3 minutes',
        affectedTrains: 1,
        passengerImpact: 'Improved'
      },
      timeRemaining: 420,
      status: 'pending'
    },
    {
      id: 'D003',
      priority: 'low',
      type: 'maintenance',
      title: 'Section Maintenance Window',
      description: 'Scheduled maintenance for Section C2 coordination',
      recommendation: 'Approve maintenance window 18:00-20:00',
      rationale: `Maintenance window analysis:\n• Low traffic period identified\n• No passenger services affected\n• Two freight trains can be rerouted\n• Weather conditions favorable`,
      confidence: 76,
      impact: {
        delayReduction: '0 minutes',
        affectedTrains: 2,
        passengerImpact: 'None'
      },
      timeRemaining: 1800,
      status: 'pending'
    }
  ];

  const [liveRecommendations, setLiveRecommendations] = useState(aiRecommendations);

  useEffect(() => {
    const timer = setInterval(() => {
      setLiveRecommendations(prev => prev?.map(rec => ({
        ...rec,
        timeRemaining: Math.max(0, rec?.timeRemaining - 1),
        confidence: Math.max(70, Math.min(95, rec?.confidence + (Math.random() - 0.5) * 2))
      })));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'border-l-error bg-error/5';
      case 'medium':
        return 'border-l-warning bg-warning/5';
      case 'low':
        return 'border-l-success bg-success/5';
      default:
        return 'border-l-muted-foreground bg-muted/5';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return 'AlertTriangle';
      case 'medium':
        return 'AlertCircle';
      case 'low':
        return 'Info';
      default:
        return 'Circle';
    }
  };

  const formatTimeRemaining = (seconds) => {
    if (seconds < 60) return `${seconds}s`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
    return `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m`;
  };

  const handleAcceptDecision = (decision) => {
    console.log('Decision accepted:', decision?.id);
    setLiveRecommendations(prev => prev?.map(rec => 
      rec?.id === decision?.id ? { ...rec, status: 'accepted' } : rec
    ));
    setDecisions(prev => [...prev, { ...decision, action: 'accepted', timestamp: new Date() }]);
  };

  const handleOverrideDecision = (decision) => {
    setSelectedDecision(decision);
    setShowOverrideModal(true);
  };

  const submitOverride = () => {
    if (selectedDecision && overrideReason?.trim()) {
      console.log('Decision overridden:', selectedDecision?.id, 'Reason:', overrideReason);
      setLiveRecommendations(prev => prev?.map(rec => 
        rec?.id === selectedDecision?.id ? { ...rec, status: 'overridden' } : rec
      ));
      setDecisions(prev => [...prev, { 
        ...selectedDecision, 
        action: 'overridden', 
        reason: overrideReason,
        timestamp: new Date() 
      }]);
      setShowOverrideModal(false);
      setOverrideReason('');
      setSelectedDecision(null);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="Brain" size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground">AI Decision Recommendations</h2>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse-slow"></div>
          <span className="text-sm text-muted-foreground">AI Engine Active</span>
        </div>
      </div>
      <div className="space-y-4">
        {liveRecommendations?.filter(rec => rec?.status === 'pending')?.map((recommendation) => (
          <div
            key={recommendation?.id}
            className={`border-l-4 rounded-lg p-4 ${getPriorityColor(recommendation?.priority)}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <Icon 
                  name={getPriorityIcon(recommendation?.priority)} 
                  size={20} 
                  className={`${
                    recommendation?.priority === 'high' ? 'text-error' :
                    recommendation?.priority === 'medium' ? 'text-warning' : 'text-success'
                  }`}
                />
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{recommendation?.title}</h3>
                  <p className="text-xs text-muted-foreground">{recommendation?.description}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="text-right">
                  <div className="text-xs text-muted-foreground">Time Remaining</div>
                  <div className={`text-sm font-medium ${
                    recommendation?.timeRemaining < 60 ? 'text-error' :
                    recommendation?.timeRemaining < 300 ? 'text-warning' : 'text-foreground'
                  }`}>
                    {formatTimeRemaining(recommendation?.timeRemaining)}
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="text-sm font-medium text-foreground mb-2">
                Recommendation: {recommendation?.recommendation}
              </div>
              
              <div className="text-xs text-muted-foreground mb-3 whitespace-pre-line">
                {recommendation?.rationale}
              </div>

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-4">
                  <div className="text-xs">
                    <span className="text-muted-foreground">Confidence: </span>
                    <span className="font-medium text-foreground">{recommendation?.confidence}%</span>
                  </div>
                  <div className="text-xs">
                    <span className="text-muted-foreground">Impact: </span>
                    <span className="font-medium text-foreground">{recommendation?.impact?.delayReduction}</span>
                  </div>
                  <div className="text-xs">
                    <span className="text-muted-foreground">Affected: </span>
                    <span className="font-medium text-foreground">{recommendation?.impact?.affectedTrains} trains</span>
                  </div>
                </div>

                <div className="w-24 bg-border rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${recommendation?.confidence}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                <Button
                  variant="default"
                  size="sm"
                  iconName="Check"
                  iconPosition="left"
                  onClick={() => handleAcceptDecision(recommendation)}
                >
                  Accept
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  iconName="X"
                  iconPosition="left"
                  onClick={() => handleOverrideDecision(recommendation)}
                >
                  Override
                </Button>
              </div>

              <button className="text-xs text-muted-foreground hover:text-foreground transition-micro">
                View Details →
              </button>
            </div>
          </div>
        ))}
      </div>
      {liveRecommendations?.filter(rec => rec?.status === 'pending')?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-3" />
          <h3 className="text-lg font-medium text-foreground mb-2">All Decisions Processed</h3>
          <p className="text-sm text-muted-foreground">No pending recommendations at this time.</p>
        </div>
      )}
      {/* Recent Decisions */}
      {decisions?.length > 0 && (
        <div className="mt-6 pt-6 border-t border-border">
          <h3 className="text-sm font-medium text-foreground mb-3">Recent Decisions</h3>
          <div className="space-y-2">
            {decisions?.slice(-3)?.map((decision, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-muted/30 rounded-md">
                <div className="flex items-center space-x-2">
                  <Icon 
                    name={decision?.action === 'accepted' ? 'Check' : 'X'} 
                    size={14} 
                    className={decision?.action === 'accepted' ? 'text-success' : 'text-error'}
                  />
                  <span className="text-sm text-foreground">{decision?.title}</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {decision?.timestamp?.toLocaleTimeString('en-US', { hour12: false })}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Override Modal */}
      {showOverrideModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-300 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-lg shadow-modal w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Icon name="AlertTriangle" size={20} className="text-warning" />
                <h3 className="text-lg font-semibold text-foreground">Override Decision</h3>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">
                You are about to override the AI recommendation for "{selectedDecision?.title}". 
                Please provide a reason for this override.
              </p>
              
              <textarea
                value={overrideReason}
                onChange={(e) => setOverrideReason(e?.target?.value)}
                placeholder="Enter reason for override..."
                className="w-full p-3 border border-border rounded-md text-sm resize-none h-24 bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              
              <div className="flex justify-end space-x-3 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setShowOverrideModal(false);
                    setOverrideReason('');
                    setSelectedDecision(null);
                  }}
                >
                  Cancel
                </Button>
                
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={submitOverride}
                  disabled={!overrideReason?.trim()}
                >
                  Confirm Override
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DecisionPanel;