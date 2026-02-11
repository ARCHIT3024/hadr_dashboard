import { Search, Download, Share2, Settings, User, Bell } from 'lucide-react';
import { FilterState } from '../App';
import { MultiSelect } from './MultiSelect';
import { DateRangePicker } from './DateRangePicker';

interface TopNavBarProps {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
}

export function TopNavBar({ filters, setFilters }: TopNavBarProps) {
  const disasterTypes = ['Earthquake', 'Flood', 'Wildfire', 'Hurricane', 'Tsunami', 'Tornado'];
  const regions = ['North America', 'South America', 'Europe', 'Asia', 'Africa', 'Oceania'];
  const severityLevels = ['No Damage', 'Minor Damage', 'Major Damage', 'Destroyed'];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-[1920px] mx-auto px-8 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">xBD</span>
            </div>
            <div>
              <h1 className="font-semibold text-slate-900">xBD Disaster Damage Analytics</h1>
              <p className="text-sm text-slate-500">Satellite-Based Building Damage Assessment Platform</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors relative">
              <Bell className="w-5 h-5 text-slate-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 hover:bg-slate-100 rounded-lg transition-colors">
              <Download className="w-5 h-5 text-slate-600" />
              <span className="text-sm font-medium text-slate-700">Export</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 hover:bg-slate-100 rounded-lg transition-colors">
              <Share2 className="w-5 h-5 text-slate-600" />
              <span className="text-sm font-medium text-slate-700">Share</span>
            </button>
            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <Settings className="w-5 h-5 text-slate-600" />
            </button>
            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <User className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex-1 min-w-[200px] max-w-[300px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search regions, disasters..."
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
          </div>

          <MultiSelect
            label="Disaster Type"
            options={disasterTypes}
            selected={filters.disasterType}
            onChange={(values) => setFilters({ ...filters, disasterType: values })}
          />

          <MultiSelect
            label="Region"
            options={regions}
            selected={filters.region}
            onChange={(values) => setFilters({ ...filters, region: values })}
          />

          <MultiSelect
            label="Damage Severity"
            options={severityLevels}
            selected={filters.damageSeverity}
            onChange={(values) => setFilters({ ...filters, damageSeverity: values })}
          />

          <DateRangePicker
            value={filters.timeRange}
            onChange={(range) => setFilters({ ...filters, timeRange: range })}
          />

          {(filters.disasterType.length > 0 || filters.region.length > 0 || filters.damageSeverity.length > 0) && (
            <button
              onClick={() => setFilters({ disasterType: [], region: [], damageSeverity: [], timeRange: { start: '', end: '' } })}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium px-3 py-2 hover:bg-blue-50 rounded-lg transition-colors"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
