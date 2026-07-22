export type PlatformType = 'facebook' | 'instagram' | 'linkedin' | 'twitter';

export type AgentType =
  | 'campaign'
  | 'trend'
  | 'content'
  | 'image'
  | 'approval'
  | 'scheduler'
  | 'publisher'
  | 'analytics'
  | 'learning';

export type AgentStatus = 'idle' | 'running' | 'succeeded' | 'needs_approval' | 'failed' | 'rejected';

export interface AgentStep {
  id: AgentType;
  name: string;
  role: string;
  description: string;
  iconName: string;
  status: AgentStatus;
  logs: string[];
  output?: Record<string, any>;
  durationMs?: number;
}

export interface Project {
  id: string;
  name: string;
  logo: string;
  industry: string;
  brandVoice: string; // e.g. "Professional & Authoritative", "Playful & Trendy", "Inspirational & Bold"
  targetAudience: string;
  activePlatforms: PlatformType[];
  colorTheme: string; // Hex or theme color name
  customRules: string[];
  createdAt: string;
  totalPosts: number;
  totalReach: number;
  avgEngagement: number;
}

export interface PostItem {
  id: string;
  projectId: string;
  projectName: string;
  runId?: string;
  platform: PlatformType;
  title: string;
  content: string;
  mediaUrl?: string;
  mediaPrompt?: string;
  hashtags: string[];
  callToAction: string;
  scheduledTime: string;
  status: 'draft' | 'scheduled' | 'published';
  postId?: string; // Stored platform Post ID e.g. FB-8924019
  publicUrl?: string; // Stored public URL e.g. https://facebook.com/post/FB-8924019
  publishedAt?: string;
  metrics?: {
    likes: number;
    shares: number;
    comments: number;
    clicks: number;
    impressions: number;
    engagementRate: number;
  };
}

export interface OrchestrationRun {
  id: string;
  projectId: string;
  projectName: string;
  goal: string;
  prompt: string;
  targetPlatforms: PlatformType[];
  status: 'running' | 'waiting_approval' | 'completed' | 'failed' | 'regenerating';
  currentStepIndex: number;
  steps: AgentStep[];
  feedbackHistory: string[];
  resultPosts?: PostItem[];
  createdAt: string;
  completedAt?: string;
}

export interface RAGMemoryEntry {
  id: string;
  projectId: string;
  topic: string;
  insight: string;
  performanceScore: number; // 0 - 100
  tags: string[];
  sourceCampaign?: string;
  createdAt: string;
}

export interface ApiKeyConfig {
  geminiKey: string;
  fbToken: string;
  igToken: string;
  linkedinToken: string;
  xToken: string;
  ragSearchKey: string;
  useServerGeminiKey: boolean;
}

export type ThemePreset = 'indigo' | 'emerald' | 'violet' | 'crimson' | 'teal' | 'obsidian';

export interface ThemeConfig {
  preset: ThemePreset;
  primaryColor: string;
  primaryBg: string;
  accentBg: string;
  isDark: boolean;
}

export interface ApprovalDecision {
  approved: boolean;
  score: number; // 0 - 100
  brandSafety: 'pass' | 'flagged';
  toneMatch: 'high' | 'medium' | 'low';
  feedback?: string;
}
