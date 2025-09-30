export default function Footer() {
  return (
    <footer className="footer text-light py-3 mt-auto">
      <div className="container text-center">
        <p className="mb-0">
          &copy; {new Date().getFullYear()} Vibbz. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
