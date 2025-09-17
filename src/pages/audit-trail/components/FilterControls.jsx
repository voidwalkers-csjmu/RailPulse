import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const FilterControls = ({ onFiltersChange, resultsCount = 0, isLoading = false }) => {
  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    controller: '',
    trainNumber: '',
    actionType: '',
    outcome: '',
    searchKeyword: ''
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const controllerOptions = [
    { value: '', label: 'All Controllers' },
    { value: 'john-smith', label: 'John Smith' },
    { value: 'sarah-johnson', label: 'Sarah Johnson' },
    { value: 'mike-davis', label: 'Mike Davis' },
    { value: 'emily-brown', label: 'Emily Brown' },
    { value: 'david-wilson', label: 'David Wilson' },
    { value: 'lisa-garcia', label: 'Lisa Garcia' }
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

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      dateFrom: '',
      dateTo: '',
      controller: '',
      trainNumber: '',
      actionType: '',
      outcome: '',
      searchKeyword: ''
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const hasActiveFilters = Object.values(filters)?.some(value => value !== '');

  const getDefaultDateRange = () => {
    const today = new Date();
    const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    return {
      from: lastWeek?.toISOString()?.split('T')?.[0],
      to: today?.toISOString()?.split('T')?.[0]
    };
  };

  const handleQuickDateRange = (range) => {
    const today = new Date();
    let fromDate, toDate;

    switch (range) {
      case 'today':
        fromDate = toDate = today?.toISOString()?.split('T')?.[0];
        break;
      case 'yesterday':
        const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
        fromDate = toDate = yesterday?.toISOString()?.split('T')?.[0];
        break;
      case 'week':
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        fromDate = weekAgo?.toISOString()?.split('T')?.[0];
        toDate = today?.toISOString()?.split('T')?.[0];
        break;
      case 'month':
        const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
        fromDate = monthAgo?.toISOString()?.split('T')?.[0];
        toDate = today?.toISOString()?.split('T')?.[0];
        break;
      default:
        return;
    }

    handleFilterChange('dateFrom', fromDate);
    handleFilterChange('dateTo', toDate);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Icon name="Filter" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Filter Controls</h3>
          {hasActiveFilters && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
              {Object.values(filters)?.filter(v => v !== '')?.length} active
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <div className="text-sm text-muted-foreground">
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <Icon name="Loader2" size={14} className="animate-spin" />
                <span>Filtering...</span>
              </div>
            ) : (
              <span>{resultsCount?.toLocaleString()} results</span>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Collapse' : 'Expand'}
          </Button>
        </div>
      </div>
      {/* Quick Search */}
      <div className="mb-4">
        <Input
          type="search"
          placeholder="Search by train number, controller name, or decision keywords..."
          value={filters?.searchKeyword}
          onChange={(e) => handleFilterChange('searchKeyword', e?.target?.value)}
          className="max-w-md"
        />
      </div>
      {/* Expanded Filters */}
      {isExpanded && (
        <div className="space-y-4">
          {/* Date Range */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Date Range</h4>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center space-x-2">
                <Input
                  type="date"
                  label="From"
                  value={filters?.dateFrom}
                  onChange={(e) => handleFilterChange('dateFrom', e?.target?.value)}
                  className="w-40"
                />
                <Input
                  type="date"
                  label="To"
                  value={filters?.dateTo}
                  onChange={(e) => handleFilterChange('dateTo', e?.target?.value)}
                  className="w-40"
                />
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Quick:</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickDateRange('today')}
                >
                  Today
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickDateRange('yesterday')}
                >
                  Yesterday
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickDateRange('week')}
                >
                  Last 7 Days
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickDateRange('month')}
                >
                  Last 30 Days
                </Button>
              </div>
            </div>
          </div>

          {/* Filter Dropdowns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Select
              label="Controller"
              options={controllerOptions}
              value={filters?.controller}
              onChange={(value) => handleFilterChange('controller', value)}
              searchable
            />

            <Input
              type="text"
              label="Train Number"
              placeholder="e.g., T1001, EXP-205"
              value={filters?.trainNumber}
              onChange={(e) => handleFilterChange('trainNumber', e?.target?.value)}
            />

            <Select
              label="Action Type"
              options={actionTypeOptions}
              value={filters?.actionType}
              onChange={(value) => handleFilterChange('actionType', value)}
            />

            <Select
              label="Outcome"
              options={outcomeOptions}
              value={filters?.outcome}
              onChange={(value) => handleFilterChange('outcome', value)}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <Button
              variant="outline"
              iconName="RotateCcw"
              iconPosition="left"
              onClick={handleClearFilters}
              disabled={!hasActiveFilters}
            >
              Clear All Filters
            </Button>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                iconName="Download"
                iconPosition="left"
                onClick={() => console.log('Export filtered results')}
              >
                Export Results
              </Button>
              <Button
                variant="default"
                iconName="Search"
                iconPosition="left"
                onClick={() => console.log('Apply advanced search')}
              >
                Advanced Search
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterControls;