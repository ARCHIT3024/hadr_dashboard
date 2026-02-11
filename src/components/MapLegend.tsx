export function MapLegend() {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4">
      <h3 className="font-medium text-slate-900 mb-4">Map Legend</h3>
      
      <div className="space-y-4">
        <div>
          <div className="text-sm font-medium text-slate-700 mb-2">Damage Severity Scale</div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <div>
                <div className="text-sm text-slate-900">Low</div>
                <div className="text-xs text-slate-500">0-25% affected</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
              <div>
                <div className="text-sm text-slate-900">Medium</div>
                <div className="text-xs text-slate-500">25-50% affected</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
              <div>
                <div className="text-sm text-slate-900">High</div>
                <div className="text-xs text-slate-500">50-75% affected</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              <div>
                <div className="text-sm text-slate-900">Critical</div>
                <div className="text-xs text-slate-500">75-100% affected</div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200">
          <div className="text-sm font-medium text-slate-700 mb-2">Marker Size</div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-slate-400 rounded-full"></div>
              <div className="text-xs text-slate-600">1-5 disasters</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-slate-400 rounded-full"></div>
              <div className="text-xs text-slate-600">6-15 disasters</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-slate-400 rounded-full"></div>
              <div className="text-xs text-slate-600">16+ disasters</div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200">
          <div className="text-sm font-medium text-slate-700 mb-2">Interaction</div>
          <div className="text-xs text-slate-600 space-y-1">
            <div>• Click markers to view details</div>
            <div>• Hover for quick preview</div>
            <div>• Selection filters dashboard</div>
          </div>
        </div>
      </div>
    </div>
  );
}
