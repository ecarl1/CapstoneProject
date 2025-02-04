import React, { Component } from "react";
import NavBar from "./navBar";
import Footer from "./footer";
import PageOptions from "./pageOptions";
import { Bargraph } from "./Bar.js";

class AttendancePage extends Component {
  render() {
    return (
      <div>
        <NavBar />

        <div className="attendance-page row">
          {/* left menu component */}
          <div className="col-lg-3">
            <PageOptions />
          </div>
          {/* right graphs & buttons */}
          <div className="col-lg-9 graph-box">
            {/* this is what throws the runtime errors. it's always around a useref method*/}
            <Bargraph graphTitle={"HelloWorld"} />
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
