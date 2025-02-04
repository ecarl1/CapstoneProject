import { Bar } from "react-chartjs-2"; //connects chart to React
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

export const Bargraph = () => {
  let barChartLabels = [
    "Rent",
    "Groceries",
    "Utilities",
    "Entertainment",
    "Transportation",
  ];

  let defaultBarLabel = "April Expenses";
  let defaultBarData = [160, 240, 130, 150, 600];

  let compareBarLabel = "May Expenses";
  let compareBarData = [600, 240, 240, 150, 130];

  let graphTitle = "Monthly Expenses";

  const barChartData = {
    labels: barChartLabels,
    datasets: [
      {
        label: defaultBarLabel,
        data: defaultBarData,
        borderWidth: 0,

        backgroundColor: paletteColors.mediumBlue,
        hoverBackgroundColor: paletteColors.navy,
      },
      {
        label: compareBarLabel,
        data: compareBarData,
        borderWidth: 0,

        backgroundColor: paletteColors.gold,
        hoverBackgroundColor: paletteColors.burntGold,
      },
    ],
  };

  //options is what gives it all of the styling. Some names hard coded in, will make vars later.

  const options = {
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
        text: graphTitle,
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

  //from ../fakeData, placeholder for now.
  const data = barChartData;

  return <Bar options={options} data={data} />;
};
