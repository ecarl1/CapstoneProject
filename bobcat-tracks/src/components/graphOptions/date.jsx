import React from "react";
import { useForm } from "react-hook-form";

const DateOption = () => {
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
    <div className="dateOptionBox">
      <h1>Date</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group options-form-element">
          <input
            type="date"
            name="dateOne"
            className="form-control"
            id="dateOne"
            aria-describedby="dateSelect"
          />
          <label htmlFor="date">
            <p className="b1">Select Date</p>
          </label>
        </div>

        <div className="form-group options-form-element">
          <input
            type="date"
            name="dateOne"
            className="form-control"
            id="dateOne"
            aria-describedby="dateSelect"
          />
          <label htmlFor="date">
            <p className="b1">Select Date for Comparison</p>
          </label>
        </div>
      </form>
    </div>
  );
};

export default DateOption;
