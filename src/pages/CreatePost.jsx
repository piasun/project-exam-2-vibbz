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
    </div>
  );
}
