import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const SystemConfigPanel = () => {
  const [configSections, setConfigSections] = useState({
    ai: {
      recommendationThreshold: 85,
      maxRecommendations: 3,
      learningEnabled: true,
      confidenceThreshold: 70,
      autoAcceptThreshold: 95
    },
    alerts: {
      delayThreshold: 5,
      criticalDelayThreshold: 15,
      emailNotifications: true,
      smsNotifications: false,
      soundAlerts: true,
      alertRetentionDays: 30
    },
    system: {
      sessionTimeout: 30,
      autoSaveInterval: 60,
      maxConcurrentUsers: 50,
      dataRetentionDays: 365,
      backupFrequency: 'daily'
    },
    integration: {
      webSocketTimeout: 30,
      apiTimeout: 10,
      retryAttempts: 3,
      healthCheckInterval: 60
    }
  });

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [activeSection, setActiveSection] = useState('ai');

  const handleConfigChange = (section, key, value) => {
    setConfigSections(prev => ({
      ...prev,
      [section]: {
        ...prev?.[section],
        [key]: value
      }
    }));
    setHasUnsavedChanges(true);
  };

  const handleSaveConfig = () => {
    console.log('Saving configuration:', configSections);
    setHasUnsavedChanges(false);
    // In real implementation, this would save to backend
  };

  const handleResetToDefaults = () => {
    if (window.confirm('Are you sure you want to reset all settings to default values? This action cannot be undone.')) {
      // Reset to default values
      setConfigSections({
        ai: {
          recommendationThreshold: 85,
          maxRecommendations: 3,
          learningEnabled: true,
          confidenceThreshold: 70,
          autoAcceptThreshold: 95
        },
        alerts: {
          delayThreshold: 5,
          criticalDelayThreshold: 15,
          emailNotifications: true,
          smsNotifications: false,
          soundAlerts: true,
          alertRetentionDays: 30
        },
        system: {
          sessionTimeout: 30,
          autoSaveInterval: 60,
          maxConcurrentUsers: 50,
          dataRetentionDays: 365,
          backupFrequency: 'daily'
        },
        integration: {
          webSocketTimeout: 30,
          apiTimeout: 10,
          retryAttempts: 3,
          healthCheckInterval: 60
        }
      });
      setHasUnsavedChanges(true);
    }
  };

  const configSectionTabs = [
    { id: 'ai', label: 'AI Settings', icon: 'Brain' },
    { id: 'alerts', label: 'Alert Configuration', icon: 'Bell' },
    { id: 'system', label: 'System Settings', icon: 'Settings' },
    { id: 'integration', label: 'Integration', icon: 'Plug' }
  ];

  const renderAISettings = () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-md font-semibold text-foreground mb-4">AI Recommendation Engine</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Recommendation Threshold (%)"
            type="number"
            min="0"
            max="100"
            value={configSections?.ai?.recommendationThreshold}
            onChange={(e) => handleConfigChange('ai', 'recommendationThreshold', parseInt(e?.target?.value))}
            description="Minimum confidence level for showing recommendations"
          />
          
          <Input
            label="Max Recommendations"
            type="number"
            min="1"
            max="10"
            value={configSections?.ai?.maxRecommendations}
            onChange={(e) => handleConfigChange('ai', 'maxRecommendations', parseInt(e?.target?.value))}
            description="Maximum number of recommendations to display"
          />
          
          <Input
            label="Confidence Threshold (%)"
            type="number"
            min="0"
            max="100"
            value={configSections?.ai?.confidenceThreshold}
            onChange={(e) => handleConfigChange('ai', 'confidenceThreshold', parseInt(e?.target?.value))}
            description="Minimum confidence for decision suggestions"
          />
          
          <Input
            label="Auto-Accept Threshold (%)"
            type="number"
            min="0"
            max="100"
            value={configSections?.ai?.autoAcceptThreshold}
            onChange={(e) => handleConfigChange('ai', 'autoAcceptThreshold', parseInt(e?.target?.value))}
            description="Confidence level for automatic decision acceptance"
          />
        </div>
        
        <div className="mt-4">
          <Checkbox
            label="Enable Machine Learning"
            description="Allow the system to learn from user decisions"
            checked={configSections?.ai?.learningEnabled}
            onChange={(e) => handleConfigChange('ai', 'learningEnabled', e?.target?.checked)}
          />
        </div>
      </div>
    </div>
  );

  const renderAlertSettings = () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-md font-semibold text-foreground mb-4">Alert Thresholds</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Delay Threshold (minutes)"
            type="number"
            min="1"
            value={configSections?.alerts?.delayThreshold}
            onChange={(e) => handleConfigChange('alerts', 'delayThreshold', parseInt(e?.target?.value))}
            description="Trigger alerts when trains are delayed by this amount"
          />
          
          <Input
            label="Critical Delay Threshold (minutes)"
            type="number"
            min="1"
            value={configSections?.alerts?.criticalDelayThreshold}
            onChange={(e) => handleConfigChange('alerts', 'criticalDelayThreshold', parseInt(e?.target?.value))}
            description="Trigger critical alerts for severe delays"
          />
          
          <Input
            label="Alert Retention (days)"
            type="number"
            min="1"
            value={configSections?.alerts?.alertRetentionDays}
            onChange={(e) => handleConfigChange('alerts', 'alertRetentionDays', parseInt(e?.target?.value))}
            description="How long to keep alert history"
          />
        </div>
      </div>
      
      <div>
        <h4 className="text-md font-semibold text-foreground mb-4">Notification Methods</h4>
        <div className="space-y-3">
          <Checkbox
            label="Email Notifications"
            description="Send alerts via email"
            checked={configSections?.alerts?.emailNotifications}
            onChange={(e) => handleConfigChange('alerts', 'emailNotifications', e?.target?.checked)}
          />
          
          <Checkbox
            label="SMS Notifications"
            description="Send critical alerts via SMS"
            checked={configSections?.alerts?.smsNotifications}
            onChange={(e) => handleConfigChange('alerts', 'smsNotifications', e?.target?.checked)}
          />
          
          <Checkbox
            label="Sound Alerts"
            description="Play audio alerts in the control room"
            checked={configSections?.alerts?.soundAlerts}
            onChange={(e) => handleConfigChange('alerts', 'soundAlerts', e?.target?.checked)}
          />
        </div>
      </div>
    </div>
  );

  const renderSystemSettings = () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-md font-semibold text-foreground mb-4">Session Management</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Session Timeout (minutes)"
            type="number"
            min="5"
            max="480"
            value={configSections?.system?.sessionTimeout}
            onChange={(e) => handleConfigChange('system', 'sessionTimeout', parseInt(e?.target?.value))}
            description="Automatic logout after inactivity"
          />
          
          <Input
            label="Auto-Save Interval (seconds)"
            type="number"
            min="10"
            max="300"
            value={configSections?.system?.autoSaveInterval}
            onChange={(e) => handleConfigChange('system', 'autoSaveInterval', parseInt(e?.target?.value))}
            description="Frequency of automatic data saving"
          />
          
          <Input
            label="Max Concurrent Users"
            type="number"
            min="1"
            max="200"
            value={configSections?.system?.maxConcurrentUsers}
            onChange={(e) => handleConfigChange('system', 'maxConcurrentUsers', parseInt(e?.target?.value))}
            description="Maximum number of simultaneous users"
          />
          
          <Input
            label="Data Retention (days)"
            type="number"
            min="30"
            max="2555"
            value={configSections?.system?.dataRetentionDays}
            onChange={(e) => handleConfigChange('system', 'dataRetentionDays', parseInt(e?.target?.value))}
            description="How long to keep operational data"
          />
        </div>
        
        <div className="mt-4">
          <Select
            label="Backup Frequency"
            description="How often to create system backups"
            options={[
              { value: 'hourly', label: 'Every Hour' },
              { value: 'daily', label: 'Daily' },
              { value: 'weekly', label: 'Weekly' }
            ]}
            value={configSections?.system?.backupFrequency}
            onChange={(value) => handleConfigChange('system', 'backupFrequency', value)}
          />
        </div>
      </div>
    </div>
  );

  const renderIntegrationSettings = () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-md font-semibold text-foreground mb-4">Connection Settings</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="WebSocket Timeout (seconds)"
            type="number"
            min="5"
            max="300"
            value={configSections?.integration?.webSocketTimeout}
            onChange={(e) => handleConfigChange('integration', 'webSocketTimeout', parseInt(e?.target?.value))}
            description="Connection timeout for real-time updates"
          />
          
          <Input
            label="API Timeout (seconds)"
            type="number"
            min="1"
            max="60"
            value={configSections?.integration?.apiTimeout}
            onChange={(e) => handleConfigChange('integration', 'apiTimeout', parseInt(e?.target?.value))}
            description="Timeout for API requests"
          />
          
          <Input
            label="Retry Attempts"
            type="number"
            min="1"
            max="10"
            value={configSections?.integration?.retryAttempts}
            onChange={(e) => handleConfigChange('integration', 'retryAttempts', parseInt(e?.target?.value))}
            description="Number of retry attempts for failed connections"
          />
          
          <Input
            label="Health Check Interval (seconds)"
            type="number"
            min="10"
            max="300"
            value={configSections?.integration?.healthCheckInterval}
            onChange={(e) => handleConfigChange('integration', 'healthCheckInterval', parseInt(e?.target?.value))}
            description="Frequency of system health checks"
          />
        </div>
      </div>
    </div>
  );

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'ai':
        return renderAISettings();
      case 'alerts':
        return renderAlertSettings();
      case 'system':
        return renderSystemSettings();
      case 'integration':
        return renderIntegrationSettings();
      default:
        return renderAISettings();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">System Configuration</h3>
          <p className="text-sm text-muted-foreground">
            Configure system parameters and operational settings
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          {hasUnsavedChanges && (
            <span className="text-sm text-warning font-medium">Unsaved changes</span>
          )}
          <Button
            variant="outline"
            iconName="RotateCcw"
            onClick={handleResetToDefaults}
          >
            Reset to Defaults
          </Button>
          <Button
            variant="default"
            iconName="Save"
            iconPosition="left"
            onClick={handleSaveConfig}
            disabled={!hasUnsavedChanges}
          >
            Save Configuration
          </Button>
        </div>
      </div>
      {/* Configuration Tabs */}
      <div className="bg-card border border-border rounded-lg">
        <div className="border-b border-border">
          <div className="flex overflow-x-auto">
            {configSectionTabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveSection(tab?.id)}
                className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium border-b-2 transition-micro whitespace-nowrap ${
                  activeSection === tab?.id
                    ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                <span>{tab?.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {renderActiveSection()}
        </div>
      </div>
    </div>
  );
};

export default SystemConfigPanel;