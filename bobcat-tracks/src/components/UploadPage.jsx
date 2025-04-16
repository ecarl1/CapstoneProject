import React, { Component } from "react";
import NavBar from "./navBar";
import Footer from "./footer";
import axios from "axios";

class UploadPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
    };
  }

  handleFileChange = (event) => {
    this.setState({ file: event.target.files[0] });
  };

  handleUpload = async () => {
    if (!this.state.file) {
      alert("Please select a CSV file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", this.state.file);
    try {
      // STEP 1: Upload file to /uploads
      const uploadResponse = await axios.post(
        "http://localhost:3000/api/session/upload-file",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const uploadedPath = uploadResponse.data.filePath;
      console.log("Uploaded file path:", uploadedPath);

      // STEP 2: Call parse-and-save with filePath
      console.log("DDDD")
      const parseResponse = await axios.post(
        "http://localhost:3000/api/session/sessions/parse-and-save",
        { filePath: uploadedPath }
      );

      alert(parseResponse.data.message || "Upload and parse successful!");
    } catch (error) {
      console.error("Error uploading or parsing:", error);
      alert("Upload or parsing failed.");
    }
  };

  render() {
    return (
      <div>
        <NavBar />
        <div style={{ margin: "20px" }}>
          <input
            type="file"
            accept=".csv"
            onChange={this.handleFileChange}
          />
          <button
            type="button"
            className="btn btn-download"
            onClick={this.handleUpload}
            style={{ marginTop: "10px" }}
          >
            <h2>UPLOAD .CSV</h2>
          </button>
        </div>

        <div className="uploadLog">
          <table className="uploadTable">
            <thead>
              <tr className="headerRow">
                <th className="uploadHeader"><h1>Date</h1></th>
                <th className="uploadHeader"><h1>Name</h1></th>
                <th className="uploadHeader"><h1>File Name</h1></th>
              </tr>
            </thead>
          </table>
        </div>
        <Footer />
      </div>
    );
  }
}

export default UploadPage;
