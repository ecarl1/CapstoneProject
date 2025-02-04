import React, { Component } from "react";
import NavBar from "./navBar";
import Footer from "./footer";
import PageOptions from "./pageOptions";
// import { Bargraph } from "./Bar.js";
import BargraphComp from "./Bar.js";

class AttendancePage extends Component {
  render() {
    return (
      <div>
        <NavBar />

        <div className="attendance-page row">
          {/* left menu component */}
          <div className="col-lg-3">
            <PageOptions />
            {/* changes what filters & parameters data should be displayed */}
          </div>
          {/* right graphs & buttons */}
          <div className="col-lg-9 graph-box">
            <BargraphComp graphTitle={"HELLO"} />
            {/* displays data based on filters & params*/}

            {/* <Bargraph /> */}
            <button type="button" class="btn btn-download">
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
