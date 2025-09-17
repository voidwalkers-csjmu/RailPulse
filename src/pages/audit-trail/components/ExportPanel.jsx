import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const ExportPanel = ({ onExport, isExporting = false, className = '' }) => {
  const [exportConfig, setExportConfig] = useState({
    format: 'csv',
    dateRange: 'custom',
    dateFrom: '',
    dateTo: '',
    includeFields: {
      timestamp: true,
      controller: true,
      trainNumber: true,
      actionType: true,
      rationale: true,
      outcome: true,
      impact: true,
      delayMinutes: false,
      beforeState: false,
      afterState: false
    },
    filterBy: {
      controller: '',
      actionType: '',
      outcome: ''
    }
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const formatOptions = [
    { value: 'csv', label: 'CSV (Comma Separated)', description: 'Best for Excel and data analysis' },
    { value: 'xlsx', label: 'Excel Workbook', description: 'Native Excel format with formatting' },
    { value: 'pdf', label: 'PDF Report', description: 'Formatted report for presentations' },
    { value: 'json', label: 'JSON Data', description: 'Structured data for API integration' }
  ];

  const dateRangeOptions = [
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'week', label: 'Last 7 Days' },
    { value: 'month', label: 'Last 30 Days' },
    { value: 'quarter', label: 'Last 3 Months' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const controllerOptions = [
    { value: '', label: 'All Controllers' },
    { value: 'john-smith', label: 'John Smith' },
    { value: 'sarah-johnson', label: 'Sarah Johnson' },
    { value: 'mike-davis', label: 'Mike Davis' },
    { value: 'emily-brown', label: 'Emily Brown' }
  ];

  const actionTypeOptions = [
    { value: '', label: 'All Actions' },
    { value: 'accept', label: 'Accept Decision' },
    { value: 'override', label: 'Override Decision' },
    { value: 'manual', label: 'Manual Decision' },
    { value: 'emergency', label: 'Emergency Override' }
  ];

  const outcomeOptions = [
    { value: '', label: 'All Outcomes' },
    { value: 'successful', label: 'Successful' },
    { value: 'delayed', label: 'Delayed' },
    { value: 'failed', label: 'Failed' }
  ];

  const handleConfigChange = (section, key, value) => {
    setExportConfig(prev => ({
      ...prev,
      [section]: {
        ...prev?.[section],
        [key]: value
      }
    }));
  };

  const handleFieldToggle = (field, checked) => {
    setExportConfig(prev => ({
      ...prev,
      includeFields: {
        ...prev?.includeFields,
        [field]: checked
      }
    }));
  };

  const handleExport = () => {
    const exportData = {
      ...exportConfig,
      timestamp: new Date()?.toISOString(),
      requestedBy: 'Current User'
    };
    
    if (onExport) {
      onExport(exportData);
    } else {
      console.log('Export requested:', exportData);
      // Simulate export process
      setTimeout(() => {
        alert(`Export completed! ${exportConfig?.format?.toUpperCase()} file has been generated.`);
      }, 2000);
    }
  };

  const getDateRange = () => {
    const today = new Date();
    const ranges = {
      today: { from: today, to: today },
      yesterday: { 
        from: new Date(today.getTime() - 24 * 60 * 60 * 1000), 
        to: new Date(today.getTime() - 24 * 60 * 60 * 1000) 
      },
      week: { 
        from: new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000), 
        to: today 
      },
      month: { 
        from: new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000), 
        to: today 
      },
      quarter: { 
        from: new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000), 
        to: today 
      }
    };
    return ranges?.[exportConfig?.dateRange] || { from: null, to: null };
  };

  const getEstimatedRecords = () => {
    // Mock calculation based on filters
    const baseRecords = 1247;
    const range = getDateRange();
    if (!range?.from) return baseRecords;
    
    const days = Math.ceil((range?.to - range?.from) / (24 * 60 * 60 * 1000)) + 1;
    return Math.floor(baseRecords * (days / 30));
  };

  const selectedFieldsCount = Object.values(exportConfig?.includeFields)?.filter(Boolean)?.length;

  return (
    <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Icon name="Download" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Export Configuration</h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Collapse' : 'Configure'}
        </Button>
      </div>
      {/* Quick Export */}
      <div className="flex items-center space-x-4 mb-4">
        <Select
          options={formatOptions}
          value={exportConfig?.format}
          onChange={(value) => setExportConfig(prev => ({ ...prev, format: value }))}
          className="w-48"
        />
        <Select
          options={dateRangeOptions}
          value={exportConfig?.dateRange}
          onChange={(value) => setExportConfig(prev => ({ ...prev, dateRange: value }))}
          className="w-40"
        />
        <Button
          variant="default"
          iconName="Download"
          iconPosition="left"
          onClick={handleExport}
          loading={isExporting}
          disabled={isExporting}
        >
          {isExporting ? 'Exporting...' : 'Export Now'}
        </Button>
      </div>
      {/* Expanded Configuration */}
      {isExpanded && (
        <div className="space-y-6 pt-4 border-t border-border">
          {/* Custom Date Range */}
          {exportConfig?.dateRange === 'custom' && (
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">Custom Date Range</h4>
              <div className="flex items-center space-x-4">
                <Input
                  type="date"
                  label="From Date"
                  value={exportConfig?.dateFrom}
                  onChange={(e) => setExportConfig(prev => ({ ...prev, dateFrom: e?.target?.value }))}
                  className="w-40"
                />
                <Input
                  type="date"
                  label="To Date"
                  value={exportConfig?.dateTo}
                  onChange={(e) => setExportConfig(prev => ({ ...prev, dateTo: e?.target?.value }))}
                  className="w-40"
                />
              </div>
            </div>
          )}

          {/* Field Selection */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">
              Include Fields ({selectedFieldsCount} selected)
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {Object.entries(exportConfig?.includeFields)?.map(([field, checked]) => (
                <Checkbox
                  key={field}
                  label={field?.charAt(0)?.toUpperCase() + field?.slice(1)?.replace(/([A-Z])/g, ' $1')}
                  checked={checked}
                  onChange={(e) => handleFieldToggle(field, e?.target?.checked)}
                />
              ))}
            </div>
          </div>

          {/* Additional Filters */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Additional Filters</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select
                label="Controller"
                options={controllerOptions}
                value={exportConfig?.filterBy?.controller}
                onChange={(value) => handleConfigChange('filterBy', 'controller', value)}
                searchable
              />
              <Select
                label="Action Type"
                options={actionTypeOptions}
                value={exportConfig?.filterBy?.actionType}
                onChange={(value) => handleConfigChange('filterBy', 'actionType', value)}
              />
              <Select
                label="Outcome"
                options={outcomeOptions}
                value={exportConfig?.filterBy?.outcome}
                onChange={(value) => handleConfigChange('filterBy', 'outcome', value)}
              />
            </div>
          </div>

          {/* Export Summary */}
          <div className="bg-muted/30 rounded-lg p-4">
            <h4 className="text-sm font-medium text-foreground mb-2">Export Summary</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Format:</span>
                <div className="font-medium text-foreground">
                  {formatOptions?.find(f => f?.value === exportConfig?.format)?.label}
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">Date Range:</span>
                <div className="font-medium text-foreground">
                  {dateRangeOptions?.find(d => d?.value === exportConfig?.dateRange)?.label}
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">Estimated Records:</span>
                <div className="font-medium text-foreground">
                  {getEstimatedRecords()?.toLocaleString()}
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">Fields:</span>
                <div className="font-medium text-foreground">
                  {selectedFieldsCount} of {Object.keys(exportConfig?.includeFields)?.length}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <Button
              variant="outline"
              iconName="RotateCcw"
              iconPosition="left"
              onClick={() => setExportConfig({
                format: 'csv',
                dateRange: 'custom',
                dateFrom: '',
                dateTo: '',
                includeFields: {
                  timestamp: true,
                  controller: true,
                  trainNumber: true,
                  actionType: true,
                  rationale: true,
                  outcome: true,
                  impact: true,
                  delayMinutes: false,
                  beforeState: false,
                  afterState: false
                },
                filterBy: {
                  controller: '',
                  actionType: '',
                  outcome: ''
                }
              })}
            >
              Reset Configuration
            </Button>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                iconName="Save"
                iconPosition="left"
                onClick={() => console.log('Save export template')}
              >
                Save Template
              </Button>
              <Button
                variant="default"
                iconName="Download"
                iconPosition="left"
                onClick={handleExport}
                loading={isExporting}
                disabled={isExporting}
              >
                {isExporting ? 'Generating Export...' : 'Export with Configuration'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExportPanel;