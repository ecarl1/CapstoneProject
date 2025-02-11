import React, { Component } from "react";
import NavBar from "./navBar";
import Footer from "./footer";

class UploadPage extends Component {
  test = () => {
    console.log("activated test");
  };
  render() {
    return (
      <div>
        <NavBar />
        <button type="button" className="btn btn-download" onClick={this.test}>
          <h2>UPLOAD .CSV</h2>
        </button>

        <div className="uploadLog">
          <table className="uploadTable">
            <tr className="headerRow">
              <th className="uploadHeader">
                <h1>Date</h1>
              </th>
              <th className="uploadHeader">
                <h1>Name</h1>
              </th>
              <th className="uploadHeader">
                <h1>File Name</h1>
              </th>
            </tr>

            {/* loop through all the entries in UploadLog by date */}
          </table>
        </div>
        <Footer />
      </div>
      // end container
    );
  }
}

export default UploadPage;
