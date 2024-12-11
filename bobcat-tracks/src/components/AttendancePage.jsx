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

        <div className="attendance-page">
          <div classname="row">
            {/* left menu component */}
            <div className="col-sm-3">
              <PageOptions />
            </div>
            {/* right graphs & buttons */}
            <div className="col-md-9">
              {/* this is what throws the runtime errors. it's always around a useref method*/}
              {/* <Bargraph /> */}
            </div>
          </div>
          {/* end row */}
        </div>
        {/* end attendance-page */}

        <Footer />
      </div>
      // end container
    );
  }
}

export default AttendancePage;
