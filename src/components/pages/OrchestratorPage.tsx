import React, { useState } from 'react';
import { useProject } from '../../context/ProjectContext';
import { useTheme } from '../../context/ThemeContext';
import { AgentFlowchart } from '../flowchart/AgentFlowchart';
import { ApprovalGateModal } from '../flowchart/ApprovalGateModal';
import {
  GitFork,
  Play,
  RotateCcw,
  CheckCircle2,
  Sparkles,
  Layers,
  FileText,
  ExternalLink,
  ShieldCheck,
  Send,
  Calendar,
  Globe,
} from 'lucide-react';
import { PlatformType } from '../../types';

export const OrchestratorPage: React.FC = () => {
  const {
    activeProject,
    activeRun,
    startOrchestrationRun,
    submitApprovalDecision,
    posts,
  } = useProject();

  const { themeConfig } = useTheme();

  const [prompt, setPrompt] = useState(
    `Launch our Q3 multi-channel campaign highlighting ${activeProject.name}'s key strengths for ${activeProject.targetAudience}.`
  );
  const [goal, setGoal] = useState('Q3 Multi-Channel Growth Campaign');
  const [selectedPlatforms, setSelectedPlatforms] = useState<PlatformType[]>([
    'linkedin',
    'twitter',
    'facebook',
    'instagram',
  ]);
  const [isExecuting, setIsExecuting] = useState(false);

  const togglePlatform = (p: PlatformType) => {
    setSelectedPlatforms((prev) =>
      prev.includes(p) ? prev.filter((item) => item !== p) : [...prev, p]
    );
  };

  const handleStartRun = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || selectedPlatforms.length === 0) return;
    setIsExecuting(true);
    await startOrchestrationRun(goal, prompt, selectedPlatforms);
    setIsExecuting(false);
  };

  const currentRunPosts = activeRun?.resultPosts || posts.filter((p) => p.runId === activeRun?.id);

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
              <GitFork className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              Agent Flowchart Orchestrator
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time trace of the 9 autonomous agents executing your marketing campaign for{' '}
            <strong className="text-slate-700 dark:text-slate-300">{activeProject.name}</strong>.
          </p>
        </div>

        {activeRun && (
          <div className="flex items-center space-x-3 bg-slate-50 dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
            <span className="text-xs font-medium text-slate-500">Run Status:</span>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              {activeRun.status}
            </span>
          </div>
        )}
      </div>

      {/* Campaign Launcher Controls */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700 shadow-sm space-y-4">
        <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>New Pipeline Execution</span>
        </h3>

        <form onSubmit={handleStartRun} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Campaign Goal Title
            </label>
            <input
              type="text"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="e.g. Summer Special Offer"
              className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-xs font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Campaign Brief & Target Prompt
            </label>
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. Announce our eco-friendly packaging redesign with an emphasis on zero-waste benefits..."
              className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
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
                    className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider border transition-all ${
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

          <div className="flex items-end">
            <button
              type="submit"
              disabled={isExecuting || !prompt.trim()}
              className="w-full py-2.5 rounded-xl text-white font-bold text-xs shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
              style={{ backgroundColor: themeConfig.primaryColor }}
            >
              <Play className="w-4 h-4 fill-white" />
              <span>{isExecuting ? 'Running Pipeline...' : 'Start Flowchart Pipeline'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Approval Gate Decision Box (If Waiting Approval) */}
      {activeRun && activeRun.status === 'waiting_approval' && (
        <ApprovalGateModal
          score={activeRun.steps[4]?.output?.score || 94}
          brandSafety={activeRun.steps[4]?.output?.brandSafety || 'pass'}
          toneMatch={activeRun.steps[4]?.output?.toneMatch || 'high'}
          resultPosts={currentRunPosts}
          onSubmitDecision={(decision) => submitApprovalDecision(activeRun.id, decision)}
        />
      )}

      {/* Interactive Agent Flowchart Engine */}
      {activeRun ? (
        <AgentFlowchart
          steps={activeRun.steps}
          currentStepIndex={activeRun.currentStepIndex}
        />
      ) : (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-12 text-center border border-slate-200/80 dark:border-slate-700 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto">
            <GitFork className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white">
            Ready to Execute Multi-Agent Flowchart
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Click "Start Flowchart Pipeline" above to trigger the 9 autonomous agents step-by-step.
          </p>
        </div>
      )}

      {/* Deliverables Output (If Completed) */}
      {activeRun && activeRun.status === 'completed' && currentRunPosts.length > 0 && (
        <div className="bg-emerald-500/5 dark:bg-emerald-950/20 border-2 border-emerald-500/40 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center space-x-3 pb-3 border-b border-emerald-200 dark:border-emerald-800">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Campaign Deliverables Published Successfully
              </h3>
              <p className="text-xs text-slate-500">
                All posts published and stored with unique platform Post IDs and public share URLs.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentRunPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200">
                    {post.platform}
                  </span>
                  <span className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400">
                    {post.postId}
                  </span>
                </div>
                <h4 className="font-bold text-xs text-slate-900 dark:text-white">{post.title}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 whitespace-pre-wrap">
                  {post.content}
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-700 text-xs">
                  <span className="text-slate-400 text-[10px]">
                    Status: <strong className="text-emerald-600 uppercase">Published</strong>
                  </span>
                  <a
                    href={post.publicUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline flex items-center space-x-1"
                  >
                    <span>Public View Link</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
