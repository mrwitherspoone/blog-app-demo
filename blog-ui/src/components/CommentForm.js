import React, { useState } from 'react';
import axios from 'axios';

const CommentForm = ({ id, parentType, handleAddComment, setCommentsFresh }) => {
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newComment = {
            author,
            content,
        };

        let postURL = "";
        if (parentType === "blogPost") {
            postURL = `http://localhost:3000/posts/${id}/comments`;
        } else {
            postURL = `http://localhost:3000/comments/${id}/comments`;

        }

        await axios.post(postURL, newComment);

        setAuthor('');
        setContent('');
        handleAddComment();
        //setFresh(false);
        setCommentsFresh(false);
    };

    return (
        <div>
            <h3>Add a Comment</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="author">Author:</label>
                    <input
                        type="text"
                        id="author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="content">Content:</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Add Comment</button>
            </form>
        </div>
    );
};

export default CommentForm;
