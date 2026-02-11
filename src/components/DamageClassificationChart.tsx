import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { FilterState } from '../App';
import { ChartContainer } from './ChartContainer';
import { Info } from 'lucide-react';

interface DamageClassificationChartProps {
  filters: FilterState;
}

const damageData = [
  {
    disaster: 'Hurricane',
    noDamage: 45200,
    minorDamage: 28600,
    majorDamage: 18400,
    destroyed: 12800,
    total: 105000
  },
  {
    disaster: 'Earthquake',
    noDamage: 38900,
    minorDamage: 32100,
    majorDamage: 24300,
    destroyed: 18700,
    total: 114000
  },
  {
    disaster: 'Flood',
    noDamage: 52300,
    minorDamage: 24800,
    majorDamage: 15200,
    destroyed: 9700,
    total: 102000
  },
  {
    disaster: 'Wildfire',
    noDamage: 31400,
    minorDamage: 19200,
    majorDamage: 21600,
    destroyed: 26800,
    total: 99000
  },
  {
    disaster: 'Tsunami',
    noDamage: 28600,
    minorDamage: 21400,
    majorDamage: 25800,
    destroyed: 31200,
    total: 107000
  },
];

const severityColors = {
  noDamage: '#10b981',
  minorDamage: '#f59e0b',
  majorDamage: '#f97316',
  destroyed: '#ef4444'
};

export function DamageClassificationChart({ filters }: DamageClassificationChartProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const total = payload.reduce((sum: number, item: any) => sum + item.value, 0);
      
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-slate-200">
          <div className="font-semibold text-slate-900 mb-3">{label}</div>
          <div className="space-y-2">
            {payload.map((item: any, index: number) => {
              const percentage = ((item.value / total) * 100).toFixed(1);
              return (
                <div key={index} className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-slate-700">{item.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-slate-900">
                      {item.value.toLocaleString()}
                    </div>
                    <div className="text-xs text-slate-500">{percentage}%</div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-3 pt-3 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">Total Buildings</span>
              <span className="text-sm font-bold text-slate-900">{total.toLocaleString()}</span>
            </div>
          </div>
          <div className="mt-2 p-2 bg-blue-50 rounded text-xs text-slate-600">
            <Info className="w-3 h-3 inline mr-1" />
            Severity distribution reflects structural impact assessment
          </div>
        </div>
      );
    }
    return null;
  };

  const legendPayload = [
    { value: 'No Damage', type: 'square', color: severityColors.noDamage },
    { value: 'Minor Damage', type: 'square', color: severityColors.minorDamage },
    { value: 'Major Damage', type: 'square', color: severityColors.majorDamage },
    { value: 'Destroyed', type: 'square', color: severityColors.destroyed },
  ];

  return (
    <ChartContainer
      title="Damage Classification Analytics"
      description="Building damage severity distribution across disaster types"
    >
      <div className="mb-4 flex items-center gap-2 flex-wrap">
        <span className="text-sm text-slate-600">Filter by severity:</span>
        {legendPayload.map((item) => (
          <button
            key={item.value}
            onClick={() => setActiveCategory(activeCategory === item.value ? null : item.value)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              activeCategory === item.value || activeCategory === null
                ? 'opacity-100'
                : 'opacity-40'
            }`}
            style={{
              backgroundColor: activeCategory === item.value ? item.color : `${item.color}20`,
              color: activeCategory === item.value ? 'white' : item.color,
              border: `2px solid ${item.color}`,
            }}
          >
            {item.value}
          </button>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={damageData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey="disaster"
            tick={{ fill: '#64748b', fontSize: 12 }}
            axisLine={{ stroke: '#cbd5e1' }}
          />
          <YAxis
            tick={{ fill: '#64748b', fontSize: 12 }}
            axisLine={{ stroke: '#cbd5e1' }}
            label={{ value: 'Number of Buildings', angle: -90, position: 'insideLeft', fill: '#64748b' }}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(148, 163, 184, 0.1)' }} />
          <Legend
            payload={legendPayload}
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="square"
          />
          <Bar
            dataKey="noDamage"
            stackId="a"
            fill={severityColors.noDamage}
            name="No Damage"
            radius={[0, 0, 0, 0]}
            onMouseEnter={() => setHoveredBar('noDamage')}
            onMouseLeave={() => setHoveredBar(null)}
          >
            {damageData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                opacity={hoveredBar === 'noDamage' || hoveredBar === null ? 1 : 0.5}
              />
            ))}
          </Bar>
          <Bar
            dataKey="minorDamage"
            stackId="a"
            fill={severityColors.minorDamage}
            name="Minor Damage"
            radius={[0, 0, 0, 0]}
            onMouseEnter={() => setHoveredBar('minorDamage')}
            onMouseLeave={() => setHoveredBar(null)}
          >
            {damageData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                opacity={hoveredBar === 'minorDamage' || hoveredBar === null ? 1 : 0.5}
              />
            ))}
          </Bar>
          <Bar
            dataKey="majorDamage"
            stackId="a"
            fill={severityColors.majorDamage}
            name="Major Damage"
            radius={[0, 0, 0, 0]}
            onMouseEnter={() => setHoveredBar('majorDamage')}
            onMouseLeave={() => setHoveredBar(null)}
          >
            {damageData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                opacity={hoveredBar === 'majorDamage' || hoveredBar === null ? 1 : 0.5}
              />
            ))}
          </Bar>
          <Bar
            dataKey="destroyed"
            stackId="a"
            fill={severityColors.destroyed}
            name="Destroyed"
            radius={[4, 4, 0, 0]}
            onMouseEnter={() => setHoveredBar('destroyed')}
            onMouseLeave={() => setHoveredBar(null)}
          >
            {damageData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                opacity={hoveredBar === 'destroyed' || hoveredBar === null ? 1 : 0.5}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-4 p-4 bg-slate-50 rounded-lg">
        <div className="text-sm text-slate-700">
          <strong className="text-slate-900">Insight:</strong> Wildfires and tsunamis show higher proportions of 
          severe damage (major + destroyed), indicating these disaster types have more catastrophic impacts on 
          building structures. Floods exhibit the highest preservation rate, suggesting water damage is often 
          repairable compared to structural collapse or fire.
        </div>
      </div>
    </ChartContainer>
  );
}
