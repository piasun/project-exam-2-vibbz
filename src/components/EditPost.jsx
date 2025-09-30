import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '../utils/api';
import { useAuth } from '../features/auth/AuthContext';

export default function EditPost() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [media, setMedia] = useState('');

  useEffect(() => {
    api.get(`/posts/${id}`, {
      headers: { Authorization: `Bearer ${user.token}` }
    }).then(res => {
      setTitle(res.data.title);
      setBody(res.data.body);
      setMedia(res.data.media || '');
    }).catch(() => alert('Could not load post'));
  }, [id, user.token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/posts/${id}`, { title, body, media }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      navigate('/');
    } catch {
      alert('Failed to update post');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" value={title} onChange={e => setTitle(e.target.value)} required />
        <textarea className="form-control mb-2" value={body} onChange={e => setBody(e.target.value)} required />
        <input className="form-control mb-2" value={media} onChange={e => setMedia(e.target.value)} placeholder="Image URL" />
        <button className="btn btn-primary">Update Post</button>
      </form>
    </div>
  );
}
