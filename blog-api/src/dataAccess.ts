import { BlogPost, Comment } from "./models";
import * as jsonfile from "jsonfile";
import { v4 as uuidv4 } from "uuid";

const postsFile = "./src/data/posts.json";
const commentsFile = "./src/data/comments.json";

// export async function initializeDataFiles(){
//     await jsonfile.writeFile(commentsFile, "[]");
//     await jsonfile.writeFile(postsFile, "[]");
// }


export async function createCommentOnPost(postId: string, comment: Comment): Promise<Comment> {
  const post: BlogPost | undefined = await getPost(postId);

  if (!post) {
    throw new Error("Post not found");
  }

  const newComment: Comment = {
    ...comment,
    id: uuidv4(),
    postId: postId,
    timestamp: Date.now(),
  };

  const comments: Comment[] = await jsonfile.readFile(commentsFile);
  comments.push(newComment);
  await jsonfile.writeFile(commentsFile, comments, { spaces: 2 });

  return newComment;
}

export async function createCommentOnComment(commentId: string, comment: Comment): Promise<Comment> {
  const parentComment: Comment | undefined = await getComment(commentId);

  if (!parentComment) {
    throw new Error("Parent comment not found");
  }

  const newComment: Comment = {
    ...comment,
    id: uuidv4(),
    commentId: commentId,
    timestamp: Date.now(),
  };

  const comments: Comment[] = await jsonfile.readFile(commentsFile);
  comments.push(newComment);
  await jsonfile.writeFile(commentsFile, comments, { spaces: 2 });

  return newComment;
}
export async function getPosts(): Promise<BlogPost[]> {
  const posts: BlogPost[] = await jsonfile.readFile(postsFile);
  return posts;
}

export async function getPost(id: string): Promise<BlogPost | undefined> {
  const posts: BlogPost[] = await jsonfile.readFile(postsFile);
  return posts.find((post) => post.id === id);
}

export async function createPost(post: BlogPost): Promise<BlogPost> {
  const newPost: BlogPost = {
    ...post,
    id: uuidv4(),
    timestamp: Date.now(),
  };

  const posts: BlogPost[] = await jsonfile.readFile(postsFile).
    catch(error => console.error(error));
  posts.push(newPost);
  await jsonfile.writeFile(postsFile, posts, { spaces: 2 });
  return newPost;
}

export async function updatePost(id: string, updatedPost: Partial<BlogPost>): Promise<BlogPost | undefined> {
  const posts: BlogPost[] = await jsonfile.readFile(postsFile);
  const postIndex = posts.findIndex((post) => post.id === id);

  if (postIndex === -1) {
    return undefined;
  }

  const currentPost = posts[postIndex];
  const newPost = { ...currentPost, ...updatedPost };
  posts[postIndex] = newPost;

  await jsonfile.writeFile(postsFile, posts, { spaces: 2 }).
    then((newPost) => { return newPost }).
    catch(error => console.error(error));
  return newPost;
}

export async function deletePost(id: string): Promise<boolean> {
  const posts: BlogPost[] = await jsonfile.readFile(postsFile);
  const postIndex = posts.findIndex((post) => post.id === id);

  if (postIndex === -1) {
    return false;
  }

  posts.splice(postIndex, 1);
  await jsonfile.writeFile(postsFile, posts, { spaces: 2 });
  return true;
}

export async function getPostComments(id: string): Promise<Comment[]> {
  const comments: Comment[] = await jsonfile.readFile(commentsFile);
  return comments.filter((comment) => comment.postId === id);
}


export async function getComments(): Promise<Comment[]> {
  const comments: Comment[] = await jsonfile.readFile(commentsFile);
  return comments;
}

export async function getComment(id: string): Promise<Comment | undefined> {
  const comments: Comment[] = await jsonfile.readFile(commentsFile);
  return comments.find((comment) => comment.id === id);
}

export async function createComment(comment: Comment): Promise<Comment> {
  const newComment: Comment = {
    ...comment,
    id: uuidv4(),
    timestamp: Date.now(),
  };

  const comments: Comment[] = await jsonfile.readFile(commentsFile);
  comments.push(newComment);
  await jsonfile.writeFile(commentsFile, comments, { spaces: 2 });

  return newComment;
}

export async function updateComment(id: string, updatedComment: Partial<Comment>): Promise<Comment | undefined> {
  const comments: Comment[] = await jsonfile.readFile(commentsFile);
  const commentIndex = comments.findIndex((comment) => comment.id === id);

  if (commentIndex === -1) {
    return undefined;
  }

  const currentComment = comments[commentIndex];
  const newComment = { ...currentComment, ...updatedComment };
  comments[commentIndex] = newComment;

  await jsonfile.writeFile(commentsFile, comments, { spaces: 2 });

  return newComment;
}

export async function deleteComment(id: string): Promise<boolean> {
  const comments: Comment[] = await jsonfile.readFile(commentsFile);
  const commentIndex = comments.findIndex((comment) => comment.id === id);

  if (commentIndex === -1) {
    return false;
  }

  comments.splice(commentIndex, 1);
  await jsonfile.writeFile(commentsFile, comments, { spaces: 2 });

  return true;
}

async function deletePostComments(id: string): Promise<boolean> {
  //TODO: delete all the comments when you delete a post
  return true;
}

async function deleteCommentComments(id: string): Promise<boolean> {
  //TODO: delete all the comments when you delete a comment
  return true;
}

export async function getCommentComments(id: string): Promise<Comment[]> {
  const comments: Comment[] = await jsonfile.readFile(commentsFile);
  return comments.filter((comment) => comment.commentId === id);
}