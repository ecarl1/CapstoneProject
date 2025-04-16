import React, { Component } from "react";
import NavBar from "./navBar";
import Footer from "./footer";
import axios from "axios";

class UploadPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      message: "",
      loading: false,
    };
  }

  handleFileChange = (event) => {
    this.setState({ file: event.target.files[0], message: "" });
  };

  handleUpload = async () => {
    if (!this.state.file) {
      this.setState({ message: "Please select a CSV file first." });
      return;
    }

    const formData = new FormData();
    formData.append("file", this.state.file);

    this.setState({ loading: true, message: "" });

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
      const parseResponse = await axios.post(
        "http://localhost:3000/api/session/sessions/parse-and-save",
        { filePath: uploadedPath }
      );

      this.setState({
        message: parseResponse.data.message || "Upload and parse successful!",
        loading: false,
      });
    } catch (error) {
      console.error("Error uploading or parsing:", error);
      this.setState({
        message: "Upload or parsing failed.",
        loading: false,
      });
    }
  };

  render() {
    return (
      <div>
        <NavBar />
        <div style={{ margin: "20px" }}>
          <input type="file" accept=".csv" onChange={this.handleFileChange} />
          <button
            type="button"
            className="btn btn-download"
            onClick={this.handleUpload}
            style={{ marginTop: "10px" }}
          >
            <h2>UPLOAD .CSV</h2>
          </button>

          {this.state.message && (
            <div style={{ marginTop: "10px", color: "red" }}>
              {this.state.message}
            </div>
          )}

          {this.state.loading && (
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0,0,0,0.6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1000,
              }}
            >
              <img src="/images/itisloading.png" alt="Uploading..." />
            </div>
          )}
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
