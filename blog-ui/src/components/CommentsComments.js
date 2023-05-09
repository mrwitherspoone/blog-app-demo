import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditCommentForm from './EditCommentForm';
import CommentComponent from './CommentComponent';

const CommentsComments = ({ id, level, setCommentsFresh }) => {
  const [comments, setComments] = useState([]);
  const [fresh, setFresh] = useState(false);
  const [edit, setEdit] = useState('');
  const apiSubPath = (level === 'blogPost') ? 'posts' : 'comments'

  useEffect(() => {
    const fetchComments = async () => {
      const result = await axios.get(`http://localhost:3000/${apiSubPath}/${id}/comments`);
      setComments(result.data);
    };

    fetchComments();
  }, [fresh, comments, id, apiSubPath]);

  const removeComment = async (id) => {
    await axios.delete(`http://localhost:3000/comments/${id}`)
      .catch((e) => { console.log(e) });
    setFresh(false);
    setCommentsFresh(false);

  };

  const handleEdit = (id) => {
    setEdit(id);
  };

  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment.id}>
          {edit !== comment.id && <CommentComponent comment={comment} handleEdit={handleEdit} removeComment={removeComment} setCommentsFresh={setCommentsFresh} />}
          {edit === comment.id && <EditCommentForm postId={comment.postId} commentId={comment.id} handleEdit={handleEdit} setCommentsFresh={setCommentsFresh} />}
          <CommentsComments key={comments} id={comment.id} level="comment" setCommentsFresh={setCommentsFresh} />
        </li>
      ))}
    </ul>
  );

};

export default CommentsComments;