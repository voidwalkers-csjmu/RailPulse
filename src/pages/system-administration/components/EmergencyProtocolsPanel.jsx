import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const EmergencyProtocolsPanel = () => {
  const [emergencyContacts, setEmergencyContacts] = useState([
    {
      id: 1,
      name: "Railway Control Center",
      role: "Primary Control",
      phone: "+1-555-0100",
      email: "control@railcontrol.com",
      priority: 1,
      available24x7: true
    },
    {
      id: 2,
      name: "Emergency Services",
      role: "Emergency Response",
      phone: "911",
      email: "emergency@city.gov",
      priority: 1,
      available24x7: true
    },
    {
      id: 3,
      name: "Railway Supervisor",
      role: "Operations Supervisor",
      phone: "+1-555-0101",
      email: "supervisor@railcontrol.com",
      priority: 2,
      available24x7: true
    },
    {
      id: 4,
      name: "Maintenance Team",
      role: "Technical Support",
      phone: "+1-555-0102",
      email: "maintenance@railcontrol.com",
      priority: 3,
      available24x7: false
    }
  ]);

  const [escalationRules, setEscalationRules] = useState([
    {
      id: 1,
      name: "Critical System Failure",
      description: "Complete system outage or critical safety issue",
      triggerConditions: ["system_down", "safety_critical"],
      escalationSteps: [
        { step: 1, delay: 0, contacts: ["Railway Control Center", "Emergency Services"] },
        { step: 2, delay: 5, contacts: ["Railway Supervisor"] },
        { step: 3, delay: 15, contacts: ["Maintenance Team"] }
      ],
      enabled: true
    },
    {
      id: 2,
      name: "Train Collision Risk",
      description: "High probability of train collision detected",
      triggerConditions: ["collision_risk_high", "safety_critical"],
      escalationSteps: [
        { step: 1, delay: 0, contacts: ["Railway Control Center", "Emergency Services"] },
        { step: 2, delay: 2, contacts: ["Railway Supervisor"] }
      ],
      enabled: true
    },
    {
      id: 3,
      name: "Communication Loss",
      description: "Loss of communication with multiple trains",
      triggerConditions: ["communication_loss", "multiple_trains"],
      escalationSteps: [
        { step: 1, delay: 0, contacts: ["Railway Control Center"] },
        { step: 2, delay: 10, contacts: ["Railway Supervisor"] },
        { step: 3, delay: 30, contacts: ["Maintenance Team"] }
      ],
      enabled: true
    }
  ]);

  const [overridePermissions, setOverridePermissions] = useState([
    {
      userId: 1,
      userName: "John Smith",
      role: "Senior Controller",
      permissions: ["emergency_stop", "route_override", "signal_override"],
      requiresApproval: false,
      approvalLevel: "none"
    },
    {
      userId: 2,
      userName: "Sarah Johnson",
      role: "Supervisor",
      permissions: ["emergency_stop", "route_override", "signal_override", "system_shutdown"],
      requiresApproval: false,
      approvalLevel: "none"
    },
    {
      userId: 3,
      userName: "Mike Rodriguez",
      role: "Controller",
      permissions: ["emergency_stop"],
      requiresApproval: true,
      approvalLevel: "supervisor"
    }
  ]);

  const [showContactModal, setShowContactModal] = useState(false);
  const [showRuleModal, setShowRuleModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [selectedRule, setSelectedRule] = useState(null);

  const priorityOptions = [
    { value: 1, label: "Priority 1 (Critical)" },
    { value: 2, label: "Priority 2 (High)" },
    { value: 3, label: "Priority 3 (Medium)" },
    { value: 4, label: "Priority 4 (Low)" }
  ];

  const permissionOptions = [
    { value: "emergency_stop", label: "Emergency Stop" },
    { value: "route_override", label: "Route Override" },
    { value: "signal_override", label: "Signal Override" },
    { value: "system_shutdown", label: "System Shutdown" },
    { value: "communication_override", label: "Communication Override" }
  ];

  const approvalLevelOptions = [
    { value: "none", label: "No Approval Required" },
    { value: "supervisor", label: "Supervisor Approval" },
    { value: "manager", label: "Manager Approval" },
    { value: "dual", label: "Dual Authorization" }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 1:
        return 'bg-error text-error-foreground';
      case 2:
        return 'bg-warning text-warning-foreground';
      case 3:
        return 'bg-accent text-accent-foreground';
      case 4:
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const handleTestEmergencyProtocol = (ruleId) => {
    const rule = escalationRules?.find(r => r?.id === ruleId);
    if (window.confirm(`Test emergency protocol: "${rule?.name}"?\n\nThis will send test notifications to all configured contacts.`)) {
      console.log('Testing emergency protocol:', rule?.name);
      // In real implementation, this would trigger test notifications
    }
  };

  const handleEmergencyActivation = () => {
    if (window.confirm('EMERGENCY ACTIVATION\n\nThis will activate all emergency protocols immediately.\n\nConfirm activation?')) {
      console.log('Emergency protocols activated');
      // In real implementation, this would trigger emergency procedures
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Emergency Protocols</h3>
          <p className="text-sm text-muted-foreground">
            Manage emergency contacts, escalation procedures, and override permissions
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            iconName="TestTube"
            onClick={() => console.log('Testing all protocols')}
          >
            Test All Protocols
          </Button>
          <Button
            variant="destructive"
            iconName="AlertTriangle"
            onClick={handleEmergencyActivation}
          >
            Emergency Activation
          </Button>
        </div>
      </div>
      {/* Emergency Contacts */}
      <div className="bg-card border border-border rounded-lg">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-md font-semibold text-foreground">Emergency Contacts</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Configure emergency contact information and priorities
              </p>
            </div>
            <Button
              variant="outline"
              iconName="Plus"
              onClick={() => {
                setSelectedContact(null);
                setShowContactModal(true);
              }}
            >
              Add Contact
            </Button>
          </div>
        </div>

        <div className="divide-y divide-border">
          {emergencyContacts?.map((contact) => (
            <div key={contact?.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h5 className="text-sm font-semibold text-foreground">{contact?.name}</h5>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(contact?.priority)}`}>
                      Priority {contact?.priority}
                    </span>
                    {contact?.available24x7 && (
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-success text-success-foreground">
                        24/7
                      </span>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-foreground">Role:</span>
                      <div className="text-muted-foreground">{contact?.role}</div>
                    </div>
                    <div>
                      <span className="font-medium text-foreground">Phone:</span>
                      <div className="text-muted-foreground font-mono">{contact?.phone}</div>
                    </div>
                    <div>
                      <span className="font-medium text-foreground">Email:</span>
                      <div className="text-muted-foreground">{contact?.email}</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Phone"
                    onClick={() => console.log('Calling contact')}
                    title="Call Contact"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Edit"
                    onClick={() => {
                      setSelectedContact(contact);
                      setShowContactModal(true);
                    }}
                    title="Edit Contact"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Escalation Rules */}
      <div className="bg-card border border-border rounded-lg">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-md font-semibold text-foreground">Escalation Rules</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Define automatic escalation procedures for different emergency scenarios
              </p>
            </div>
            <Button
              variant="outline"
              iconName="Plus"
              onClick={() => {
                setSelectedRule(null);
                setShowRuleModal(true);
              }}
            >
              Add Rule
            </Button>
          </div>
        </div>

        <div className="divide-y divide-border">
          {escalationRules?.map((rule) => (
            <div key={rule?.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h5 className="text-sm font-semibold text-foreground">{rule?.name}</h5>
                    <div className={`w-2 h-2 rounded-full ${rule?.enabled ? 'bg-success' : 'bg-muted-foreground'}`}></div>
                    <span className="text-xs text-muted-foreground">
                      {rule?.enabled ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{rule?.description}</p>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Play"
                    onClick={() => handleTestEmergencyProtocol(rule?.id)}
                    title="Test Protocol"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Edit"
                    onClick={() => {
                      setSelectedRule(rule);
                      setShowRuleModal(true);
                    }}
                    title="Edit Rule"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <span className="text-xs font-medium text-foreground">Escalation Steps:</span>
                  <div className="mt-2 space-y-2">
                    {rule?.escalationSteps?.map((step) => (
                      <div key={step?.step} className="flex items-center space-x-4 text-xs bg-muted/50 rounded-lg p-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                            {step?.step}
                          </div>
                          <span className="font-medium text-foreground">
                            {step?.delay === 0 ? 'Immediate' : `After ${step?.delay} min`}
                          </span>
                        </div>
                        <div className="flex-1">
                          <span className="text-muted-foreground">Notify: </span>
                          <span className="text-foreground">{step?.contacts?.join(', ')}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Override Permissions */}
      <div className="bg-card border border-border rounded-lg">
        <div className="p-6 border-b border-border">
          <h4 className="text-md font-semibold text-foreground">Emergency Override Permissions</h4>
          <p className="text-sm text-muted-foreground mt-1">
            Manage user permissions for emergency override functions
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-4 font-medium text-foreground">User</th>
                <th className="text-left p-4 font-medium text-foreground">Role</th>
                <th className="text-left p-4 font-medium text-foreground">Permissions</th>
                <th className="text-left p-4 font-medium text-foreground">Approval Required</th>
                <th className="text-left p-4 font-medium text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {overridePermissions?.map((user, index) => (
                <tr key={user?.userId} className={index % 2 === 0 ? 'bg-background' : 'bg-muted/20'}>
                  <td className="p-4 text-sm font-medium text-foreground">{user?.userName}</td>
                  <td className="p-4 text-sm text-muted-foreground">{user?.role}</td>
                  <td className="p-4 text-sm">
                    <div className="flex flex-wrap gap-1">
                      {user?.permissions?.map((permission) => (
                        <span key={permission} className="px-2 py-1 bg-accent text-accent-foreground rounded text-xs">
                          {permission?.replace('_', ' ')}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4 text-sm">
                    {user?.requiresApproval ? (
                      <span className="text-warning">{user?.approvalLevel} approval</span>
                    ) : (
                      <span className="text-success">No approval required</span>
                    )}
                  </td>
                  <td className="p-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Edit"
                      onClick={() => console.log('Editing permissions')}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-300 p-4">
          <div className="bg-popover border border-border rounded-lg w-full max-w-2xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-popover-foreground">
                  {selectedContact ? 'Edit Emergency Contact' : 'Add Emergency Contact'}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="X"
                  onClick={() => setShowContactModal(false)}
                />
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Contact Name"
                    type="text"
                    placeholder="Enter contact name"
                    defaultValue={selectedContact?.name}
                    required
                  />
                  <Input
                    label="Role/Department"
                    type="text"
                    placeholder="Enter role or department"
                    defaultValue={selectedContact?.role}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Phone Number"
                    type="tel"
                    placeholder="Enter phone number"
                    defaultValue={selectedContact?.phone}
                    required
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="Enter email address"
                    defaultValue={selectedContact?.email}
                    required
                  />
                </div>

                <Select
                  label="Priority Level"
                  placeholder="Select priority"
                  options={priorityOptions}
                  defaultValue={selectedContact?.priority}
                  required
                />

                <Checkbox
                  label="Available 24/7"
                  description="This contact is available for emergency response at all times"
                  defaultChecked={selectedContact?.available24x7}
                />

                <div className="flex justify-end space-x-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowContactModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="default"
                    onClick={() => {
                      console.log('Saving emergency contact');
                      setShowContactModal(false);
                    }}
                  >
                    {selectedContact ? 'Update Contact' : 'Add Contact'}
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

export default EmergencyProtocolsPanel;