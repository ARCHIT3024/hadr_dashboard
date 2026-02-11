import { MapPin, Shield, AlertTriangle, CheckCircle, TrendingUp, Users } from 'lucide-react';
import { ChartContainer } from './ChartContainer';
import { FilterState } from '../App';
import { motion } from 'motion/react';

interface ActionableInsightsProps {
  filters: FilterState;
  selectedRegion: string | null;
}

export function ActionableInsights({ filters, selectedRegion }: ActionableInsightsProps) {
  return (
    <ChartContainer
      title="Actionable Decision Insights"
      description="Data-driven recommendations for disaster response and recovery planning"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Priority Intervention Zones */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="p-5 bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 rounded-xl"
        >
          <div className="flex items-start gap-3 mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <MapPin className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-1">Priority Intervention Zones</h3>
              <p className="text-sm text-slate-600">Regions requiring immediate resource allocation</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="p-3 bg-white rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-slate-900">Florida & Caribbean</span>
                <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded">CRITICAL</span>
              </div>
              <div className="text-sm text-slate-700 space-y-1">
                <div>• 387K buildings assessed, 62% with damage</div>
                <div>• Hurricane-prone: seasonal resource pre-positioning recommended</div>
                <div>• Recovery timeline: 18-24 months estimated</div>
              </div>
            </div>

            <div className="p-3 bg-white rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-slate-900">Japan & Pacific Rim</span>
                <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded">HIGH</span>
              </div>
              <div className="text-sm text-slate-700 space-y-1">
                <div>• 512K buildings assessed, 58% with damage</div>
                <div>• Multi-hazard exposure: earthquake + tsunami preparedness</div>
                <div>• Advanced building codes reducing severity</div>
              </div>
            </div>

            <div className="p-3 bg-white rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-slate-900">Philippines & Southeast Asia</span>
                <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded">HIGH</span>
              </div>
              <div className="text-sm text-slate-700 space-y-1">
                <div>• 298K buildings assessed, 54% with damage</div>
                <div>• Typhoon season correlation: Aug-Nov peak activity</div>
                <div>• Community resilience programs show positive impact</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Data Reliability Evaluation */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl"
        >
          <div className="flex items-start gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-1">Data Reliability Evaluation</h3>
              <p className="text-sm text-slate-600">Quality assurance and confidence metrics</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="p-3 bg-white rounded-lg shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-medium text-slate-900">High Confidence Assessments</span>
              </div>
              <div className="text-sm text-slate-700">
                <div className="mb-2">88.7% of predictions exceed 90% confidence threshold</div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '88.7%' }}></div>
                </div>
              </div>
            </div>

            <div className="p-3 bg-white rounded-lg shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <span className="font-medium text-slate-900">Moderate Confidence Cases</span>
              </div>
              <div className="text-sm text-slate-700">
                <div className="mb-2">11.3% require expert review or additional imagery</div>
                <div className="text-xs text-slate-600 mt-1">
                  • Primarily borderline severity classifications<br />
                  • Concentrated in areas with cloud cover or shadows<br />
                  • Human-in-the-loop validation recommended
                </div>
              </div>
            </div>

            <div className="p-3 bg-white rounded-lg shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-slate-900">Temporal Validation</span>
              </div>
              <div className="text-sm text-slate-700">
                Cross-referenced with ground truth field reports shows 94.2% agreement rate
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Ethical Considerations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="mt-6 p-5 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl"
      >
        <div className="flex items-start gap-3 mb-4">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Users className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 mb-1">Ethical Considerations & Bias Awareness</h3>
            <p className="text-sm text-slate-600">Responsible AI deployment in humanitarian contexts</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <h4 className="font-medium text-slate-900 mb-2 text-sm">Geographic Bias Mitigation</h4>
            <div className="text-xs text-slate-700 space-y-1">
              <div>✓ Training data includes 15+ countries across 6 continents</div>
              <div>✓ Diverse building architecture representation</div>
              <div>⚠ Underrepresentation in sub-Saharan Africa and Central Asia</div>
              <div className="mt-2 p-2 bg-amber-50 rounded text-amber-800">
                <strong>Action:</strong> Prioritize data collection in underrepresented regions
              </div>
            </div>
          </div>

          <div className="p-4 bg-white rounded-lg shadow-sm">
            <h4 className="font-medium text-slate-900 mb-2 text-sm">Socioeconomic Equity</h4>
            <div className="text-xs text-slate-700 space-y-1">
              <div>✓ Model performs equally across urban/rural settings</div>
              <div>✓ No correlation between building value and assessment accuracy</div>
              <div>⚠ Informal settlements may have lower detection rates</div>
              <div className="mt-2 p-2 bg-amber-50 rounded text-amber-800">
                <strong>Action:</strong> Supplement with community-reported damage data
              </div>
            </div>
          </div>

          <div className="p-4 bg-white rounded-lg shadow-sm">
            <h4 className="font-medium text-slate-900 mb-2 text-sm">Privacy & Consent</h4>
            <div className="text-xs text-slate-700 space-y-1">
              <div>✓ Satellite imagery is publicly available data</div>
              <div>✓ No personally identifiable information processed</div>
              <div>✓ Aggregated reporting protects individual privacy</div>
              <div className="mt-2 p-2 bg-green-50 rounded text-green-800">
                <strong>Status:</strong> Compliant with humanitarian data standards
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Strategic Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="mt-6 p-5 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl"
      >
        <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <CheckCircle className="w-6 h-6 text-green-600" />
          Strategic Operational Recommendations
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="p-4 bg-white rounded-lg shadow-sm border-l-4 border-green-500">
              <div className="font-medium text-slate-900 mb-2">Immediate (0-48 hours)</div>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>• Deploy rapid assessment teams to critical severity regions</li>
                <li>• Activate emergency response protocols in Florida and Japan</li>
                <li>• Establish satellite imagery refresh schedule for affected areas</li>
                <li>• Coordinate with local authorities for ground truth validation</li>
              </ul>
            </div>

            <div className="p-4 bg-white rounded-lg shadow-sm border-l-4 border-blue-500">
              <div className="font-medium text-slate-900 mb-2">Short-term (1-4 weeks)</div>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>• Prioritize reconstruction in destroyed category buildings</li>
                <li>• Implement temporary housing solutions for displaced populations</li>
                <li>• Conduct detailed structural assessments for major damage cases</li>
                <li>• Update damage progression models with new temporal data</li>
              </ul>
            </div>
          </div>

          <div className="space-y-3">
            <div className="p-4 bg-white rounded-lg shadow-sm border-l-4 border-purple-500">
              <div className="font-medium text-slate-900 mb-2">Medium-term (1-6 months)</div>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>• Execute recovery planning for high-priority intervention zones</li>
                <li>• Enhance building codes in hurricane and earthquake-prone regions</li>
                <li>• Develop community resilience programs based on pattern insights</li>
                <li>• Invest in AI model improvements for underrepresented geographies</li>
              </ul>
            </div>

            <div className="p-4 bg-white rounded-lg shadow-sm border-l-4 border-orange-500">
              <div className="font-medium text-slate-900 mb-2">Long-term (6-24 months)</div>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>• Establish pre-disaster baseline imagery for vulnerable regions</li>
                <li>• Create seasonal resource allocation strategies based on trends</li>
                <li>• Implement predictive models for disaster impact forecasting</li>
                <li>• Develop cross-organizational data sharing frameworks</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </ChartContainer>
  );
}
