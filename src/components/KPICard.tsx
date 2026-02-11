import { LucideIcon, TrendingUp, TrendingDown, Info } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

interface KPICardProps {
  title: string;
  value: string;
  trend?: {
    value: string;
    direction: 'up' | 'down';
    positive?: boolean;
  };
  icon: LucideIcon;
  tooltip: string;
  color?: string;
}

export function KPICard({ title, value, trend, icon: Icon, tooltip, color = 'blue' }: KPICardProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    orange: 'from-orange-500 to-orange-600',
    purple: 'from-purple-500 to-purple-600',
  }[color] || 'from-blue-500 to-blue-600';

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 relative group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 bg-gradient-to-br ${colorClasses} rounded-lg flex items-center justify-center`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-medium text-slate-600">{title}</h3>
            <div className="relative">
              <button
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <Info className="w-4 h-4" />
              </button>
              {showTooltip && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-slate-800 text-white text-xs rounded-lg p-3 shadow-lg z-10"
                >
                  {tooltip}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-800"></div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-3xl font-bold text-slate-900">{value}</div>
        
        {trend && (
          <div className="flex items-center gap-2">
            <div className={`flex items-center gap-1 text-sm font-medium ${
              trend.positive 
                ? trend.direction === 'up' ? 'text-green-600' : 'text-red-600'
                : trend.direction === 'up' ? 'text-red-600' : 'text-green-600'
            }`}>
              {trend.direction === 'up' ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span>{trend.value}</span>
            </div>
            <span className="text-xs text-slate-500">vs previous period</span>
          </div>
        )}
      </div>

      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-1.5 h-1.5 bg-slate-300 rounded-full"></div>
      </div>
    </motion.div>
  );
}
