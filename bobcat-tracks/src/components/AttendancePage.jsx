import React, { Component } from "react";
import NavBar from "./navBar";
import Footer from "./footer";
import PageOptions from "./pageOptions";
// import { Bargraph } from "./Bar.js";
import BargraphComp from "./Bar.js";
import html2canvas from "html2canvas";
import convertJSONToCSV from "./CSVDown.js"

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

      correctBarChartLabels: [],
      correctDefaultBarData: [],
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

  createJSON () {
    this.state.correctBarChartLabels = ["Month and Type", ...this.state.barChartLabels];
    this.state.correctDefaultBarData = [this.state.defaultBarLabel, ...this.state.defaultBarData];

    console.log("Labels:" ,this.state.correctBarChartLabels);
    console.log("Datat:" ,this.state.correctDefaultBarData);

    let convertedData = this.state.correctBarChartLabels.reduce((obj, label, index) => {
      obj[label] = this.state.correctDefaultBarData[index];
      console.log(obj[label]);
      return obj;
    }, {});
    return [convertedData]
  }
  
  //Download CSV handler
  handleDownloadCSV = () => {
    console.log("clicked");
    const elements = this.createJSON()
    const labels = this.state.correctBarChartLabels

    console.log('Elements:', elements);
    console.log('Labels:', labels);
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

            <div id = "print">
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
