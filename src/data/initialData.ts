import { Project, PostItem, RAGMemoryEntry, OrchestrationRun, ApiKeyConfig } from '../types';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-apex-tech',
    name: 'Apex AI Cloud Solutions',
    logo: '⚡',
    industry: 'Enterprise Software / SaaS',
    brandVoice: 'Authoritative, Visionary & Data-Driven',
    targetAudience: 'CTOs, Tech Leads, Engineering Directors & Enterprise Architects',
    activePlatforms: ['linkedin', 'twitter', 'facebook'],
    colorTheme: '#4f46e5',
    customRules: [
      'Always highlight developer ROI & security compliance',
      'Never use informal slang or overly casual emojis',
      'Include a direct link to book a free live demo'
    ],
    createdAt: '2026-01-15T08:00:00Z',
    totalPosts: 28,
    totalReach: 142000,
    avgEngagement: 4.8,
  },
  {
    id: 'proj-ecoflora',
    name: 'EcoFlora Sustainable Goods',
    logo: '🌱',
    industry: 'Eco-Friendly Consumer Goods',
    brandVoice: 'Warm, Authentic, Earthy & Educational',
    targetAudience: 'Eco-conscious Millennials, Zero-waste Enthusiasts & Homeowners',
    activePlatforms: ['instagram', 'facebook', 'twitter'],
    colorTheme: '#059669',
    customRules: [
      'Emphasize 100% plastic-free and biodegradable materials',
      'Use vibrant natural imagery prompts',
      'Include eco-tip hashtag clusters'
    ],
    createdAt: '2026-02-01T10:30:00Z',
    totalPosts: 42,
    totalReach: 210000,
    avgEngagement: 6.2,
  },
  {
    id: 'proj-nova-fitness',
    name: 'Nova Pulse Fitness & Wellness',
    logo: '🔥',
    industry: 'Health, Boutique Fitness & Wearables',
    brandVoice: 'High Energy, Motivational, Direct & Inspiring',
    targetAudience: 'Fitness enthusiasts, busy professionals & biohackers aged 22-45',
    activePlatforms: ['instagram', 'twitter', 'facebook', 'linkedin'],
    colorTheme: '#e11d48',
    customRules: [
      'Always start with a high-impact hook line',
      'Focus on tangible habit transformations',
      'Include a call to action to start a 7-day free trial'
    ],
    createdAt: '2026-03-10T12:00:00Z',
    totalPosts: 35,
    totalReach: 185000,
    avgEngagement: 5.4,
  }
];

export const INITIAL_RAG_MEMORIES: RAGMemoryEntry[] = [
  {
    id: 'rag-1',
    projectId: 'proj-apex-tech',
    topic: 'Hook Performance in LinkedIn Posts',
    insight: 'Posts starting with benchmark statistics (e.g., "73% of cloud deployments failure rate...") saw 2.4x higher click-through rates than general feature announcements.',
    performanceScore: 92,
    tags: ['LinkedIn', 'B2B Hook', 'ROI Statistics'],
    sourceCampaign: 'Q1 Cloud Security Benchmarks',
    createdAt: '2026-06-15T10:00:00Z'
  },
  {
    id: 'rag-2',
    projectId: 'proj-apex-tech',
    topic: 'Optimal Posting Window',
    insight: 'Tuesday & Thursday morning slots at 08:30 AM EST yield maximum developer comments and reposts on X/Twitter.',
    performanceScore: 88,
    tags: ['Schedule Optimization', 'Twitter/X'],
    sourceCampaign: 'DevOps Masterclass Series',
    createdAt: '2026-06-20T14:30:00Z'
  },
  {
    id: 'rag-3',
    projectId: 'proj-ecoflora',
    topic: 'Carousel vs Single Image Engagement',
    insight: 'Instagram 5-slide visual guides explaining "5 Simple Plastic Swaps for your Kitchen" achieved 310% more saves than static product photos.',
    performanceScore: 96,
    tags: ['Instagram', 'Carousel format', 'Zero-waste Tips'],
    sourceCampaign: 'Earth Month Plastic Swaps',
    createdAt: '2026-06-02T11:15:00Z'
  },
  {
    id: 'rag-4',
    projectId: 'proj-nova-fitness',
    topic: 'Video/Reels Audio Hooks',
    insight: 'Short fast-paced video captions pairing high-tempo music prompts with short bold workout tips increased story swipe-ups by 45%.',
    performanceScore: 90,
    tags: ['Reels', 'Short Video', 'Workout Hooks'],
    sourceCampaign: 'Summer Body Reboot Challenge',
    createdAt: '2026-07-01T09:00:00Z'
  }
];

export const INITIAL_POSTS: PostItem[] = [
  {
    id: 'post-101',
    projectId: 'proj-apex-tech',
    projectName: 'Apex AI Cloud Solutions',
    platform: 'linkedin',
    title: 'Autonomous AI Cloud Orchestration Blueprint',
    content: '🚀 The future of DevOps is autonomous. 73% of modern engineering teams lose 15+ hours weekly managing manual cloud deployments.\n\nWith Apex Cloud AI, your infrastructure automatically scales, heals, and optimizes cost based on real-time traffic surges.\n\nKey Benefits:\n• 99.999% Zero-downtime auto-healing\n• 40% reduction in monthly cloud expenditure\n• SOC2 & HIPAA compliant out of the box\n\nIs your cloud stack ready for 2026? Comment "blueprints" below to receive our free Enterprise Architecture Whitepaper!',
    hashtags: ['DevOps', 'CloudArchitecture', 'AIAutomation', 'TechLeadership'],
    callToAction: 'Book a 15-minute Executive Demo at apex.ai/demo',
    scheduledTime: '2026-07-22T09:00:00Z',
    status: 'published',
    postId: 'LI-98234021',
    publicUrl: 'https://linkedin.com/feed/update/urn:li:activity:98234021',
    publishedAt: '2026-07-22T09:00:00Z',
    mediaUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    metrics: {
      likes: 342,
      shares: 89,
      comments: 41,
      clicks: 1250,
      impressions: 18400,
      engagementRate: 5.2
    }
  },
  {
    id: 'post-102',
    projectId: 'proj-apex-tech',
    projectName: 'Apex AI Cloud Solutions',
    platform: 'twitter',
    title: 'Stop hardcoding environment variables in production',
    content: 'Stop hardcoding environment variables in production pipelines. 🛑\n\nHere are 3 security rules we enforce in every Apex AI cluster:\n\n1. Dynamic key injection at execution time\n2. Micro-grained IAM role scoping\n3. Instant key rotation upon anomaly detection\n\nThread below 🧵👇',
    hashtags: ['DevSecOps', 'CyberSecurity', 'BuildInPublic'],
    callToAction: 'Read the full security teardown at apex.ai/security',
    scheduledTime: '2026-07-22T14:30:00Z',
    status: 'published',
    postId: 'X-1892039120',
    publicUrl: 'https://x.com/ApexAICloud/status/1892039120',
    publishedAt: '2026-07-22T14:30:00Z',
    mediaUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    metrics: {
      likes: 512,
      shares: 140,
      comments: 29,
      clicks: 890,
      impressions: 24500,
      engagementRate: 6.1
    }
  },
  {
    id: 'post-103',
    projectId: 'proj-ecoflora',
    projectName: 'EcoFlora Sustainable Goods',
    platform: 'instagram',
    title: 'Zero Waste Kitchen Transformation',
    content: 'Small daily swaps lead to massive environmental impact. 🍃\n\nSwipe through to see how swapping plastic cling wrap for organic beeswax wraps can save 500+ feet of plastic waste per household every year.\n\nMade with 100% GOTS certified cotton & ethically sourced honeybee wax. 🍯',
    hashtags: ['ZeroWasteHome', 'EcoFriendlyLiving', 'SustainableKitchen', 'EcoFlora'],
    callToAction: 'Shop our Zero Waste Starter Kit in bio 🌿',
    scheduledTime: '2026-07-23T11:00:00Z',
    status: 'scheduled',
    postId: 'IG-773910283',
    publicUrl: 'https://instagram.com/p/IG773910283',
    mediaUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    metrics: {
      likes: 1240,
      shares: 310,
      comments: 87,
      clicks: 430,
      impressions: 31200,
      engagementRate: 6.8
    }
  },
  {
    id: 'post-104',
    projectId: 'proj-nova-fitness',
    projectName: 'Nova Pulse Fitness & Wellness',
    platform: 'facebook',
    title: '5 AM Morning Momentum Routine',
    content: 'Win your morning, dominate your week. 💪\n\nMost people wait for motivation. Athletes build momentum.\n\nHere is our 20-minute bodyweight morning starter designed by Nova trainers:\n1. 40s Jumping Jacks\n2. 40s Bodyweight Squats\n3. 40s High Knees\n4. 40s Plank Hold\n(Repeat x 3 sets!)\n\nTag a gym partner who needs to see this workout today!',
    hashtags: ['MorningRoutine', 'FitnessMotivation', 'NovaPulse', 'HIITWorkout'],
    callToAction: 'Claim your 7-day free pass at novapulse.fit',
    scheduledTime: '2026-07-24T06:30:00Z',
    status: 'scheduled',
    postId: 'FB-449102381',
    publicUrl: 'https://facebook.com/novapulse/posts/FB-449102381',
    mediaUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    metrics: {
      likes: 890,
      shares: 195,
      comments: 64,
      clicks: 520,
      impressions: 19800,
      engagementRate: 5.8
    }
  }
];

export const INITIAL_API_KEYS: ApiKeyConfig = {
  geminiKey: '',
  fbToken: '',
  igToken: '',
  linkedinToken: '',
  xToken: '',
  ragSearchKey: '',
  useServerGeminiKey: true
};
