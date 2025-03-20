import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <nav className="bg-gray-800 shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between">
            <div className="flex space-x-4">
              <Link
                to="/dashboard"
                className="px-3 py-4 text-gray-300 hover:text-white"
              >
                Dashboard
              </Link>
              {user?.role === "admin" && (
                <>
                  <Link
                    to="/users"
                    className="px-3 py-4 text-gray-300 hover:text-white"
                  >
                    Users
                  </Link>
                  <Link
                    to="/roles"
                    className="px-3 py-4 text-gray-300 hover:text-white"
                  >
                    Roles
                  </Link>
                </>
              )}
            </div>
            <div className="flex items-center space-x-4 text-gray-300">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">Logged as:</span>
                <span className="font-medium">{user?.username}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs ${
                    user?.role === "admin"
                      ? "bg-purple-500/20 text-purple-400"
                      : "bg-blue-500/20 text-blue-400"
                  }`}
                >
                  {user?.role}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-6xl mx-auto mt-6 px-4">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
