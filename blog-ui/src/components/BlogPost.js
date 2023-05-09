import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import CommentForm from './CommentForm';
import CommentsComments from './CommentsComments';
import TimeComponent from './TimeComponent'

const BlogPost = ({ postId, isFresh }) => {
  const [blogPost, setBlogPost] = useState('');
  const [fresh, setFresh] = useState(false);
  const [commentsFresh, setCommentsFresh] = useState(true);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [edit, setEdit] = useState(false);
  const [addComment, setAddComment] = useState(false);



  useEffect(() => {
    const fetchBlogPost = async (postId) => {
      const result = await axios.get(`http://localhost:3000/posts/${postId}`)
        .catch((e) => { });
      if (result) {
        setBlogPost(result.data);
        setTitle(blogPost.title);
        setAuthor(blogPost.author);
        setContent(blogPost.content);
      }
    };
    fetchBlogPost(postId);
    setFresh(true);
  }, [postId, fresh, blogPost.title, blogPost.author, blogPost.content]);

  if (!blogPost) {
    return <div>Loading...</div>;
  }
  const handleEdit = () => {
    setEdit((current) => !current);
  };
  const handleAddComment = () => {
    setAddComment((current) => !current);
  };
  const removeBlogPost = async () => {
    await axios.delete(`http://localhost:3000/posts/${postId}`)
      .catch((e) => { console.log(e) });
    isFresh(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedPost = {
      title,
      author,
      content,
    };
    await axios.put(`http://localhost:3000/posts/${postId}`, updatedPost).then(handleEdit())
      .catch((e) => { console.log(e) });
    setFresh(false);
    isFresh(false);
  };


  if (!edit) {
    return (
      <div>
        <div className='display-7 font-weight-bold'>{blogPost.content}</div>
        <div role="button" className="cursor-pointer">
          <FontAwesomeIcon id='blog-post-edit' icon={faPencil} onClick={() => { handleEdit() }} />
          <FontAwesomeIcon id='blog-post-del' icon={faTrash} onClick={() => { removeBlogPost() }} />
        </div>
        <div>by: <span className='font-italic'>{blogPost.author}</span> <br /> <TimeComponent time={blogPost.timestamp} /></div>
        <div role="button" onClick={() => handleAddComment()}>add comment</div>

        {addComment && <CommentForm id={blogPost.id} parentType={"blogPost"} handleAddComment={handleAddComment} setFresh={setFresh} setCommentsFresh={setCommentsFresh} />}
        <ul>
          <CommentsComments key={commentsFresh} id={postId} level="blogPost" setCommentsFresh={setCommentsFresh} />

        </ul>
      </div>
    );
  } else {
    return (
      <div>
        <h2>Edit Blog Post</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              defaultValue={blogPost.title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="author">Author:</label>
            <input
              type="text"
              id="author"
              defaultValue={blogPost.author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="content">Content:</label>
            <textarea
              id="content"
              defaultValue={blogPost.content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <button type="submit">Save Changes</button>
        </form>
      </div>
    );
  }
};

export default BlogPost;