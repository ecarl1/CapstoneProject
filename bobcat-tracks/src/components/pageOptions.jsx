import React, { Component } from "react";
import CompareOption from "./graphOptions/compare";
import DateOption from "./graphOptions/date";
import CourseOption from "./graphOptions/course";

class PageOptions extends Component {
  render() {
    let currPage = this.props.pageName;
    if (currPage == "Attendance") {
      return (
        <div className="page-options">
          <CompareOption
            onComparisonToggle={this.props.onComparisonToggle}
            onComparisonChange={this.props.onComparisonChange}
            comparingType={this.props.comparingType}
            comparing={this.props.comparing}
          />
          <DateOption
            comparing={this.props.comparing}
            comparingType={this.props.comparingType}
            startDate={this.props.startDate}
            endDate={this.props.endDate}
            compareStartDate={this.props.compareStartDate}
            onStartDate={this.props.onStartDate}
            onEndDate={this.props.onEndDate}
            onCompareDate={this.props.onCompareDate}
          />
          <CourseOption
            comparingType={this.props.comparingType}
            comparing={this.props.comparing}
            courseType={this.props.courseType}
            onCourseType={this.props.onCourseType}
            onCourseChange={this.props.onCourseChange}
            onCompareCourseChange={this.props.onCompareCourseChange}
            // course={this.props.course}
            // compareCourse={this.props.compareCourse}
          />
        </div>
      );
    }
  }
}

export default PageOptions;
