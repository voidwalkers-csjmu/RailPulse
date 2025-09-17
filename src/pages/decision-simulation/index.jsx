import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PrimaryNavigation from '../../components/ui/PrimaryNavigation';
import NavigationHeader from '../../components/ui/NavigationHeader';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import components
import ScenarioSetupPanel from './components/ScenarioSetupPanel';
import ComparisonView from './components/ComparisonView';
import TimelineVisualization from './components/TimelineVisualization';
import SimulationResults from './components/SimulationResults';

const DecisionSimulation = () => {
  const navigate = useNavigate();
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [currentView, setCurrentView] = useState('setup'); // 'setup' | 'comparison' | 'timeline' | 'results'
  const [selectedTrains, setSelectedTrains] = useState([]);
  const [simulationData, setSimulationData] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [isApplying, setIsApplying] = useState(false);

  // Mock user data
  const currentUser = {
    name: 'Controller Sarah Johnson',
    role: 'Senior Traffic Controller',
    id: 'TC003',
    shift: 'Day Shift'
  };

  useEffect(() => {
    // Simulate checking for existing simulation data
    const existingSimulation = localStorage.getItem('currentSimulation');
    if (existingSimulation) {
      try {
        const data = JSON.parse(existingSimulation);
        setSimulationData(data);
        setSelectedTrains(data?.trains || []);
        setCurrentView('results');
      } catch (error) {
        console.error('Error loading existing simulation:', error);
      }
    }
  }, []);

  const handleRunSimulation = async (scenarioData) => {
    setIsSimulating(true);
    setCurrentView('comparison');

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 3000));

      const results = {
        ...scenarioData,
        status: 'completed',
        confidence: 94.2,
        executionTime: 2.3,
        results: {
          onTimePerformance: { current: 87.5, projected: 92.3, improvement: 4.8 },
          averageDelay: { current: 4.2, projected: 2.8, improvement: -1.4 },
          throughput: { current: 145, projected: 158, improvement: 13 }
        }
      };

      setSimulationData(results);
      localStorage.setItem('currentSimulation', JSON.stringify(results));
      setCurrentView('results');
    } catch (error) {
      console.error('Simulation error:', error);
    } finally {
      setIsSimulating(false);
    }
  };

  const handleApplyChanges = async (results) => {
    setIsApplying(true);

    try {
      // Simulate applying changes
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Clear simulation data
      localStorage.removeItem('currentSimulation');
      setSimulationData(null);
      setSelectedTrains([]);

      // Show success message
      alert('Changes applied successfully! The system has been updated with the new configuration.');
      
      // Navigate back to main dashboard
      navigate('/main-control-dashboard');
    } catch (error) {
      console.error('Error applying changes:', error);
      alert('Error applying changes. Please try again.');
    } finally {
      setIsApplying(false);
    }
  };

  const handleSaveScenario = (results) => {
    const scenarios = JSON.parse(localStorage.getItem('savedScenarios') || '[]');
    const newScenario = {
      ...results,
      id: Date.now()?.toString(),
      savedAt: new Date()?.toISOString()
    };
    scenarios?.push(newScenario);
    localStorage.setItem('savedScenarios', JSON.stringify(scenarios));
    alert('Scenario saved successfully!');
  };

  const handleDiscardResults = () => {
    const confirmed = window.confirm('Discard simulation results? This action cannot be undone.');
    if (confirmed) {
      localStorage.removeItem('currentSimulation');
      setSimulationData(null);
      setSelectedTrains([]);
      setCurrentView('setup');
    }
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const getViewTitle = () => {
    switch (currentView) {
      case 'setup':
        return 'Scenario Setup';
      case 'comparison':
        return 'Comparison Analysis';
      case 'timeline':
        return 'Timeline Visualization';
      case 'results':
        return 'Simulation Results';
      default:
        return 'Decision Simulation';
    }
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'setup':
        return (
          <ScenarioSetupPanel
            selectedTrains={selectedTrains}
            onTrainSelect={setSelectedTrains}
            onParameterChange={(trainId, param, value) => {
              setSelectedTrains(prev => prev?.map(train => 
                train?.id === trainId 
                  ? { ...train, modifications: { ...train?.modifications, [param]: value } }
                  : train
              ));
            }}
            onRunSimulation={handleRunSimulation}
            isSimulating={isSimulating}
          />
        );
      case 'comparison':
        return (
          <ComparisonView
            currentState={null}
            simulationResults={simulationData?.results}
            isLoading={isSimulating}
          />
        );
      case 'timeline':
        return (
          <TimelineVisualization
            currentSchedule={null}
            simulatedSchedule={null}
            timeRange="4h"
          />
        );
      case 'results':
        return (
          <SimulationResults
            results={simulationData}
            onApplyChanges={handleApplyChanges}
            onSaveScenario={handleSaveScenario}
            onDiscardResults={handleDiscardResults}
            isApplying={isApplying}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <PrimaryNavigation
        isCollapsed={isNavCollapsed}
        onToggleCollapse={() => setIsNavCollapsed(!isNavCollapsed)}
      />
      {/* Main Content */}
      <div className={`transition-all duration-300 ${isNavCollapsed ? 'ml-16' : 'ml-60'}`}>
        {/* Header */}
        <NavigationHeader
          user={currentUser}
          onLogout={handleLogout}
        />

        {/* Page Content */}
        <div className="p-6">
          {/* Breadcrumb */}
          <div className="mb-6">
            <BreadcrumbNavigation />
          </div>

          {/* Page Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <Icon name="GitBranch" size={24} color="white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Decision Simulation</h1>
                <p className="text-muted-foreground">
                  Test operational scenarios and analyze potential outcomes
                </p>
              </div>
            </div>

            {/* View Navigation */}
            <div className="flex items-center space-x-2">
              <Button
                variant={currentView === 'setup' ? 'default' : 'outline'}
                size="sm"
                iconName="Settings"
                onClick={() => setCurrentView('setup')}
                disabled={isSimulating}
              >
                Setup
              </Button>
              <Button
                variant={currentView === 'comparison' ? 'default' : 'outline'}
                size="sm"
                iconName="GitCompare"
                onClick={() => setCurrentView('comparison')}
                disabled={!simulationData && !isSimulating}
              >
                Compare
              </Button>
              <Button
                variant={currentView === 'timeline' ? 'default' : 'outline'}
                size="sm"
                iconName="Calendar"
                onClick={() => setCurrentView('timeline')}
                disabled={!simulationData && !isSimulating}
              >
                Timeline
              </Button>
              <Button
                variant={currentView === 'results' ? 'default' : 'outline'}
                size="sm"
                iconName="BarChart3"
                onClick={() => setCurrentView('results')}
                disabled={!simulationData}
              >
                Results
              </Button>
            </div>
          </div>

          {/* Status Bar */}
          <div className="bg-card border border-border rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Icon name="Zap" size={16} className="text-accent" />
                  <span className="text-sm font-medium text-foreground">Current View:</span>
                  <span className="text-sm text-accent">{getViewTitle()}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Icon name="Train" size={16} className="text-primary" />
                  <span className="text-sm font-medium text-foreground">Selected Trains:</span>
                  <span className="text-sm text-foreground">{selectedTrains?.length}</span>
                </div>

                {simulationData && (
                  <div className="flex items-center space-x-2">
                    <Icon name="CheckCircle" size={16} className="text-success" />
                    <span className="text-sm font-medium text-foreground">Simulation:</span>
                    <span className="text-sm text-success">Completed</span>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-4">
                {isSimulating && (
                  <div className="flex items-center space-x-2 text-accent">
                    <div className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-sm font-medium">Simulating...</span>
                  </div>
                )}

                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Icon name="Clock" size={14} />
                  <span>Last Updated: {new Date()?.toLocaleTimeString('en-US', { hour12: false })}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="h-[calc(100vh-280px)]">
            {renderCurrentView()}
          </div>

          {/* Quick Actions */}
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                iconName="ArrowLeft"
                onClick={() => navigate('/main-control-dashboard')}
              >
                Back to Dashboard
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                iconName="RefreshCw"
                onClick={() => {
                  setSelectedTrains([]);
                  setSimulationData(null);
                  setCurrentView('setup');
                  localStorage.removeItem('currentSimulation');
                }}
              >
                Reset Simulation
              </Button>
            </div>

            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Icon name="Shield" size={14} />
              <span>Simulation Environment - Safe Testing Mode</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DecisionSimulation;