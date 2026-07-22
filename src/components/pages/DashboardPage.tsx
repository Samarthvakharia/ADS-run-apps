import React, { useState } from 'react';
import { useProject } from '../../context/ProjectContext';
import { useTheme } from '../../context/ThemeContext';
import {
  Sparkles,
  Briefcase,
  Layers,
  Send,
  Users,
  TrendingUp,
  ShieldCheck,
  Zap,
  ArrowRight,
  Plus,
  Play,
  FileText,
  ExternalLink,
  CheckCircle2,
  GitFork,
  Radio,
  Clock,
} from 'lucide-react';
import { PlatformType } from '../../types';

export const DashboardPage: React.FC = () => {
  const {
    projects,
    activeProject,
    setActiveProjectId,
    posts,
    runs,
    startOrchestrationRun,
    setActivePage,
  } = useProject();

  const { themeConfig } = useTheme();

  const [prompt, setPrompt] = useState('');
  const [goal, setGoal] = useState('Product Launch Campaign');
  const [selectedPlatforms, setSelectedPlatforms] = useState<PlatformType[]>([
    'linkedin',
    'twitter',
    'facebook',
    'instagram',
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const togglePlatform = (p: PlatformType) => {
    setSelectedPlatforms((prev) =>
      prev.includes(p) ? prev.filter((item) => item !== p) : [...prev, p]
    );
  };

  const handleLaunchCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || selectedPlatforms.length === 0) return;
    setIsSubmitting(true);
    await startOrchestrationRun(goal, prompt, selectedPlatforms);
    setIsSubmitting(false);
  };

  const projectPosts = posts.filter((p) => p.projectId === activeProject.id);
  const totalReach = projects.reduce((acc, p) => acc + p.totalReach, 0);
  const totalPostsCount = posts.length;
  const recentRuns = runs.slice(0, 3);

  return (
    <div className="space-y-8 pb-12">
      {/* Top Banner & Project Switcher Hero */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700 shadow-sm relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-2xl">{activeProject.logo}</span>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                {activeProject.name}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold">
                {activeProject.industry}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-2xl">
              Brand Voice: <span className="font-semibold text-slate-700 dark:text-slate-200">{activeProject.brandVoice}</span> • Target: <span className="font-semibold text-slate-700 dark:text-slate-200">{activeProject.targetAudience}</span>
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setActivePage('projects')}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center space-x-1.5 transition-colors"
            >
              <Briefcase className="w-4 h-4 text-indigo-500" />
              <span>Switch Workspace</span>
            </button>
            <button
              onClick={() => setActivePage('orchestrator')}
              className="px-4 py-2 rounded-xl text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center space-x-1.5"
              style={{ backgroundColor: themeConfig.primaryColor }}
            >
              <GitFork className="w-4 h-4" />
              <span>Open Agent Orchestrator</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-700 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-500">Active Workspaces</span>
            <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">{projects.length}</div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-1 flex items-center space-x-1">
            <TrendingUp className="w-3 h-3" />
            <span>Multi-brand configured</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-700 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-500">Multi-Channel Posts</span>
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600">
              <Send className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">{totalPostsCount}</div>
          <div className="text-[11px] text-slate-500 mt-1">Across FB, IG, LinkedIn, X</div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-700 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-500">Aggregated Audience Reach</span>
            <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {(totalReach / 1000).toFixed(0)}k
          </div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1 flex items-center space-x-1">
            <TrendingUp className="w-3 h-3" />
            <span>+18.4% this month</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-700 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-500">AI Safety Approval Rate</span>
            <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">96.8%</div>
          <div className="text-[11px] text-slate-500 mt-1">Approval Gate compliance</div>
        </div>
      </div>

      {/* Main Grid: Quick Campaign Launcher & Recent Runs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Campaign Generator Card */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700">
            <div className="flex items-center space-x-2">
              <div
                className="w-8 h-8 rounded-lg text-white flex items-center justify-center font-bold"
                style={{ backgroundColor: themeConfig.primaryColor }}
              >
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  Launch Multi-Agent Campaign Pipeline
                </h3>
                <p className="text-xs text-slate-500">
                  Runs 9 autonomous agents in sequence: Strategy → Trends → Content → Image → Approval → Publishing
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleLaunchCampaign} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Campaign Goal / Objective
              </label>
              <select
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-xs font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="Product Launch & Feature Spotlight">Product Launch & Feature Spotlight</option>
                <option value="Thought Leadership & Industry Insights">Thought Leadership & Industry Insights</option>
                <option value="Promotional Sale & Lead Magnet">Promotional Sale & Lead Magnet</option>
                <option value="Community Engagement & Viral Hooks">Community Engagement & Viral Hooks</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Prompt / Key Message
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={`e.g. Announce our new AI-driven ${activeProject.industry} feature that reduces manual effort by 80% with real-time analytics...`}
                className="w-full h-24 p-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                Target Distribution Channels
              </label>
              <div className="flex flex-wrap gap-2">
                {(['linkedin', 'twitter', 'facebook', 'instagram'] as PlatformType[]).map((p) => {
                  const isSelected = selectedPlatforms.includes(p);
                  return (
                    <button
                      key={p}
                      type="button"
                      onClick={() => togglePlatform(p)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all ${
                        isSelected
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                          : 'bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {p}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !prompt.trim()}
              className="w-full py-3 rounded-xl text-white font-bold text-xs shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
              style={{ backgroundColor: themeConfig.primaryColor }}
            >
              {isSubmitting ? (
                <span>Initializing 9-Agent Pipeline...</span>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>Run 9-Agent Flowchart Pipeline</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Recent Agent Executions Timeline */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center space-x-2">
              <Clock className="w-4 h-4 text-indigo-500" />
              <span>Orchestrator Runs</span>
            </h3>
            <button
              onClick={() => setActivePage('orchestrator')}
              className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
            >
              View All
            </button>
          </div>

          <div className="space-y-3">
            {recentRuns.length > 0 ? (
              recentRuns.map((run) => (
                <div
                  key={run.id}
                  onClick={() => setActivePage('orchestrator')}
                  className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 hover:border-slate-300 transition-colors cursor-pointer space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900 dark:text-white truncate max-w-[160px]">
                      {run.goal}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold capitalize">
                      {run.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-1">{run.prompt}</p>
                  <div className="text-[10px] text-slate-400 flex items-center justify-between pt-1">
                    <span>{run.targetPlatforms.join(', ')}</span>
                    <span>{new Date(run.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-slate-400 text-xs">
                No recent orchestration runs. Launch a campaign to see live agent traces!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Published Multi-Platform Feed */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700">
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center space-x-2">
              <FileText className="w-4 h-4 text-emerald-500" />
              <span>Recent Multi-Channel Posts ({activeProject.name})</span>
            </h3>
            <p className="text-xs text-slate-500">Live posts stored with platform IDs and public URLs</p>
          </div>
          <button
            onClick={() => setActivePage('studio')}
            className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline flex items-center space-x-1"
          >
            <span>Open Post Studio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projectPosts.slice(0, 3).map((post) => (
            <div
              key={post.id}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                    {post.platform}
                  </span>
                  <span className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400">
                    {post.postId}
                  </span>
                </div>
                <h4 className="font-bold text-xs text-slate-900 dark:text-white mb-1 line-clamp-1">
                  {post.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3">
                  {post.content}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 dark:border-slate-800 text-[11px]">
                <span className="text-slate-500">
                  Likes: <strong className="text-slate-800 dark:text-slate-200">{post.metrics?.likes || 0}</strong>
                </span>
                <a
                  href={post.publicUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline flex items-center space-x-1"
                >
                  <span>View Link</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
