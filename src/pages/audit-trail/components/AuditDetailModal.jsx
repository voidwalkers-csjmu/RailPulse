import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AuditDetailModal = ({ auditEntry, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('details');

  if (!isOpen || !auditEntry) return null;

  const tabs = [
    { id: 'details', label: 'Decision Details', icon: 'FileText' },
    { id: 'timeline', label: 'Timeline', icon: 'Clock' },
    { id: 'impact', label: 'Impact Analysis', icon: 'TrendingUp' },
    { id: 'related', label: 'Related Decisions', icon: 'GitBranch' }
  ];

  const timelineEvents = [
    {
      timestamp: new Date(auditEntry.timestamp - 300000),
      event: 'Conflict Detected',
      description: 'System identified potential train conflict at Junction A',
      type: 'system',
      icon: 'AlertTriangle'
    },
    {
      timestamp: new Date(auditEntry.timestamp - 180000),
      event: 'AI Recommendation Generated',
      description: 'Decision support system provided 3 alternative solutions',
      type: 'ai',
      icon: 'Brain'
    },
    {
      timestamp: new Date(auditEntry.timestamp - 60000),
      event: 'Controller Review',
      description: `${auditEntry?.controller} reviewed recommendations and rationale`,
      type: 'user',
      icon: 'User'
    },
    {
      timestamp: new Date(auditEntry.timestamp),
      event: 'Decision Made',
      description: `${auditEntry?.actionType} decision implemented`,
      type: 'decision',
      icon: 'CheckCircle'
    },
    {
      timestamp: new Date(auditEntry.timestamp + 120000),
      event: 'Outcome Verified',
      description: `Decision resulted in ${auditEntry?.outcome?.toLowerCase()} outcome`,
      type: 'outcome',
      icon: auditEntry?.outcome === 'Successful' ? 'CheckCircle' : 'AlertCircle'
    }
  ];

  const relatedDecisions = [
    {
      id: 'AUD-2024-001246',
      timestamp: new Date(auditEntry.timestamp - 1800000),
      trainNumber: 'T1003',
      actionType: 'Accept',
      controller: 'Sarah Johnson',
      relation: 'Same junction, 30 minutes prior'
    },
    {
      id: 'AUD-2024-001248',
      timestamp: new Date(auditEntry.timestamp + 900000),
      trainNumber: 'EXP-207',
      actionType: 'Manual',
      controller: 'Mike Davis',
      relation: 'Downstream impact from this decision'
    }
  ];

  const impactMetrics = {
    delayReduction: auditEntry?.delayMinutes ? -auditEntry?.delayMinutes : 0,
    throughputImprovement: 2.3,
    energyEfficiency: 1.8,
    passengerSatisfaction: 0.5
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp)?.toLocaleString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  const getActionTypeColor = (actionType) => {
    switch (actionType?.toLowerCase()) {
      case 'override':
        return 'text-warning bg-warning/10';
      case 'accept':
        return 'text-success bg-success/10';
      case 'emergency':
        return 'text-error bg-error/10';
      case 'manual':
        return 'text-primary bg-primary/10';
      default:
        return 'text-muted-foreground bg-muted/10';
    }
  };

  const getEventTypeColor = (type) => {
    switch (type) {
      case 'system':
        return 'text-primary';
      case 'ai':
        return 'text-accent';
      case 'user':
        return 'text-secondary';
      case 'decision':
        return 'text-success';
      case 'outcome':
        return 'text-warning';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-300 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg shadow-modal max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <Icon name="FileText" size={24} className="text-primary" />
            <div>
              <h2 className="text-xl font-semibold text-foreground">Audit Entry Details</h2>
              <p className="text-sm text-muted-foreground">ID: {auditEntry?.id}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={onClose}
          />
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium transition-micro ${
                activeTab === tab?.id
                  ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground hover:bg-muted/30'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'details' && (
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Timestamp</label>
                    <div className="text-foreground font-medium">{formatTimestamp(auditEntry?.timestamp)}</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Controller</label>
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <Icon name="User" size={12} color="white" />
                      </div>
                      <div>
                        <div className="text-foreground font-medium">{auditEntry?.controller}</div>
                        <div className="text-xs text-muted-foreground">{auditEntry?.controllerRole}</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Train Information</label>
                    <div className="text-foreground font-medium">{auditEntry?.trainNumber}</div>
                    <div className="text-sm text-muted-foreground">{auditEntry?.trainType}</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Action Type</label>
                    <div>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getActionTypeColor(auditEntry?.actionType)}`}>
                        {auditEntry?.actionType}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Outcome</label>
                    <div className="text-foreground font-medium">{auditEntry?.outcome}</div>
                    {auditEntry?.delayMinutes && (
                      <div className="text-sm text-warning">Delay: +{auditEntry?.delayMinutes} minutes</div>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Impact</label>
                    <div className="text-foreground">{auditEntry?.impact}</div>
                  </div>
                </div>
              </div>

              {/* Rationale */}
              <div>
                <label className="text-sm font-medium text-muted-foreground">Decision Rationale</label>
                <div className="mt-2 p-4 bg-muted/30 rounded-lg text-foreground">
                  {auditEntry?.rationale}
                </div>
              </div>

              {/* Before/After States */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Before State</label>
                  <div className="mt-2 p-4 bg-error/10 border border-error/20 rounded-lg">
                    <div className="text-sm text-foreground">
                      • Train T1001 approaching Junction A at 14:23\n
                      • Potential conflict with EXP-205 scheduled at 14:25\n
                      • Estimated delay: 8-12 minutes without intervention
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">After State</label>
                  <div className="mt-2 p-4 bg-success/10 border border-success/20 rounded-lg">
                    <div className="text-sm text-foreground">
                      • T1001 granted priority passage at 14:23\n
                      • EXP-205 delayed by 3 minutes to 14:28\n
                      • Overall system delay reduced by 5 minutes
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'timeline' && (
            <div className="space-y-4">
              {timelineEvents?.map((event, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getEventTypeColor(event?.type)} bg-current/10`}>
                    <Icon name={event?.icon} size={16} className={getEventTypeColor(event?.type)} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-foreground">{event?.event}</h4>
                      <span className="text-xs text-muted-foreground">{formatTimestamp(event?.timestamp)}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{event?.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'impact' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <div className="text-2xl font-bold text-success">{impactMetrics?.delayReduction}</div>
                  <div className="text-sm text-muted-foreground">Minutes Saved</div>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <div className="text-2xl font-bold text-primary">+{impactMetrics?.throughputImprovement}%</div>
                  <div className="text-sm text-muted-foreground">Throughput</div>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <div className="text-2xl font-bold text-accent">+{impactMetrics?.energyEfficiency}%</div>
                  <div className="text-sm text-muted-foreground">Energy Efficiency</div>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <div className="text-2xl font-bold text-success">+{impactMetrics?.passengerSatisfaction}%</div>
                  <div className="text-sm text-muted-foreground">Satisfaction</div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-foreground mb-3">Detailed Impact Analysis</h4>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>• This decision prevented a potential 8-12 minute delay for Train T1001 by granting priority passage</p>
                  <p>• EXP-205 experienced a minimal 3-minute delay, resulting in net system improvement</p>
                  <p>• Passenger impact: 245 passengers on T1001 avoided significant delay</p>
                  <p>• Energy savings: Reduced stop-and-go operations saved approximately 12% fuel consumption</p>
                  <p>• Network effect: Downstream trains maintained schedule adherence</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'related' && (
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-foreground">Related Decisions</h4>
              {relatedDecisions?.map((decision, index) => (
                <div key={index} className="p-4 border border-border rounded-lg hover:bg-muted/30 transition-micro">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-medium text-foreground">{decision?.id}</span>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getActionTypeColor(decision?.actionType)}`}>
                        {decision?.actionType}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">{formatTimestamp(decision?.timestamp)}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Train: {decision?.trainNumber} • Controller: {decision?.controller}
                  </div>
                  <div className="text-sm text-foreground mt-1">{decision?.relation}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-muted/20">
          <div className="text-sm text-muted-foreground">
            Last updated: {formatTimestamp(new Date())}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              iconName="Download"
              iconPosition="left"
              onClick={() => console.log('Export audit entry')}
            >
              Export Entry
            </Button>
            <Button
              variant="default"
              onClick={onClose}
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditDetailModal;