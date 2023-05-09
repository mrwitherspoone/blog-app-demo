// src/commentController.ts

import { Request, Response } from "express";
import {
  getComments,
  getComment,
  createComment,
  updateComment,
  deleteComment,
  createCommentOnComment,
  getCommentComments,
} from "./dataAccess";

export async function getAllComments(req: Request, res: Response) {
  try {
    const comments = await getComments();
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

export async function getSingleComment(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const comment = await getComment(id);

    if (!comment) {
      res.status(404).json({ message: "Comment not found" });
    } else {
      res.json(comment);
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

export async function createNewComment(req: Request, res: Response) {
  try {
    const comment = req.body;
    const newComment = await createComment(comment);
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

export async function updateExistingComment(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const updatedComment = req.body;
    const comment = await updateComment(id, updatedComment);

    if (!comment) {
      res.status(404).json({ message: "Comment not found" });
    } else {
      res.json(comment);
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

export async function deleteSingleComment(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const success = await deleteComment(id);

    if (!success) {
      res.status(404).json({ message: "Comment not found" });
    } else {
      res.status(204).send();
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
}
export async function addCommentToComment(req: Request, res: Response) {
  try {
    const commentId = req.params.commentId;
    const comment = req.body;
    const newComment = await createCommentOnComment(commentId, comment);
    res.status(201).json(newComment);
  } catch (error) {
    res.status(404).json({ message: error });
  }
}
export async function getAllCommentComments(req: Request, res: Response) {
  try {
    const commentId = req.params.commentId;
    const allComments = await getCommentComments(commentId);
    res.status(201).json(allComments);
  } catch (error) {
    res.status(404).json({ message: error });
  }
}
