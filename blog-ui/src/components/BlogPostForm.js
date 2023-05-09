import React, { useState } from 'react';
import axios from 'axios';

const BlogPostForm = ({ isFresh }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newPost = {
            title,
            author,
            content,
        };

        await axios.post('http://localhost:3000/posts', newPost);

        setTitle('');
        setAuthor('');
        setContent('');
        isFresh(false);
    };

    return (
        <div>
            <h2>Add a Blog Post</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
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
                <button type="submit">Add Blog Post</button>
            </form>
        </div>
    );
};

export default BlogPostForm;
