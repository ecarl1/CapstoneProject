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

      //PageOptions information
      comparing: false,
      comparingType: 1, // value 1 means DATE compare, value 2 means COURSE compare,

      startDate: null,
      endDate: null,
      compareStartDate: null,
      duration: null,
    };
  }

  //Compare settings
  handleComparisonToggle = (isChecked) => {
    this.setState({ comparing: isChecked });
    console.log("compare");
  };

  handleComparisonType = (value) => {
    this.setState({ comparingType: value });
    console.log(value);
  };

  //Date methods

  calcDuration = (start, end) => {
    start = new Date(start);
    end = new Date(end);
    let days = end.getTime() - start.getTime();
    days = days / (1000 * 3600 * 24); //convert miliseconds to days
    //days = Math.floor(days); //whole number

    return days;
  };

  addDays = (start, add) => {
    let newDate = new Date(start); // Create a new Date object from the input
    newDate.setDate(newDate.getDate() + add); // Modify the date
    return newDate.toISOString().split("T")[0]; // Format as "YYYY-MM-DD"
  };

  updateDuration = () => {
    if (this.state.startDate && this.state.endDate) {
      let days = this.calcDuration(this.state.startDate, this.state.endDate);

      this.setState({
        duration: days,
      });
      console.log("Duration: ", days);
    }
  };

  handleStartDate = (Date) => {
    //set start date to given date
    this.setState({ startDate: Date }, () => {
      console.log("Updated start:", this.state.startDate);
      //make sure end date is before start
      if (this.calcDuration(this.state.startDate, this.state.endDate) < 0) {
        this.handleEndDate(this.addDays(Date, 7));
      }

      this.updateDuration(); // Runs after state update
    });
  };

  handleEndDate = (Date) => {
    this.setState({ endDate: Date }, () => {
      console.log("Updated endDate:", this.state.endDate);
      this.updateDuration(); // Runs after state update
    });
  };

  handleCompareDate = (Date) => {
    this.setState({ compareStartDate: Date });
    console.log(Date);
  };
  //Course methods

  //methods to change data
  testMethod = () => {
    this.setState({ graphTitle: "Banana" });
    console.log("Banana Title");
  };

  testMethod2 = () => {
    this.setState({ graphTitle: "Orange you glad it isn't Banana?" });
    console.log("Orange Title");
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
              comparingType={this.state.comparingType}
              comparing={this.state.comparing}
              onStartDate={this.handleStartDate}
              onEndDate={this.handleEndDate}
              onCompareDate={this.handleCompareDate}
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              compareStartDate={this.state.compareStartDate}
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

            {/* CSV BUTTON DOWNLOAD */}
            <button
              type="button"
              class="btn btn-download"
              onClick={this.testMethod}
            >
              <h2>DOWNLOAD .CSV</h2>

              <img
                src="/images/downloadIcon.png"
                className="btn-download-img"
              />
            </button>

            {/* PNG BUTTON DOWNLOAD */}
            <button
              type="button"
              class="btn btn-download"
              onClick={this.testMethod2}
            >
              <h2>DOWNLOAD .PNG</h2>
              <img src="/images/imageIcon.png" className="btn-download-img" />
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
