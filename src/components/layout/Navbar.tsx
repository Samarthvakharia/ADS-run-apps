import React, { useState } from 'react';
import { useProject, ActivePage } from '../../context/ProjectContext';
import { useTheme, THEME_PRESETS } from '../../context/ThemeContext';
import {
  Sparkles,
  LayoutDashboard,
  GitFork,
  FileText,
  Briefcase,
  Brain,
  BarChart3,
  Settings,
  ChevronDown,
  Plus,
  Palette,
  Key,
  ShieldCheck,
} from 'lucide-react';
import { ThemePreset } from '../../types';

export const Navbar: React.FC = () => {
  const {
    projects,
    activeProject,
    setActiveProjectId,
    activePage,
    setActivePage,
    apiKeys,
  } = useProject();

  const { activePreset, setThemePreset, themeConfig } = useTheme();

  const [projectDropdownOpen, setProjectDropdownOpen] = useState(false);
  const [themePickerOpen, setThemePickerOpen] = useState(false);

  const pages: { id: ActivePage; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'orchestrator', label: 'Agent Flowchart', icon: <GitFork className="w-4 h-4" /> },
    { id: 'studio', label: 'Post Studio', icon: <FileText className="w-4 h-4" /> },
    { id: 'projects', label: 'Workspace', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'rag', label: 'RAG Knowledge', icon: <Brain className="w-4 h-4" /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'settings', label: 'Settings & Keys', icon: <Settings className="w-4 h-4" /> },
  ];

  const presetsList: { id: ThemePreset; name: string; color: string }[] = [
    { id: 'indigo', name: 'Indigo Modern', color: '#4f46e5' },
    { id: 'emerald', name: 'Warm Emerald', color: '#059669' },
    { id: 'violet', name: 'Velvet Violet', color: '#7c3aed' },
    { id: 'crimson', name: 'Crimson Coral', color: '#e11d48' },
    { id: 'teal', name: 'Nordic Teal', color: '#0d9488' },
    { id: 'obsidian', name: 'Obsidian Night', color: '#6366f1' },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md transition-all"
              style={{ backgroundColor: themeConfig.primaryColor }}
            >
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white">
                  AgentPulse
                </span>
                <span
                  className="px-2 py-0.5 text-[10px] font-semibold rounded-full uppercase tracking-wider text-white"
                  style={{ backgroundColor: themeConfig.primaryColor }}
                >
                  Multi-Agent v2.5
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Autonomous Marketing Engine
              </p>
            </div>

            {/* Active Project Selector */}
            <div className="relative ml-4 hidden md:block">
              <button
                onClick={() => setProjectDropdownOpen(!projectDropdownOpen)}
                className="flex items-center space-x-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-medium text-slate-800 dark:text-slate-200 transition-colors"
              >
                <span>{activeProject.logo}</span>
                <span className="truncate max-w-[130px]">{activeProject.name}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {projectDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl py-2 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Select Workspace / Project
                  </div>
                  {projects.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        setActiveProjectId(p.id);
                        setProjectDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/60 ${
                        p.id === activeProject.id
                          ? 'font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/30'
                          : 'text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div className="flex items-center space-x-2 truncate">
                        <span>{p.logo}</span>
                        <span className="truncate">{p.name}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {p.activePlatforms.length} channels
                      </span>
                    </button>
                  ))}
                  <div className="border-t border-slate-100 dark:border-slate-700 mt-1 pt-1 px-2">
                    <button
                      onClick={() => {
                        setProjectDropdownOpen(false);
                        setActivePage('projects');
                      }}
                      className="w-full text-left px-2 py-1.5 text-xs text-indigo-600 dark:text-indigo-400 font-medium flex items-center space-x-1 hover:underline"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Manage or Add New Project</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="hidden lg:flex items-center space-x-1">
            {pages.map((p) => {
              const isActive = activePage === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setActivePage(p.id)}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                  style={
                    isActive
                      ? { backgroundColor: themeConfig.primaryColor }
                      : undefined
                  }
                >
                  {p.icon}
                  <span>{p.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Actions & Theme Picker */}
          <div className="flex items-center space-x-2">
            {/* Theme Switcher Button */}
            <div className="relative">
              <button
                onClick={() => setThemePickerOpen(!themePickerOpen)}
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center space-x-1"
                title="Change Theme Preset"
              >
                <Palette className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: themeConfig.primaryColor }}
                />
              </button>

              {themePickerOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl p-2 z-50">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2 py-1 mb-1">
                    Theme Color Schemes
                  </div>
                  <div className="space-y-1">
                    {presetsList.map((preset) => (
                      <button
                        key={preset.id}
                        onClick={() => {
                          setThemePreset(preset.id);
                          setThemePickerOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          activePreset === preset.id
                            ? 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white font-bold'
                            : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <span
                            className="w-3 h-3 rounded-full border border-slate-300 dark:border-slate-600"
                            style={{ backgroundColor: preset.color }}
                          />
                          <span>{preset.name}</span>
                        </div>
                        {activePreset === preset.id && (
                          <span className="text-[10px] text-emerald-500 font-bold">Active</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Key Status Indicator */}
            <button
              onClick={() => setActivePage('settings')}
              className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 transition-colors"
            >
              <Key className="w-3.5 h-3.5 text-indigo-500" />
              <span className="hidden sm:inline">API Keys</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="lg:hidden flex items-center overflow-x-auto space-x-1 py-2 border-t border-slate-100 dark:border-slate-800">
          {pages.map((p) => {
            const isActive = activePage === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setActivePage(p.id)}
                className={`flex items-center space-x-1 px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap ${
                  isActive
                    ? 'text-white font-bold'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
                style={isActive ? { backgroundColor: themeConfig.primaryColor } : undefined}
              >
                {p.icon}
                <span>{p.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
