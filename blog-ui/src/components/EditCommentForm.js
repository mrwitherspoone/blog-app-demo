import React, { useState, useEffect } from 'react';
import axios from 'axios';


const EditCommentForm = ({ postId, commentId, handleEdit, setCommentsFresh }) => {
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');
    const [fresh, setFresh] = useState(false);

    useEffect(() => {
        const fetchComment = async () => {

            const result = await axios.get(`http://localhost:3000/comments/${commentId}`);
            const { author, content } = result.data;
            setAuthor(author);
            setContent(content);
        };
        fetchComment();
    }, [postId, commentId, fresh]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedComment = {
            author,
            content,
        };

        await axios.put(`http://localhost:3000/comments/${commentId}`, updatedComment);
        handleEdit('');
        setFresh(false);
        setCommentsFresh(false);
    };

    return (
        <div>
            <h3>Edit Comment</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="author">Author:</label>
                    <input
                        type="text"
                        id="author"
                        defaultValue={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="content">Content:</label>
                    <textarea
                        id="content"
                        defaultValue={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default EditCommentForm;
