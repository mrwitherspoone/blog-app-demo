import React, { useState } from 'react';

import TimeComponent from './TimeComponent'
import CommentForm from './CommentForm';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";

const CommentComponent = ({ comment, handleEdit, removeComment, setCommentsFresh }) => {
    const [addComment, setAddComment] = useState(false);

    const handleAddComment = () => {
        setAddComment((current) => !current);
    };
    return (
        <><p>{comment.content}</p><small>by: {comment.author} <br /> <TimeComponent time={comment.timestamp} /> </small><div role="button" className="cursor-pointer">
            <FontAwesomeIcon id='blog-post-edit' icon={faPencil} onClick={() => { handleEdit(comment.id) }} />
            <FontAwesomeIcon id='blog-post-del' icon={faTrash} onClick={() => { removeComment(comment.id) }} />
        </div><div role="button" onClick={() => handleAddComment()}>add comment</div>
            {addComment && <CommentForm id={comment.id} parentType={"comment"} setCommentsFresh={setCommentsFresh} handleAddComment={handleAddComment} />}
        </>
    );
}

export default CommentComponent;
