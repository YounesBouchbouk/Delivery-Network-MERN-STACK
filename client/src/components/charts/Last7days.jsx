import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { dateFormat } from "../../FormData";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
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
      display: true,
      text: "Derniere 7 jours",
    },
  },
};

// const labels = ["Today", "YesterDay", "March", "April", "May", "June", "July"];

const Last7days = () => {
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
        label: "colie",
        data: numbers,
        backgroundColor: "orange",
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
      <p className="text-sm font-robot m-1">Cette semain : </p>
      <div className="bg-orange-300 h-0.5"></div>

      {labels.length !== 0 && <Bar options={options} data={data} />}
    </div>
  );
};

export default Last7days;
