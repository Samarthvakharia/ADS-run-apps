import React from 'react';
import { useProject } from '../../context/ProjectContext';
import { useTheme } from '../../context/ThemeContext';
import {
  BarChart3,
  TrendingUp,
  Brain,
  Sparkles,
  Users,
  Send,
  Zap,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

export const AnalyticsPage: React.FC = () => {
  const { activeProject, posts } = useProject();
  const { themeConfig } = useTheme();

  const platformData = [
    { name: 'LinkedIn', engagement: 5.4, reach: 45000, color: '#0077b5' },
    { name: 'Twitter / X', engagement: 6.2, reach: 68000, color: '#1da1f2' },
    { name: 'Instagram', engagement: 6.8, reach: 52000, color: '#e1306c' },
    { name: 'Facebook', engagement: 4.8, reach: 38000, color: '#4267b2' },
  ];

  const trendData = [
    { month: 'Jan', impressions: 32000, clicks: 1200 },
    { month: 'Feb', impressions: 48000, clicks: 2100 },
    { month: 'Mar', impressions: 64000, clicks: 3400 },
    { month: 'Apr', impressions: 89000, clicks: 4800 },
    { month: 'May', impressions: 112000, clicks: 6200 },
    { month: 'Jun', impressions: 142000, clicks: 8900 },
  ];

  const pieData = [
    { name: 'Direct Clicks', value: 45, color: '#4f46e5' },
    { name: 'Social Shares', value: 30, color: '#059669' },
    { name: 'Comments & Engagements', value: 15, color: '#e11d48' },
    { name: 'Profile Visits', value: 10, color: '#0d9488' },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <div
              className="p-2 rounded-xl text-white shadow-sm"
              style={{ backgroundColor: themeConfig.primaryColor }}
            >
              <BarChart3 className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              Analytics & Learning Insights
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Performance analytics, engagement breakdowns, and Learning Agent ROI optimizations for{' '}
            <strong className="text-slate-700 dark:text-slate-300">{activeProject.name}</strong>.
          </p>
        </div>
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-700 shadow-sm">
          <div className="text-xs font-medium text-slate-500 mb-1">Avg Engagement Rate</div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {activeProject.avgEngagement || 5.8}%
          </div>
          <span className="text-[10px] text-emerald-600 font-bold flex items-center space-x-0.5 mt-1">
            <ArrowUpRight className="w-3 h-3" />
            <span>+1.2% higher than industry benchmark</span>
          </span>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-700 shadow-sm">
          <div className="text-xs font-medium text-slate-500 mb-1">Monthly Impressions</div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">142,000</div>
          <span className="text-[10px] text-emerald-600 font-bold flex items-center space-x-0.5 mt-1">
            <ArrowUpRight className="w-3 h-3" />
            <span>+24.8% growth</span>
          </span>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-700 shadow-sm">
          <div className="text-xs font-medium text-slate-500 mb-1">Link Clicks</div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">8,900</div>
          <span className="text-[10px] text-indigo-600 font-bold mt-1">High conversion yield</span>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-700 shadow-sm">
          <div className="text-xs font-medium text-slate-500 mb-1">Learning Agent Score</div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">96/100</div>
          <span className="text-[10px] text-emerald-600 font-bold mt-1">Continuous RAG optimization</span>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Engagement Rate by Channel */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700 shadow-sm space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center space-x-2">
            <BarChart3 className="w-4 h-4 text-indigo-500" />
            <span>Engagement Rate (%) by Platform</span>
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={platformData}>
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="engagement" fill={themeConfig.primaryColor} radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Growth Trend */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700 shadow-sm space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-emerald-500" />
            <span>Campaign Reach & Impression Growth</span>
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="impressions"
                  stroke={themeConfig.primaryColor}
                  fill={themeConfig.primaryColor}
                  fillOpacity={0.15}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Learning Agent AI Recommendations */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700 shadow-sm space-y-4">
        <div className="flex items-center space-x-2 pb-3 border-b border-slate-100 dark:border-slate-700">
          <Brain className="w-5 h-5 text-indigo-500" />
          <h3 className="font-bold text-base text-slate-900 dark:text-white">
            Learning Agent Strategy Recommendations
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 space-y-2">
            <div className="flex items-center space-x-2 font-bold text-xs text-indigo-900 dark:text-indigo-200">
              <Zap className="w-4 h-4 text-indigo-600" />
              <span>Hook Length Optimization</span>
            </div>
            <p className="text-xs text-indigo-800 dark:text-indigo-300">
              Posts beginning with a direct question under 12 words saw 42% higher click-throughs on LinkedIn and X.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-2">
            <div className="flex items-center space-x-2 font-bold text-xs text-emerald-900 dark:text-emerald-200">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Optimal Timing Window</span>
            </div>
            <p className="text-xs text-emerald-800 dark:text-emerald-300">
              Tuesday 8:30 AM EST yields 3x higher re-shares on X/Twitter compared to afternoon slots.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 space-y-2">
            <div className="flex items-center space-x-2 font-bold text-xs text-purple-900 dark:text-purple-200">
              <ShieldCheck className="w-4 h-4 text-purple-600" />
              <span>Visual Image Prompts</span>
            </div>
            <p className="text-xs text-purple-800 dark:text-purple-300">
              High contrast modern dark-background infographic visual prompts resulted in +68% Instagram saves.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
