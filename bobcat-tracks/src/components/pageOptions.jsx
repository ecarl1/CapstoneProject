import React, { Component } from "react";
import CompareOption from "./graphOptions/compare";
import DateOption from "./graphOptions/date";
import CourseOption from "./graphOptions/course";

class PageOptions extends Component {
  render() {
    return (
      <div className="page-options">
        <CompareOption
          onComparisonToggle={this.props.onComparisonToggle}
          onComparisonChange={this.props.onComparisonChange}
          selectedComparisonType={this.props.selectedComparisonType}
        />
        <DateOption
          comparing={this.props.comparing}
          comparingType={this.props.comparingType}
        />
        <CourseOption />
      </div>
    );
  }
}

export default PageOptions;
