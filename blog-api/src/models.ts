export interface BlogPost {
    id: string;
    title: string;
    author: string;
    content: string;
    timestamp: number;
  }
  
  export interface Comment {
    id: string;
    postId?: string;
    commentId?: string;
    author: string;
    content: string;
    timestamp: number;
  }
  