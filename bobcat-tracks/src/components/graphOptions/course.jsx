import React from "react";
import { useForm } from "react-hook-form";

const CourseOption = ({
  courseType,
  onCourseType,
  comparing,
  comparingType,
  onCourseChange,
  onCompareCourseChange,
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
    <div className="courseOptionBox">
      <h1>Course</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group options-form-element compare-select-box">
          <select
            class="form-select"
            aria-label="select course type"
            onChange={(e) => onCourseType(e.target.value)}
            value={courseType}
          >
            <option value="0">
              <p className="b1">All</p>
            </option>
            <option value="1">
              <p className="b1">Individual</p>
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
          <option value="EN101" />
          <option value="23" />
          <option value="24" />
          <option value="25" />
        </datalist>

        <div className="form-group options-form-element">
          <input
            type="datalist"
            className="form-control input"
            list="datalistOptions"
            aria-describedby="dateSelect"
            placeholder="ABC 123"
            onChange={(e) => onCourseChange(e.target.value)}
            disabled={courseType == 0}
          />
          <label htmlFor="course">
            <p className="b1">Select Course</p>
          </label>
        </div>

        <div className="form-group options-form-element">
          <input
            type="datalist"
            className="form-control input"
            list="datalistOptions"
            aria-describedby="dateSelect"
            placeholder="ABC 123"
            onChange={(e) => onCompareCourseChange(e.target.value)}
            disabled={!(comparing && comparingType == 2)}
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
