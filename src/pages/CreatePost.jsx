import { useState } from 'react';
import { api } from '../utils/api';
import { useAuth } from '../features/auth/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function CreatePost() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [media, setMedia] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/posts', { title, body, media }, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      navigate('/');
    } catch {
      alert('Error creating post');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
        <textarea className="form-control mb-2" placeholder="Body" value={body} onChange={e => setBody(e.target.value)} required />
        <input className="form-control mb-2" placeholder="Media URL" value={media} onChange={e => setMedia(e.target.value)} />
        <button className="btn btn-success">Post</button>
      </form>
      {(title || body || media) && (
        <>
          <h5 className="mt-5">Preview</h5>
          <div className="card h-100 shadow-sm mt-3">
            {media && (
              <img
                src={media}
                alt="Preview"
                className="card-img-top"
                style={{ height: '200px', objectFit: 'cover' }}
              />
            )}
            <div className="card-body">
              <h5 className="card-title">{title || 'Untitled Post'}</h5>
              <p className="card-text text-truncate">
                {body || 'Post content will appear here...'}
              </p>
              <p className="text-muted small">
                Author: <strong>{user.name}</strong>
              </p>
              <button className="btn btn-outline-secondary btn-sm" disabled>
                View Post
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
