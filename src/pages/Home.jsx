import { useEffect, useState } from 'react';
import { api } from '../utils/api';
import { useAuth } from '../features/auth/AuthContext';
import PostCard from '../components/PostCards';
import LandingPage from './LandingPage';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const [visibleCount, setVisibleCount] = useState(12);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    if (!user) return;

    const fetchPosts = async () => {
      try {
        const res = await api.get('/posts?_author=true&_comments=true&_reactions=true', {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });
        setPosts(res.data);
      } catch (err) {
        setError('Could not load posts. Are you logged in?');
      }
    };

    fetchPosts();
  }, [user]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

  if (!user) return <LandingPage />;

  return (
    <div className="container mt-4">
      <h2>Latest Posts</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row">
        {posts.slice(0, visibleCount).map(post => (
          <div key={post.id} className="col-md-6 col-lg-4 mb-4">
            <PostCard post={post} />
          </div>
        ))}
      </div>

      {visibleCount < posts.length && (
        <div className="text-center mb-4">
          <button className="btn btn-outline-primary" onClick={handleViewMore}>
            View More
          </button>
        </div>
      )}

      {showScrollTop && (
        <button
          className="btn btn-primary position-fixed bottom-0 end-0 m-4 rounded-circle shadow"
          style={{ zIndex: 1000 }}
          onClick={handleScrollTop}
          title="Back to top"
        >
          <i className="bi bi-arrow-up-circle fs-4"></i>
        </button>
      )}
    </div>
  );
}
