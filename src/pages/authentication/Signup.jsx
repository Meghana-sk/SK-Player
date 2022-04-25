import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const navigate = useNavigate();
  return (
    <>
      <form className="auth-container">
        <h2 className="white-font">Signup</h2>
        <label htmlFor="email" className="text-left white-font">
          Email
        </label>
        <input
          name="email"
          id="email"
          type="text"
          placeholder="meghana@yahoo.com"
          className="input-text"
        />
        <label htmlFor="password" className="text-left white-font">
          Password
        </label>
        <input
          name="password"
          id="password"
          type="password"
          className="input-text"
        />
        <label htmlFor="confirm-password" className="text-left white-font">
          Confirm Password
        </label>
        <input
          name="password"
          id="confirm-password"
          type="password"
          className="input-text"
        />
        <button className="btn btn-primary">Signup</button>
        <p className="white-font">Already have an account?</p>
        <button
          className="btn btn-secondary-text text-s white-font signup-btn"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </form>
    </>
  );
};
