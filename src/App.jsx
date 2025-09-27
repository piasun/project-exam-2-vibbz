// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import SinglePost from './pages/SinglePost';
import CreatePost from './pages/CreatePost';

export default function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profiles/:name" element={<Profile />} />
      <Route path="/posts/:id" element={<SinglePost />} />
      <Route path="/posts/create" element={<CreatePost />} />
    </Routes>
    </>
  );
}
