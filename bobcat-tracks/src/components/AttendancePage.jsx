import React, { Component } from "react";
import NavBar from "./navBar";
import Footer from "./footer";
import PageOptions from "./pageOptions";

class AttendancePage extends Component {
  render() {
    return (
      <div>
        <NavBar />

        <div className="attendance-page">
          <div classname="row">
            {/* left menu component */}
            <div className="col-md-3">
              <PageOptions />
            </div>
            {/* right graphs & buttons */}
            <div className="col-md-9"></div>
          </div>
        </div>

        <Footer />
      </div>
      // end container
    );
  }
}

export default AttendancePage;
