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
        <CourseOption />
      </div>
    );
  }
}

export default PageOptions;
