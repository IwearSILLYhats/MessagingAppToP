import { NavLink } from "react-router";

export default function Login() {
  return (
    <div>
      <form action="" method="get">
        <input type="email" name="email" id="email" />
        <input type="password" name="password" id="password" />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <NavLink to={"/signup"}>Sign up here</NavLink>
      </p>
    </div>
  );
}
