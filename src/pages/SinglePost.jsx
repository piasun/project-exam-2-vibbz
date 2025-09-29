import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '../utils/api';
import { useAuth } from '../features/auth/AuthContext';

export default function SinglePost() {
  const { id } = useParams();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(
          `/posts/${id}?_author=true&_comments=true&_reactions=true`,
          {
            headers: user ? {
              Authorization: `Bearer ${user.token}`,
            } : {},
          }
        );
        setPost(res.data);
      } catch (err) {
        setError('Could not load post');
      }
    };

    if (user) {
      fetchPost();
    }
  }, [id, user]);

  const addComment = (newComment) => {
    setPost((prev) => ({
      ...prev,
      comments: [...prev.comments, newComment],
    }));
  };

  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!post) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <h2>{post.title}</h2>
      <p>By: {post.author?.name}</p>
      {post.media && (
        <img
          src={post.media}
          alt={post.title}
          className="img-fluid mb-3 rounded"
        />
      )}
      <p>{post.body}</p>

      <hr />

      <h5>Comments</h5>
      {post.comments?.length > 0 ? (
        <ul className="list-group mb-3">
          {post.comments.map((c) => (
            <li key={c.id} className="list-group-item">{c.body}</li>
          ))}
        </ul>
      ) : (
        <p>No comments yet</p>
      )}

      {user && <CommentForm postId={post.id} onNewComment={addComment} />}
    </div>
  );
}

// 🔽

function CommentForm({ postId, onNewComment }) {
  const { user } = useAuth();
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.post(
        `/posts/${postId}/comment`,
        { body: comment },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setComment('');
      onNewComment(response.data);
    } catch (err) {
      setError('Could not post comment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        className="form-control mb-2"
        placeholder="Write a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
      />
      <button className="btn btn-primary btn-sm" disabled={loading}>
        {loading ? 'Posting...' : 'Add Comment'}
      </button>
      {error && <div className="text-danger mt-2">{error}</div>}
    </form>
  );
}
