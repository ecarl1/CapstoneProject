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
      logs: [
        {
          name: "Sarah",
          date: "2025-04-15T10:30:00Z",
          filename: "report1.pdf",
        },
        {
          name: "Alex",
          date: "2025-04-14T14:20:00Z",
          filename: "data_export.csv",
        },
        {
          name: "Jamie",
          date: "2025-04-13T09:10:00Z",
          filename: "summary.docx",
        },
      ],
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
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0,0,0,0.6)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 1000,
                  color: "#fff",
                  textAlign: "center",
                }}
              >
                <img
                  src="/images/itisloading.png"
                  alt="Uploading..."
                  style={{ maxWidth: "200px", marginBottom: "20px" }}
                />
                <p style={{ fontSize: "1.5rem" }}>
                  Uploading in progress...
                  <br />
                  The page is temporarily disabled.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="uploadLog">
          <table className="uploadTable">
            <thead>
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
            </thead>
            <tbody className="tableBody">
              {this.state.logs.map((log, index) => (
                <tr key={index}>
                  <td>{new Date(log.date).toLocaleDateString()}</td>
                  <td>{log.name}</td>
                  <td>{log.filename}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Footer />
      </div>
    );
  }
}

export default UploadPage;
