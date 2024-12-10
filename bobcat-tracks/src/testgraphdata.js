import { paletteColors } from "./components/palette";

export const barChartData = {
  labels: ["Rent", "Groceries", "Utilities", "Entertainment", "Transportation"],
  datasets: [
    {
      label: "April Expenses",
      data: [160, 240, 130, 150, 600],
      backgroundColor: paletteColors.mediumBlue,
      hoverBackgroundColor: paletteColors.navy,
    },
    {
      label: "May Expenses",
      data: [600, 240, 240, 150, 130],
      backgroundColor: paletteColors.gold,
      hoverBackgroundColor: paletteColors.burntGold,
    },
  ],
};
