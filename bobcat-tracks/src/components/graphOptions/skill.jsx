import React from "react";
import { useForm } from "react-hook-form";

const SkillOption = ({ onSkillChange }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log("Submitted data:", data);
    } catch (er) {
      setError("root", { message: "An error occurred" });
    }
  };

  return (
    <div className="courseOptionBox">
      <h1>Skill</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group options-form-element compare-select-box">
          <label htmlFor="skill">
            <p className="b1">Select Skill</p>
          </label>

          <select
            id="skill"
            className="form-control input"
            {...register("skill", { required: true })}
            onChange={(e) => onSkillChange(e.target.value)}
          >
            <option value="">--- Select a Skill ---</option>
            <option value="Study Skills">Study Skills</option>
            <option value="Time & Task Management">
              Time & Task Management
            </option>
            <option value="Goal Setting">Goal Setting</option>
            <option value="Test Prep Skills/Test Taking Skills">
              Test Prep Skills/Test Taking Skills
            </option>
            <option value="Note Taking Skills">Note Taking Skills</option>
            <option value="How to Use Textbook or Other Class Resources">
              How to Use Textbook or Other Class Resources
            </option>
            <option value="How to Create or Use a Study Guide">
              How to Create or Use a Study Guide
            </option>
            <option value="Presentation Skills/Practice">
              Presentation Skills/Practice
            </option>
            <option value="Critical Thinking">Critical Thinking</option>
            <option value="Student Articulated Understanding of Material">
              Student Articulated Understanding of Material
            </option>
            <option value="Recall Activities/Quizzed Student">
              Recall Activities/Quizzed Student
            </option>
            <option value="Practice Problems">Practice Problems</option>
            <option value="Application Exercises">Application Exercises</option>
            <option value="Homework (Not for Grade)">
              Homework (Not for Grade)
            </option>
            <option value="Reviewed Student's Notes or Study Guide">
              Reviewed Student's Notes or Study Guide
            </option>
            <option value="Explained Course Content to Student">
              Explained Course Content to Student
            </option>
            <option value="Reviewed for Test/Quiz/Exam">
              Reviewed for Test/Quiz/Exam
            </option>
            <option value="Writing Assignment">Writing Assignment</option>
            <option value="Clarify Prompt or Assignment">
              Clarify Prompt or Assignment
            </option>
            <option value="Brainstorm or Generate Ideas">
              Brainstorm or Generate Ideas
            </option>
            <option value="How to Read Academic Writing (Not Textbook)">
              How to Read Academic Writing (Not Textbook)
            </option>
            <option value="Clarified Language or Added Concision in a Paper Draft">
              Clarified Language or Added Concision in a Paper Draft
            </option>
            <option value="Read Draft Aloud for Editing">
              Read Draft Aloud for Editing
            </option>
            <option value="Organized Ideas">Organized Ideas</option>
            <option value="Citations">Citations</option>
            <option value="How to Use Quotations and/or Paraphrasing">
              How to Use Quotations and/or Paraphrasing
            </option>
            <option value="Language Mechanics">Language Mechanics</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default SkillOption;
