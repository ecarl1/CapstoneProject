const convertJSONToCSV = (jsonData, columnHeaders) => {
  if (!Array.isArray(jsonData) || jsonData.length === 0) {
    console.error(
      "convertJSONToCSV Error: Input data is not an array or is empty",
      jsonData
    );
    return "";
  }

  // Extract headers (column names) from the first object
  const keys = columnHeaders;

  // Initialize transposed data storage
  const transposedData = [];

  // First row should have column headers as the first column
  transposedData.push([
    "Label",
    ...jsonData.map((_, index) => `Dataset ${index + 1}`),
  ]);

  // Iterate over each key (original columns, now rows)
  keys.forEach((key) => {
    // Create a row where the first cell is the key (column name)
    const row = [key];

    // Push corresponding values from each dataset in jsonData
    jsonData.forEach((entry) => {
      row.push(entry[key] ?? ""); // Use empty string if value is undefined
    });

    transposedData.push(row);
  });

  // Convert the transposed array into CSV format
  return transposedData.map((row) => row.join(",")).join("\n");
};

export default convertJSONToCSV;
