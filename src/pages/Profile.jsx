import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '../utils/api';
import { useAuth } from '../features/auth/AuthContext';
import defaultAvatar from '../assets/default-avatar.png';

export default function Profile() {
  const { name } = useParams();
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [bannerUrl, setBannerUrl] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get(
          `/profiles/${name}?_posts=true&_followers=true&_following=true`,
          {
            headers: user
              ? {
                  Authorization: `Bearer ${user.token}`,
                }
              : {},
          }
        );
        setProfile({
        ...res.data,
        isFollowing: res.data.followers?.some(f => f.name === user.name),
      });
      } catch (err) {
        console.error('Could not load profile', err);
        setError('Could not load profile');
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [name, user]);

 const toggleFollow = async () => {
  if (user.name === profile.name) {
    alert("You can't follow yourself!");
    return;
  }

  console.log("Trying to follow:", profile.name);
  console.log("User token:", user.token);

  try {
    const action = profile.isFollowing ? 'unfollow' : 'follow';

    await api({
      method: "put",
      url: `/profiles/${profile.name}/${action}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });


    setProfile((prev) => ({
      ...prev,
      isFollowing: !prev.isFollowing,
    }));
  } catch (error) {
    console.error("Follow/unfollow error:", error);
    alert('Could not follow/unfollow');
  }
};


  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put(
        `/profiles/${user.name}/media`,
        {
          avatar: avatarUrl,
          banner: bannerUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setProfile({
        ...profile,
        avatar: res.data.avatar,
        banner: res.data.banner,
      });
      setAvatarUrl('');
      setBannerUrl('');
      setMessage('Profile updated successfully!');
    } catch {
      setMessage('Failed to update profile');
    }
  };

  if (error) return <div className="alert alert-danger mt-4">{error}</div>;
  if (!profile) return <div className="container mt-4">Loading...</div>;

  return (
    <div className="container mt-4">
      {profile.banner && (
        <img
          src={profile.banner}
          alt="banner"
          className="img-fluid rounded mb-3"
        />
      )}

      <h2>{profile.name}</h2>
      <p>Email: {profile.email}</p>

      <img
        src={profile.avatar || defaultAvatar}
        alt="avatar"
        width="100"
        className="rounded mb-3"
      />

      <p>
        Followers: {profile._count?.followers} | Following:{' '}
        {profile._count?.following}
      </p>

      {user.name !== profile.name && (
        <button className="btn btn-primary" onClick={toggleFollow}>
          {profile.isFollowing ? 'Unfollow' : 'Follow'}
        </button>
      )}

      {user.name === profile.name && (
        <form onSubmit={handleUpdate} className="mt-4">
          <h5>Edit Avatar & Banner</h5>
          <input
            type="url"
            className="form-control mb-2"
            placeholder="New Avatar URL"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
          />
          <input
            type="url"
            className="form-control mb-2"
            placeholder="New Banner URL"
            value={bannerUrl}
            onChange={(e) => setBannerUrl(e.target.value)}
          />
          <button className="btn btn-primary btn-sm">Update Profile</button>
          {message && <p className="mt-2 text-muted">{message}</p>}
        </form>
      )}
     {profile.posts?.length > 0 ? (
  <div className="mt-5">
    <h4>My Posts</h4>
    <div className="row">
      {profile.posts.map((post) => (
        <div key={post.id} className="col-md-6 mb-3">
          <div className="card">
            {post.media && (
              <img
                src={post.media}
                alt={post.title}
                className="card-img-top"
                style={{ maxHeight: '200px', objectFit: 'cover' }}
              />
            )}
            <div className="card-body">
              <h5 className="card-title">{post.title}</h5>
              <p className="card-text text-truncate">{post.body}</p>
              <a href={`/posts/${post.id}`} className="btn btn-sm btn-primary">
                View
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
) : (
  <p className="mt-5">No posts yet</p>
  
)}

    </div>
  );
}
