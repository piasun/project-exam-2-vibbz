import { useEffect, useState } from 'react';
import { api } from '../utils/api';
import { useAuth } from '../features/auth/AuthContext';
import { Link } from 'react-router-dom';

export default function Profiles() {
  const { user } = useAuth();
  const [profiles, setProfiles] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const res = await api.get('/profiles', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setProfiles(res.data);
      } catch (err) {
        setError('Could not load profiles');
        console.error(err);
      }
    };

    if (user) {
      fetchProfiles();
    }
  }, [user]);

  return (
    <div className="container mt-4">
      <h2>All Profiles</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
        {profiles.map((profile) => (
          <div key={profile.name} className="col-md-4 mb-3">
            <div className="card h-100">
              {profile.avatar ? (
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="card-img-top"
                  style={{ objectFit: 'cover', height: '200px' }}
                />
              ) : (
            <div
                className="d-flex align-items-center justify-content-center bg-light text-muted"
                style={{ height: '200px', fontSize: '0.9rem', border: '1px dashed #ccc' }}
            >
                No profile picture added
            </div>
            )}
              <div className="card-body">
                <h5 className="card-title">{profile.name}</h5>
                <p className="card-text">{profile.email}</p>
                <Link to={`/profiles/${profile.name}`} className="btn btn-sm btn-primary">
                  View Profile
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
