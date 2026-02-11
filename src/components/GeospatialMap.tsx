import { useState } from 'react';
import { ChartContainer } from './ChartContainer';
import { FilterState } from '../App';
import { MapLegend } from './MapLegend';
import { ZoomIn, ZoomOut, Layers as LayersIcon } from 'lucide-react';
import { motion } from 'motion/react';

interface GeospatialMapProps {
  filters: FilterState;
  selectedRegion: string | null;
  setSelectedRegion: (region: string | null) => void;
}

const regions = [
  { id: 'na-west', name: 'California', x: 15, y: 25, severity: 'high', disasters: 12, buildings: 245000 },
  { id: 'na-east', name: 'Florida', x: 35, y: 35, severity: 'critical', disasters: 18, buildings: 387000 },
  { id: 'sa-north', name: 'Mexico', x: 25, y: 45, severity: 'medium', disasters: 8, buildings: 156000 },
  { id: 'eu-south', name: 'Italy', x: 55, y: 30, severity: 'medium', disasters: 9, buildings: 198000 },
  { id: 'as-east', name: 'Japan', x: 85, y: 28, severity: 'critical', disasters: 22, buildings: 512000 },
  { id: 'as-south', name: 'Philippines', x: 82, y: 48, severity: 'high', disasters: 15, buildings: 298000 },
  { id: 'oc-aus', name: 'Australia', x: 88, y: 65, severity: 'high', disasters: 11, buildings: 176000 },
  { id: 'af-west', name: 'Nigeria', x: 50, y: 55, severity: 'low', disasters: 4, buildings: 87000 },
];

const severityColors = {
  low: '#10b981',
  medium: '#f59e0b',
  high: '#f97316',
  critical: '#ef4444'
};

export function GeospatialMap({ filters, selectedRegion, setSelectedRegion }: GeospatialMapProps) {
  const [activeLayers, setActiveLayers] = useState({
    damageIntensity: true,
    disasterType: true,
    regionalClustering: true
  });
  const [zoom, setZoom] = useState(1);

  const toggleLayer = (layer: keyof typeof activeLayers) => {
    setActiveLayers(prev => ({ ...prev, [layer]: !prev[layer] }));
  };

  return (
    <ChartContainer
      title="Geospatial Impact Visualization"
      description="Interactive map showing damage distribution and disaster clustering"
    >
      <div className="flex gap-6">
        {/* Map Container */}
        <div className="flex-1">
          <div className="relative bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg overflow-hidden" style={{ height: '500px' }}>
            {/* World Map Simplified Visual */}
            <svg width="100%" height="100%" viewBox="0 0 100 80" preserveAspectRatio="xMidYMid meet">
              {/* Background continents (simplified shapes) */}
              <g opacity="0.3">
                {/* North America */}
                <path
                  d="M 10 15 Q 20 10, 30 15 L 35 25 L 40 30 L 35 40 L 25 50 L 15 45 L 10 35 Z"
                  fill="#cbd5e1"
                  stroke="#94a3b8"
                  strokeWidth="0.3"
                />
                {/* South America */}
                <path
                  d="M 22 48 L 28 52 L 30 65 L 25 72 L 18 70 L 16 58 Z"
                  fill="#cbd5e1"
                  stroke="#94a3b8"
                  strokeWidth="0.3"
                />
                {/* Europe */}
                <path
                  d="M 48 18 L 58 16 L 62 22 L 60 30 L 52 32 L 48 28 Z"
                  fill="#cbd5e1"
                  stroke="#94a3b8"
                  strokeWidth="0.3"
                />
                {/* Africa */}
                <path
                  d="M 48 35 L 56 34 L 60 42 L 58 58 L 50 62 L 44 56 L 46 42 Z"
                  fill="#cbd5e1"
                  stroke="#94a3b8"
                  strokeWidth="0.3"
                />
                {/* Asia */}
                <path
                  d="M 62 15 L 75 12 L 88 18 L 92 28 L 88 38 L 78 42 L 68 38 L 64 28 L 62 22 Z"
                  fill="#cbd5e1"
                  stroke="#94a3b8"
                  strokeWidth="0.3"
                />
                {/* Australia */}
                <path
                  d="M 80 60 L 90 58 L 95 65 L 92 72 L 82 74 L 76 68 Z"
                  fill="#cbd5e1"
                  stroke="#94a3b8"
                  strokeWidth="0.3"
                />
              </g>

              {/* Region Markers */}
              {regions.map((region) => {
                const isSelected = selectedRegion === region.id;
                const baseSize = region.severity === 'critical' ? 5 : region.severity === 'high' ? 4 : 3;
                const size = isSelected ? baseSize * 1.5 : baseSize;

                return (
                  <g key={region.id}>
                    {/* Pulsing effect for selected region */}
                    {isSelected && (
                      <motion.circle
                        cx={region.x}
                        cy={region.y}
                        r={size + 2}
                        fill={severityColors[region.severity]}
                        opacity={0.3}
                        animate={{
                          r: [size + 2, size + 4, size + 2],
                          opacity: [0.3, 0.1, 0.3]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    )}
                    
                    {/* Main marker */}
                    <circle
                      cx={region.x}
                      cy={region.y}
                      r={size}
                      fill={severityColors[region.severity]}
                      stroke="white"
                      strokeWidth={isSelected ? 0.8 : 0.5}
                      className="cursor-pointer transition-all hover:opacity-80"
                      onClick={() => setSelectedRegion(isSelected ? null : region.id)}
                      style={{
                        filter: isSelected ? 'drop-shadow(0 0 4px rgba(0,0,0,0.3))' : 'none'
                      }}
                    />
                    
                    {/* Label */}
                    <text
                      x={region.x}
                      y={region.y - size - 2}
                      textAnchor="middle"
                      fontSize="3"
                      fill="#1e293b"
                      fontWeight={isSelected ? "bold" : "normal"}
                      className="pointer-events-none"
                    >
                      {region.name}
                    </text>

                    {/* Tooltip on hover/select */}
                    {isSelected && (
                      <g>
                        <rect
                          x={region.x + 6}
                          y={region.y - 8}
                          width="28"
                          height="14"
                          fill="white"
                          stroke="#e2e8f0"
                          strokeWidth="0.3"
                          rx="1"
                          className="drop-shadow"
                        />
                        <text x={region.x + 8} y={region.y - 4} fontSize="2.5" fill="#1e293b" fontWeight="600">
                          {region.name}
                        </text>
                        <text x={region.x + 8} y={region.y - 0.5} fontSize="2" fill="#64748b">
                          {region.disasters} disasters
                        </text>
                        <text x={region.x + 8} y={region.y + 3} fontSize="2" fill="#64748b">
                          {(region.buildings / 1000).toFixed(0)}K buildings
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Map Controls */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <button
                onClick={() => setZoom(Math.min(zoom + 0.2, 2))}
                className="p-2 bg-white rounded-lg shadow-md hover:bg-slate-50 transition-colors"
              >
                <ZoomIn className="w-5 h-5 text-slate-700" />
              </button>
              <button
                onClick={() => setZoom(Math.max(zoom - 0.2, 0.5))}
                className="p-2 bg-white rounded-lg shadow-md hover:bg-slate-50 transition-colors"
              >
                <ZoomOut className="w-5 h-5 text-slate-700" />
              </button>
            </div>

            {/* Layer Toggle Chips */}
            <div className="absolute bottom-4 left-4 flex gap-2 flex-wrap">
              <button
                onClick={() => toggleLayer('damageIntensity')}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  activeLayers.damageIntensity
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-slate-600 border border-slate-200'
                }`}
              >
                <LayersIcon className="w-3 h-3 inline mr-1" />
                Damage Intensity
              </button>
              <button
                onClick={() => toggleLayer('disasterType')}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  activeLayers.disasterType
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-slate-600 border border-slate-200'
                }`}
              >
                <LayersIcon className="w-3 h-3 inline mr-1" />
                Disaster Type
              </button>
              <button
                onClick={() => toggleLayer('regionalClustering')}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  activeLayers.regionalClustering
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-slate-600 border border-slate-200'
                }`}
              >
                <LayersIcon className="w-3 h-3 inline mr-1" />
                Regional Clustering
              </button>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="w-64">
          <MapLegend />
        </div>
      </div>

      {selectedRegion && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg"
        >
          <div className="text-sm text-slate-700">
            <strong className="text-slate-900">Region Selected:</strong>{' '}
            {regions.find(r => r.id === selectedRegion)?.name} — Click on other regions to compare or 
            click the same region again to deselect. Regional selection filters temporal and AI analysis below.
          </div>
        </motion.div>
      )}
    </ChartContainer>
  );
}
