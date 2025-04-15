import { Line } from "react-chartjs-2"; //connects chart to React
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
  Title,
  Tooltip,
} from "chart.js"; //from chart library
import { fontString } from "chart.js/helpers";
import { paletteColors } from "./palette";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
  Title,
  Tooltip
);

class Linegraph extends React.Component {
  //RECIEVES ALL DATA FROM PARENT COMPONENT

  //controls the styling & features of the graph - should be the same for every graph, static
  getOptions = () => {
    return {
      responsive: true,
      plugins: {
        ticks: {
          font: {
            size: 40,
          },
        },
        legend: {
          position: "top",

          labels: {
            color: paletteColors.navy,

            font: {
              size: 20,
            },
          },
        },
        title: {
          display: true,
          text: this.props.graphTitle,
          position: "top",
          color: paletteColors.navy,

          font: {
            size: 45,
            color: paletteColors.navy,
          },
        },
      },
      grouped: true,
      offset: true,
      barPercentage: 1,
      //style options for the x axis (dates) at bottom of graph
      scales: {
        x: {
          grid: { display: true },
          ticks: {
            color: (context) => {
              return context.index % 2 === 0
                ? paletteColors.burntGold
                : paletteColors.gold; // Alternating colors
            },
            font: {
              size: 15,
            },
            //maxRotation: 0, // Prevents slanted text
            //minRotation: 0, // Forces text to stay horizontal
            align: "center",
            autoSkip: false,
            callback: function (value, index, values) {
              const label = this.getLabelForValue(value);
              // Check if label is defined and contains " vs "
              if (label && label.includes(" vs ")) {
                return label.split(" vs ");
              }
              return label; // Return label if it doesn't contain " vs "
            },
          },
        },
        y: {
          grid: { color: paletteColors.navy },
          ticks: {
            color: paletteColors.navy,
            beginAtZero: true, // Ensures the y-axis starts at 0
            stepSize: 1, // Sets the interval of ticks to 1 (whole numbers)

            font: {
              size: 25,
            },
          },
        },
      },
    };
  };

  //THIS can be dynamic, structures props to be read by the chart
  getData = () => {
    if (this.props.comparing) {
      return {
        // two data sets are being compared
        labels: this.props.xAxisLabels,
        datasets: [
          {
            //Confidence
            label: "Confidence",
            data: this.props.defaultConfidence,

            borderWidth: 2.5,
            borderColor: paletteColors.gold,
            backgroundColor: paletteColors.gold,

            hoverBackgroundColor: paletteColors.white,
          },
          {
            //Prep
            label: "Preperation",
            data: this.props.defaultPrep,

            borderWidth: 2.5,
            borderColor: paletteColors.mediumBlue,
            backgroundColor: paletteColors.mediumBlue,

            hoverBackgroundColor: paletteColors.white,
          },
          {
            //Confidence(compare)
            label: "Comparing Confidence",
            data: this.props.compareConfidence,

            borderWidth: 2.5,
            borderColor: paletteColors.burntGold,
            backgroundColor: paletteColors.burntGold,

            hoverBackgroundColor: paletteColors.white,
          },
          {
            //Prep (compare)
            label: "Comparing Preperation",
            data: this.props.comparePrep,

            borderWidth: 2.5,
            borderColor: paletteColors.navy,
            backgroundColor: paletteColors.navy,

            hoverBackgroundColor: paletteColors.white,
          },
        ],
      };
    } else {
      return {
        //only one type of data should be displayed
        labels: this.props.xAxisLabels,
        datasets: [
          {
            //Confidence
            label: "Confidence",
            data: this.props.defaultConfidence,

            borderWidth: 2.5,
            borderColor: paletteColors.gold,
            backgroundColor: paletteColors.gold,

            hoverBackgroundColor: paletteColors.white,
          },
          {
            //Prep
            label: "Preperation",
            data: this.props.defaultPrep,

            borderWidth: 2.5,
            borderColor: paletteColors.mediumBlue,
            backgroundColor: paletteColors.mediumBlue,

            hoverBackgroundColor: paletteColors.white,
          },
        ],
      };
    }
  };

  render() {
    return <Line options={this.getOptions()} data={this.getData()} />;
    // return <p> TITLE: {this.state.graphTitle}</p>;
  }
} //end react component

export default Linegraph;
