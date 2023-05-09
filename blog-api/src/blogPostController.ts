// src/blogPostController.ts

import { Request, Response } from "express";
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  createCommentOnPost,
  getPostComments,
} from "./dataAccess";

export async function getAllPosts(req: Request, res: Response) {
  try {
    const posts = await getPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

export async function getSinglePost(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const post = await getPost(id);

    if (!post) {
      res.status(404).json({ message: "Post not found" });
    } else {
      res.json(post);
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

export async function createNewPost(req: Request, res: Response) {
  try {
    const post = req.body;
    const newPost = await createPost(post);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

export async function updateExistingPost(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const updatedPost = req.body;
    const post = await updatePost(id, updatedPost);

    if (!post) {
      res.status(404).json({ message: "Post not found" });
    } else {
      res.json(post);
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

export async function deleteSinglePost(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const success = await deletePost(id);

    if (!success) {
      res.status(404).json({ message: "Post not found" });
    } else {
      res.status(204).send();
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

export async function addCommentToPost(req: Request, res: Response) {
  try {
    const postId = req.params.postId;
    const comment = req.body;
    const newComment = await createCommentOnPost(postId, comment);
    res.status(201).json(newComment);
  } catch (error) {
    res.status(404).json({ message: error });
  }
}

export async function getAllPostComments(req: Request, res: Response) {
  try {
    const postId = req.params.postId;
    const allComments = await getPostComments(postId);
    res.status(201).json(allComments);
  } catch (error) {
    res.status(404).json({ message: error });
  }
}