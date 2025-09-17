import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ScenarioSetupPanel = ({ 
  selectedTrains = [], 
  onTrainSelect, 
  onParameterChange, 
  onRunSimulation,
  isSimulating = false 
}) => {
  const [scenarioName, setScenarioName] = useState('');
  const [selectedTrain, setSelectedTrain] = useState('');
  const [modificationParams, setModificationParams] = useState({
    priority: '',
    departureDelay: 0,
    routeChange: '',
    speedAdjustment: 0
  });

  const availableTrains = [
    { value: 'TR001', label: 'Express 001 - Mumbai to Delhi', type: 'Express', priority: 'High' },
    { value: 'TR002', label: 'Local 002 - Delhi to Agra', type: 'Local', priority: 'Medium' },
    { value: 'TR003', label: 'Freight 003 - Kolkata to Chennai', type: 'Freight', priority: 'Low' },
    { value: 'TR004', label: 'Express 004 - Bangalore to Hyderabad', type: 'Express', priority: 'High' },
    { value: 'TR005', label: 'Local 005 - Chennai to Coimbatore', type: 'Local', priority: 'Medium' }
  ];

  const priorityOptions = [
    { value: 'high', label: 'High Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'low', label: 'Low Priority' }
  ];

  const routeOptions = [
    { value: 'route_a', label: 'Route A - Primary Track' },
    { value: 'route_b', label: 'Route B - Secondary Track' },
    { value: 'route_c', label: 'Route C - Bypass Track' }
  ];

  const handleAddTrain = () => {
    if (selectedTrain && !selectedTrains?.find(t => t?.id === selectedTrain)) {
      const trainData = availableTrains?.find(t => t?.value === selectedTrain);
      if (trainData && onTrainSelect) {
        onTrainSelect([...selectedTrains, {
          id: trainData?.value,
          name: trainData?.label,
          type: trainData?.type,
          priority: trainData?.priority,
          modifications: { ...modificationParams }
        }]);
      }
      setSelectedTrain('');
      setModificationParams({
        priority: '',
        departureDelay: 0,
        routeChange: '',
        speedAdjustment: 0
      });
    }
  };

  const handleRemoveTrain = (trainId) => {
    if (onTrainSelect) {
      onTrainSelect(selectedTrains?.filter(t => t?.id !== trainId));
    }
  };

  const handleParameterUpdate = (trainId, param, value) => {
    if (onParameterChange) {
      onParameterChange(trainId, param, value);
    }
  };

  const handleRunSimulation = () => {
    if (selectedTrains?.length > 0 && onRunSimulation) {
      onRunSimulation({
        name: scenarioName || `Simulation ${new Date()?.toLocaleTimeString()}`,
        trains: selectedTrains,
        timestamp: new Date()?.toISOString()
      });
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 h-full overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
            <Icon name="Settings" size={18} color="white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Scenario Setup</h2>
            <p className="text-sm text-muted-foreground">Configure simulation parameters</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <Icon name="Clock" size={14} />
          <span>{new Date()?.toLocaleTimeString('en-US', { hour12: false })}</span>
        </div>
      </div>
      {/* Scenario Name */}
      <div className="mb-6">
        <Input
          label="Scenario Name"
          type="text"
          placeholder="Enter scenario name (optional)"
          value={scenarioName}
          onChange={(e) => setScenarioName(e?.target?.value)}
          description="Give your simulation a descriptive name for future reference"
        />
      </div>
      {/* Train Selection */}
      <div className="mb-6">
        <div className="flex items-center space-x-3 mb-4">
          <Icon name="Train" size={16} className="text-accent" />
          <h3 className="text-sm font-semibold text-foreground">Train Selection</h3>
        </div>

        <div className="space-y-4">
          <Select
            label="Select Train"
            placeholder="Choose a train to add to simulation"
            options={availableTrains?.filter(train => 
              !selectedTrains?.find(selected => selected?.id === train?.value)
            )}
            value={selectedTrain}
            onChange={setSelectedTrain}
            searchable
          />

          {selectedTrain && (
            <div className="bg-muted rounded-lg p-4 space-y-4">
              <h4 className="text-sm font-medium text-foreground">Modification Parameters</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Priority Level"
                  options={priorityOptions}
                  value={modificationParams?.priority}
                  onChange={(value) => setModificationParams(prev => ({ ...prev, priority: value }))}
                  placeholder="Select priority"
                />

                <Input
                  label="Departure Delay (minutes)"
                  type="number"
                  value={modificationParams?.departureDelay}
                  onChange={(e) => setModificationParams(prev => ({ 
                    ...prev, 
                    departureDelay: parseInt(e?.target?.value) || 0 
                  }))}
                  placeholder="0"
                  min="-60"
                  max="120"
                />

                <Select
                  label="Route Assignment"
                  options={routeOptions}
                  value={modificationParams?.routeChange}
                  onChange={(value) => setModificationParams(prev => ({ ...prev, routeChange: value }))}
                  placeholder="Select route"
                />

                <Input
                  label="Speed Adjustment (%)"
                  type="number"
                  value={modificationParams?.speedAdjustment}
                  onChange={(e) => setModificationParams(prev => ({ 
                    ...prev, 
                    speedAdjustment: parseInt(e?.target?.value) || 0 
                  }))}
                  placeholder="0"
                  min="-50"
                  max="20"
                />
              </div>

              <Button
                variant="outline"
                onClick={handleAddTrain}
                iconName="Plus"
                iconPosition="left"
                className="w-full"
              >
                Add Train to Simulation
              </Button>
            </div>
          )}
        </div>
      </div>
      {/* Selected Trains */}
      {selectedTrains?.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Icon name="List" size={16} className="text-accent" />
              <h3 className="text-sm font-semibold text-foreground">Selected Trains</h3>
            </div>
            <span className="text-xs text-muted-foreground">
              {selectedTrains?.length} train{selectedTrains?.length !== 1 ? 's' : ''} selected
            </span>
          </div>

          <div className="space-y-3 max-h-64 overflow-y-auto">
            {selectedTrains?.map((train) => (
              <div key={train?.id} className="bg-surface border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                      <Icon name="Train" size={12} color="white" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-foreground">{train?.name}</h4>
                      <p className="text-xs text-muted-foreground">{train?.type} • {train?.priority} Priority</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="X"
                    onClick={() => handleRemoveTrain(train?.id)}
                    className="text-error hover:text-error hover:bg-error/10"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-muted-foreground">Priority:</span>
                    <span className="ml-2 font-medium text-foreground">
                      {train?.modifications?.priority || 'Unchanged'}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Delay:</span>
                    <span className="ml-2 font-medium text-foreground">
                      {train?.modifications?.departureDelay}min
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Route:</span>
                    <span className="ml-2 font-medium text-foreground">
                      {train?.modifications?.routeChange || 'Unchanged'}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Speed:</span>
                    <span className="ml-2 font-medium text-foreground">
                      {train?.modifications?.speedAdjustment > 0 ? '+' : ''}{train?.modifications?.speedAdjustment}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          variant="default"
          onClick={handleRunSimulation}
          disabled={selectedTrains?.length === 0 || isSimulating}
          loading={isSimulating}
          iconName="Play"
          iconPosition="left"
          className="w-full"
        >
          {isSimulating ? 'Running Simulation...' : 'Run Simulation'}
        </Button>

        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            iconName="Save"
            iconPosition="left"
            disabled={selectedTrains?.length === 0}
          >
            Save Scenario
          </Button>
          <Button
            variant="outline"
            iconName="Upload"
            iconPosition="left"
          >
            Load Scenario
          </Button>
        </div>
      </div>
      {/* Quick Stats */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-semibold text-foreground">{selectedTrains?.length}</div>
            <div className="text-xs text-muted-foreground">Trains</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-foreground">
              {selectedTrains?.filter(t => t?.modifications?.priority === 'high')?.length}
            </div>
            <div className="text-xs text-muted-foreground">High Priority</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-foreground">
              {selectedTrains?.reduce((sum, t) => sum + Math.abs(t?.modifications?.departureDelay), 0)}
            </div>
            <div className="text-xs text-muted-foreground">Total Delay (min)</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScenarioSetupPanel;