import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import moment from "moment/moment";
import { Line } from "react-chartjs-2";
ChartJS.register(
  Title,
  Tooltip,
  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler
);

const Linechart = ({ lineData }: any) => {
  const labels: any = [];
  const rainChance: any = [];
  const snowChance: any = [];
  const temperature: any = [];
  const uv: any = [];
  lineData.forEach((unit: any) => {
    labels.push(moment(unit.time).format("h A"));
    rainChance.push(unit.chance_of_rain);
    snowChance.push(unit.chance_of_snow);
    temperature.push(unit.temp_c);
    uv.push(unit.uv);
  });
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Rain chance",
        data: rainChance,
        borderColor: "#3b82f6",
        backgroundColor: "rgba(96, 165, 250, .5)",
        fill: true,
        tension: 0.3,
        pointBorderColor: "#fff",
        pointBackgroundColor: "#93c5fd",
      },
      {
        label: "Snow chance",
        data: snowChance,
        backgroundColor: "rgba(45, 212, 191, .5)",
        fill: true,
        borderColor: "#14b8a6",
        tension: 0.3,
        pointBorderColor: "#fff",
        pointBackgroundColor: "#5eead4",
      },
      {
        label: "Temperature",
        data: temperature,
        backgroundColor: "rgba(248, 113, 113, .5)",
        fill: true,
        borderColor: "#ef4444",
        tension: 0.3,
        pointBorderColor: "#fff",
        pointBackgroundColor: "#fca5a5",
      },
      {
        label: "UV",
        data: uv,
        backgroundColor: "rgba(251, 191, 36, .5)",
        fill: true,
        borderColor: "#f59e0b",
        tension: 0.3,
        pointBorderColor: "#fff",
        pointBackgroundColor: "#fcd34d",
      },
    ],
  };

  return (
    <div
      className="cursor-pointer max-w-full"
      style={{ maxWidth: "99%", height: "auto" }}
    >
      <Line data={chartData}></Line>
    </div>
  );
};

export default Linechart;
