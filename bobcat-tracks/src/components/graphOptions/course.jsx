import React, { useEffect, useState } from "react";
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

  const [courseNames, setCourseNames] = useState([]); // Store fetched courses

  // Fetch course names from the API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/course/courses"
        );
        const data = await response.json();
        setCourseNames(data.map((course) => course.course_name)); // Extract names
      } catch (error) {
        console.error("API Error:", error);
      }
    };

    fetchCourses();
  }, []);

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
          {/*How do I populate the options using the courseNames array values instead of hard coded?*/}
          {courseNames.map((course, index) => (
            <option key={index} value={course} />
          ))}
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
            <p className="m1">Select Course</p>
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
            <p className="m1">Select Comparison Course</p>
          </label>
        </div>
      </form>
    </div>
  );
};

export default CourseOption;
