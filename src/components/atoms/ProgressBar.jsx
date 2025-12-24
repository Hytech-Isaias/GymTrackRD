import React from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

const ProgressBar = ({ value = 0, max = 100, className, color = 'bg-blue-500' }) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={cn("h-2 w-full bg-slate-800 rounded-full overflow-hidden", className)}>
      <motion.div
        className={cn("h-full", color)}
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 1, ease: 'easeOut' }}
      />
    </div>
  );
};

export { ProgressBar };
