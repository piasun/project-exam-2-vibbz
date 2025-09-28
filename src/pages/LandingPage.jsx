import { Link } from 'react-router-dom';
import postImage from '../assets/post_image.jpg';

export default function LandingPage() {
  return (
    <div className="text-center mt-5 px-3">
      <h1 className="display-4 fw-bold">Welcome to Vibbz</h1>
      <p className="lead">Connect. React. Vibe with others 🚀</p>

      <div className="mb-4">
        <Link to="/login" className="btn btn-primary me-2">Login</Link>
        <Link to="/register" className="btn btn-primary me-2">Register</Link>
      </div>

      <p>Check out how your feed could look:</p>

      <div className="row justify-content-center">
        {[1, 2, 3].map((i) => (
          <div key={i} className="col-md-4 mb-3">
            <div className="card h-100">
              <img
                src={postImage}
                className="card-img-top"
                alt="Preview"
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">Post Preview #{i}</h5>
                <p className="card-text">A sample post you might see on Vibbz</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
