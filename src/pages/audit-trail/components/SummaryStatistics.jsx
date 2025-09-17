import React from 'react';
import Icon from '../../../components/AppIcon';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const SummaryStatistics = ({ statisticsData, className = '' }) => {
  const decisionVolumeData = [
    { name: 'Mon', decisions: 45, overrides: 8 },
    { name: 'Tue', decisions: 52, overrides: 12 },
    { name: 'Wed', decisions: 38, overrides: 6 },
    { name: 'Thu', decisions: 61, overrides: 15 },
    { name: 'Fri', decisions: 48, overrides: 9 },
    { name: 'Sat', decisions: 35, overrides: 4 },
    { name: 'Sun', decisions: 29, overrides: 3 }
  ];

  const controllerActivityData = [
    { name: 'John Smith', decisions: 89, accuracy: 94 },
    { name: 'Sarah Johnson', decisions: 76, accuracy: 97 },
    { name: 'Mike Davis', decisions: 82, accuracy: 91 },
    { name: 'Emily Brown', decisions: 68, accuracy: 96 },
    { name: 'David Wilson', decisions: 71, accuracy: 93 }
  ];

  const outcomeDistribution = [
    { name: 'Successful', value: 78, color: 'var(--color-success)' },
    { name: 'Delayed', value: 18, color: 'var(--color-warning)' },
    { name: 'Failed', value: 4, color: 'var(--color-error)' }
  ];

  const complianceMetrics = {
    overallCompliance: 96.2,
    emergencyResponseTime: 2.3,
    decisionAccuracy: 94.8,
    auditReadiness: 98.5
  };

  const keyMetrics = [
    {
      label: 'Total Decisions',
      value: '1,247',
      change: '+12.3%',
      changeType: 'positive',
      icon: 'GitBranch'
    },
    {
      label: 'Override Rate',
      value: '8.4%',
      change: '-2.1%',
      changeType: 'positive',
      icon: 'AlertTriangle'
    },
    {
      label: 'Avg Response Time',
      value: '1.8s',
      change: '-0.3s',
      changeType: 'positive',
      icon: 'Clock'
    },
    {
      label: 'Success Rate',
      value: '94.8%',
      change: '+1.2%',
      changeType: 'positive',
      icon: 'CheckCircle'
    }
  ];

  const getChangeColor = (changeType) => {
    return changeType === 'positive' ? 'text-success' : 'text-error';
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {keyMetrics?.map((metric, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <Icon name={metric?.icon} size={20} className="text-primary" />
              <span className={`text-sm font-medium ${getChangeColor(metric?.changeType)}`}>
                {metric?.change}
              </span>
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">{metric?.value}</div>
            <div className="text-sm text-muted-foreground">{metric?.label}</div>
          </div>
        ))}
      </div>
      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Decision Volume Trend */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Decision Volume Trend</h3>
            <Icon name="TrendingUp" size={20} className="text-muted-foreground" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={decisionVolumeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="name" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-popover)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="decisions" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="overrides" fill="var(--color-warning)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Controller Activity */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Controller Performance</h3>
            <Icon name="Users" size={20} className="text-muted-foreground" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={controllerActivityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="name" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-popover)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="decisions" 
                  stroke="var(--color-primary)" 
                  strokeWidth={2}
                  dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="accuracy" 
                  stroke="var(--color-success)" 
                  strokeWidth={2}
                  dot={{ fill: 'var(--color-success)', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Outcome Distribution */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Outcome Distribution</h3>
            <Icon name="PieChart" size={20} className="text-muted-foreground" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={outcomeDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {outcomeDistribution?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-popover)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-4 mt-4">
            {outcomeDistribution?.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item?.color }}
                ></div>
                <span className="text-sm text-muted-foreground">
                  {item?.name} ({item?.value}%)
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance Metrics */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Compliance Indicators</h3>
            <Icon name="Shield" size={20} className="text-muted-foreground" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Overall Compliance</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-muted rounded-full h-2">
                  <div 
                    className="bg-success h-2 rounded-full" 
                    style={{ width: `${complianceMetrics?.overallCompliance}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-foreground">
                  {complianceMetrics?.overallCompliance}%
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Emergency Response</span>
              <div className="flex items-center space-x-2">
                <Icon name="Zap" size={14} className="text-warning" />
                <span className="text-sm font-medium text-foreground">
                  {complianceMetrics?.emergencyResponseTime}s avg
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Decision Accuracy</span>
              <div className="flex items-center space-x-2">
                <Icon name="Target" size={14} className="text-success" />
                <span className="text-sm font-medium text-foreground">
                  {complianceMetrics?.decisionAccuracy}%
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Audit Readiness</span>
              <div className="flex items-center space-x-2">
                <Icon name="CheckCircle" size={14} className="text-success" />
                <span className="text-sm font-medium text-foreground">
                  {complianceMetrics?.auditReadiness}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryStatistics;