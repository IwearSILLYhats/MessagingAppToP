import { useState } from "react";
import apiFetch from "../util/fetch";
import { NavLink, useNavigate } from "react-router";
import Alert from "../components/Alert";
import "./Login.css";

export default function Signup() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  async function submitSignup(event) {
    event.preventDefault();
    setSubmitted(true);
    const body = {
      email: email,
      username: username,
      password: password,
      confirm: confirm,
    };
    const request = await apiFetch("signup", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(body),
    });
    if (request.error !== null) {
      setError(request.error);
    } else {
      setSuccess([
        "Account successfully created, redirecting you to login page.",
      ]);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  }

  return (
    <div>
      <form action="" method="post" onSubmit={submitSignup}>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="fakename@example.com"
          required
        />
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Steve"
          required
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="*******"
          required
        />
        <input
          type="password"
          name="confirm"
          id="confirm"
          placeholder="*******"
          required
        />
        {(error || success) && <Alert type={error || success} />}
        <button type="submit" disabled={submitted}>
          Signup
        </button>
      </form>
      <p>
        Already have an account? <NavLink to={"/login"}>Log in here</NavLink>
      </p>
    </div>
  );
}
