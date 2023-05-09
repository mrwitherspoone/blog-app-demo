import express from "express";
const router = express.Router();
export default router;

import * as blogPostController from "./blogPostController";
import * as commentController from "./commentController";
// ...

// BlogPost routes
router.get("/posts", blogPostController.getAllPosts);
router.get("/posts/:id", blogPostController.getSinglePost);
router.post("/posts", blogPostController.createNewPost);
router.put("/posts/:id", blogPostController.updateExistingPost);
router.delete("/posts/:id", blogPostController.deleteSinglePost);
router.post("/posts/:postId/comments", blogPostController.addCommentToPost);
router.get("/posts/:postId/comments", blogPostController.getAllPostComments)
// Comment routes
router.get("/comments", commentController.getAllComments);
router.get("/comments/:id", commentController.getSingleComment);
router.post("/comments", commentController.createNewComment);
router.put("/comments/:id", commentController.updateExistingComment);
router.delete("/comments/:id", commentController.deleteSingleComment);
router.post("/comments/:commentId/comments", commentController.addCommentToComment);
router.get("/comments/:commentId/comments", commentController.getAllCommentComments);
