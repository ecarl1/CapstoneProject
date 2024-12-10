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
import { barChartData } from "../testgraphdata";
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

export const BarChart = () => {
  const options = {};
  console.log(barChartData);
  return <Bar options={options} data={barChartData} />;
};
