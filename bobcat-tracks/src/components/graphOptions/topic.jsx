import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";

const TopicOption = ({ onTopicChange, topics }) => {
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
        console.log("topicoptions: ", topicOptions);
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
        <div className="form-group options-form-element compare-select-box">
          <Select
            //TODO - uncomment out the 'options={topicOptions}' to switch the options back to the router results
            //options={topicOptions}

            //TODO - remove the dummy options below that were populated by hand
            options={[
              { value: "grammar", label: "grammar" },
              { value: "grammar, spelling", label: "grammar, spelling" },
              { value: "spelling and grammar", label: "spelling and grammar" },
              { value: "grammar (commas)", label: "grammar (commas)" },
              { value: "spelling", label: "spelling" },
            ]}
            isMulti
            onChange={(selectedOptions) =>
              onTopicChange(selectedOptions.map((option) => option.value))
            }
            placeholder="Select Topics..."
            className="multiselect"
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
