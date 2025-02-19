import React, { Component } from "react";
import NavBar from "./navBar";
import Footer from "./footer";
import PageOptions from "./pageOptions";
// import { Bargraph } from "./Bar.js";
import BargraphComp from "./Bar.js";
import html2canvas from "html2canvas";
import convertJSONToCSV from "./CSVDown.js";
import axios from "axios";
const url = "http://localhost:3000/api/attendance";

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
    const request = async (data) => {
      try {
        console.log("Sending attendance request:", data);

        const response = await axios.get(url);

        console.log("Request successful:", response.data);
        alert("Request successful!");

        return response.data; //Attendance Data being returned
      } catch (error) {
        console.error("Request error:", error);
      }
    };
    //request();
    this.state = {
      //
      //rawData: request(),
      rawData: [
        { date: "2025-02-13", courseName: "EN101" },
        { date: "2025-02-13", courseName: "QU105" },
        { date: "2025-02-14", courseName: "BIO101" },
        { date: "2025-02-14", courseName: "EN101" },
        { date: "2025-02-15", courseName: "CHE101" },
        { date: "2025-02-15", courseName: "FYS101" },
        { date: "2025-02-16", courseName: "QU105" },
        { date: "2025-02-16", courseName: "CHE101" },
        { date: "2025-02-16", courseName: "EN101" },
        { date: "2025-02-17", courseName: "BIO101" },
        { date: "2025-02-17", courseName: "FYS101" },
        { date: "2025-02-18", courseName: "QU105" },
        { date: "2025-02-18", courseName: "CHE101" },
        { date: "2025-02-18", courseName: "EN101" },
        { date: "2025-02-19", courseName: "BIO101" },
        { date: "2025-02-19", courseName: "CHE101" },
        { date: "2025-02-19", courseName: "FYS101" },
        { date: "2025-02-20", courseName: "QU105" },
        { date: "2025-02-20", courseName: "EN101" },
        { date: "2025-02-20", courseName: "BIO101" },
      ],

      //USED FOR GRAPH
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
      compareBarLabel: "February Attendence",
      compareBarData: [600, 240, 240, 150, 130],

      //Default graph name, defined in component call
      graphTitle: "Attendance Graph",

      //PageOptions information
      pageName: "Attendance",
      //compare
      comparing: false,
      comparingType: 1, // value 1 means DATE compare, value 2 means COURSE compare,
      //date
      startDate: null,
      endDate: null,
      compareStartDate: null,
      duration: null,
      //course
      courseType: 0, //0 means all, 1 means specific course
      course: null,
      compareCourse: null,

      //USED FOR CSVDOWNLOAD
      //used for csv download
      CSVBarChartLabels: [],
      CSVBarData: [],
      //used for compare csv download
      compareCSVBarData: [],
    };
  }

  //update filter
  //called at updateDuration (runs every time a date is changed)
  //called at ____ to handle course changes
  updateFilter = () => {
    console.log("entered updateFilter()");
    //check HERE if an update is even possible
    //update regular data first, then check if compare is occuring
    var processedData = this.state.rawData; //begin with rawData, then filter before passing this processedData into the state vars used by the graph
    console.log("A processedData: ", processedData);

    //if start & end are not defined, no filtering can be done (In final, these should be defined on init)
    if (this.state.startDate == null || this.state.endDate == null) return;

    //filter date
    processedData = processedData.filter((entry) => {
      const entryDate = new Date(entry.date); //turns value of entry into date object
      return (
        entryDate >= new Date(this.state.startDate) && //after or on start date
        entryDate <= new Date(this.state.endDate) //before or on end date
      );
    });
    console.log("B processedData: ", processedData);

    // //filter course

    //update states
    //processedData should be processed to all params of the default data
    var newBarData = new Array(this.state.duration + 1); //+1 since indexing starts at 0
    var newBarLabel = new Array(this.state.duration + 1);
    var currDate = this.state.startDate; //will walk from start date to end
    //count occurences on each date
    while (currDate <= this.state.endDate && currDate >= this.state.startDate) {
      const onCurrDate = processedData.filter(
        (entry) => entry.date === currDate
      );
      const index = this.calcDuration(this.state.startDate, currDate); //duration from start to curr = index in arr
      newBarData[index] = onCurrDate.length;
      newBarLabel[index] = currDate;
      currDate = this.addDays(currDate, 1);
    }

    this.setState(
      {
        barChartLabels: newBarLabel,
        defaultBarData: newBarData,
      },
      () => {
        console.log("data updated successfully!");
      }
    );

    //update graphTitle
    const newGraphTitle =
      "Attendance data: " + this.state.startDate + " to " + this.state.endDate;
    this.setState({ graphTitle: newGraphTitle });
    //update X axis labels barChartLabels[duration]
  };

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
      this.updateFilter();
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
    //set end to given date
    this.setState({ endDate: Date }, () => {
      console.log("Updated endDate:", this.state.endDate);
      //make sure end is after start
      if (this.calcDuration(this.state.startDate, this.state.endDate) < 0) {
        this.handleStartDate(this.addDays(Date, -7));
      }

      this.updateDuration(); // Runs after state update
    });
  };

  handleCompareDate = (Date) => {
    this.setState({ compareStartDate: Date });
    console.log(Date);
  };
  //Course methods

  handleCourseType = (type) => {
    this.setState({ courseType: type });
    console.log("New type:", type);
  };

  createJSON() {
    this.state.CSVBarChartLabels = [
      "Month and Type",
      ...this.state.barChartLabels,
    ];
    this.state.CSVBarData = [
      this.state.defaultBarLabel,
      ...this.state.defaultBarData,
    ];

    //console.log("Labels:" ,this.state.CSVBarChartLabels);
    //console.log("Data:" ,this.state.CSVBarData);

    if (this.state.comparing) {
      this.state.compareCSVBarData = [
        this.state.compareBarLabel,
        ...this.state.compareBarData,
      ];
      //console.log("Data2:" ,this.state.compareCSVBarData);

      let convertedData = this.state.CSVBarChartLabels.reduce(
        (obj, label, index) => {
          obj[label] = this.state.CSVBarData[index];
          //console.log("originally thingy ",obj[label]);
          return obj;
        },
        {}
      );
      let compareConvertedData = this.state.CSVBarChartLabels.reduce(
        (obj, label, index) => {
          obj[label] = this.state.compareCSVBarData[index];
          //console.log("compare thingys ",obj[label]);
          return obj;
        },
        {}
      );
      //console.log("what is in testy?: ",testy)
      return [convertedData, compareConvertedData];
    } else {
      let convertedData = this.state.CSVBarChartLabels.reduce(
        (obj, label, index) => {
          obj[label] = this.state.CSVBarData[index];
          //console.log(obj[label]);
          return obj;
        },
        {}
      );
      return [convertedData];
    }
  }

  //Download CSV handler
  handleDownloadCSV = () => {
    console.log("clicked");
    const elements = this.createJSON();
    const labels = this.state.CSVBarChartLabels;

    //console.log('Elements:', elements);
    //console.log('Labels:', labels);
    // Function to initiate CSV download
    const csvData = convertJSONToCSV(elements, labels);

    // Check if CSV data is empty
    if (csvData === "") {
      alert("No data to export");
    } else {
      // Create CSV file and initiate download
      const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.setAttribute("download", "product_data.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  //Download PNG button handler
  handleDownloadImage = async () => {
    console.log("clicked");
    const element = document.getElementById("print"),
      canvas = await html2canvas(element),
      data = canvas.toDataURL("image/jpg"),
      link = document.createElement("a");

    link.href = data;
    link.download = "downloaded-image.jpg";

    document.body.appendChild(link);
    link.click();
  };

  render() {
    return (
      <div>
        <NavBar />

        <div className="attendance-page row ">
          {/* left menu component */}
          <div className="col-lg-3 options">
            <PageOptions
              //page info
              pageName={this.state.pageName}
              //compare info
              onComparisonToggle={this.handleComparisonToggle}
              onComparisonChange={this.handleComparisonType}
              comparingType={this.state.comparingType}
              comparing={this.state.comparing}
              //date info
              onStartDate={this.handleStartDate}
              onEndDate={this.handleEndDate}
              onCompareDate={this.handleCompareDate}
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              compareStartDate={this.state.compareStartDate}
              //course info
              courseType={this.state.courseType}
              onCourseType={this.handleCourseType}
              course={this.state.course}
              compareCourse={this.state.compareCourse}
            />
            {/* changes what filters & parameters data should be displayed */}
          </div>
          {/* right graphs & buttons */}
          <div className="col-lg-9 graph-box">
            <div id="print">
              <BargraphComp
                graphTitle={this.state.graphTitle}
                barChartLabels={this.state.barChartLabels}
                defaultBarLabel={this.state.defaultBarLabel}
                defaultBarData={this.state.defaultBarData}
                compareBarLabel={this.state.compareBarLabel}
                compareBarData={this.state.compareBarData}
                comparing={this.state.comparing}
              />
            </div>
            {/* displays data based on filters & params*/}

            {/* CSV BUTTON DOWNLOAD */}
            <button
              type="button"
              class="btn btn-download"
              onClick={this.handleDownloadCSV}
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
              onClick={this.handleDownloadImage}
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
