import React from "react";
import { useForm } from "react-hook-form";

const DateOption = ({
  comparing,
  comparingType,
  onStartDate,
  onEndDate,
  onCompareDate,
  startDate,
  endDate,
  compareStartDate,
}) => {
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
        <div className="form-group options-form-element date-container">
          <label htmlFor="date">
            <p className="b1">Select Date Range</p>
          </label>
          <div className="date-input-container">
            <input
              type="date"
              name="startDate"
              className="form-control dateInput"
              id="startDate"
              aria-describedby="dateSelect"
              value={startDate}
              onChange={(e) => onStartDate(e.target.value)}
            />
            <input
              type="date"
              name="endDate"
              className="form-control dateInput"
              id="endDate"
              aria-describedby="dateSelect"
              value={endDate}
              onChange={(e) => onEndDate(e.target.value)}
            />
          </div>
        </div>

        {/* SECOND DATE INPUTS FOR COMPARING */}

        <div className="form-group options-form-element">
          <label htmlFor="date">
            <p className="b1">Select Date for Comparison</p>
          </label>
          <input
            type="date"
            name="compareDate"
            className="form-control dateInput"
            id="compareDate"
            aria-describedby="dateSelect"
            disabled={!(comparing && comparingType == 1)}
            value={compareStartDate}
            onChange={(e) => onCompareDate(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
};

export default DateOption;
