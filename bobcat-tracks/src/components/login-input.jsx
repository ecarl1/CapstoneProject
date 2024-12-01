// should contain the 2 text entries (username and pass) as well as the login button
import React from "react";
import { useForm } from "react-hook-form";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      //   await new Promise((resolve) => setTimeout(resolve, 1000));
      //   console.log(data);
      //   throw new Error();
    } catch (er) {
      //   setError("root", { message: "Username is taken" });
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group login-form-element">
          <label htmlFor="email">Email Address</label>
          <input
            {...register("email", {
              required: "Email is required",
              validate: (value) => {
                if (!value.includes("@")) return "Email must include @";
                return true;
              },
            })}
            type="text"
            name="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
          />
        </div>

        {errors.email && (
          <div className="alert alert-danger"> {errors.email.message}</div>
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

          <button
            disabled={isSubmitting}
            className="btn btn-primary submit-btn login-form-element"
          >
            {isSubmitting ? "Loading..." : "Login"}
          </button>

          {errors.root && (
            <div className="alert alert-danger"> {errors.root.message}</div>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
