export default function ScrollToTopButton({ show, onClick }) {
  if (!show) return null;

  return (
    <button
      onClick={onClick}
      className="btn btn-primary scroll-top-btn"
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        borderRadius: "50%",
        width: "50px",
        height: "50px",
      }}
    >
      <i className="bi bi-arrow-up-circle fs-4"></i>
    </button>
  );
}
