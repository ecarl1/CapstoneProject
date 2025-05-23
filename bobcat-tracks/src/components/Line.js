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
          onHover: (e, legendItem, legend) => {
            const index = legendItem.datasetIndex;
            const dataset = legend.chart.data.datasets[index];
            dataset.borderWidth = 6; // make it bold
            legend.chart.update();
          },
          onLeave: (e, legendItem, legend) => {
            const index = legendItem.datasetIndex;
            const dataset = legend.chart.data.datasets[index];
            dataset.borderWidth = 2.5; // reset to original width
            legend.chart.update();
          },

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
              const total = context.chart.data.labels.length;
              const maxVisible = 40;

              // Determine how often to skip if we have too many labels
              const skip =
                total > maxVisible ? Math.ceil(total / maxVisible) : 1;

              // Only color labels that match the skip pattern
              if (context.index % skip != 0) {
                return "transparent"; // or null, or 'rgba(0,0,0,0)' to hide
              }

              // Alternate colors for visible labels
              const visibleIndex = Math.floor(context.index / skip);
              return visibleIndex % 2 === 0
                ? paletteColors.burntGold
                : paletteColors.gold;
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
            pointHoverBorderWidth: 5,
            pointHoverRadius: 5,
          },
          {
            //Prep
            label: "Preparation",
            data: this.props.defaultPrep,

            borderWidth: 2.5,
            borderColor: paletteColors.mediumBlue,
            backgroundColor: paletteColors.mediumBlue,

            hoverBackgroundColor: paletteColors.white,
            pointHoverBorderWidth: 5,
            pointHoverRadius: 5,
          },
          {
            //Confidence(compare)
            label: "Comparing Confidence",
            data: this.props.compareConfidence,

            borderWidth: 2.5,
            borderColor: paletteColors.burntGold,
            backgroundColor: paletteColors.burntGold,

            hoverBackgroundColor: paletteColors.white,
            pointHoverBorderWidth: 5,
            pointHoverRadius: 5,
          },
          {
            //Prep (compare)
            label: "Comparing Preparation",
            data: this.props.comparePrep,

            borderWidth: 2.5,
            borderColor: paletteColors.navy,
            backgroundColor: paletteColors.navy,

            hoverBackgroundColor: paletteColors.white,
            pointHoverBorderWidth: 5,
            pointHoverRadius: 5,
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
            pointHoverBorderWidth: 5,
            pointHoverRadius: 5,
          },
          {
            //Prep
            label: "Preparation",
            data: this.props.defaultPrep,

            borderWidth: 2.5,
            borderColor: paletteColors.mediumBlue,
            backgroundColor: paletteColors.mediumBlue,

            hoverBackgroundColor: paletteColors.white,
            pointHoverBorderWidth: 5,
            pointHoverRadius: 5,
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
