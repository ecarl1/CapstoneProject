import { Bar } from "react-chartjs-2"; //connects chart to React
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Legend,
  Title,
  Tooltip,
  scales,
} from "chart.js"; //from chart library
// import { barChartData } from "../fakeData";
import { fontString } from "chart.js/helpers";
import { paletteColors } from "./palette";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Legend,
  Title,
  Tooltip
);

//HOW TO USE BARGRAPH
/*
State variables to control & what they do- SET BY PROPS

barCharLabels : Label each value in horizontal axis. For our purposes, this should be the DATES
graphTitle: Overall title of the graph
comparing: Is the graph doing a comparison? False- only default data is shown. true, compare data also displayed.

defaultBarLabel : This labels this collection of data. Yet to determine policy.
defaultBarData: An array of the values in each col. Should have same quantity as the above defaultBarLabel

WHEN COMPARISON IS ON, defaultBarLabel & compareBarLabel should relate to what is being compared.
EX, if two courses are being compared, each BarLabel should be named after the two things being compared.

compareBarLabel : This labels this collection of data. Yet to determine policy.
compareBarData: An array of the values in each col. Should have same quantity as the above compareBarLabel
 */

class BargraphComp extends React.Component {
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
            label: this.props.defaultBarLabel,
            data: this.props.defaultBarData,
            borderWidth: 0,

            backgroundColor: paletteColors.mediumBlue,
            hoverBackgroundColor: paletteColors.navy,
          },
          {
            label: this.props.compareBarLabel,
            data: this.props.compareBarData,
            borderWidth: 0,

            backgroundColor: paletteColors.gold,
            hoverBackgroundColor: paletteColors.burntGold,
          },
        ],
      };
    } else {
      return {
        //only one type of data should be displayed
        labels: this.props.xAxisLabels,
        datasets: [
          {
            label: this.props.defaultBarLabel,
            data: this.props.defaultBarData,
            borderWidth: 0,

            backgroundColor: paletteColors.mediumBlue,
            hoverBackgroundColor: paletteColors.navy,
          },
        ],
      };
    }
  };

  render() {
    return <Bar options={this.getOptions()} data={this.getData()} />;
    // return <p> TITLE: {this.state.graphTitle}</p>;
  }
} //end react component

export default BargraphComp;
