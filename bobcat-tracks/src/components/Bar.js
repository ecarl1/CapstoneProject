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
State variables to control & what they do-

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
  constructor(props) {
    super(props);
    this.state = {
      barChartLabels: [
        "Rent",
        "Groceries",
        "Utilities",
        "Entertainment",
        "Transportation",
      ],
      //Should be default graph name
      defaultBarLabel: "April Expenses",
      defaultBarData: [160, 240, 130, 170, 600],

      //name of what is being compared & param
      compareBarLabel: "May Expenses",
      compareBarData: [600, 240, 240, 150, 130],

      //Default graph name, defined in component call
      graphTitle: props.graphTitle,

      comparing: false,
    };
  }

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
          text: this.state.graphTitle,
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
          grid: { display: false },
          ticks: {
            color: paletteColors.burntGold,
            font: {
              size: 35,
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

  //THIS can be dynamic
  getData = () => {
    if (this.state.comparing) {
      return {
        // two data sets are being compared
        labels: this.state.barChartLabels,
        datasets: [
          {
            label: this.state.defaultBarLabel,
            data: this.state.defaultBarData,
            borderWidth: 0,

            backgroundColor: paletteColors.mediumBlue,
            hoverBackgroundColor: paletteColors.navy,
          },
          {
            label: this.state.compareBarLabel,
            data: this.state.compareBarData,
            borderWidth: 0,

            backgroundColor: paletteColors.gold,
            hoverBackgroundColor: paletteColors.burntGold,
          },
        ],
      };
    } else {
      return {
        //only one type of data should be displayed
        labels: this.state.barChartLabels,
        datasets: [
          {
            label: this.state.defaultBarLabel,
            data: this.state.defaultBarData,
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
//
//ABOVE converted to a REACT component to allow for state & props to change & pass information
//
//
//BELOW first chart.js graph for attendance
//
//PROTOTYPE BELOW

// export const Bargraph = () => {
//   //these should be dates
//   let barChartLabels = [
//     "Rent",
//     "Groceries",
//     "Utilities",
//     "Entertainment",
//     "Transportation",
//   ];

//   //Should be default graph name
//   let defaultBarLabel = "April Expenses";
//   let defaultBarData = [160, 240, 130, 150, 600];

//   //name of what is being compared & param
//   let compareBarLabel = "May Expenses";
//   let compareBarData = [600, 240, 240, 150, 130];

//   //Default graph name
//   let graphTitle = "Monthly Expenses";

//   //Where the variables are packaged for the graph- simply combining previous variables into correct format
//   const barChartData = {
//     labels: barChartLabels,
//     datasets: [
//       {
//         label: defaultBarLabel,
//         data: defaultBarData,
//         borderWidth: 0,

//         backgroundColor: paletteColors.mediumBlue,
//         hoverBackgroundColor: paletteColors.navy,
//       },
//       {
//         label: compareBarLabel,
//         data: compareBarData,
//         borderWidth: 0,

//         backgroundColor: paletteColors.gold,
//         hoverBackgroundColor: paletteColors.burntGold,
//       },
//     ],
//   };

//   //options is what gives it all of the styling.
//   const options = {
//     responsive: true,
//     plugins: {
//       ticks: {
//         font: {
//           size: 40,
//         },
//       },
//       legend: {
//         position: "top",

//         labels: {
//           color: paletteColors.navy,

//           font: {
//             size: 20,
//           },
//         },
//       },
//       title: {
//         display: true,
//         text: graphTitle,
//         position: "top",
//         color: paletteColors.navy,

//         font: {
//           size: 45,
//           color: paletteColors.navy,
//         },
//       },
//     },
//     grouped: true,
//     offset: true,
//     barPercentage: 1,
//     scales: {
//       x: {
//         grid: { display: false },
//         ticks: {
//           color: paletteColors.burntGold,
//           font: {
//             size: 35,
//           },
//         },
//       },
//       y: {
//         grid: { color: paletteColors.navy },
//         ticks: {
//           color: paletteColors.navy,

//           font: {
//             size: 25,
//           },
//         },
//       },
//     },
//   };

//   //Created at top of page, data lives in this file
//   const data = barChartData;

//   //actual element created
//   return <Bar options={options} data={data} />;
// };
