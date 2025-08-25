import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [flash, setFlash] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();
    setFlash("");
    setLoading(true);

    try {
      const res = await api.post("/token/", { username, password });

      localStorage.setItem(ACCESS_TOKEN, res.data.access);
      localStorage.setItem(REFRESH_TOKEN, res.data.refresh);

      navigate("/"); // Redirect to dashboard
    } catch (err) {
      setFlash(err.response?.data?.detail || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black px-4">
      <div className="bg-gray-800 shadow-xl rounded-xl p-8 w-full max-w-md relative border border-gray-700">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-400">Login</h2>

        {(flash || location.state?.signupSuccess) && (
          <div
            className={`mb-4 px-4 py-3 rounded-lg text-sm ${
              flash ? "bg-red-900/30 text-red-200 border border-red-800/50" : "bg-green-900/30 text-green-200 border border-green-800/50"
            }`}
          >
            {flash || location.state?.signupSuccess}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2 text-sm font-medium">Username</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
              placeholder="Enter your username"
              disabled={loading}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-300 mb-2 text-sm font-medium">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
              placeholder="Enter your password"
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg transition ${
              loading ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
          >
            {loading && (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            )}
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-400 mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
            Register
          </Link>
        </p>
        <p className="text-sm text-center mt-3">
          <Link to="#" className="text-gray-500 hover:text-gray-400 transition-colors">
            Forgot password?
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;