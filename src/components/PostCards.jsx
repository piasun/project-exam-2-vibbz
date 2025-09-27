import { Link } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthContext';
import { api } from '../utils/api';
import { useState } from 'react';

export default function PostCard({ post }) {
  const { user } = useAuth();
  const [reactionMsg, setReactionMsg] = useState('');

  const handleReact = async (symbol) => {
    if (!user) {
      setReactionMsg('Login required');
      return;
    }

    try {
      await api.put(`/posts/${post.id}/react/${symbol}`, {}, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setReactionMsg(`You reacted with ${symbol}`);
    } catch (err) {
      setReactionMsg('Failed to react');
    }

    setTimeout(() => setReactionMsg(''), 2000); // fjerner melding etter 2 sek
  };

  const emojis = ['👍', '❤️', '😂', '😮', '😢'];

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">{post.title}</h5>
        <p className="card-text">{post.body}</p>

        {post.media && (
          <img
            src={post.media}
            alt={post.title}
            className="img-fluid rounded mb-3"
          />
        )}

        <p className="text-muted small">
          Author: <strong>{post.author?.name}</strong>
        </p>

        <Link to={`/posts/${post.id}`} className="btn btn-outline-primary btn-sm me-2">
          View Post
        </Link>

        <div className="mt-3">
          {emojis.map((emoji) => (
            <button
              key={emoji}
              onClick={() => handleReact(emoji)}
              className="btn btn-sm btn-light me-1"
            >
              {emoji}
            </button>
          ))}
          {reactionMsg && (
            <span className="ms-2 text-muted small">{reactionMsg}</span>
          )}
        </div>
      </div>
    </div>
  );
}
