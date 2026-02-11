import { motion } from 'motion/react';

interface LoadingSkeletonProps {
  type?: 'card' | 'chart' | 'text';
  count?: number;
}

export function LoadingSkeleton({ type = 'card', count = 1 }: LoadingSkeletonProps) {
  const skeletons = Array.from({ length: count });

  if (type === 'card') {
    return (
      <>
        {skeletons.map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl shadow-sm border border-slate-200 p-6"
          >
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-slate-200 rounded w-1/2"></div>
              <div className="h-12 bg-slate-200 rounded w-3/4"></div>
              <div className="h-3 bg-slate-200 rounded w-1/3"></div>
            </div>
          </motion.div>
        ))}
      </>
    );
  }

  if (type === 'chart') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-xl shadow-sm border border-slate-200 p-6"
      >
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-slate-200 rounded w-1/3"></div>
          <div className="h-64 bg-slate-200 rounded"></div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="animate-pulse space-y-2">
      {skeletons.map((_, index) => (
        <div key={index} className="h-4 bg-slate-200 rounded w-full"></div>
      ))}
    </div>
  );
}
