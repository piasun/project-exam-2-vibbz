export default function ViewMoreButton({ onClick }) {
  return (
    <div className="text-center my-3">
      <button className="btn btn-primary" onClick={onClick}>
        View More
      </button>
    </div>
  );
}
