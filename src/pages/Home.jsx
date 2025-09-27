import { useEffect, useState } from 'react';
import { api } from '../utils/api';
import { useAuth } from '../features/auth/AuthContext';
import PostCard from '../components/PostCards';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get('/posts?_author=true&_comments=true&_reactions=true', {
          headers: user ? {
            Authorization: `Bearer ${user.token}`
          } : {}
        });
        setPosts(res.data);
      } catch (err) {
        setError('Could not load posts. Are you logged in?');
      }
    };

    fetchPosts();
  }, [user]);

  return (
  <div className="container mt-4">
    <h2>Latest Posts</h2>
    {error && <div className="alert alert-danger">{error}</div>}

    <div className="row">
      {posts.map(post => (
        <div key={post.id} className="col-12 col-sm-6 col-lg-4 mb-4">
          <PostCard post={post} />
        </div>
      ))}
    </div>
  </div>
);
}
