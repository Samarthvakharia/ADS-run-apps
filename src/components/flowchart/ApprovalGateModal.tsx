import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import {
  ShieldCheck,
  CheckCircle2,
  RotateCcw,
  AlertTriangle,
  Sparkles,
  FileText,
  ThumbsUp,
  MessageSquare,
  X,
  Send,
} from 'lucide-react';
import { PostItem, ApprovalDecision } from '../../types';

interface ApprovalGateModalProps {
  score?: number;
  brandSafety?: string;
  toneMatch?: string;
  resultPosts?: PostItem[];
  onSubmitDecision: (decision: ApprovalDecision) => void;
}

export const ApprovalGateModal: React.FC<ApprovalGateModalProps> = ({
  score = 92,
  brandSafety = 'pass',
  toneMatch = 'high',
  resultPosts = [],
  onSubmitDecision,
}) => {
  const { themeConfig } = useTheme();
  const [feedbackText, setFeedbackText] = useState('');
  const [showFeedbackInput, setShowFeedbackInput] = useState(false);

  const handleApprove = () => {
    onSubmitDecision({
      approved: true,
      score,
      brandSafety: 'pass',
      toneMatch: toneMatch as any,
    });
  };

  const handleRegenerate = () => {
    if (!feedbackText.trim()) return;
    onSubmitDecision({
      approved: false,
      score,
      brandSafety: 'pass',
      toneMatch: toneMatch as any,
      feedback: feedbackText,
    });
  };

  return (
    <div className="bg-amber-500/5 dark:bg-amber-950/20 border-2 border-amber-500/40 rounded-2xl p-6 shadow-lg space-y-6 relative animate-in fade-in zoom-in-95">
      {/* Header Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-amber-200 dark:border-amber-900/40">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                Approval Agent Audit Gate
              </h3>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-300 text-xs font-bold uppercase tracking-wider">
                Action Required
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Review AI campaign audit score, brand compliance, and multi-channel post copy before publishing.
            </p>
          </div>
        </div>

        {/* Audit Metrics */}
        <div className="flex items-center space-x-3 bg-white dark:bg-slate-800 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="text-center px-3 border-r border-slate-100 dark:border-slate-700">
            <div className="text-lg font-black text-amber-600 dark:text-amber-400">{score}/100</div>
            <div className="text-[10px] text-slate-400 font-medium">Quality Score</div>
          </div>
          <div className="text-center px-3 border-r border-slate-100 dark:border-slate-700">
            <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 capitalize">
              {brandSafety}
            </div>
            <div className="text-[10px] text-slate-400 font-medium">Brand Safety</div>
          </div>
          <div className="text-center px-3">
            <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 capitalize">
              {toneMatch}
            </div>
            <div className="text-[10px] text-slate-400 font-medium">Tone Alignment</div>
          </div>
        </div>
      </div>

      {/* Generated Post Previews */}
      <div>
        <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3 flex items-center space-x-2">
          <FileText className="w-4 h-4 text-indigo-500" />
          <span>Generated Multi-Channel Deliverables ({resultPosts.length} Channels)</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resultPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200">
                  {post.platform}
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  Post ID: {post.postId || 'Pending'}
                </span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-200 font-sans whitespace-pre-wrap line-clamp-4">
                {post.content}
              </p>
              <div className="flex flex-wrap gap-1 pt-1">
                {post.hashtags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-1.5 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feedback input area if Regenerate clicked */}
      {showFeedbackInput && (
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3 animate-in fade-in">
          <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">
            Provide Feedback to Regenerate Campaign:
          </label>
          <textarea
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            placeholder="e.g., Make the LinkedIn post copy more formal, add a discount code hook, and shorten hashtags..."
            className="w-full h-20 p-3 text-xs rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
          />
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setShowFeedbackInput(false)}
              className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              onClick={handleRegenerate}
              disabled={!feedbackText.trim()}
              className="px-4 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white text-xs font-bold flex items-center space-x-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Submit & Regenerate</span>
            </button>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      {!showFeedbackInput && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <button
            onClick={() => setShowFeedbackInput(true)}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-amber-300 dark:border-amber-800 bg-white dark:bg-slate-800 text-amber-800 dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-950/40 text-xs font-bold flex items-center justify-center space-x-2 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>No, Regenerate with Feedback</span>
          </button>

          <button
            onClick={handleApprove}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-white font-bold text-xs shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2"
            style={{ backgroundColor: themeConfig.primaryColor }}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Yes, Approved! Publish to Channels</span>
          </button>
        </div>
      )}
    </div>
  );
};
