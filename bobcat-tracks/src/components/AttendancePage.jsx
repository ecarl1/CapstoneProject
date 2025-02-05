import React, { Component } from "react";
import NavBar from "./navBar";
import Footer from "./footer";
import PageOptions from "./pageOptions";
// import { Bargraph } from "./Bar.js";
import BargraphComp from "./Bar.js";

class AttendancePage extends Component {
  /*
    State variables to control & what they do- SET BY PROPS

    barCharLabels : Label each value in horizontal axis. For our purposes, this should be the DATES
    graphTitle: Overall title of the graph
    comparing: Is the graph doing a comparison? False- only default data is shown. true, compare data also displayed.

    defaultBarLabel : This labels this collection of data. Yet to determine policy.
    defaultBarData: An array of the values in each col. Should have same quantity as the above defaultBarLabel

    WHEN COMPARISON IS ON, defaultBarLabel & compareBarLabel should relate to what is being compared.
    EX, if two courses are being compared, each BarLabel should be named after the two things being compared.

    compareBarLabel : This labels this collection of data. Yet to determine policy.
    compareBarData: An array of the values in each col. Should have same quantity as the above compareBarLabel
 */
  //INFORMATION SET & CONTROLLED HERE
  //so that bargraph & page options can both edit & view these props

  //THIS is all the data from the DB held by attendance AND the filter information needed
  constructor(props) {
    super(props);
    this.state = {
      barChartLabels: [
        "Rent",
        "Groceries",
        "Utilities",
        "Entertainment",
        "Transportation",
      ],
      //Should be default graph name
      defaultBarLabel: "April Attendence",
      defaultBarData: [160, 240, 130, 120, 600],

      //name of what is being compared & param
      compareBarLabel: "Februrary Attendence",
      compareBarData: [600, 240, 240, 150, 130],

      //Default graph name, defined in component call
      graphTitle: "Attendance Graph",

      comparing: false,
      comparingType: null, // value 1 means DATE compare, value 2 means COURSE compare, value 0 means unselected
    };
  }

  handleComparisonToggle = (isChecked) => {
    this.setState({ comparing: isChecked });
    if (!isChecked) {
      this.handleComparisonType(0);
    }
    console.log("compare");
  };

  handleComparisonType = (value) => {
    this.setState({ comparingType: value });
    console.log(value);
  };

  //methods to change data
  testMethod = () => {
    this.setState({ graphTitle: "Banana" });
    console.log("Banana Title");
  };

  render() {
    return (
      <div>
        <NavBar />

        <div className="attendance-page row">
          {/* left menu component */}
          <div className="col-lg-3">
            <PageOptions
              onComparisonToggle={this.handleComparisonToggle}
              onComparisonChange={this.handleComparisonType}
              selectedComparisonType={this.state.comparingType}
            />
            {/* changes what filters & parameters data should be displayed */}
          </div>
          {/* right graphs & buttons */}
          <div className="col-lg-9 graph-box">
            <BargraphComp
              graphTitle={this.state.graphTitle}
              barChartLabels={this.state.barChartLabels}
              defaultBarLabel={this.state.defaultBarLabel}
              defaultBarData={this.state.defaultBarData}
              compareBarLabel={this.state.compareBarLabel}
              compareBarData={this.state.compareBarData}
              comparing={this.state.comparing}
            />
            {/* displays data based on filters & params*/}

            {/* <Bargraph /> */}
            <button
              type="button"
              class="btn btn-download"
              onClick={this.testMethod}
            >
              DOWNLOAD
            </button>
          </div>
        </div>
        {/* end attendance-page row*/}

        <Footer />
      </div>
      // end container
    );
  }
}

export default AttendancePage;
