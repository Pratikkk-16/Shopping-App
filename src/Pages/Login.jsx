import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { loginUser } from "../API/api";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await loginUser(username, password);
      if (response.token) {
        login({ username }, response.token);
        navigate("/");
      } 
      else {
        setError("Invalid credentials. Please try again.");
      }
    } 
    catch (error) {
      console.error("Login error:", error);
      setError("Login failed. Please check your credentials and try again.");
    } 
    finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="login">
      <div className="card">
        <div>
          <h1>Shopper</h1>
          <h2>
            Sign in to your account
          </h2>
        </div>
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="error">
              {error}
            </div>
          )}
          <div className="info">
            <div>
              <div>
              <label htmlFor="username" className="unp">Username</label>
              </div>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="username"
                placeholder="Username"
              />
            </div>
            <div>
              <div>
              <label htmlFor="password" className="unp">Password</label>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="password"
                placeholder="Password"
              />
            </div>
            <p className="credential">
            Use <span className="c-font">mor_2314</span> as username and <span className="c-font">83r5^_</span> as password for demo
          </p>
          </div>
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="submit"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;