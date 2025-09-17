import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const RailwayMap = () => {
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [mapView, setMapView] = useState('overview'); // 'overview' | 'detailed'

  const sections = [
    { id: 'A1', name: 'Platform A1', x: 10, y: 20, width: 120, height: 8, occupied: true, capacity: 1 },
    { id: 'A2', name: 'Platform A2', x: 10, y: 40, width: 120, height: 8, occupied: false, capacity: 1 },
    { id: 'B1', name: 'Junction B1', x: 150, y: 30, width: 80, height: 8, occupied: true, capacity: 2 },
    { id: 'C1', name: 'Main Line C1', x: 250, y: 20, width: 150, height: 8, occupied: true, capacity: 1 },
    { id: 'C2', name: 'Main Line C2', x: 250, y: 40, width: 150, height: 8, occupied: false, capacity: 1 },
    { id: 'D1', name: 'Terminal D1', x: 420, y: 30, width: 100, height: 8, occupied: false, capacity: 1 }
  ];

  const trains = [
    {
      id: 'T001',
      name: 'Express 101',
      type: 'passenger',
      x: 45,
      y: 24,
      status: 'on-time',
      speed: 85,
      destination: 'Terminal D1',
      delay: 0,
      priority: 'high'
    },
    {
      id: 'T002',
      name: 'Freight 205',
      type: 'freight',
      x: 180,
      y: 34,
      status: 'delayed',
      speed: 45,
      destination: 'Platform A2',
      delay: 12,
      priority: 'medium'
    },
    {
      id: 'T003',
      name: 'Local 308',
      type: 'passenger',
      x: 320,
      y: 24,
      status: 'on-time',
      speed: 65,
      destination: 'Junction B1',
      delay: 0,
      priority: 'low'
    }
  ];

  const [liveTrains, setLiveTrains] = useState(trains);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveTrains(prev => prev?.map(train => ({
        ...train,
        x: train?.x + (Math.random() - 0.5) * 2,
        speed: Math.max(20, Math.min(100, train?.speed + (Math.random() - 0.5) * 5))
      })));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getTrainColor = (train) => {
    if (train?.status === 'delayed') return '#DC2626'; // error
    if (train?.status === 'warning') return '#D97706'; // warning
    if (train?.priority === 'high') return '#1E3A8A'; // primary
    return '#059669'; // success
  };

  const getSectionColor = (section) => {
    if (section?.occupied) return '#475569'; // secondary
    return '#E2E8F0'; // border
  };

  const handleTrainClick = (train) => {
    setSelectedTrain(train);
  };

  const handleSectionClick = (section) => {
    console.log('Section clicked:', section?.name);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="Map" size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Railway Section Map</h2>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setMapView('overview')}
              className={`px-3 py-1 text-sm rounded-md transition-micro ${
                mapView === 'overview' ?'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setMapView('detailed')}
              className={`px-3 py-1 text-sm rounded-md transition-micro ${
                mapView === 'detailed' ?'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              Detailed
            </button>
          </div>
          
          <button className="p-2 rounded-md hover:bg-muted transition-micro">
            <Icon name="RotateCcw" size={16} className="text-muted-foreground" />
          </button>
        </div>
      </div>
      {/* Map Container */}
      <div className="relative bg-muted/30 rounded-lg p-4 min-h-96 overflow-hidden">
        <svg
          width="100%"
          height="300"
          viewBox="0 0 550 80"
          className="border border-border rounded"
        >
          {/* Railway Sections */}
          {sections?.map((section) => (
            <g key={section?.id}>
              <rect
                x={section?.x}
                y={section?.y}
                width={section?.width}
                height={section?.height}
                fill={getSectionColor(section)}
                stroke="#64748B"
                strokeWidth="1"
                rx="2"
                className="cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => handleSectionClick(section)}
              />
              <text
                x={section?.x + section?.width / 2}
                y={section?.y - 5}
                textAnchor="middle"
                fontSize="10"
                fill="#64748B"
                className="pointer-events-none"
              >
                {section?.name}
              </text>
            </g>
          ))}

          {/* Railway Connections */}
          <g stroke="#94A3B8" strokeWidth="2" fill="none">
            <line x1="130" y1="24" x2="150" y2="34" />
            <line x1="130" y1="44" x2="150" y2="34" />
            <line x1="230" y1="34" x2="250" y2="24" />
            <line x1="230" y1="34" x2="250" y2="44" />
            <line x1="400" y1="24" x2="420" y2="34" />
            <line x1="400" y1="44" x2="420" y2="34" />
          </g>

          {/* Trains */}
          {liveTrains?.map((train) => (
            <g key={train?.id}>
              <circle
                cx={train?.x}
                cy={train?.y}
                r="6"
                fill={getTrainColor(train)}
                stroke="white"
                strokeWidth="2"
                className="cursor-pointer hover:r-8 transition-all"
                onClick={() => handleTrainClick(train)}
              />
              <text
                x={train?.x}
                y={train?.y - 12}
                textAnchor="middle"
                fontSize="8"
                fill="#0F172A"
                className="pointer-events-none font-medium"
              >
                {train?.name}
              </text>
            </g>
          ))}
        </svg>

        {/* Map Legend */}
        <div className="absolute bottom-4 left-4 bg-card border border-border rounded-lg p-3 shadow-modal">
          <h4 className="text-xs font-medium text-foreground mb-2">Legend</h4>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-secondary rounded"></div>
              <span className="text-xs text-muted-foreground">Occupied Section</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-border rounded"></div>
              <span className="text-xs text-muted-foreground">Available Section</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-success rounded-full"></div>
              <span className="text-xs text-muted-foreground">On-time Train</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-error rounded-full"></div>
              <span className="text-xs text-muted-foreground">Delayed Train</span>
            </div>
          </div>
        </div>
      </div>
      {/* Train Details Panel */}
      {selectedTrain && (
        <div className="mt-4 p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-foreground">Train Details</h3>
            <button
              onClick={() => setSelectedTrain(null)}
              className="p-1 rounded-md hover:bg-muted transition-micro"
            >
              <Icon name="X" size={14} className="text-muted-foreground" />
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Train ID:</span>
              <div className="font-medium text-foreground">{selectedTrain?.id}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Type:</span>
              <div className="font-medium text-foreground capitalize">{selectedTrain?.type}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Speed:</span>
              <div className="font-medium text-foreground">{selectedTrain?.speed} km/h</div>
            </div>
            <div>
              <span className="text-muted-foreground">Status:</span>
              <div className={`font-medium capitalize ${
                selectedTrain?.status === 'on-time' ? 'text-success' : 
                selectedTrain?.status === 'delayed' ? 'text-error' : 'text-warning'
              }`}>
                {selectedTrain?.status}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RailwayMap;