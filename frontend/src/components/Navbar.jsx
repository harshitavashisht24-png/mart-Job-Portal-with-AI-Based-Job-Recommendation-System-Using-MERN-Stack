import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto flex flex-wrap gap-4 p-4">
        <Link to="/" className="hover:text-gray-200">
          Jobs
        </Link>

        <Link
          to="/login"
          className="hover:text-gray-200"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="hover:text-gray-200"
        >
          Register
        </Link>

        <Link
          to="/admin"
          className="hover:text-gray-200"
        >
          Admin
        </Link>

        <Link
          to="/my-applications"
          className="hover:text-gray-200"
        >
          My Applications
        </Link>

        <Link
          to="/upload-resume"
          className="hover:text-gray-200"
        >
          Upload Resume
        </Link>

        <Link
          to="/recommendations"
          className="hover:text-gray-200"
        >
          Recommendations
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;