import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./authentication.css";
import { useAuth } from "../../context/authentication/auth-context";
import { LOGIN } from "../../shared/types";

export const Login = () => {
  const { authDispatch } = useAuth();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const userEmailHandler = (event) => {
    setUser({ ...user, email: event.target.value });
  };

  const userPasswordHandler = (event) => {
    setUser({ ...user, password: event.target.value });
  };

  const guestUserHandler = async (e) => {
    setUser({ email: "adarshbalika@gmail.com", password: "adarshBalika123" });
    try {
      const response = await axios.post("/api/auth/login", {
        email: user.email,
        password: user.password,
      });
      if (response.status === 200) {
        toast.success("Logged in as guest");
        localStorage.setItem("token", response.data.encodedToken);
        navigate("/");
      }
    } catch (error) {}
  };

  const loginHandler = async (event) => {
    event.preventDefault();

    if (user.email && user.password) {
      try {
        const response = await axios.post("/api/auth/login", {
          email: user.email,
          password: user.password,
        });
        if (response.status === 200) {
          toast.success("Logged in successfully");
          navigate("/");
          localStorage.setItem("token", response.data.encodedToken);
          authDispatch({
            type: LOGIN,
            payload: {
              user: response.data.foundUser,
              token: response.data.encodedToken,
            },
          });
        } else {
          toast.error("Please try logging in again");
        }
      } catch (error) {
        toast.error(error.response.data.errors[0]);
      }
    }
  };
  return (
    <>
      <form className="auth-container" onSubmit={(e) => loginHandler(e)}>
        <h2 className="white-font">Login</h2>
        <label htmlFor="email" className="text-left white-font">
          Email
        </label>
        <input
          name="email"
          id="email"
          type="text"
          placeholder="meghana@yahoo.com"
          className="input-text"
          value={user.email}
          required
          onChange={userEmailHandler}
        />
        <label htmlFor="password" className="text-left white-font">
          Password
        </label>
        <input
          name="password"
          id="password"
          type="password"
          className="input-text"
          placeholder="********"
          required
          value={user.password}
          onChange={userPasswordHandler}
        />
        <button className="btn btn-primary">Login</button>
        <button className="btn btn-secondary" onClick={guestUserHandler}>
          Login as guest
        </button>
        <p className="white-font">Don't have an account?</p>
        <button
          className="btn btn-secondary-text text-s white-font signup-btn"
          onClick={() => navigate("/signup")}
        >
          Sign up
        </button>
      </form>
    </>
  );
};
