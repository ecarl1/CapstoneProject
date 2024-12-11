import React, { Component } from "react";
import CompareOption from "./graphOptions/compare";
import DateOption from "./graphOptions/date";
import CourseOption from "./graphOptions/course";

class PageOptions extends Component {
  render() {
    return (
      <div className="page-options">
        <CompareOption />
        <DateOption />
        <CourseOption />
      </div>
    );
  }
}

export default PageOptions;
