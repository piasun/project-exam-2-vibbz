import { useEffect, useState } from "react";
import { api } from "../utils/api";
import { useAuth } from "../features/auth/AuthContext";
import PostCard from "../components/PostCards";
import LandingPage from "./LandingPage";
import { useScrollAndViewMore } from "../hooks/useScrollAndViewMore";
import ScrollToTopButton from "../components/ScrollToTopButton";
import ViewMoreButton from "../components/ViewMoreButton";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const { user } = useAuth();

  const {
    showScrollTop,
    visibleCount,
    handleScrollTop,
    handleViewMore,
  } = useScrollAndViewMore(12, 8);

  useEffect(() => {
    if (!user) return;

    const fetchPosts = async () => {
      try {
        const res = await api.get(
          "/posts?_author=true&_comments=true&_reactions=true",
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setPosts(res.data);
      } catch (err) {
        setError("Could not load posts. Are you logged in?");
      }
    };

    fetchPosts();
  }, [user]);

  if (!user) return <LandingPage />;

  return (
    <div className="container mt-4">
      <h2>Latest Posts</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row">
        {posts.slice(0, visibleCount).map((post) => (
          <div key={post.id} className="col-md-6 col-lg-4 mb-4">
            <PostCard post={post} />
          </div>
        ))}
      </div>

      {visibleCount < posts.length && (
        <ViewMoreButton onClick={handleViewMore} />
      )}

      <ScrollToTopButton show={showScrollTop} onClick={handleScrollTop} />
    </div>
  );
}
