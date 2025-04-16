import React, { Component } from "react";
import NavBar from "./navBar.jsx";
import Footer from "./footer.jsx";
import PageOptions from "./pageOptions.jsx";
// import { Bargraph } from "./Bar.js";
import BargraphComp from "./Bar.js";
import html2canvas from "html2canvas";
import convertJSONToCSV from "./CSVDown.js";
import axios from "axios";
import Linegraph from "./Line.js";

const url = "http://localhost:3000/api/CPT/sessions/details";

class CPTPage extends Component {
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
    const getCPT = async () => {
      try {
        console.log("Fetching CPT...");

        const response = await axios.get(`${url}`);

        console.log("CPT fetched successfully:", response.data);
        this.setState({ rawData: response.data }, () => {
          //console.log("CPT DATA: ", this.state.rawData);
          this.initDates();
        });
      } catch (error) {
        console.error("Error fetching CPT:", error);
        this.setState({ error: "Failed to fetch CPT." });
      }
    };

    this.state = {
      //
      rawData: [],

      //USED FOR GRAPH
      xAxisLabels: [],
      //Should be default graph name
      defaultBarLabel: "",
      defaultBarData: [],

      //CAMRYN -  here is data for confidence and prep from default params
      defaultConfidence: [1, 2, 3, 0, 12, 4],
      defaultPrep: [4, 5, 6, 10, 2, 5],

      //name of what is being compared & param
      compareBarLabel: "",
      compareBarData: [],

      //CAMRYN -  here is data for confidence and prep from comparison params
      compareConfidence: [],
      comparePrep: [],

      //Default graph name, defined in component call
      graphTitle: "Confidence/Prep/Topic Graph",

      //PageOptions information
      pageName: "CPT",
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

      //topics
      topics: [],

      //USED FOR CSVDOWNLOAD
      //used for csv download
      CSVBarChartLabels: [],
      CSVBarData: [],
      //used for compare csv download
      compareCSVBarData: [],
    };
    getCPT();
  }

  //init dates based on most recent date in data
  initDates = () => {
    let mostRecent = this.state.rawData[0].date;
    for (let i = 1; i < this.state.rawData.length; i++) {
      const currDate = this.state.rawData[i].date;
      if (this.calcDuration(mostRecent, currDate) > 0) {
        mostRecent = currDate;
      }
    }

    let start = this.addDays(mostRecent, -7);
    let end = mostRecent;

    this.handleStartDate(start);
    this.handleEndDate(end);
    this.handleCompareDate(start);
  };

  //update filter
  //needs to be called whenever a state changes, so probably in all the handlers
  //when any one param is changed, all filtering needs to be re-done (otherwise the filters will stack)
  updateFilter = () => {
    console.log("entered updateFilter()");
    console.log(this.state.rawData);

    //begin with rawData, which will then be filtered according to params
    var processedData = this.state.rawData;
    var processedCompareData = this.state.rawData;

    //processed data vars above will be tallied per date & stored in the below arrays, which will be what gets passed to the graph
    //console.log("duration:", this.state.duration);
    var newConfidence = new Array(this.state.duration + 1); //+1 since indexing starts at 0
    var newPrep = new Array(this.state.duration + 1); //+1 since indexing starts at 0

    var newCompareConfidence = new Array(this.state.duration + 1); //+1 since indexing starts at 0
    var newComparePrep = new Array(this.state.duration + 1); //+1 since indexing starts at 0

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
    processedData = this.filterCourses(
      processedData,
      courseType,
      this.state.course
    );
    console.log("end filterCourses: ", this.state.course, processedData);

    //FILTER BY TOPIC
    if (this.state.topics.length != 0) {
      processedData = this.filterTopic(processedData, this.state.topics);
      processedCompareData = this.filterTopic(
        processedCompareData,
        this.state.topics
      );
    }

    //Now that processedData is filtered, we need to count occurances on each date
    console.log("starting dataToCountArray");
    newConfidence = this.dataCountToAverageArray(
      startDate,
      endDate,
      processedData,
      "confidence"
    );
    newPrep = this.dataCountToAverageArray(
      startDate,
      endDate,
      processedData,
      "prep"
    );
    console.log("end dataToCountArray", newConfidence);

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
        newCompareConfidence = this.dataCountToAverageArray(
          this.state.compareStartDate,
          this.addDays(this.state.compareStartDate, this.state.duration),
          processedCompareData,
          "confidence"
        );
        newComparePrep = this.dataCountToAverageArray(
          this.state.compareStartDate,
          this.addDays(this.state.compareStartDate, this.state.duration),
          processedCompareData,
          "prep"
        );
        //change X axis to reflect the dates. Append is FALSE because we aren't adding to an existing label (the compare WILL add to an existing label- the one made here!)
        newXLabel = this.createXaxisLabels(
          this.state.compareStartDate,
          compareEndDate,
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
        newCompareConfidence = this.dataCountToAverageArray(
          startDate,
          endDate,
          processedCompareData,
          "confidence"
        );
        newComparePrep = this.dataCountToAverageArray(
          startDate,
          endDate,
          processedCompareData,
          "prep"
        );
        console.log("step 4", processedCompareData);
        console.log("step 4 data", newCompareConfidence);

        //X axis does not need updating
      }
    }

    /* //THESE SHOULD ALL BE UPDATED & READY
    // var newBarData;
    // var newCompareConfidence;
    // var newXLabel;*/

    // console.log("newCompareConfidence: ", newCompareConfidence);
    // console.log("newBarData: ", newBarData);

    // //need to update titles
    // //defaultBarLabel compareBarLabel

    var newGraphTitle = "";
    var newDefaultTitle = "";
    var newCompareTitle = "";

    if (this.state.comparing) {
      //comparing 2 dates
      if (this.state.comparingType == 1) {
        newGraphTitle =
          "Average Confidence/Prep per topics " +
          this.state.topics +
          " Data: " +
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
          "Average Confidence/Prep for topics " +
          this.state.topics +
          " Data: " +
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
        "Average Confidence/Prep for " +
        this.state.topics +
        " : " +
        this.state.startDate +
        " for " +
        this.state.duration +
        "days";
    }

    //SET STATE WITH ALL UPDATED VARS
    console.log("starting state change on Filter");
    console.log(
      "DATA LENGTHS : default ",
      newPrep.length,
      newConfidence.length,
      " COMPARE : ",
      newCompareConfidence.length,
      newComparePrep.length
    );
    this.setState(
      {
        xAxisLabels: newXLabel, //adjusts X axis labels
        defaultConfidence: newConfidence,
        defaultPrep: newPrep,
        compareConfidence: newCompareConfidence,
        comparePrep: newComparePrep,
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
    console.log(objectArr);
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
        return entry.course == course;
      });
    }
    return objectArr;
  };

  filterTopic = (objectArr, topics) => {
    console.log("enter filter topics");
    return objectArr.filter((entry) => {
      const entryTopics = entry.topic;
      //const topicsObject = { "topic1": true, "topic2": true, "topic3": true };
      //const searchArray = ["topic3", "topic4"]; == topics

      return topics.some((topic) => entryTopics[topic]);
      //const hasMatch = searchArray.some((topic) => topicsObject[topic]);

      //console.log(hasMatch); // true, because "topic3" exists in topicsObject
    });
  };

  dataCountToAverageArray = (start, end, data, target) => {
    console.log("enter dataCountToArray");
    var returnData = new Array(this.state.duration + 1); //+1 since indexing starts at 0
    var currDate = start; //will walk from start date to end

    //count occurences on each date
    while (currDate >= start && currDate <= end) {
      const onCurrDate = data.filter((entry) => entry.date === currDate);
      //onCurrDate is all data on current date- now we need the average
      var numEntries = onCurrDate.length;
      var dateTotal = 0;
      onCurrDate.forEach((element) => {
        switch (target) {
          case "confidence":
            switch (element.reported_confidence) {
              case "HIGH":
                dateTotal += 1;
              case "MEDIUM":
                dateTotal += 1;
              case "LOW":
                dateTotal += 1;
              default:
                break;
            }
            break; //end confidence case

          case "prep":
            switch (element.preparation) {
              case "VERY WELL PREPARED - all 3 elements plus self-reflection on learning or planning for independent study/work ":
                dateTotal += 1;
              case "WELL PREPARED - all 3 elements":
                dateTotal += 1;
              case "MODERATE - 2 of 3 elements":
                dateTotal += 1;
              case "MINIMAL - one of the 3 elements":
                dateTotal += 1;
              case "POOR - none of the 3 elements":
                dateTotal += 1;
              default:
                break;
            }
            break; //end prep case

          default:
            console.log("Improper target for dataCountToAverageArray");
        } //end target switch case
      });
      const index = this.calcDuration(start, currDate); //duration from start to curr == index in arr because I'm a genius

      numEntries === 0
        ? (returnData[index] = 0)
        : (returnData[index] = dateTotal / numEntries);
      //puts the sum of how many entries are on that date in that index of the array (which is what actually is passed to the graph)
      //returnXLabel[index] = Xlabel[index] + " vs " + currDate; // X label will be each date
      currDate = this.addDays(currDate, 1); //increment currDate by adding a day
    }
    console.log("returning dataCountToAverageArray");

    return returnData;
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
      //console.log(currDate);
      const index = this.calcDuration(start, currDate); //duration from start to curr == index in arr because I'm a genius
      // if (append && Xlabel[index] == undefined) return returnXLabel;
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

  //topic method
  handleTopicChange = (topic) => {
    this.setState({ topics: topic }, () => {
      this.updateFilter();
      console.log("New topics:", this.state.topics);
    });
    //console.log("New type:", this.state.topics);
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
              //Topic method
              onTopicChange={this.handleTopicChange}
              topics={this.state.topics}
            />
            {/* changes what filters & parameters data should be displayed */}
          </div>
          {/* right graphs & buttons */}
          <div className="col-lg-9 graph-box">
            <div id="print">
              {/* <BargraphComp
                graphTitle={this.state.graphTitle}
                xAxisLabels={this.state.xAxisLabels}
                defaultBarLabel={this.state.defaultBarLabel}
                defaultBarData={this.state.defaultBarData}
                compareBarLabel={this.state.compareBarLabel}
                compareBarData={this.state.compareBarData}
                comparing={this.state.comparing}
              /> */}
              <Linegraph
                graphTitle={this.state.graphTitle}
                xAxisLabels={this.state.xAxisLabels}
                comparing={this.state.comparing}
                defaultPrep={this.state.defaultPrep}
                defaultConfidence={this.state.defaultConfidence}
                comparePrep={this.state.comparePrep}
                compareConfidence={this.state.compareConfidence}
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
export default CPTPage;
