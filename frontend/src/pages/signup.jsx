import { useState } from "react";
import apiFetch from "../util/fetch";

export default function Signup() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirm, setConfirm] = useState(null);

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
  }

  return (
    <form action="" method="post" onSubmit={submitSignup}>
      <input type="email" name="email" id="email" required />
      <input type="text" name="username" id="username" required />
      <input type="password" name="password" id="password" required />
      <input type="password" name="confirm" id="confirm" required />
      <button type="submit" disabled={submitted}>
        Signup
      </button>
    </form>
  );
}
