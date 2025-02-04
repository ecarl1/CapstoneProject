import React from "react";
import { useForm } from "react-hook-form";

const CourseOption = () => {
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
    <div className="courseOptionBox">
      <h1>Course</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group options-form-element compare-select-box">
          <select class="form-select" aria-label="select course type">
            <option selected>
              <p className="b1">All or Individual</p>
            </option>
            <option value="1">
              <p className="b1">Individual</p>
            </option>
            <option value="2">
              <p className="b1">All</p>
            </option>
          </select>
        </div>

        {/* there should be a way to populate this list based on a query to the DB returning all course names */}
        <datalist id="datalistOptions">
          <option value="FYS 101" />
          <option value="BIO 101" />
          <option value="BIO 101L" />
          <option value="FYS 101H" />
          <option value="QU 105" />
        </datalist>

        <div className="form-group options-form-element">
          <input
            type="datalist"
            className="form-control"
            list="datalistOptions"
            aria-describedby="dateSelect"
            placeholder="ABC 123"
          />
          <label htmlFor="course">
            <p className="b1">Select Course</p>
          </label>
        </div>

        <div className="form-group options-form-element">
          <input
            type="datalist"
            className="form-control"
            list="datalistOptions"
            aria-describedby="dateSelect"
            placeholder="ABC 123"
          />
          <label htmlFor="course">
            <p className="b1">Select Course</p>
          </label>
        </div>
      </form>
    </div>
  );
};

export default CourseOption;
