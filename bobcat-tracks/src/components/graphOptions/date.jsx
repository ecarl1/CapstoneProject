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
            <p className="m1">start date</p>
            <input
              type="date"
              name="startDate"
              className="form-control dateInput input"
              id="startDate"
              aria-describedby="dateSelect"
              value={startDate}
              onChange={(e) => onStartDate(e.target.value)}
            />
            <p className="m1">end date</p>

            <input
              type="date"
              name="endDate"
              className="form-control dateInput input"
              id="endDate"
              aria-describedby="dateSelect"
              value={endDate}
              onChange={(e) => onEndDate(e.target.value)}
            />
          </div>
        </div>

        {/* SECOND DATE INPUTS FOR COMPARING */}

        <div className="form-group options-form-element">
          <p className="m1">Select Start Date for Comparison</p>

          <input
            type="date"
            name="compareDate"
            className="form-control dateInput input"
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
