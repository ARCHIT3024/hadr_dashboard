import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine, Area, ComposedChart } from 'recharts';
import { ChartContainer } from './ChartContainer';
import { FilterState } from '../App';
import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';

interface TemporalTrendChartProps {
  filters: FilterState;
  selectedRegion: string | null;
}

const timeSeriesData = [
  { 
    date: 'Jan 2023', 
    minorDamage: 12400, 
    majorDamage: 8200, 
    destroyed: 3800,
    totalAssessments: 24400,
    annotation: null
  },
  { 
    date: 'Feb 2023', 
    minorDamage: 14200, 
    majorDamage: 9800, 
    destroyed: 4600,
    totalAssessments: 28600,
    annotation: null
  },
  { 
    date: 'Mar 2023', 
    minorDamage: 18900, 
    majorDamage: 14200, 
    destroyed: 7800,
    totalAssessments: 40900,
    annotation: 'Earthquake cluster in region'
  },
  { 
    date: 'Apr 2023', 
    minorDamage: 16200, 
    majorDamage: 11400, 
    destroyed: 5900,
    totalAssessments: 33500,
    annotation: null
  },
  { 
    date: 'May 2023', 
    minorDamage: 13800, 
    majorDamage: 9200, 
    destroyed: 4200,
    totalAssessments: 27200,
    annotation: null
  },
  { 
    date: 'Jun 2023', 
    minorDamage: 21400, 
    majorDamage: 16800, 
    destroyed: 11200,
    totalAssessments: 49400,
    annotation: 'Hurricane season onset'
  },
  { 
    date: 'Jul 2023', 
    minorDamage: 24600, 
    majorDamage: 19200, 
    destroyed: 13800,
    totalAssessments: 57600,
    annotation: null
  },
  { 
    date: 'Aug 2023', 
    minorDamage: 28400, 
    majorDamage: 22600, 
    destroyed: 16200,
    totalAssessments: 67200,
    annotation: null
  },
  { 
    date: 'Sep 2023', 
    minorDamage: 31200, 
    majorDamage: 24800, 
    destroyed: 18400,
    totalAssessments: 74400,
    annotation: 'Peak disaster season'
  },
  { 
    date: 'Oct 2023', 
    minorDamage: 26800, 
    majorDamage: 20200, 
    destroyed: 14600,
    totalAssessments: 61600,
    annotation: null
  },
  { 
    date: 'Nov 2023', 
    minorDamage: 19200, 
    majorDamage: 13800, 
    destroyed: 8400,
    totalAssessments: 41400,
    annotation: null
  },
  { 
    date: 'Dec 2023', 
    minorDamage: 15600, 
    majorDamage: 10800, 
    destroyed: 5800,
    totalAssessments: 32200,
    annotation: null
  },
];

export function TemporalTrendChart({ filters, selectedRegion }: TemporalTrendChartProps) {
  const [selectedMetric, setSelectedMetric] = useState<'all' | 'minor' | 'major' | 'destroyed'>('all');

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-slate-200">
          <div className="font-semibold text-slate-900 mb-3">{label}</div>
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-slate-700">Minor Damage</span>
              </div>
              <span className="text-sm font-semibold text-slate-900">
                {data.minorDamage.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="text-sm text-slate-700">Major Damage</span>
              </div>
              <span className="text-sm font-semibold text-slate-900">
                {data.majorDamage.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm text-slate-700">Destroyed</span>
              </div>
              <span className="text-sm font-semibold text-slate-900">
                {data.destroyed.toLocaleString()}
              </span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">Total Assessments</span>
              <span className="text-sm font-bold text-slate-900">{data.totalAssessments.toLocaleString()}</span>
            </div>
          </div>
          {data.annotation && (
            <div className="mt-2 p-2 bg-amber-50 rounded text-xs text-slate-700 flex items-start gap-1">
              <AlertCircle className="w-3 h-3 text-amber-600 mt-0.5 flex-shrink-0" />
              <span>{data.annotation}</span>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  const annotationPoints = timeSeriesData.filter(d => d.annotation);

  return (
    <ChartContainer
      title="Temporal Trend Analysis"
      description="Damage progression over time with pattern recognition"
    >
      <div className="mb-4 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-600">View:</span>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedMetric('all')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                selectedMetric === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Severities
            </button>
            <button
              onClick={() => setSelectedMetric('minor')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                selectedMetric === 'minor'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Minor
            </button>
            <button
              onClick={() => setSelectedMetric('major')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                selectedMetric === 'major'
                  ? 'bg-orange-500 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Major
            </button>
            <button
              onClick={() => setSelectedMetric('destroyed')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                selectedMetric === 'destroyed'
                  ? 'bg-red-500 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Destroyed
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <TrendingUp className="w-4 h-4 text-red-600" />
            <span className="text-slate-700">Escalation: <strong className="text-red-600">Jun-Sep</strong></span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <TrendingDown className="w-4 h-4 text-green-600" />
            <span className="text-slate-700">Recovery: <strong className="text-green-600">Oct-Dec</strong></span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart data={timeSeriesData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <defs>
            <linearGradient id="colorMinor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorMajor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorDestroyed" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey="date"
            tick={{ fill: '#64748b', fontSize: 12 }}
            axisLine={{ stroke: '#cbd5e1' }}
          />
          <YAxis
            tick={{ fill: '#64748b', fontSize: 12 }}
            axisLine={{ stroke: '#cbd5e1' }}
            label={{ value: 'Number of Buildings', angle: -90, position: 'insideLeft', fill: '#64748b' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />

          {/* Annotation markers */}
          {annotationPoints.map((point, index) => (
            <ReferenceLine
              key={index}
              x={point.date}
              stroke="#f59e0b"
              strokeDasharray="3 3"
              label={{
                value: '⚠',
                position: 'top',
                fill: '#f59e0b',
                fontSize: 16
              }}
            />
          ))}

          {(selectedMetric === 'all' || selectedMetric === 'minor') && (
            <>
              <Area
                type="monotone"
                dataKey="minorDamage"
                stroke="#f59e0b"
                fillOpacity={1}
                fill="url(#colorMinor)"
                name="Minor Damage"
              />
              <Line
                type="monotone"
                dataKey="minorDamage"
                stroke="#f59e0b"
                strokeWidth={2}
                dot={{ fill: '#f59e0b', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </>
          )}

          {(selectedMetric === 'all' || selectedMetric === 'major') && (
            <>
              <Area
                type="monotone"
                dataKey="majorDamage"
                stroke="#f97316"
                fillOpacity={1}
                fill="url(#colorMajor)"
                name="Major Damage"
              />
              <Line
                type="monotone"
                dataKey="majorDamage"
                stroke="#f97316"
                strokeWidth={2}
                dot={{ fill: '#f97316', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </>
          )}

          {(selectedMetric === 'all' || selectedMetric === 'destroyed') && (
            <>
              <Area
                type="monotone"
                dataKey="destroyed"
                stroke="#ef4444"
                fillOpacity={1}
                fill="url(#colorDestroyed)"
                name="Destroyed"
              />
              <Line
                type="monotone"
                dataKey="destroyed"
                stroke="#ef4444"
                strokeWidth={2}
                dot={{ fill: '#ef4444', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </>
          )}
        </ComposedChart>
      </ResponsiveContainer>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start gap-2">
            <TrendingUp className="w-5 h-5 text-red-600 mt-0.5" />
            <div>
              <div className="font-medium text-slate-900 mb-1">Escalation Pattern Detected</div>
              <div className="text-sm text-slate-700">
                June through September shows a 186% increase in severe damage assessments, 
                correlating with peak hurricane and wildfire seasons. Resource allocation 
                should anticipate this annual pattern.
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-start gap-2">
            <TrendingDown className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <div className="font-medium text-slate-900 mb-1">Recovery Indicators</div>
              <div className="text-sm text-slate-700">
                October through December demonstrates consistent decline in new damage assessments, 
                suggesting effective recovery operations and reduced disaster frequency during this period.
              </div>
            </div>
          </div>
        </div>
      </div>
    </ChartContainer>
  );
}
