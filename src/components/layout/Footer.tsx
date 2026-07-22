import React from 'react';
import { Radio, ShieldCheck, Activity, Database, CheckCircle2 } from 'lucide-react';
import { useProject } from '../../context/ProjectContext';

export const Footer: React.FC = () => {
  const { apiKeys } = useProject();

  return (
    <footer className="mt-auto border-t border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 py-3 px-4 sm:px-6 lg:px-8 text-[11px] text-slate-500 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center space-x-3 font-mono">
          <span className="flex items-center space-x-1 text-slate-700 dark:text-slate-300 font-bold">
            <Radio className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
            <span>SYSTEM_UPTIME: 99.98%</span>
          </span>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <span>v2.5.0-STABLE</span>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center space-x-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>AI Gateway Connected</span>
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <span className="flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>FB/IG API: Stable</span>
          </span>
          <span className="flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>LinkedIn API: Active</span>
          </span>
          <span className="flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span>X API: Rate Limit Caution</span>
          </span>
        </div>
      </div>
    </footer>
  );
};
