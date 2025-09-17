import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const AlertConfigPanel = () => {
  const [alertRules, setAlertRules] = useState([
    {
      id: 1,
      name: "Critical Delay Alert",
      description: "Alert when any train is delayed by more than 15 minutes",
      condition: "delay > 15",
      trainTypes: ["Express", "Freight"],
      severity: "critical",
      enabled: true,
      notifications: ["email", "sms", "dashboard"],
      recipients: ["supervisors", "controllers"]
    },
    {
      id: 2,
      name: "High Priority Train Alert",
      description: "Alert for any delays affecting high priority trains",
      condition: "priority = high AND delay > 5",
      trainTypes: ["Express"],
      severity: "high",
      enabled: true,
      notifications: ["email", "dashboard"],
      recipients: ["supervisors"]
    },
    {
      id: 3,
      name: "System Performance Alert",
      description: "Alert when system response time exceeds threshold",
      condition: "response_time > 200",
      trainTypes: ["All"],
      severity: "medium",
      enabled: false,
      notifications: ["email"],
      recipients: ["administrators"]
    },
    {
      id: 4,
      name: "Connection Loss Alert",
      description: "Alert when WebSocket connection is lost",
      condition: "websocket_status = disconnected",
      trainTypes: ["All"],
      severity: "critical",
      enabled: true,
      notifications: ["email", "sms", "dashboard"],
      recipients: ["administrators", "supervisors"]
    }
  ]);

  const [showRuleModal, setShowRuleModal] = useState(false);
  const [selectedRule, setSelectedRule] = useState(null);
  const [testResults, setTestResults] = useState(null);

  const severityOptions = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
    { value: "critical", label: "Critical" }
  ];

  const trainTypeOptions = [
    { value: "All", label: "All Train Types" },
    { value: "Express", label: "Express" },
    { value: "Freight", label: "Freight" },
    { value: "Local", label: "Local" },
    { value: "Maintenance", label: "Maintenance" }
  ];

  const notificationOptions = [
    { value: "email", label: "Email" },
    { value: "sms", label: "SMS" },
    { value: "dashboard", label: "Dashboard" },
    { value: "sound", label: "Sound Alert" }
  ];

  const recipientOptions = [
    { value: "controllers", label: "Controllers" },
    { value: "supervisors", label: "Supervisors" },
    { value: "administrators", label: "Administrators" },
    { value: "maintenance", label: "Maintenance Team" }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical':
        return 'bg-error text-error-foreground';
      case 'high':
        return 'bg-warning text-warning-foreground';
      case 'medium':
        return 'bg-accent text-accent-foreground';
      case 'low':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const handleRuleToggle = (ruleId) => {
    setAlertRules(prev => prev?.map(rule => 
      rule?.id === ruleId ? { ...rule, enabled: !rule?.enabled } : rule
    ));
  };

  const handleEditRule = (rule) => {
    setSelectedRule(rule);
    setShowRuleModal(true);
  };

  const handleDeleteRule = (ruleId) => {
    if (window.confirm('Are you sure you want to delete this alert rule?')) {
      setAlertRules(prev => prev?.filter(rule => rule?.id !== ruleId));
    }
  };

  const handleTestRule = (rule) => {
    console.log('Testing rule:', rule?.name);
    // Simulate test results
    setTestResults({
      ruleId: rule?.id,
      success: true,
      message: `Test alert sent successfully for rule "${rule?.name}". Check your configured notification channels.`,
      timestamp: new Date()?.toLocaleString()
    });
    
    setTimeout(() => setTestResults(null), 5000);
  };

  const handleSaveRule = () => {
    console.log('Saving alert rule');
    setShowRuleModal(false);
    setSelectedRule(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Alert Configuration</h3>
          <p className="text-sm text-muted-foreground">
            Configure notification rules and alert thresholds
          </p>
        </div>
        
        <Button
          variant="default"
          iconName="Plus"
          iconPosition="left"
          onClick={() => {
            setSelectedRule(null);
            setShowRuleModal(true);
          }}
        >
          Add Alert Rule
        </Button>
      </div>
      {/* Test Results */}
      {testResults && (
        <div className="bg-success/10 border border-success/20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="CheckCircle" size={20} className="text-success mt-0.5" />
            <div>
              <div className="text-sm font-medium text-success">Test Successful</div>
              <div className="text-sm text-foreground mt-1">{testResults?.message}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {testResults?.timestamp}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Alert Rules List */}
      <div className="bg-card border border-border rounded-lg">
        <div className="p-6 border-b border-border">
          <h4 className="text-md font-semibold text-foreground">Alert Rules</h4>
          <p className="text-sm text-muted-foreground mt-1">
            Manage notification rules for different operational conditions
          </p>
        </div>

        <div className="divide-y divide-border">
          {alertRules?.map((rule) => (
            <div key={rule?.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h5 className="text-sm font-semibold text-foreground">{rule?.name}</h5>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(rule?.severity)}`}>
                      {rule?.severity?.toUpperCase()}
                    </span>
                    <div className="flex items-center space-x-1">
                      <div className={`w-2 h-2 rounded-full ${rule?.enabled ? 'bg-success' : 'bg-muted-foreground'}`}></div>
                      <span className="text-xs text-muted-foreground">
                        {rule?.enabled ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">{rule?.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div>
                      <span className="font-medium text-foreground">Condition:</span>
                      <div className="text-muted-foreground font-mono mt-1">{rule?.condition}</div>
                    </div>
                    <div>
                      <span className="font-medium text-foreground">Train Types:</span>
                      <div className="text-muted-foreground mt-1">{rule?.trainTypes?.join(', ')}</div>
                    </div>
                    <div>
                      <span className="font-medium text-foreground">Notifications:</span>
                      <div className="text-muted-foreground mt-1">{rule?.notifications?.join(', ')}</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Play"
                    onClick={() => handleTestRule(rule)}
                    title="Test Rule"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Edit"
                    onClick={() => handleEditRule(rule)}
                    title="Edit Rule"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName={rule?.enabled ? "Pause" : "Play"}
                    onClick={() => handleRuleToggle(rule?.id)}
                    title={rule?.enabled ? "Disable Rule" : "Enable Rule"}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Trash2"
                    onClick={() => handleDeleteRule(rule?.id)}
                    title="Delete Rule"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Add/Edit Rule Modal */}
      {showRuleModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-300 p-4">
          <div className="bg-popover border border-border rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-popover-foreground">
                  {selectedRule ? 'Edit Alert Rule' : 'Add New Alert Rule'}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="X"
                  onClick={() => setShowRuleModal(false)}
                />
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Rule Name"
                    type="text"
                    placeholder="Enter rule name"
                    defaultValue={selectedRule?.name}
                    required
                  />
                  <Select
                    label="Severity Level"
                    placeholder="Select severity"
                    options={severityOptions}
                    defaultValue={selectedRule?.severity}
                    required
                  />
                </div>

                <Input
                  label="Description"
                  type="text"
                  placeholder="Describe what this rule monitors"
                  defaultValue={selectedRule?.description}
                  required
                />

                <Input
                  label="Condition"
                  type="text"
                  placeholder="e.g., delay > 15 AND priority = high"
                  defaultValue={selectedRule?.condition}
                  description="Use logical operators (AND, OR) and comparison operators (>, <, =)"
                  required
                />

                <Select
                  label="Train Types"
                  placeholder="Select applicable train types"
                  options={trainTypeOptions}
                  multiple
                  defaultValue={selectedRule?.trainTypes}
                  required
                />

                <div>
                  <label className="text-sm font-medium text-popover-foreground mb-3 block">
                    Notification Methods
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {notificationOptions?.map((option) => (
                      <Checkbox
                        key={option?.value}
                        label={option?.label}
                        defaultChecked={selectedRule?.notifications?.includes(option?.value)}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-popover-foreground mb-3 block">
                    Recipients
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {recipientOptions?.map((option) => (
                      <Checkbox
                        key={option?.value}
                        label={option?.label}
                        defaultChecked={selectedRule?.recipients?.includes(option?.value)}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    label="Enable this rule immediately"
                    defaultChecked={selectedRule?.enabled ?? true}
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowRuleModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="default"
                    onClick={handleSaveRule}
                  >
                    {selectedRule ? 'Update Rule' : 'Create Rule'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertConfigPanel;