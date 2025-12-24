import React from 'react';

const StatCard = ({ label, value, unit, icon: Icon }) => {
  return (
    <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 flex items-center gap-4">
      {Icon && <div className="p-3 rounded-full bg-slate-700/50 text-blue-400"><Icon className="w-5 h-5" /></div>}
      <div>
        <p className="text-xs text-slate-400 uppercase tracking-wide">{label}</p>
        <p className="text-2xl font-bold text-white">
          {value} <span className="text-sm font-normal text-slate-500">{unit}</span>
        </p>
      </div>
    </div>
  );
};

export { StatCard };
