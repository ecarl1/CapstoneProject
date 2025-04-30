import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const url = "http://localhost:3000/api/user/login";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm();

  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      console.log("Sending login request:", data);

      const response = await axios.post(url, {
        username: data.username,
        password: data.password,
      });

      console.log("Login successful:", response.data);

      if (response.data.user) {
        localStorage.setItem("token", response.data.token);
        console.log("Token stored.");

        console.log("User data received:", response.data.user);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        navigate("/attendance");
      } else {
        console.error("Error: User data is missing in response!");
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response) {
        setError("root", { message: error.response.data.error });
      } else {
        setError("root", {
          message: "Something went wrong. Please try again.",
        });
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group login-form-element">
          <label htmlFor="username">Username</label>
          <input
            {...register("username", {
              required: "Username is required",
              // validate: (value) => {
              //   if (!value.includes("@")) return "Email must include @";
              //   return true;
              // },
            })}
            type="text"
            name="username"
            className="form-control"
            id="username"
            aria-describedby="emailHelp"
          />
        </div>

        {errors.username && (
          <div className="alert alert-danger"> {errors.username.message}</div>
        )}

        <div className="form-group login-form-element">
          <label htmlFor="password">Password</label>
          <input
            {...register("password", {
              required: "Password is required",
              minLength: { value: 8, message: "Password must be 8 characters" },
            })}
            id="password"
            name="password"
            type="password"
            className="form-control"
          />
          {errors.password && (
            <div className="alert alert-danger"> {errors.password.message}</div>
          )}

          <div className="loginButtonBox">
            <button
              disabled={isSubmitting}
              className="btn btn-primary submit-btn login-form-element"
            >
              {isSubmitting ? "Loading..." : "Login"}
            </button>

            <button
              type="button"
              className="btn submit-btn login-form-element"
              onClick={() => navigate("/change-password")}
            >
              Change Your Password
            </button>
          </div>
          {errors.root && (
            <div className="alert alert-danger"> {errors.root.message}</div>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
