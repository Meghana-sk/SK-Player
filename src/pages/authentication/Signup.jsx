import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/authentication/auth-context";
import { SIGNUP } from "../../shared/types";

export const Signup = () => {
  const navigate = useNavigate();
  const { authDispatch } = useAuth();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const userFirstNameHandler = (event) => {
    setUser({ ...user, firstName: event.target.value });
  };

  const userLastNameHandler = (event) => {
    setUser({ ...user, lastName: event.target.value });
  };

  const userEmailHandler = (event) => {
    setUser({ ...user, email: event.target.value });
  };

  const userPasswordHandler = (event) => {
    setUser({ ...user, password: event.target.value });
  };

  const userConfirmPasswordHandler = (event) => {
    setUser({ ...user, confirmPassword: event.target.value });
  };

  const signupHandler = async (event) => {
    event.preventDefault();

    if (
      user.email &&
      user.password === user.confirmPassword &&
      user.firstName &&
      user.lastName
    ) {
      const { email, password, firstName, lastName } = user;
      try {
        const response = await axios.post("/api/auth/signup", {
          email,
          password,
          firstName,
          lastName,
        });
        if (response === 201) {
          localStorage.setItem("token", response.data.encodedToken);
          authDispatch({
            type: SIGNUP,
            payload: {
              user: response.data.foundUser,
              token: response.data.encodedToken,
            },
          });
          navigate("/");
        }
      } catch (error) {
        console.log(error.response);
        // alert(error.response);
      }
    }
  };
  return (
    <>
      <form className="auth-container">
        <h2 className="white-font">Signup</h2>
        <label htmlFor="first-name" className="text-left white-font">
          First name
        </label>
        <input
          name="first-name"
          id="first-name"
          type="text"
          placeholder="Michael"
          className="input-text"
          required
          onChange={userFirstNameHandler}
        />
        <label htmlFor="last-name" className="text-left white-font">
          Last name
        </label>
        <input
          name="last-name"
          id="last-name"
          type="text"
          placeholder="Jackson"
          className="input-text"
          required
          onChange={userLastNameHandler}
        />
        <label htmlFor="email" className="text-left white-font">
          Email
        </label>
        <input
          name="email"
          id="email"
          type="text"
          placeholder="mj@yahoo.com"
          className="input-text"
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
          onChange={userPasswordHandler}
        />
        <label htmlFor="confirm-password" className="text-left white-font">
          Confirm Password
        </label>
        <input
          name="password"
          id="confirm-password"
          type="password"
          className="input-text"
          placeholder="********"
          required
          onChange={userConfirmPasswordHandler}
        />
        <button className="btn btn-primary" onClick={signupHandler}>
          Signup
        </button>
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
