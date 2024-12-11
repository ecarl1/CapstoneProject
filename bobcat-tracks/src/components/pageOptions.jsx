import React, { Component } from "react";
import CompareOption from "./graphOptions/compare";

class PageOptions extends Component {
  render() {
    return (
      <div className="page-options">
        <CompareOption />
        <div className="options-box"></div>
        <div className="options-box">
          <h1>Compare</h1>
          <p className="b1">checkbox</p>
          <p className="b2">dropdown date or section</p>
        </div>
        <div className="options-box">
          <h1>Date</h1>
          <p className="b1">date range select</p>
          <p className="b2">date range select disabled</p>
        </div>
        <div className="options-box">
          <h1>Course</h1>
          <p className="b1">
            drop down "overall courses" or "FYS 101, BIO101, etc etc."
          </p>
          <p className="b2">
            second select only for individual course, disabled unless compare.
          </p>
        </div>
      </div>
    );
  }
}

export default PageOptions;
