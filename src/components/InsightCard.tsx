import { motion } from 'motion/react';

interface InsightCardProps {
  title: string;
  description: string;
  metrics: Array<{ label: string; value: string }>;
  color?: string;
}

export function InsightCard({ title, description, metrics, color = 'blue' }: InsightCardProps) {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    orange: 'from-orange-500 to-orange-600',
    purple: 'from-purple-500 to-purple-600',
  }[color] || 'from-blue-500 to-blue-600';

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="p-4 bg-white border border-slate-200 rounded-lg hover:shadow-md transition-shadow"
    >
      <div className={`inline-block px-3 py-1 bg-gradient-to-r ${colorClasses} text-white text-xs font-medium rounded-full mb-3`}>
        {title}
      </div>
      <p className="text-sm text-slate-600 mb-4">{description}</p>
      <div className="grid grid-cols-3 gap-3">
        {metrics.map((metric, index) => (
          <div key={index} className="text-center">
            <div className="text-lg font-bold text-slate-900">{metric.value}</div>
            <div className="text-xs text-slate-500">{metric.label}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
