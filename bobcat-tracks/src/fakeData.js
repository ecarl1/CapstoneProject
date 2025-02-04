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
