import { BookOpen, Layers, Tag, ChevronDown } from 'lucide-react';
import { ExpandablePanel } from './ExpandablePanel';
import { InsightCard } from './InsightCard';

export function DatasetIntelligencePanel() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="mb-6">
        <h2 className="font-semibold text-slate-900 mb-1">Dataset Intelligence</h2>
        <p className="text-sm text-slate-500">Understanding the xBD dataset structure and methodology</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Dataset Overview */}
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-slate-900 mb-2">xBD Dataset Purpose</h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  The xBD (xView2 Building Damage) dataset provides large-scale satellite imagery for 
                  building damage assessment following natural disasters. It enables AI-powered evaluation 
                  of infrastructure impact to support rapid disaster response and recovery planning.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                <Layers className="w-5 h-5 text-slate-600" />
              </div>
              <div>
                <h3 className="font-medium text-slate-900 mb-2">Pre vs Post-Disaster Comparison</h3>
                <p className="text-sm text-slate-700 leading-relaxed mb-3">
                  Each disaster event includes temporal satellite imagery pairs enabling direct comparison 
                  of infrastructure conditions before and after the event.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-white rounded-md border border-slate-200">
                    <div className="text-xs text-slate-500 mb-1">Pre-Disaster</div>
                    <div className="text-sm font-medium text-slate-900">Baseline State</div>
                    <div className="text-xs text-slate-600 mt-1">Normal conditions</div>
                  </div>
                  <div className="p-3 bg-white rounded-md border border-slate-200">
                    <div className="text-xs text-slate-500 mb-1">Post-Disaster</div>
                    <div className="text-sm font-medium text-slate-900">Impact State</div>
                    <div className="text-xs text-slate-600 mt-1">Damage assessment</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-amber-50 border border-amber-100 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Tag className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h3 className="font-medium text-slate-900 mb-2">Multi-Class Damage Labeling</h3>
                <p className="text-sm text-slate-700 leading-relaxed mb-3">
                  Buildings are classified into four damage severity categories based on structural integrity:
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-slate-700"><strong>No Damage:</strong> Structure intact</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm text-slate-700"><strong>Minor Damage:</strong> Superficial impact</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span className="text-sm text-slate-700"><strong>Major Damage:</strong> Significant structural impact</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm text-slate-700"><strong>Destroyed:</strong> Complete structural failure</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Expandable Insights */}
        <div className="space-y-4">
          <InsightCard
            title="Dataset Coverage"
            description="Global multi-hazard satellite imagery"
            metrics={[
              { label: 'Disaster Events', value: '19+' },
              { label: 'Countries', value: '15+' },
              { label: 'Image Resolution', value: '0.3m/pixel' }
            ]}
            color="blue"
          />

          <InsightCard
            title="Technical Specifications"
            description="High-resolution satellite acquisition"
            metrics={[
              { label: 'Image Format', value: 'GeoTIFF' },
              { label: 'Spectral Bands', value: 'RGB' },
              { label: 'Temporal Range', value: '2016-2020' }
            ]}
            color="purple"
          />

          <ExpandablePanel
            title="Annotation Methodology"
            summary="Expert-validated damage assessment labels"
          >
            <p className="text-sm text-slate-700 leading-relaxed mb-3">
              Building damage labels were created through a rigorous multi-stage annotation process:
            </p>
            <ul className="text-sm text-slate-700 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">1.</span>
                <span>Automated building localization using computer vision</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">2.</span>
                <span>Expert manual damage classification by trained analysts</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">3.</span>
                <span>Quality assurance review and consensus validation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">4.</span>
                <span>Cross-validation with ground truth field reports</span>
              </li>
            </ul>
          </ExpandablePanel>

          <ExpandablePanel
            title="Data Collection Process"
            summary="Satellite imagery acquisition workflow"
          >
            <p className="text-sm text-slate-700 leading-relaxed">
              Post-disaster satellite imagery is acquired within 24-72 hours following major events. 
              Pre-disaster baseline images are sourced from historical archives up to 12 months prior. 
              All imagery undergoes atmospheric correction, georectification, and quality validation 
              before inclusion in the dataset.
            </p>
          </ExpandablePanel>

          <ExpandablePanel
            title="Use Cases & Applications"
            summary="Practical applications in disaster response"
          >
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 rounded-lg">
                <div className="font-medium text-sm text-slate-900 mb-1">Emergency Response</div>
                <div className="text-xs text-slate-600">Rapid damage assessment for resource allocation</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <div className="font-medium text-sm text-slate-900 mb-1">Recovery Planning</div>
                <div className="text-xs text-slate-600">Infrastructure reconstruction prioritization</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <div className="font-medium text-sm text-slate-900 mb-1">AI Model Training</div>
                <div className="text-xs text-slate-600">Supervised learning for automated damage detection</div>
              </div>
            </div>
          </ExpandablePanel>
        </div>
      </div>
    </div>
  );
}
