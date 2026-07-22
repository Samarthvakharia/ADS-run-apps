import React, { useState } from 'react';
import { useProject } from '../../context/ProjectContext';
import { useTheme } from '../../context/ThemeContext';
import {
  Target,
  TrendingUp,
  FileText,
  Image as ImageIcon,
  ShieldCheck,
  Calendar,
  Send,
  BarChart3,
  Brain,
  CheckCircle2,
  Clock,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Server,
  Lock,
  Database,
  ArrowRight,
  ArrowDown,
  Info,
  Layers,
  Globe,
  Link,
  ChevronRight,
} from 'lucide-react';
import { AgentStep, AgentStatus, AgentType } from '../../types';

interface AgentFlowchartProps {
  steps: AgentStep[];
  currentStepIndex: number;
  onSelectStep?: (step: AgentStep) => void;
  onRequestRegenerate?: () => void;
}

export const AgentFlowchart: React.FC<AgentFlowchartProps> = ({
  steps,
  currentStepIndex,
  onSelectStep,
  onRequestRegenerate,
}) => {
  const { themeConfig } = useTheme();
  const [selectedAgentId, setSelectedAgentId] = useState<AgentType | null>('campaign');

  const getStep = (id: AgentType): AgentStep | undefined => steps.find((s) => s.id === id);

  const getIcon = (id: AgentType) => {
    switch (id) {
      case 'campaign': return <Target className="w-5 h-5 text-indigo-500" />;
      case 'trend': return <TrendingUp className="w-5 h-5 text-emerald-500" />;
      case 'content': return <FileText className="w-5 h-5 text-amber-500" />;
      case 'image': return <ImageIcon className="w-5 h-5 text-purple-500" />;
      case 'approval': return <ShieldCheck className="w-5 h-5 text-rose-500" />;
      case 'scheduler': return <Calendar className="w-5 h-5 text-blue-500" />;
      case 'publisher': return <Send className="w-5 h-5 text-cyan-500" />;
      case 'analytics': return <BarChart3 className="w-5 h-5 text-teal-500" />;
      case 'learning': return <Brain className="w-5 h-5 text-violet-500" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  const getStatusBadge = (status: AgentStatus) => {
    switch (status) {
      case 'succeeded':
        return (
          <span className="flex items-center space-x-1 px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold">
            <CheckCircle2 className="w-3 h-3" />
            <span>Passed</span>
          </span>
        );
      case 'running':
        return (
          <span className="flex items-center space-x-1 px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 text-[10px] font-bold animate-pulse">
            <Clock className="w-3 h-3 animate-spin" />
            <span>Executing...</span>
          </span>
        );
      case 'needs_approval':
        return (
          <span className="flex items-center space-x-1 px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 text-[10px] font-bold">
            <AlertTriangle className="w-3 h-3" />
            <span>Audit Gate</span>
          </span>
        );
      case 'rejected':
        return (
          <span className="flex items-center space-x-1 px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 text-[10px] font-bold">
            <RotateCcw className="w-3 h-3" />
            <span>Regenerating</span>
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 text-[10px] font-medium">
            Pending
          </span>
        );
    }
  };

  const activeSelectedStep = steps.find((s) => s.id === selectedAgentId) || steps[0];

  return (
    <div className="space-y-6">
      {/* Flowchart Diagram Header */}
      <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700 shadow-sm relative overflow-hidden">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-slate-700">
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center space-x-2">
              <Layers className="w-5 h-5 text-indigo-500" />
              <span>Multi-Agent System Flowchart Architecture</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Live execution pipeline & feedback loop trace
            </p>
          </div>
          <div className="flex items-center space-x-2 text-xs text-slate-500">
            <span className="flex items-center space-x-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Succeeded</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span>Active/Approval</span>
            </span>
          </div>
        </div>

        {/* System Entry Layer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-700 flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs">
              UI
            </div>
            <div>
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200">Frontend (React)</div>
              <div className="text-[10px] text-slate-500">User Dashboard & Interactive Prompt</div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-700 flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Server className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200">API Gateway</div>
              <div className="text-[10px] text-slate-500">Express Endpoint & Middleware</div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-700 flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200">Auth & Agent Orchestrator</div>
              <div className="text-[10px] text-slate-500">Dynamic Key Manager & Task Queue</div>
            </div>
          </div>
        </div>

        {/* Arrow Down to Multi-Agents */}
        <div className="flex justify-center -mt-2 mb-4">
          <div className="flex items-center space-x-2 text-slate-400 text-xs font-semibold uppercase tracking-wider">
            <span>Orchestrates Parallel & Sequential Agents</span>
            <ArrowDown className="w-4 h-4 animate-bounce text-indigo-500" />
          </div>
        </div>

        {/* Phase 1: Parallel Creation Agents (Campaign, Trend, Content, Image) */}
        <div className="mb-6">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
            1. Creation & Strategy Engine
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {(['campaign', 'trend', 'content', 'image'] as AgentType[]).map((agentId) => {
              const step = getStep(agentId);
              if (!step) return null;
              const isSelected = selectedAgentId === agentId;
              return (
                <div
                  key={agentId}
                  onClick={() => {
                    setSelectedAgentId(agentId);
                    if (onSelectStep) onSelectStep(step);
                  }}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer relative ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-50/30 dark:bg-indigo-950/20 shadow-md ring-2 ring-indigo-500/20'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-700">
                        {getIcon(agentId)}
                      </div>
                      <span className="font-bold text-xs text-slate-900 dark:text-white">
                        {step.name}
                      </span>
                    </div>
                    {getStatusBadge(step.status)}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Phase 2: Approval Gate & Feedback Loop */}
        <div className="mb-6 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-sm text-slate-900 dark:text-white">
                    Approval Agent Gate
                  </span>
                  {getStatusBadge(getStep('approval')?.status || 'idle')}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  AI Brand Compliance & Quality Audit (Score & Safety Check)
                </p>
              </div>
            </div>

            {/* Loop Controls */}
            <div className="flex items-center space-x-3 text-xs">
              <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 font-medium flex items-center space-x-1.5">
                <RotateCcw className="w-3.5 h-3.5" />
                <span>No → Feedback Loop to Regenerate</span>
              </div>
              <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 font-medium flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Yes → Proceed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Phase 3: Distribution & Publishing */}
        <div className="mb-6">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
            2. Scheduler, Publisher & Post ID Storage
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {(['scheduler', 'publisher'] as AgentType[]).map((agentId) => {
              const step = getStep(agentId);
              if (!step) return null;
              const isSelected = selectedAgentId === agentId;
              return (
                <div
                  key={agentId}
                  onClick={() => {
                    setSelectedAgentId(agentId);
                    if (onSelectStep) onSelectStep(step);
                  }}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-50/30 dark:bg-indigo-950/20 shadow-md ring-2 ring-indigo-500/20'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-700">
                        {getIcon(agentId)}
                      </div>
                      <span className="font-bold text-xs text-slate-900 dark:text-white">
                        {step.name}
                      </span>
                    </div>
                    {getStatusBadge(step.status)}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                    {step.description}
                  </p>
                </div>
              );
            })}

            {/* Social Channels & Stored Post ID Node */}
            <div className="p-3.5 rounded-xl bg-slate-900 text-white border border-slate-700 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold flex items-center space-x-1 text-indigo-300">
                    <Globe className="w-3.5 h-3.5" />
                    <span>Facebook / IG / LinkedIn / X</span>
                  </span>
                  <span className="text-[10px] bg-indigo-500/30 text-indigo-200 px-2 py-0.5 rounded-full font-mono">
                    Live Broadcast
                  </span>
                </div>
                <p className="text-[11px] text-slate-300">
                  Store generated <span className="font-mono text-amber-300">Post ID</span> &{' '}
                  <span className="font-mono text-cyan-300">Public Share URL</span>
                </p>
              </div>
              <div className="mt-2 text-[10px] text-slate-400 font-mono flex items-center justify-between pt-1 border-t border-slate-800">
                <span>FB-892019</span>
                <span>LI-991203</span>
                <span>X-189203</span>
              </div>
            </div>
          </div>
        </div>

        {/* Phase 4: Analytics, Learning & RAG Memory */}
        <div>
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
            3. Analytics, Continuous Learning & RAG Memory
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {(['analytics', 'learning'] as AgentType[]).map((agentId) => {
              const step = getStep(agentId);
              if (!step) return null;
              const isSelected = selectedAgentId === agentId;
              return (
                <div
                  key={agentId}
                  onClick={() => {
                    setSelectedAgentId(agentId);
                    if (onSelectStep) onSelectStep(step);
                  }}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-50/30 dark:bg-indigo-950/20 shadow-md ring-2 ring-indigo-500/20'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-700">
                        {getIcon(agentId)}
                      </div>
                      <span className="font-bold text-xs text-slate-900 dark:text-white">
                        {step.name}
                      </span>
                    </div>
                    {getStatusBadge(step.status)}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                    {step.description}
                  </p>
                </div>
              );
            })}

            {/* RAG Knowledge Base Store */}
            <div className="p-3.5 rounded-xl bg-indigo-950 text-indigo-100 border border-indigo-800/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold flex items-center space-x-1 text-indigo-300">
                    <Database className="w-3.5 h-3.5 text-violet-400" />
                    <span>Memory / RAG Knowledge Base</span>
                  </span>
                  <span className="text-[10px] bg-indigo-500/40 text-indigo-200 px-2 py-0.5 rounded-full font-mono">
                    Learnings Vectorized
                  </span>
                </div>
                <p className="text-[11px] text-indigo-200">
                  Feeds top performance insights back into future prompt contexts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Agent Inspector Panel */}
      {activeSelectedStep && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-700 shadow-sm">
          <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-100 dark:border-slate-700">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-700">
                {getIcon(activeSelectedStep.id)}
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center space-x-2">
                  <span>{activeSelectedStep.name}</span>
                  <span className="text-xs font-normal text-slate-500">({activeSelectedStep.role})</span>
                </h4>
                <p className="text-xs text-slate-500">{activeSelectedStep.description}</p>
              </div>
            </div>
            {getStatusBadge(activeSelectedStep.status)}
          </div>

          {/* Logs & Output */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center space-x-1">
                <Info className="w-3.5 h-3.5" />
                <span>Execution Logs</span>
              </div>
              <div className="bg-slate-900 text-slate-200 rounded-xl p-3 font-mono text-[11px] space-y-1 max-h-40 overflow-y-auto">
                {activeSelectedStep.logs.length > 0 ? (
                  activeSelectedStep.logs.map((log, i) => (
                    <div key={i} className="flex items-start space-x-2">
                      <span className="text-indigo-400">$</span>
                      <span>{log}</span>
                    </div>
                  ))
                ) : (
                  <span className="text-slate-500 italic">No logs recorded yet.</span>
                )}
              </div>
            </div>

            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Structured Agent Output</span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900/80 rounded-xl p-3 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 max-h-40 overflow-y-auto">
                {activeSelectedStep.output ? (
                  <pre className="font-mono text-[11px] whitespace-pre-wrap">
                    {JSON.stringify(activeSelectedStep.output, null, 2)}
                  </pre>
                ) : (
                  <span className="text-slate-400 italic">Agent output pending execution.</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
