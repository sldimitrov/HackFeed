import type { Post } from '../types/post.ts';

export const mockPosts: Post[] = [
  {
    id: 1,
    content:
      'Despite our total project numbers only increasing by 2% compared to last month, the 58 projects we are working on contain a significant increase in deliverables.',
    created_at: new Date(Date.now() - 20 * 60 * 1000).toISOString(), // 20 minutes ago
    reactions: 4,
    user: {
      name: 'Daniel Goshev',
      title: 'Software Developer, HackSoft',
      avatar: 'https://i.pravatar.cc/150?img=10',
    },
  },
  {
    id: 2,
    content:
      'Excited to share that we just completed a huge migration project! 🎉 Amazing work by the whole team at HackSoft.',
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    reactions: 7,
    user: {
      name: 'Maria Dimitrova',
      title: 'Project Manager, HackSoft',
      avatar: 'https://i.pravatar.cc/150?img=15',
    },
  },
  {
    id: 3,
    content:
      'Working on performance improvements this week. Learned a lot about query optimization and caching.',
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    reactions: 2,
    user: {
      name: 'Nikolay Ivanov',
      title: 'Backend Engineer, HackSoft',
      avatar: 'https://i.pravatar.cc/150?img=12',
    },
  },
  {
    id: 4,
    content:
      'Working on performance improvements this week. Learned a lot about query optimization and caching.',
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    reactions: 2,
    user: {
      name: 'Nikolay Ivanov',
      title: 'Backend Engineer, HackSoft',
      avatar: 'https://i.pravatar.cc/150?img=12',
    },
  },
  {
    id: 5,
    content:
      'Working on performance improvements this week. Learned a lot about query optimization and caching.',
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    reactions: 2,
    user: {
      name: 'Nikolay Ivanov',
      title: 'Backend Engineer, HackSoft',
      avatar: 'https://i.pravatar.cc/150?img=12',
    },
  },
];
