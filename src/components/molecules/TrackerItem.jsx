import React, { useState } from 'react';
import { Check, Square } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

const TrackerItem = ({ title, sets, reps, completed, onToggle }) => {
  return (
    <div 
      className={cn("flex items-center justify-between p-3 rounded-md border transition-all cursor-pointer group hover:bg-surface-secondary", 
        completed ? "bg-secondary/10 border-secondary/20" : "bg-surface-secondary/30 border-surface-border hover:border-primary/50")}
      onClick={onToggle}
    >
      <div className="flex items-center gap-3">
        <div className={cn("w-5 h-5 rounded border flex items-center justify-center transition-colors shadow-sm", completed ? "bg-secondary border-secondary" : "border-text-tertiary group-hover:border-primary")}>
          {completed && <Check className="w-3 h-3 text-white" />}
        </div>
        <div>
          <p className={cn("text-sm font-medium transition-colors", completed ? "text-text-tertiary line-through" : "text-text-secondary group-hover:text-text-primary")}>{title}</p>
          <div className="text-xs text-text-tertiary flex gap-2">
             <span>{sets} sets</span>
             <span>•</span>
             <span>{reps} reps</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export { TrackerItem };
