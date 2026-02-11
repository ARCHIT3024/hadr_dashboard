import { Brain, Target, AlertOctagon, Eye } from 'lucide-react';
import { ChartContainer } from './ChartContainer';
import { FilterState } from '../App';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

interface AIPerformancePanelProps {
  filters: FilterState;
}

const confidenceDistribution = [
  { range: '95-100%', count: 2847000, percentage: 68.2 },
  { range: '90-95%', count: 856000, percentage: 20.5 },
  { range: '85-90%', count: 312000, percentage: 7.5 },
  { range: '80-85%', count: 128000, percentage: 3.1 },
  { range: '<80%', count: 29000, percentage: 0.7 },
];

const modelPerformanceMetrics = [
  { metric: 'Precision', value: 94.2, fullMark: 100 },
  { metric: 'Recall', value: 91.8, fullMark: 100 },
  { metric: 'F1-Score', value: 93.0, fullMark: 100 },
  { metric: 'IoU Accuracy', value: 88.6, fullMark: 100 },
  { metric: 'Consistency', value: 96.4, fullMark: 100 },
];

const COLORS = ['#10b981', '#22c55e', '#84cc16', '#facc15', '#f87171'];

export function AIPerformancePanel({ filters }: AIPerformancePanelProps) {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-slate-200">
          <div className="font-semibold text-slate-900 mb-1">{data.range}</div>
          <div className="text-sm text-slate-700">
            Count: <strong>{data.count.toLocaleString()}</strong>
          </div>
          <div className="text-sm text-slate-700">
            Percentage: <strong>{data.percentage}%</strong>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <ChartContainer
      title="AI Model Performance & Explainability"
      description="Deep learning model confidence, reliability, and interpretability metrics"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Confidence Distribution */}
        <div>
          <h3 className="font-medium text-slate-900 mb-4 flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-600" />
            Prediction Confidence Distribution
          </h3>
          <div className="flex items-center gap-6">
            <div className="flex-1">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={confidenceDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="count"
                    label={({ range, percentage }) => `${range}: ${percentage}%`}
                  >
                    {confidenceDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="text-sm text-slate-700">
              <strong className="text-slate-900">High Confidence:</strong> 88.7% of predictions exceed 90% confidence, 
              indicating strong model reliability across diverse disaster scenarios.
            </div>
          </div>
        </div>

        {/* Model Performance Radar */}
        <div>
          <h3 className="font-medium text-slate-900 mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-600" />
            Multi-Dimensional Performance
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={modelPerformanceMetrics}>
              <PolarGrid stroke="#cbd5e1" />
              <PolarAngleAxis dataKey="metric" tick={{ fill: '#64748b', fontSize: 12 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 10 }} />
              <Radar
                name="Model Score"
                dataKey="value"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="text-sm text-slate-700">
              <strong className="text-slate-900">Balanced Performance:</strong> Model achieves {'>'}88% across all metrics, 
              with particularly strong consistency (96.4%) in repeated assessments.
            </div>
          </div>
        </div>
      </div>

      {/* Error Analysis and Explainability */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-gradient-to-br from-red-50 to-orange-50 border border-red-200 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <AlertOctagon className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h4 className="font-medium text-slate-900 mb-2">Common Misclassifications</h4>
              <div className="space-y-2 text-sm text-slate-700">
                <div className="flex justify-between">
                  <span>Minor ↔ Major:</span>
                  <strong>4.2%</strong>
                </div>
                <div className="flex justify-between">
                  <span>No Damage ↔ Minor:</span>
                  <strong>2.8%</strong>
                </div>
                <div className="flex justify-between">
                  <span>Major ↔ Destroyed:</span>
                  <strong>1.9%</strong>
                </div>
              </div>
              <div className="mt-3 text-xs text-slate-600 bg-white/60 rounded p-2">
                Boundary cases between adjacent severity levels account for 72% of all errors.
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Eye className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h4 className="font-medium text-slate-900 mb-2">Visual Attention Patterns</h4>
              <div className="space-y-2 text-sm text-slate-700">
                <div>• Roof structure integrity</div>
                <div>• Wall continuity analysis</div>
                <div>• Debris field detection</div>
                <div>• Shadow pattern changes</div>
              </div>
              <div className="mt-3 text-xs text-slate-600 bg-white/60 rounded p-2">
                Grad-CAM heatmaps show model focuses on structurally critical building features.
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Brain className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h4 className="font-medium text-slate-900 mb-2">Model Architecture</h4>
              <div className="space-y-2 text-sm text-slate-700">
                <div className="flex justify-between">
                  <span>Base:</span>
                  <strong>ResNet-101</strong>
                </div>
                <div className="flex justify-between">
                  <span>Segmentation:</span>
                  <strong>U-Net</strong>
                </div>
                <div className="flex justify-between">
                  <span>Parameters:</span>
                  <strong>68.4M</strong>
                </div>
              </div>
              <div className="mt-3 text-xs text-slate-600 bg-white/60 rounded p-2">
                Ensemble approach combining localization and classification networks.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Explainability Visual Placeholder */}
      <div className="p-6 bg-slate-50 border border-slate-200 rounded-lg">
        <h3 className="font-medium text-slate-900 mb-4">AI Interpretation Example</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg border border-slate-200">
            <div className="text-sm font-medium text-slate-900 mb-2">Input: Pre-Disaster</div>
            <div className="aspect-square bg-gradient-to-br from-blue-100 to-blue-200 rounded flex items-center justify-center">
              <div className="text-center text-slate-600">
                <div className="text-xs mb-1">Satellite Image</div>
                <div className="text-2xl">🏘️</div>
                <div className="text-xs mt-1">Baseline State</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-slate-200">
            <div className="text-sm font-medium text-slate-900 mb-2">Input: Post-Disaster</div>
            <div className="aspect-square bg-gradient-to-br from-orange-100 to-red-200 rounded flex items-center justify-center">
              <div className="text-center text-slate-600">
                <div className="text-xs mb-1">Satellite Image</div>
                <div className="text-2xl">🏚️</div>
                <div className="text-xs mt-1">Damaged State</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-slate-200">
            <div className="text-sm font-medium text-slate-900 mb-2">AI Analysis Output</div>
            <div className="aspect-square bg-gradient-to-br from-purple-100 to-purple-200 rounded flex items-center justify-center">
              <div className="text-center text-slate-600">
                <div className="text-xs mb-1">Classification</div>
                <div className="text-2xl">🎯</div>
                <div className="text-xs mt-1 space-y-1">
                  <div className="font-semibold text-orange-700">Major Damage</div>
                  <div className="text-purple-700">Confidence: 94.2%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 p-3 bg-white rounded-lg border border-slate-200">
          <div className="text-sm text-slate-700">
            <strong className="text-slate-900">Explanation:</strong> Model detected significant roof structure disruption 
            (78% confidence contributor) and wall discontinuities (16% contributor). Debris patterns and shadow analysis 
            support major damage classification over destroyed category.
          </div>
        </div>
      </div>
    </ChartContainer>
  );
}