import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(credentials);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#000032e6] to-[#ffffff33]">
      <div className="bg-[#ecdfed] p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-medium mb-6 text-center">
          Login to CSIT VAULT
        </h1>
        {error && (
          <div className="bg-red-500/20 text-red-400 p-3 mb-4 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Username
            </label>
            <input
              type="text"
              value={credentials.username}
              onChange={(e) =>
                setCredentials({ ...credentials, username: e.target.value })
              }
              className="w-full p-2 rounded border border-gray-600 focus:border-blue-600 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              className="w-full p-2 rounded border border-gray-600 focus:border-blue-600 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-[#240f47]">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:text-blue-400">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
