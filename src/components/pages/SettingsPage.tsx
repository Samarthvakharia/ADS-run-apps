import React, { useState } from 'react';
import { useProject } from '../../context/ProjectContext';
import { useTheme } from '../../context/ThemeContext';
import {
  Settings,
  Key,
  Palette,
  ShieldCheck,
  CheckCircle2,
  Eye,
  EyeOff,
  Server,
  Database,
  Globe,
  Cpu,
  Activity,
  Zap,
} from 'lucide-react';
import { ThemePreset } from '../../types';

export const SettingsPage: React.FC = () => {
  const { apiKeys, updateApiKeys } = useProject();
  const { activePreset, setThemePreset, themeConfig } = useTheme();

  const [llmGateway, setLlmGateway] = useState('Gemini 2.5 Flash (Default)');
  const [geminiKeyInput, setGeminiKeyInput] = useState(apiKeys.geminiKey);
  const [fbToken, setFbToken] = useState(apiKeys.fbToken);
  const [igToken, setIgToken] = useState(apiKeys.igToken);
  const [linkedinToken, setLinkedinToken] = useState(apiKeys.linkedinToken);
  const [xToken, setXToken] = useState(apiKeys.xToken);
  const [ragKey, setRagKey] = useState(apiKeys.ragSearchKey);
  const [useServerKey, setUseServerKey] = useState(apiKeys.useServerGeminiKey);

  const [showKeys, setShowKeys] = useState(false);
  const [validating, setValidating] = useState(false);
  const [validationMessage, setValidationMessage] = useState<{
    valid: boolean;
    text: string;
  } | null>(null);

  const handleSaveKeys = () => {
    updateApiKeys({
      geminiKey: geminiKeyInput,
      fbToken,
      igToken,
      linkedinToken,
      xToken,
      ragSearchKey: ragKey,
      useServerGeminiKey: useServerKey,
    });
    setValidationMessage({ valid: true, text: 'Settings & API Keys saved successfully!' });
  };

  const handleTestGeminiKey = async () => {
    setValidating(true);
    setValidationMessage(null);
    try {
      const keyToTest = useServerKey ? 'SERVER_DEFAULT' : geminiKeyInput;
      const res = await fetch('/api/keys/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey: keyToTest }),
      });
      const data = await res.json();
      if (data.valid) {
        setValidationMessage({ valid: true, text: 'Gemini API Key validated successfully!' });
      } else {
        setValidationMessage({ valid: false, text: data.message || 'Key validation failed' });
      }
    } catch (err) {
      setValidationMessage({ valid: false, text: 'Server connection error during validation.' });
    } finally {
      setValidating(false);
    }
  };

  const presetsList: { id: ThemePreset; name: string; color: string; bg: string }[] = [
    { id: 'indigo', name: 'Indigo Modern', color: '#4f46e5', bg: '#f8fafc' },
    { id: 'emerald', name: 'Warm Emerald', color: '#059669', bg: '#fdfbf7' },
    { id: 'violet', name: 'Velvet Violet', color: '#7c3aed', bg: '#faf5ff' },
    { id: 'crimson', name: 'Crimson Coral', color: '#e11d48', bg: '#fff5f5' },
    { id: 'teal', name: 'Nordic Teal', color: '#0d9488', bg: '#f0fdfa' },
    { id: 'obsidian', name: 'Obsidian Night (Dark)', color: '#6366f1', bg: '#0f172a' },
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
              <Settings className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              Dynamic API Settings & LLM Gateway
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Configure dynamic API keys, primary LLM models, rate limit thresholds, and social media platform integration tokens.
          </p>
        </div>
        <div className="flex items-center space-x-2 font-mono text-xs">
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-300">
            Gateway: Operational
          </span>
        </div>
      </div>

      {/* Gateway Telemetry & Limits Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-800 text-white rounded-2xl p-5 border border-slate-700 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Primary LLM Engine</span>
            <Cpu className="w-4 h-4 text-indigo-400" />
          </div>
          <select
            value={llmGateway}
            onChange={(e) => setLlmGateway(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            <option value="Gemini 2.5 Flash (Default)">Gemini 2.5 Flash (Default)</option>
            <option value="Gemini 2.5 Pro (Deep Research)">Gemini 2.5 Pro (Deep Research)</option>
            <option value="Gemini Flash Thinking (Experimental)">Gemini Flash Thinking (Experimental)</option>
          </select>
          <div className="text-[11px] text-slate-400">
            Latency: <strong className="text-emerald-400">120ms avg</strong> • Context: 1.0M tokens
          </div>
        </div>

        <div className="bg-slate-800 text-white rounded-2xl p-5 border border-slate-700 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">RAG Vector Context Size</span>
            <Database className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xl font-bold text-white font-mono">8,192 / 32,768 Tokens</div>
          <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full w-1/4 rounded-full" />
          </div>
          <div className="text-[11px] text-slate-400">
            Auto-truncation enabled at 80% capacity
          </div>
        </div>

        <div className="bg-slate-800 text-white rounded-2xl p-5 border border-slate-700 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">API Rate Limit Usage</span>
            <Activity className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-xl font-bold text-white font-mono">1,420 / 10,000 req/min</div>
          <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
            <div className="bg-indigo-500 h-full w-[14%] rounded-full" />
          </div>
          <div className="text-[11px] text-slate-400">
            Quota refreshes in <strong className="text-white">42s</strong>
          </div>
        </div>
      </div>

      {/* Dynamic API Keys Configuration Panel */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700">
          <div className="flex items-center space-x-2">
            <Key className="w-5 h-5 text-indigo-500" />
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Encrypted Master Keys & Social Media Integration
            </h3>
          </div>
          <button
            onClick={() => setShowKeys(!showKeys)}
            className="flex items-center space-x-1.5 text-xs text-slate-600 dark:text-slate-300 font-semibold hover:underline"
          >
            {showKeys ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            <span>{showKeys ? 'Mask Keys' : 'Show Keys'}</span>
          </button>
        </div>

        {/* Gemini API Key Source Toggle */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-bold text-xs text-slate-900 dark:text-white">
                Use System Gemini API Key
              </span>
              <p className="text-[11px] text-slate-500">
                Leverages the environment secret <code className="font-mono text-indigo-600">GEMINI_API_KEY</code> provided by runtime configuration.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={useServerKey}
                onChange={(e) => setUseServerKey(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600" />
            </label>
          </div>

          {!useServerKey && (
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Custom Gemini API Key
              </label>
              <input
                type={showKeys ? 'text' : 'password'}
                value={geminiKeyInput}
                onChange={(e) => setGeminiKeyInput(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white font-mono"
              />
            </div>
          )}
        </div>

        {/* Social Media API Platform Tokens */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Facebook Graph API Token
            </label>
            <input
              type={showKeys ? 'text' : 'password'}
              value={fbToken}
              onChange={(e) => setFbToken(e.target.value)}
              placeholder="EAAGm..."
              className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-xs font-mono text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Instagram Business Token
            </label>
            <input
              type={showKeys ? 'text' : 'password'}
              value={igToken}
              onChange={(e) => setIgToken(e.target.value)}
              placeholder="IGQVJ..."
              className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-xs font-mono text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              LinkedIn OAuth Bearer Token
            </label>
            <input
              type={showKeys ? 'text' : 'password'}
              value={linkedinToken}
              onChange={(e) => setLinkedinToken(e.target.value)}
              placeholder="AQU3..."
              className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-xs font-mono text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              X / Twitter Bearer Token
            </label>
            <input
              type={showKeys ? 'text' : 'password'}
              value={xToken}
              onChange={(e) => setXToken(e.target.value)}
              placeholder="AAAAAAAAA..."
              className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-xs font-mono text-slate-900 dark:text-white"
            />
          </div>
        </div>

        {/* Validation Status message */}
        {validationMessage && (
          <div
            className={`p-3 rounded-xl text-xs font-medium flex items-center space-x-2 ${
              validationMessage.valid
                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200'
                : 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border border-rose-200'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{validationMessage.text}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <button
            onClick={handleTestGeminiKey}
            disabled={validating}
            className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center space-x-1.5"
          >
            <Key className="w-3.5 h-3.5 text-indigo-500" />
            <span>{validating ? 'Validating Key...' : 'Test Gemini Key Connection'}</span>
          </button>

          <button
            onClick={handleSaveKeys}
            className="px-6 py-2.5 rounded-xl text-white text-xs font-bold shadow-md hover:shadow-lg transition-all"
            style={{ backgroundColor: themeConfig.primaryColor }}
          >
            Save Configuration
          </button>
        </div>
      </div>

      {/* Theme Color Scheme Switcher Panel */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700 shadow-sm space-y-4">
        <div className="flex items-center space-x-2 pb-3 border-b border-slate-100 dark:border-slate-700">
          <Palette className="w-5 h-5 text-indigo-500" />
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Application Theme & Color Schemes
            </h3>
            <p className="text-xs text-slate-500">
              Select a visual color palette. Light and dark modes adapt seamlessly.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {presetsList.map((preset) => (
            <button
              key={preset.id}
              onClick={() => setThemePreset(preset.id)}
              className={`p-4 rounded-xl border text-left transition-all relative ${
                activePreset === preset.id
                  ? 'border-indigo-500 ring-2 ring-indigo-500/20 shadow-md'
                  : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center space-x-3 mb-2">
                <span
                  className="w-5 h-5 rounded-full border border-slate-300 dark:border-slate-600 shadow-inner"
                  style={{ backgroundColor: preset.color }}
                />
                <span className="font-bold text-xs text-slate-900 dark:text-white">
                  {preset.name}
                </span>
              </div>
              <div
                className="w-full h-8 rounded-lg border border-slate-200/60 dark:border-slate-700 flex items-center justify-center text-[10px] text-slate-500 font-mono"
                style={{ backgroundColor: preset.bg }}
              >
                Canvas Background
              </div>
              {activePreset === preset.id && (
                <span className="absolute top-3 right-3 text-[10px] font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
                  Selected
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

