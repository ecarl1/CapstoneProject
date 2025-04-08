import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";

const TopicOption = ({
  //   courseType,
  //   onCourseType,
  //   onCourseChange,
  //   comparing,
  //   comparingType,
  //   onCompareCourseChange,
  onTopicChange,
  topics,
  onTopi,
}) => {
  const { handleSubmit } = useForm();
  const [topicOptions, setTopicOptions] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          //TODO - update to fetch all topics
          "http://localhost:3000/api/course/courses"
        );
        const data = await response.json();
        setTopicOptions(
          data.map((course) => ({
            value: course.course_name,
            label: course.course_name,
          }))
        );
      } catch (error) {
        console.error("API Error:", error);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="courseOptionBox">
      <h1>Topic</h1>
      <form onSubmit={handleSubmit(() => {})}>
        {/* Multi-select dropdown */}
        <div className="form-group options-form-element">
          <Select
            options={topicOptions}
            isMulti
            onChange={(selectedOptions) =>
              onTopicChange(selectedOptions.map((option) => option.value))
            }
            placeholder="Select Topics..."
          />
          <label>
            <p className="b1">Select Course(s)</p>
          </label>
        </div>
      </form>
    </div>
  );
};

export default TopicOption;
