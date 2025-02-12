import React from "react";

// Define the DownloadProducts component
// Function to convert JSON to CSV string
const convertJSONToCSV = (jsonData, columnHeaders) =>{
  // Check if JSON data is empty
  //console.log("Col headers:" ,columnHeaders); 
  //console.log("JSON Data:" ,jsonData) 
  if (jsonData || columnHeaders) {
    if (jsonData === 0) {
      console.log("No data in jsonData")
      return "";
    }
  
    // Create headers string
    const headers = columnHeaders.join(",") + "\n";
  
    // Map JSON data to CSV rows
    const rows = jsonData .map((row) => {
        // Map each row to CSV format
        return columnHeaders.map((field) => row[field] || "").join(",");
      })
      .join("\n");
  
  // Combine headers and rows
  return headers + rows;
  } 
}

export default convertJSONToCSV;