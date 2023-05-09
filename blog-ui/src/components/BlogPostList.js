import React, { useTransition, useState, useEffect } from 'react';
import axios from 'axios';
import BlogPostForm from './BlogPostForm';
import BlogPost from './BlogPost';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
const BlogPostList = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [fresh, setFresh] = useState(false);
  const [addPost, setAddPost] = useState(false);

  const [, startTransition] = useTransition();
  const [load, setLoad] = useState(false);

  const fetchBlogPosts = async () => {
    const result = await axios.get('http://localhost:3000/posts');
    setBlogPosts(result.data);
  };


  const handleLoad = (id) => {
    setLoad((current) => { if (current === id) { return false; } else { return id } });
  };
  const handleAddPost = () => {
    setAddPost((current) => !current);
  };


  useEffect(() => {
    fetchBlogPosts();
    setFresh(true);
    setAddPost(false);
  }, [fresh]);

  if (addPost) {
    return (<BlogPostForm isFresh={setFresh} />);
  } else {
    return (
      <div>
        <h2>Blog Posts</h2>
        <div role="button" className='display-5 font-weight-bold' onClick={() => { handleAddPost() }}>Add a post here!</div>
        <ul>
          {blogPosts.map((post) => (
            <li className="list-unstyled" key={post.id}>
              <div className='display-6 font-weight-bold'>
                <FontAwesomeIcon role="button" onClick={() => {
                  startTransition(() => {
                    handleLoad(post.id);
                  });
                }} icon={load === post.id ? faMinus : faPlus} />
                {post.title}</div>

              {load === post.id && <BlogPost key={blogPosts} postId={post.id} isFresh={setFresh} />}
            </li>

          ))}
        </ul>
      </div>
    );
  }
};

export default BlogPostList;
