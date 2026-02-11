import { Image, Building2, AlertTriangle, Brain } from 'lucide-react';
import { KPICard } from './KPICard';
import { FilterState } from '../App';

interface ExecutiveOverviewProps {
  filters: FilterState;
}

export function ExecutiveOverview({ filters }: ExecutiveOverviewProps) {
  return (
    <div>
      <div className="mb-4">
        <h2 className="font-semibold text-slate-900">Executive Overview</h2>
        <p className="text-sm text-slate-500">Key performance indicators across all assessments</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Satellite Images Processed"
          value="847.3K"
          trend={{ value: "12.4%", direction: "up", positive: true }}
          icon={Image}
          tooltip="Total number of satellite images analyzed across all disaster events. Includes both pre-disaster and post-disaster imagery."
          color="blue"
        />

        <KPICard
          title="Buildings Assessed"
          value="3.2M"
          trend={{ value: "8.7%", direction: "up", positive: false }}
          icon={Building2}
          tooltip="Total number of individual building structures evaluated for damage assessment using computer vision models."
          color="green"
        />

        <KPICard
          title="Damage Severity Ratio"
          value="0.34"
          trend={{ value: "3.2%", direction: "down", positive: true }}
          icon={AlertTriangle}
          tooltip="Ratio of severely damaged buildings (major damage + destroyed) to total buildings assessed. Lower values indicate less severe damage."
          color="orange"
        />

        <KPICard
          title="AI Model Confidence"
          value="92.6%"
          trend={{ value: "1.8%", direction: "up", positive: true }}
          icon={Brain}
          tooltip="Average confidence score of the AI model predictions. Higher values indicate more reliable damage assessments."
          color="purple"
        />
      </div>
    </div>
  );
}
