import React, { useState } from 'react';
import { useProject } from '../../context/ProjectContext';
import { useTheme } from '../../context/ThemeContext';
import {
  FileText,
  Search,
  Filter,
  ExternalLink,
  ThumbsUp,
  MessageSquare,
  Share2,
  Heart,
  Repeat2,
  Bookmark,
  MoreHorizontal,
  CheckCircle2,
  Globe,
  X as CloseIcon,
  Edit2,
  Trash2,
  Send,
  Calendar,
} from 'lucide-react';
import { PostItem, PlatformType } from '../../types';

export const PostStudioPage: React.FC = () => {
  const { posts, activeProject, updatePost, deletePost } = useProject();
  const { themeConfig } = useTheme();

  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewingPublicPost, setViewingPublicPost] = useState<PostItem | null>(null);
  const [editingPost, setEditingPost] = useState<PostItem | null>(null);

  const filteredPosts = posts.filter((p) => {
    if (p.projectId !== activeProject.id) return false;
    if (selectedPlatform !== 'all' && p.platform !== selectedPlatform) return false;
    if (selectedStatus !== 'all' && p.status !== selectedStatus) return false;
    if (
      searchQuery &&
      !p.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !p.content.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const handlePublishNow = (post: PostItem) => {
    const postId = `${post.platform.toUpperCase()}-${Math.floor(10000000 + Math.random() * 90000000)}`;
    updatePost(post.id, {
      status: 'published',
      postId,
      publicUrl: `https://${post.platform}.com/post/${postId}`,
      publishedAt: new Date().toISOString(),
    });
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
              <FileText className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              Content Hub & Post Studio
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Manage multi-platform posts, inspect live previews, edit copy, and access stored Post IDs & Public URLs.
          </p>
        </div>

        <div className="text-xs font-semibold text-slate-600 dark:text-slate-300">
          Showing <span className="text-indigo-600 dark:text-indigo-400 font-bold">{filteredPosts.length}</span> posts for {activeProject.name}
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-700 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search post copy or hashtags..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Platform Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {['all', 'facebook', 'instagram', 'linkedin', 'twitter'].map((platform) => (
            <button
              key={platform}
              onClick={() => setSelectedPlatform(platform)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                selectedPlatform === platform
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              {platform}
            </button>
          ))}
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <SocialPostCard
              key={post.id}
              post={post}
              project={activeProject}
              onPublishNow={() => handlePublishNow(post)}
              onViewPublic={() => setViewingPublicPost(post)}
              onEdit={() => setEditingPost(post)}
              onDelete={() => deletePost(post.id)}
            />
          ))
        ) : (
          <div className="col-span-full py-12 text-center bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-400 text-xs">
            No posts found matching the active filters.
          </div>
        )}
      </div>

      {/* Public Post Viewer Modal */}
      {viewingPublicPost && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-lg w-full p-6 border border-slate-200 dark:border-slate-700 shadow-2xl relative space-y-4">
            <button
              onClick={() => setViewingPublicPost(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-500 hover:text-slate-900"
            >
              <CloseIcon className="w-4 h-4" />
            </button>

            <div className="flex items-center space-x-2 pb-3 border-b border-slate-100 dark:border-slate-700">
              <Globe className="w-5 h-5 text-indigo-500" />
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  Stored Public Post Link Viewer
                </h3>
                <p className="text-xs text-slate-500 font-mono">{viewingPublicPost.publicUrl}</p>
              </div>
            </div>

            <SocialPostCard post={viewingPublicPost} project={activeProject} isPreviewOnly />

            <div className="flex items-center justify-between pt-2 text-xs">
              <span className="text-slate-400 font-mono">Post ID: {viewingPublicPost.postId}</span>
              <a
                href={viewingPublicPost.publicUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold flex items-center space-x-1.5"
              >
                <span>Open in New Window</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Edit Post Modal */}
      {editingPost && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-lg w-full p-6 border border-slate-200 dark:border-slate-700 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center space-x-2">
                <Edit2 className="w-4 h-4 text-indigo-500" />
                <span>Edit Post Content</span>
              </h3>
              <button
                onClick={() => setEditingPost(null)}
                className="p-1 rounded bg-slate-100 dark:bg-slate-700 text-slate-500"
              >
                <CloseIcon className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Post Title
                </label>
                <input
                  type="text"
                  value={editingPost.title}
                  onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Post Copy
                </label>
                <textarea
                  value={editingPost.content}
                  onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                  className="w-full h-32 p-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => setEditingPost(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-600"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  updatePost(editingPost.id, editingPost);
                  setEditingPost(null);
                }}
                className="px-5 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Social Post Card supporting realistic previews for FB, IG, LinkedIn, Twitter
interface SocialPostCardProps {
  post: PostItem;
  project: any;
  isPreviewOnly?: boolean;
  onPublishNow?: () => void;
  onViewPublic?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

const SocialPostCard: React.FC<SocialPostCardProps> = ({
  post,
  project,
  isPreviewOnly = false,
  onPublishNow,
  onViewPublic,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-sm overflow-hidden flex flex-col justify-between">
      {/* Top Author Bar */}
      <div className="p-4 border-b border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-lg font-bold">
            {project.logo}
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-bold text-xs text-slate-900 dark:text-white">
                {project.name}
              </span>
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 fill-blue-500/20" />
            </div>
            <div className="text-[10px] text-slate-400 flex items-center space-x-2">
              <span className="capitalize font-semibold text-indigo-600 dark:text-indigo-400">
                {post.platform}
              </span>
              <span>•</span>
              <span>{new Date(post.scheduledTime).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {!isPreviewOnly && (
          <div className="flex items-center space-x-1">
            <button
              onClick={onEdit}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
              title="Edit Post"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onDelete}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30"
              title="Delete Post"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Post Media Banner if present */}
      {post.mediaUrl && (
        <div className="w-full h-44 bg-slate-100 dark:bg-slate-900 overflow-hidden relative">
          <img
            src={post.mediaUrl}
            alt="Generated Banner"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Main Content Body */}
      <div className="p-4 space-y-3">
        <h4 className="font-bold text-xs text-slate-900 dark:text-white">{post.title}</h4>
        <p className="text-xs text-slate-700 dark:text-slate-200 whitespace-pre-wrap leading-relaxed font-sans">
          {post.content}
        </p>

        {/* Hashtags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {post.hashtags.map((tag, idx) => (
            <span
              key={idx}
              className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-2 py-0.5 rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom Footer & Platform Actions */}
      <div className="p-4 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-100 dark:border-slate-700/60 space-y-3">
        {/* Engagement Stats Bar */}
        <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
          <div className="flex items-center space-x-3">
            <span className="flex items-center space-x-1">
              <ThumbsUp className="w-3.5 h-3.5 text-blue-500" />
              <span>{post.metrics?.likes || 0}</span>
            </span>
            <span className="flex items-center space-x-1">
              <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
              <span>{post.metrics?.comments || 0}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Share2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>{post.metrics?.shares || 0}</span>
            </span>
          </div>

          <span className="font-mono text-[10px] text-slate-400">
            ID: <strong className="text-slate-700 dark:text-slate-300">{post.postId || 'Pending'}</strong>
          </span>
        </div>

        {/* Control Buttons */}
        {!isPreviewOnly && (
          <div className="flex items-center justify-between pt-1">
            {post.status === 'published' ? (
              <button
                onClick={onViewPublic}
                className="px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 text-xs font-bold hover:bg-indigo-100 flex items-center space-x-1"
              >
                <span>View Stored Public URL</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={onPublishNow}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center space-x-1"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Simulate Instant Publish</span>
              </button>
            )}

            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
              {post.status}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
