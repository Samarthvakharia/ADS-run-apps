import React, { useState } from 'react';
import { useProject } from '../../context/ProjectContext';
import { useTheme } from '../../context/ThemeContext';
import {
  Briefcase,
  Plus,
  Trash2,
  CheckCircle2,
  Layers,
  Users,
  Target,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  X,
  Send,
} from 'lucide-react';
import { PlatformType, Project } from '../../types';

export const ProjectsPage: React.FC = () => {
  const { projects, activeProject, setActiveProjectId, addProject, deleteProject } = useProject();
  const { themeConfig } = useTheme();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [industry, setIndustry] = useState('');
  const [logo, setLogo] = useState('🚀');
  const [brandVoice, setBrandVoice] = useState('Authoritative, Visionary & Data-Driven');
  const [targetAudience, setTargetAudience] = useState('');
  const [customRule, setCustomRule] = useState('');
  const [customRules, setCustomRules] = useState<string[]>([
    'Maintain high brand compliance',
    'Include clear call to action in every post',
  ]);
  const [activePlatforms, setActivePlatforms] = useState<PlatformType[]>([
    'linkedin',
    'twitter',
    'facebook',
  ]);

  const togglePlatform = (p: PlatformType) => {
    setActivePlatforms((prev) =>
      prev.includes(p) ? prev.filter((item) => item !== p) : [...prev, p]
    );
  };

  const handleAddRule = () => {
    if (!customRule.trim()) return;
    setCustomRules((prev) => [...prev, customRule.trim()]);
    setCustomRule('');
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !industry.trim() || !targetAudience.trim()) return;

    addProject({
      name,
      logo,
      industry,
      brandVoice,
      targetAudience,
      activePlatforms,
      colorTheme: themeConfig.primaryColor,
      customRules,
    });

    setIsModalOpen(false);
    setName('');
    setIndustry('');
    setTargetAudience('');
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
              <Briefcase className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              Multi-Project Workspace Manager
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Manage multiple brand profiles simultaneously with dedicated voice rules, audiences, and platform queues.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 rounded-xl text-white font-bold text-xs shadow-md hover:shadow-lg transition-all flex items-center space-x-2"
          style={{ backgroundColor: themeConfig.primaryColor }}
        >
          <Plus className="w-4 h-4" />
          <span>Add New Brand / Project</span>
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => {
          const isActive = p.id === activeProject.id;
          return (
            <div
              key={p.id}
              className={`bg-white dark:bg-slate-800 rounded-2xl p-6 border transition-all flex flex-col justify-between space-y-4 ${
                isActive
                  ? 'border-indigo-500 shadow-md ring-2 ring-indigo-500/20'
                  : 'border-slate-200/80 dark:border-slate-700 hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{p.logo}</span>
                    <div>
                      <h3 className="font-bold text-sm text-slate-900 dark:text-white">{p.name}</h3>
                      <span className="text-[11px] font-medium text-slate-500">{p.industry}</span>
                    </div>
                  </div>
                  {isActive ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold">
                      Active
                    </span>
                  ) : (
                    <button
                      onClick={() => setActiveProjectId(p.id)}
                      className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
                    >
                      Set Active
                    </button>
                  )}
                </div>

                <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-100 dark:border-slate-700/60">
                  <div>
                    <span className="font-semibold text-slate-500">Voice:</span> {p.brandVoice}
                  </div>
                  <div>
                    <span className="font-semibold text-slate-500">Target:</span> {p.targetAudience}
                  </div>
                </div>

                {/* Platforms list */}
                <div className="flex flex-wrap gap-1.5 pt-3">
                  {p.activePlatforms.map((channel) => (
                    <span
                      key={channel}
                      className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                    >
                      {channel}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-700 text-xs">
                <span className="text-slate-500">
                  Posts: <strong className="text-slate-900 dark:text-white">{p.totalPosts || 12}</strong>
                </span>

                {projects.length > 1 && !isActive && (
                  <button
                    onClick={() => deleteProject(p.id)}
                    className="text-slate-400 hover:text-rose-600 p-1 rounded hover:bg-rose-50"
                    title="Delete Project"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add New Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-xl w-full p-6 border border-slate-200 dark:border-slate-700 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700">
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center space-x-2">
                <Briefcase className="w-5 h-5 text-indigo-500" />
                <span>Create New Brand / Project Profile</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Brand Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Acme Cloud Corp"
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Logo Icon
                  </label>
                  <select
                    value={logo}
                    onChange={(e) => setLogo(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-xs font-medium text-slate-900 dark:text-white"
                  >
                    <option value="⚡">⚡ Lightning</option>
                    <option value="🌱">🌱 Organic</option>
                    <option value="🔥">🔥 High Power</option>
                    <option value="💎">💎 Premium</option>
                    <option value="🚀">🚀 Rocket</option>
                    <option value="🔮">🔮 AI Vision</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Industry / Niche
                </label>
                <input
                  type="text"
                  required
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  placeholder="e.g. FinTech & Decentralized Payments"
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Brand Voice Archetype
                </label>
                <select
                  value={brandVoice}
                  onChange={(e) => setBrandVoice(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-xs font-medium text-slate-900 dark:text-white"
                >
                  <option value="Authoritative, Visionary & Data-Driven">Authoritative, Visionary & Data-Driven</option>
                  <option value="Warm, Authentic, Earthy & Educational">Warm, Authentic, Earthy & Educational</option>
                  <option value="High Energy, Motivational & Direct">High Energy, Motivational & Direct</option>
                  <option value="Playful, Trendy, Witty & Gen-Z Friendly">Playful, Trendy, Witty & Gen-Z Friendly</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Target Demographic
                </label>
                <input
                  type="text"
                  required
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  placeholder="e.g. Senior Developers, Tech Lead Managers, Product Directors"
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Target Social Channels
                </label>
                <div className="flex flex-wrap gap-2">
                  {(['linkedin', 'twitter', 'facebook', 'instagram'] as PlatformType[]).map((p) => {
                    const isSelected = activePlatforms.includes(p);
                    return (
                      <button
                        key={p}
                        type="button"
                        onClick={() => togglePlatform(p)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider border ${
                          isSelected
                            ? 'bg-indigo-600 text-white border-indigo-600'
                            : 'bg-slate-50 text-slate-600 border-slate-200'
                        }`}
                      >
                        {p}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold shadow-md"
                >
                  Create Workspace
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
