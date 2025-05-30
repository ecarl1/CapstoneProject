import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";

const TopicOption = ({ onTopicChange, topics }) => {
  const { handleSubmit } = useForm();
  const [topicOptions, setTopicOptions] = useState([]);

  useEffect(() => {
    let isMounted = true;
  
    const fetchTopics = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/CPT/questions/30/answers"
        );
        const data = await response.json();
  
        const formattedOptions = data.flatMap(item =>
          item.answer_text.map(text => ({
            value: text,
            label: text,
          }))
        );
  
        if (isMounted) {
          setTopicOptions(formattedOptions);
        }
      } catch (error) {
        console.error("API Error fetching topics:", error);
      }
    };
  
    fetchTopics();
  
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="courseOptionBox">
      <h1>Topic</h1>
      <form onSubmit={handleSubmit(() => {})}>
        {/* Multi-select dropdown */}
        <div className="form-group options-form-element compare-select-box">
          <Select
            //TODO - uncomment out the 'options={topicOptions}' to switch the options back to the router results
            options={topicOptions}

            //TODO - remove the dummy options below that were populated by hand
            /*
            options={[
              { value: "grammar", label: "grammar" },
              { value: "grammar, spelling", label: "grammar, spelling" },
              { value: "spelling and grammar", label: "spelling and grammar" },
              { value: "grammar (commas)", label: "grammar (commas)" },
              { value: "spelling", label: "spelling" },
            ]}
            */
            isMulti
            onChange={(selectedOptions) =>
              onTopicChange(selectedOptions.map((option) => option.value))
            }
            placeholder="Select Topics..."
            className="multiselect"
          />
          <label>
            <p className="b1">Select Topic(s)</p>
          </label>
        </div>
      </form>
    </div>
  );
};

export default TopicOption;
