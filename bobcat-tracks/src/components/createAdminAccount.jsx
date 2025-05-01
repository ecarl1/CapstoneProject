import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoginNavBar from "./loginNavBar";
import Footer from "./footer";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm();

  const navigate = useNavigate();

  // Submit function for form
  const onSubmit = async (data) => {
    try {
      console.log("Sending registration request:", data);

      const response = await axios.post(
        "http://localhost:3000/api/user/register",
        {
          username: data.username,
          password: data.password,
          fname: data.fname,
          lname: data.lname,
          pref_name: data.pref_name,
          user_type: "admin",
          email: data.email,
        }
      );

      console.log("User registered successfully:", response.data);
      navigate("/"); // Redirect to login page after successful registration
    } catch (error) {
      console.error("Registration error:", error);
      if (error.response) {
        console.error("Server Response:", error.response.data);
        setError("root", { message: error.response.data.message });
      } else {
        setError("root", {
          message: "Something went wrong. Please try again.",
        });
      }
    }
  };

  return (
    <div>
      <LoginNavBar />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group login-form-element login-window">
          <label htmlFor="username">Username</label>
          <input
            {...register("username", { required: "Username is required" })}
            type="text"
            className="form-control"
            id="username"
          />
          {errors.username && (
            <div className="alert alert-danger">{errors.username.message}</div>
          )}
        </div>

        <div className="form-group login-form-element login-window">
          <label htmlFor="password">Password</label>
          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
            type="password"
            className="form-control"
            id="password"
          />
          {errors.password && (
            <div className="alert alert-danger">{errors.password.message}</div>
          )}
        </div>

        <div className="form-group login-form-element login-window">
          <label htmlFor="fname">First Name</label>
          <input
            {...register("fname", { required: "First name is required" })}
            type="text"
            className="form-control"
            id="fname"
          />
          {errors.fname && (
            <div className="alert alert-danger">{errors.fname.message}</div>
          )}
        </div>

        <div className="form-group login-form-element login-window">
          <label htmlFor="lname">Last Name</label>
          <input
            {...register("lname", { required: "Last name is required" })}
            type="text"
            className="form-control"
            id="lname"
          />
          {errors.lname && (
            <div className="alert alert-danger">{errors.lname.message}</div>
          )}
        </div>

        <div className="form-group login-form-element login-window">
          <label htmlFor="pref_name">Preferred Name</label>
          <input
            {...register("pref_name")}
            type="text"
            className="form-control"
            id="pref_name"
          />
        </div>

        <div className="form-group login-form-element login-window">
          <label htmlFor="email">Email</label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email format",
              },
            })}
            type="email"
            className="form-control"
            id="email"
          />
          {errors.email && (
            <div className="alert alert-danger">{errors.email.message}</div>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary submit-btn login-form-element login-window"
        >
          {isSubmitting ? "Loading..." : "Create Account"}
        </button>

        <button
          type="button"
          className="btn btn-primary submit-btn login-form-element login-window"
          onClick={() => navigate("/")}
        >
          Back to Login
        </button>

        {errors.root && (
          <div className="alert alert-danger">{errors.root.message}</div>
        )}
      </form>
      <Footer />
    </div>
  );
};

export default RegisterPage;
