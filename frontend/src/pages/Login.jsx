import { useState } from "react";
import useLocalStorage from "../hooks/useLocal";
import { NavLink } from "react-router";
import Alert from "../components/Alert";
import apiFetch from "../util/fetch";
import { useNavigate } from "react-router";

export default function Login() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [token, setToken] = useLocalStorage("token", null);
  const navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();
    const body = {
      email: email,
      password: password,
    };
    const request = await apiFetch("login", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(body),
    });
    if (request.error !== null) {
      setError(request.error);
    } else {
      setSuccess(request.success);
      setToken(`Bearer ${request.token}`);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }
  return (
    <div>
      <form action="" method="get" onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Alert type={error || success} message={error || success} />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <NavLink to={"/signup"}>Sign up here</NavLink>
      </p>
    </div>
  );
}
