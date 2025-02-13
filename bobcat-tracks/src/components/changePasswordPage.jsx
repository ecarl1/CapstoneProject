import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoginNavBar from "./loginNavBar";
import Footer from "./footer";

const url = "http://localhost:3000/api/user/change-password"; // Backend route for changing password

//when the change password is executed
const ChangePasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm();

  const navigate = useNavigate();

  //submit function
  const onSubmit = async (data) => {
    try {
        console.log("Sending password change request:", data); 

        const response = await axios.post("http://localhost:3000/api/user/change-password", {
            username: data.username,
            oldPassword: data.oldPassword,
            newPassword: data.newPassword,
        });

        console.log("Password changed successfully:", response.data);
        alert("Password changed successfully!");
        navigate("/"); //Redirecting to login after password change
    } catch (error) {
        console.error("Password change error:", error);
        if (error.response) {
            console.error("Server Response:", error.response.data); 
            setError("root", { message: error.response.data.message });
        } else {
            setError("root", { message: "Something went wrong. Please try again." });
        }
    }
};


  return (
    <div>
      <LoginNavBar />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group login-form-element">
          <label htmlFor="username">Username</label>
          <input
            {...register("username", { required: "Username is required" })}
            type="text"
            className="form-control"
            id="username"
          />
          {errors.username && <div className="alert alert-danger">{errors.username.message}</div>}
        </div>

        <div className="form-group login-form-element">
          <label htmlFor="oldPassword">Current Password</label>
          <input
            {...register("oldPassword", { required: "Current password is required" })}
            type="password"
            className="form-control"
            id="oldPassword"
          />
          {errors.oldPassword && <div className="alert alert-danger">{errors.oldPassword.message}</div>}
        </div>

        <div className="form-group login-form-element">
          <label htmlFor="newPassword">New Password</label>
          <input
            {...register("newPassword", {
              required: "New password is required",
              minLength: { value: 8, message: "Password must be at least 8 characters" },
            })}
            type="password"
            className="form-control"
            id="newPassword"
          />
          {errors.newPassword && <div className="alert alert-danger">{errors.newPassword.message}</div>}
        </div>

        <button type="submit" disabled={isSubmitting} className="btn btn-primary submit-btn login-form-element">
          {isSubmitting ? "Loading..." : "Change Password"}
        </button>

        <button type="button" className="btn btn-secondary login-form-element" onClick={() => navigate("/")}>
          Back to Login
        </button>

        {errors.root && <div className="alert alert-danger">{errors.root.message}</div>}
      </form>
      <Footer/>
    </div>
  );
};

export default ChangePasswordPage;
