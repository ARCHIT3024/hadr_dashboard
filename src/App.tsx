import { useState } from "react";
import { TopNavBar } from "./components/TopNavBar";
import { ExecutiveOverview } from "./components/ExecutiveOverview";
import { DatasetIntelligencePanel } from "./components/DatasetIntelligencePanel";
import { DamageClassificationChart } from "./components/DamageClassificationChart";
import { GeospatialMap } from "./components/GeospatialMap";
import { TemporalTrendChart } from "./components/TemporalTrendChart";
import { AIPerformancePanel } from "./components/AIPerformancePanel";
import { ActionableInsights } from "./components/ActionableInsights";

export interface FilterState {
  disasterType: string[];
  region: string[];
  damageSeverity: string[];
  timeRange: { start: string; end: string };
}

function App() {
  const [filters, setFilters] = useState<FilterState>({
    disasterType: [],
    region: [],
    damageSeverity: [],
    timeRange: { start: "", end: "" },
  });

  const [selectedRegion, setSelectedRegion] = useState<
    string | null
  >(null);

  return (
    <div className="min-h-screen bg-slate-50">
      <TopNavBar filters={filters} setFilters={setFilters} />

      <main className="max-w-[1920px] mx-auto px-8 py-6">
        {/* Executive Overview */}
        <section className="mb-8">
          <ExecutiveOverview filters={filters} />
        </section>

        {/* Dataset Intelligence Panel */}
        <section className="mb-8">
          <DatasetIntelligencePanel />
        </section>

        {/* Damage Classification Analytics */}
        <section className="mb-8">
          <DamageClassificationChart filters={filters} />
        </section>

        {/* Geospatial Impact Visualization */}
        <section className="mb-8">
          <GeospatialMap
            filters={filters}
            selectedRegion={selectedRegion}
            setSelectedRegion={setSelectedRegion}
          />
        </section>

        {/* Temporal Trend Analysis */}
        <section className="mb-8">
          <TemporalTrendChart
            filters={filters}
            selectedRegion={selectedRegion}
          />
        </section>

        {/* AI Model Performance & Explainability */}
        <section className="mb-8">
          <AIPerformancePanel filters={filters} />
        </section>

        {/* Actionable Decision Insights */}
        <section className="mb-8">
          <ActionableInsights
            filters={filters}
            selectedRegion={selectedRegion}
          />
        </section>
      </main>
    </div>
  );
}

export default App;