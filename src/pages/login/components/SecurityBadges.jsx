import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityBadges = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      title: 'ISO 27001 Certified',
      description: 'Information security management'
    },
    {
      icon: 'Lock',
      title: 'End-to-End Encryption',
      description: 'AES-256 data protection'
    },
    {
      icon: 'Clock',
      title: '99.9% Uptime',
      description: '24/7 system availability'
    },
    {
      icon: 'Users',
      title: 'Multi-Factor Auth',
      description: 'Enhanced access control'
    }
  ];

  const complianceStandards = [
    'Railway Safety Standards',
    'GDPR Compliant',
    'SOC 2 Type II',
    'Industry Best Practices'
  ];

  return (
    <div className="space-y-6">
      {/* Security Features Grid */}
      <div className="grid grid-cols-2 gap-4">
        {securityFeatures?.map((feature, index) => (
          <div
            key={index}
            className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg border border-border/50"
          >
            <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
              <Icon name={feature?.icon} size={16} className="text-success" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-foreground">{feature?.title}</h4>
              <p className="text-xs text-muted-foreground">{feature?.description}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Compliance Standards */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="Award" size={16} className="text-accent" />
          <h3 className="text-sm font-semibold text-foreground">Compliance & Standards</h3>
        </div>
        <div className="space-y-2">
          {complianceStandards?.map((standard, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={12} className="text-success" />
              <span className="text-xs text-muted-foreground">{standard}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Trust Indicators */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-2">
          <Icon name="Shield" size={14} className="text-success" />
          <span className="text-xs text-muted-foreground">Trusted by 500+ Railway Networks</span>
        </div>
        <div className="flex items-center justify-center space-x-2">
          <Icon name="Globe" size={14} className="text-accent" />
          <span className="text-xs text-muted-foreground">Operating in 25+ Countries</span>
        </div>
      </div>
    </div>
  );
};

export default SecurityBadges;