import React from "react";
import { useForm } from "react-hook-form";

const CompareOption = () => {
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
    <div className="compareOptionBox">
      <h1>Compare</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group options-form-element compare-check">
          <input
            type="checkbox"
            name="compare"
            className="form-check-input custom-checkbox"
            id="compareFlexCheck"
            aria-describedby="emailHelp"
          />
          <label htmlFor="compare">Compare Graphs?</label>
        </div>

        <div className="form-group options-form-element compare-select-box">
          <select class="form-select" aria-label="select compare type">
            <option selected>
              <p className="b1">Comparison Type</p>
            </option>
            <option value="1">
              <p className="b1">Date Comparison</p>
            </option>
            <option value="2">
              <p className="b1">Course Comparison</p>
            </option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default CompareOption;
