import { paletteColors } from "./components/palette";

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

export function changeDefaultLabel(newLabel) {
  defaultBarLabel = newLabel;
}

export const barChartData = {
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

export const lineChartData = {
  labels: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ],
  datasets: [
    {
      label: "Steps by SeSe",
      data: [3000, 5000, 4500, 6000, 8000, 7000, 9000],
      borderColor: paletteColors.yorkBlue,
      backgroundColor: paletteColors.burntGold,
    },
    {
      label: "Steps by Camryn",
      data: [3500, 5500, 6000, 4000, 5000, 8000, 10000],
      borderColor: "pink",
      backgroundColor: "red",
    },
  ],
};

export const pieChartData = {
  labels: ["Facebook", "instagram", "Twitter", "YouTube", "LinkedIn"],
  datasets: [
    {
      label: "Time Spent",
      data: [120, 60, 30, 90, 45],
      backgroundColor: ["blue", "mediumpurple", "lightblue", "red", "green"],
      hoverOffset: 20,
    },
  ],
};
