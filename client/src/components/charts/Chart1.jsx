import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import axios from "axios";
import { dateFormat } from "../../FormData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
      text: "Chart.js Line Chart",
    },
  },
};

const Chart = () => {
  const [labels, setLabels] = useState([]);
  const [numbers, setnumbers] = useState([]);
  const [found, setFound] = useState(false);
  const fillchart = () => {
    let nb = [];

    labels.map(async (date) => {
      let response = await axios.get(`/foradmin/get/analytics/${date}`);

      nb.push(response.data.packagecount);
    });

    setnumbers(nb);
    setFound(true);
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Colie",
        data: numbers,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  useEffect(() => {
    let today = new Date();
    let last7days = [];
    for (let i = 1; i <= 6; i++) {
      last7days.unshift(dateFormat(today, "%Y-%m-%d", true));
      today = new Date(today.setDate(today.getDate() - 1));
    }
    setLabels(last7days);

    labels.length !== 0 && fillchart();
  }, []);

  useEffect(() => {
    fillchart();
  }, [found]);
  return (
    <div className="w-full">
      <p className="text-sm font-robot m-1">Cette année : </p>
      <div className="bg-orange-300 h-0.5"></div>
      <Line options={options} data={data} />
    </div>
  );
};

export default Chart;
