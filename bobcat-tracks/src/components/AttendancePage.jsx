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
        //alert("Request successful!");

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
        //{ date: "2025-02-17", courseName: "BIO101" },
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
      xAxisLabels: [
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
      startDate: "2025-01-01",
      endDate: "2025-01-01",
      compareStartDate: "2025-01-01",
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
  //needs to be called whenever a state changes, so probably in all the handlers
  //when any one param is changed, all filtering needs to be re-done (otherwise the filters will stack)
  updateFilter = () => {
    console.log("entered updateFilter()");

    //begin with rawData, which will then be filtered according to params
    var processedData = this.state.rawData;
    var processedCompareData = this.state.rawData;

    //processed data vars above will be tallied per date & stored in the below arrays, which will be what gets passed to the graph
    //console.log("duration:", this.state.duration);
    var newBarData = new Array(this.state.duration + 1); //+1 since indexing starts at 0
    var newCompareBarData = new Array(this.state.duration + 1); //+1 since indexing starts at 0

    //this is the X label array (text that will be below each bar)
    var newXLabel = new Array(this.state.duration + 1);

    //if start & end are not defined, no filtering can be done (In final, these should be defined on init with most recent week in DB)
    if (this.state.startDate == null || this.state.endDate == null) return;

    const startDate = this.state.startDate;
    const endDate = this.state.endDate;
    const compareStartDate = this.state.compareStartDate;
    const compareEndDate = this.addDays(
      this.state.compareStartDate,
      this.state.duration
    );

    const courseType = this.state.courseType;
    const course = this.state.course;
    const compareCourse = this.state.compareCourse;

    const duration = this.state.duration;
    console.log("filter Duration: ", duration);

    console.log(
      "start, end, compare start, compare end ",
      startDate,
      endDate,
      compareStartDate,
      compareEndDate
    );

    //PROCESSING DEFAULT DATA
    //filter date on defaultData
    processedData = this.filterDates(processedData, startDate, endDate);
    console.log("end filterDates: ", processedData);

    // // //filter course on default Data
    processedData = this.filterCourses(processedData, courseType, course);
    console.log("end filterCourses: ", processedData);

    //Now that processedData is filtered, we need to count occurances on each date
    console.log("starting dataToCountArray");
    newBarData = this.dataToCountArray(startDate, endDate, processedData);
    console.log("end dataToCountArray", newBarData);

    //change X axis to reflect the dates. Append is FALSE because we aren't adding to an existing label (the compare WILL add to an existing label- the one made here!)
    console.log("starting create X labels");
    newXLabel = this.createXaxisLabels(startDate, endDate, false, null);
    console.log("newXlabel after default ", newXLabel);

    // //PROCESSING COMPARE DATA
    // //this is a little trickier because there are 2 different ways to compare (date & time)

    // //if we are comparing
    if (this.state.comparing) {
      //if we are comparing DATES
      //should have the same COURSE filter as default data, but a different DATE filter.

      //DATE comparison
      if (
        this.state.comparingType == 1 &&
        this.state.compareStartDate != null
      ) {
        //comparing dates specifically
        //filter date on defaultData
        processedCompareData = this.filterDates(
          processedCompareData,
          this.state.compareStartDate,
          this.addDays(this.state.compareStartDate, this.state.duration)
        );

        // //filter course on default Data
        processedCompareData = this.filterCourses(
          processedCompareData,
          courseType,
          course
        );

        //Now that processedData is filtered, we need to count occurances on each date
        newCompareBarData = this.dataToCountArray(
          this.state.compareStartDate,
          this.addDays(this.state.compareStartDate, this.state.duration),
          processedCompareData
        );
        //change X axis to reflect the dates. Append is FALSE because we aren't adding to an existing label (the compare WILL add to an existing label- the one made here!)
        newXLabel = this.createXaxisLabels(
          this.state.compareStartDate,
          this.addDays(this.state.compareStartDate, this.state.duration),
          true,
          newXLabel
        );

        console.log("newXlabel after compare ", newXLabel);
      }
      if (this.state.comparingType == 2 && this.state.compareCourse != null) {
        //should have the same DATE filter as default data, but a different COURSE filter.
        console.log("step 1", startDate, endDate, processedCompareData);

        processedCompareData = this.filterDates(
          processedCompareData,
          startDate,
          endDate
        );

        console.log("step 2", processedCompareData);

        //different COURSE filtering - cannot be "all", so pass 1 in manually
        processedCompareData = this.filterCourses(
          processedCompareData,
          1,
          compareCourse
        );
        console.log("step 3", processedCompareData);

        //compare data should be properly filtered.
        newCompareBarData = this.dataToCountArray(
          startDate,
          endDate,
          processedCompareData
        );
        console.log("step 4", processedCompareData);
        console.log("step 4 data", newCompareBarData);

        //X axis does not need updating
      }
    }

    /* //THESE SHOULD ALL BE UPDATED & READY
    // var newBarData;
    // var newCompareBarData;
    // var newXLabel;*/

    console.log("newCompareBarData: ", newCompareBarData);
    console.log("newBarData: ", newBarData);

    // //need to update titles
    // //defaultBarLabel compareBarLabel

    var newGraphTitle = "";
    var newDefaultTitle = "";
    var newCompareTitle = "";

    if (this.state.comparing) {
      //comparing 2 dates
      if (this.state.comparingType == 1) {
        newGraphTitle =
          "Attendance Data: " +
          this.state.startDate +
          " VS " +
          this.state.compareStartDate +
          " for " +
          this.state.duration +
          "days";

        newDefaultTitle = "start:" + this.state.startDate;
        newCompareTitle = "start:" + this.state.compareStartDate;
      }
      //comparing 2 courses
      if (this.state.comparingType == 2) {
        const inputString =
          this.state.courseType == 0 ? "All courses" : this.state.course;
        newGraphTitle =
          "Attendance Data: " +
          inputString +
          " VS " +
          this.state.compareCourse +
          " starting on " +
          startDate;

        newDefaultTitle = inputString;
        newCompareTitle = this.state.compareCourse;
      }
    } //not comparing
    else {
      newDefaultTitle = "start:" + this.state.startDate;
      newGraphTitle =
        "Attendance Data: " +
        this.state.startDate +
        " for " +
        this.state.duration +
        "days";
    }

    //SET STATE WITH ALL UPDATED VARS
    console.log("starting state change on Filter");
    this.setState(
      {
        xAxisLabels: newXLabel, //adjusts X axis labels
        defaultBarData: newBarData,
        compareBarData: newCompareBarData,
        graphTitle: newGraphTitle,
        defaultBarLabel: newDefaultTitle,
        compareBarLabel: newCompareTitle,
      },
      () => {
        console.log("data updated successfully! (END FILTER)");
      }
    );
    console.log(" (END FILTER)");
  };

  filterDates = (objectArr, startDate, endDate) => {
    console.log("enter filterDates");
    return objectArr.filter((entry) => {
      const entryDate = new Date(entry.date + "T00:00:00Z"); //turns value of entry into date object
      return (
        entryDate >= new Date(startDate + "T00:00:00Z") && //after or on start date
        entryDate <= new Date(endDate + "T00:00:00Z") //before or on end date
      );
    });
  };

  filterCourses = (objectArr, courseType, course) => {
    console.log("enter filterCourses");
    console.log(
      `Object Arr: ${objectArr}, Course Type: ${courseType}, Course: ${course}`
    );
    if (courseType == 1) {
      return objectArr.filter((entry) => {
        return entry.courseName == course;
      });
    }
    return objectArr;
  };

  dataToCountArray = (start, end, data) => {
    console.log("enter dataCountToArray");
    var returnData = new Array(this.state.duration + 1); //+1 since indexing starts at 0
    var currDate = start; //will walk from start date to end

    //count occurences on each date
    while (currDate >= start && currDate <= end) {
      const onCurrDate = data.filter((entry) => entry.date === currDate);
      const index = this.calcDuration(start, currDate); //duration from start to curr == index in arr because I'm a genius
      returnData[index] = onCurrDate.length; //puts the sum of how many entries are on that date in that index of the array (which is what actually is passed to the graph)
      //returnXLabel[index] = Xlabel[index] + " vs " + currDate; // X label will be each date
      currDate = this.addDays(currDate, 1); //increment currDate by adding a day
    }
    console.log("returning dataCountToArray");

    return returnData;
  };
  createXaxisLabels = (start, end, append, Xlabel) => {
    var returnXLabel = new Array(this.state.duration + 1); //+1 since indexing starts at 0
    var currDate = start; //will walk from start date to end

    // for (var i; i <= this.state.duration; i++) {
    //   var currDate = this.addDays(start, i);
    //   returnXLabel[i] = append ? Xlabel[i] + " vs " + currDate : currDate;
    //   //currDate = this.addDays(currDate, 1); //increment currDate by adding a day
    // }

    while (currDate >= start && currDate <= end) {
      console.log(currDate);
      const index = this.calcDuration(start, currDate); //duration from start to curr == index in arr because I'm a genius
      returnXLabel[index] = append
        ? Xlabel[index] + " vs " + currDate
        : currDate;
      currDate = this.addDays(currDate, 1); //increment currDate by adding a day
    }

    console.log("create return ", returnXLabel);
    return returnXLabel;
  };

  //Compare settings
  handleComparisonToggle = (isChecked) => {
    console.log("handleComparisonToggle called with:", isChecked);
    console.log("Previous state:", this.state.comparing);

    this.setState({ comparing: isChecked }, () => {
      console.log(
        "calling updateFilter, new state comparing: ",
        this.state.comparing
      );
      this.updateFilter();
    });

    console.log("compare toggled, state update requested:");
  };

  handleComparisonType = (value) => {
    this.setState({ comparingType: value }, () => {
      this.updateFilter();
    });
    console.log(value);
  };

  //Date methods
  calcDuration = (start, end) => {
    start = new Date(start + "T00:00:00Z");
    end = new Date(end + "T00:00:00Z");
    let days = end.getTime() - start.getTime();
    days = days / (1000 * 3600 * 24); //convert miliseconds to days
    days = Math.floor(days); //whole number

    return days;
  };

  addDays = (start, add) => {
    let newDate = new Date(start + "T00:00:00Z"); // Create a new Date object from the input
    start = newDate;
    newDate.setDate(newDate.getDate() + add + 0.5); // Modify the date
    newDate = newDate.toISOString().split("T")[0];

    //console.log("ADD DATE start " + start + " add " + add + " new " + newDate);

    //needed because March 9th is longer than 1 day (daylight savings) and shit gets WHACK if this isn't here (infinite loop of march 9ths)
    if (start.getMonth() === 2 && start.getDate() === 9) {
      //console.log(" START DATE" + start + " MAR 9th");
      add = add;
      return this.addDays("2025-03-10", add);
    }
    return newDate; // Format as "YYYY-MM-DD"
  };

  updateDuration = () => {
    console.log(
      "enter updateDuration: ",
      this.state.startDate,
      " ",
      this.state.endDate
    );
    // console.log("start:", this.state.startDate);
    // console.log("end:", this.state.endDate);
    //console.log("test:" + (this.state.startDate && this.state.endDate));

    if (this.state.startDate != null && this.state.endDate != null) {
      console.log("true, end and start defined");
      let days = this.calcDuration(this.state.startDate, this.state.endDate);
      console.log("Duration calc : ", days);

      this.setState({ duration: days }, () => {
        this.updateFilter();
      });
      console.log("Duration set : ", days);
    }

    console.log("End updateDuration");
  };

  handleStartDate = (Date) => {
    //set start date to given date
    this.setState({ startDate: Date }, () => {
      // console.log("Updated start:", this.state.startDate);
      // console.log(
      //   "Duration handleEndDate check: ",
      //   this.calcDuration(this.state.startDate, this.state.endDate)
      // );
      //make sure end date is before start
      if (this.calcDuration(this.state.startDate, this.state.endDate) < 0) {
        this.handleEndDate(this.addDays(Date, 7));
      } else {
        this.updateDuration();
      }
    });
  };

  handleEndDate = (Date) => {
    //set end to given date
    this.setState({ endDate: Date }, () => {
      //console.log("Updated endDate:", this.state.endDate);
      // console.log(
      //   "Duration handleEndDate check: ",
      //   this.calcDuration(this.state.startDate, this.state.endDate)
      // );
      //make sure end is after start
      if (this.calcDuration(this.state.startDate, this.state.endDate) < 0) {
        this.handleStartDate(this.addDays(Date, -7));
      } else {
        this.updateDuration(); // Runs after state update
      }
    });
  };

  handleCompareDate = (Date) => {
    // this.setState({ compareStartDate: Date });
    // console.log(Date);
    // ////this.updateFilter();

    //make sure updateFilter() is a callback of the state update so that it WAITS until state is done updating to run
    this.setState({ compareStartDate: Date }, () => {
      this.updateFilter();
    });
  };
  //Course methods

  handleCourseType = (type) => {
    this.setState({ courseType: type }, () => {
      this.updateFilter();
    });
    console.log("New type:", type);
  };

  handleCourseChange = (course) => {
    this.setState({ course: course }, () => {
      this.updateFilter();
    });
    console.log("New course:", course);
  };

  handleCompareCourseChange = (course) => {
    this.setState({ compareCourse: course }, () => {
      this.updateFilter();
    });
    console.log("New compare course:", course);
  };

  //download method

  createJSON() {
    this.state.CSVBarChartLabels = [
      "Month and Type",
      ...this.state.xAxisLabels,
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
              onCourseChange={this.handleCourseChange}
              onCompareCourseChange={this.handleCompareCourseChange}
            />
            {/* changes what filters & parameters data should be displayed */}
          </div>
          {/* right graphs & buttons */}
          <div className="col-lg-9 graph-box">
            <div id="print">
              <BargraphComp
                graphTitle={this.state.graphTitle}
                xAxisLabels={this.state.xAxisLabels}
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
