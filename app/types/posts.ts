export interface Post {
  id: string;
  content: string;
  author: {
    name: string;
    username: string;
    avatar: string;
  };
  likes: number;
  comments: number;
  shares: number;
  upvotes: number;
  downvotes: number;
  timestamp: string;
  community: string;
  folder?: string;
}
