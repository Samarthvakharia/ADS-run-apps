import React, { useState } from 'react';
import { useProject } from '../../context/ProjectContext';
import { useTheme } from '../../context/ThemeContext';
import {
  Brain,
  Plus,
  Search,
  Sparkles,
  Trash2,
  Database,
  CheckCircle2,
  Tag,
  Star,
  BookOpen,
} from 'lucide-react';

export const RagMemoryPage: React.FC = () => {
  const { ragMemories, activeProject, addRagMemory, deleteRagMemory } = useProject();
  const { themeConfig } = useTheme();

  const [topic, setTopic] = useState('');
  const [insight, setInsight] = useState('');
  const [tagInput, setTagInput] = useState('Hook Strategy');
  const [searchQuery, setSearchQuery] = useState('');

  const projectMemories = ragMemories.filter((m) => m.projectId === activeProject.id);

  const filteredMemories = projectMemories.filter((m) => {
    if (!searchQuery) return true;
    return (
      m.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.insight.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  const handleAddMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim() || !insight.trim()) return;

    addRagMemory({
      projectId: activeProject.id,
      topic,
      insight,
      performanceScore: 92,
      tags: [tagInput],
      sourceCampaign: 'Manual Brand Knowledge Entry',
    });

    setTopic('');
    setInsight('');
  };

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
              <Brain className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              Memory / RAG Knowledge Base
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Knowledge embeddings and campaign takeaways for{' '}
            <strong className="text-slate-700 dark:text-slate-300">{activeProject.name}</strong>. The Learning Agent feeds these back into future prompts.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono bg-indigo-50 dark:bg-indigo-950/50 p-2.5 rounded-xl border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300">
          <Database className="w-4 h-4" />
          <span>{projectMemories.length} Vector Entries</span>
        </div>
      </div>

      {/* RAG Search & Add Memory Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Add Knowledge Rule */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700 shadow-sm space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center space-x-2">
            <Plus className="w-4 h-4 text-indigo-500" />
            <span>Add Custom Brand Knowledge Rule</span>
          </h3>

          <form onSubmit={handleAddMemory} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Topic / Category
              </label>
              <input
                type="text"
                required
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Call-to-Action Constraint"
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Knowledge Rule / Insight Detail
              </label>
              <textarea
                required
                value={insight}
                onChange={(e) => setInsight(e.target.value)}
                placeholder="e.g. Always emphasize our 100% zero-waste guarantee and include link to free sample..."
                className="w-full h-24 p-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Tag Cluster
              </label>
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl text-white font-bold text-xs shadow-md transition-all"
              style={{ backgroundColor: themeConfig.primaryColor }}
            >
              Add Entry to RAG Store
            </button>
          </form>
        </div>

        {/* Right: RAG Vector Entries List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-700 shadow-sm flex items-center justify-between">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Query RAG vector index..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-4">
            {filteredMemories.length > 0 ? (
              filteredMemories.map((mem) => (
                <div
                  key={mem.id}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-700 shadow-sm flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-sm text-slate-900 dark:text-white">
                          {mem.topic}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                          Score: {mem.performanceScore}/100
                        </span>
                      </div>
                      <p className="text-xs text-slate-700 dark:text-slate-300 mt-1 leading-relaxed">
                        {mem.insight}
                      </p>
                    </div>

                    <button
                      onClick={() => deleteRagMemory(mem.id)}
                      className="text-slate-400 hover:text-rose-600 p-1 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-700 text-[11px]">
                    <div className="flex flex-wrap gap-1">
                      {mem.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-mono text-[10px]"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-slate-400 text-[10px]">
                      Source: {mem.sourceCampaign || 'Brand Settings'}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-12 text-center bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-400 text-xs">
                No RAG knowledge entries found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
