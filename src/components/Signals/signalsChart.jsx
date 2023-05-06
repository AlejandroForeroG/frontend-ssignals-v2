import React from "react";
import { useRef, useEffect } from "react";
import Signals from "../../store/slices/Signals";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line, getDatasetAtEvent } from "react-chartjs-2";

const ChartJS = Chart;

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export function Canvas(signal,onButtonClick) {
  const chartRef = useRef();

  useEffect(() => {
    const chart = chartRef.current;
    if (chart) {
      console.log(chart);
    }
  });


  const labels = signal.labels;
let options = {};
  if ((signal.isShort  )) {
    options = {
      responsive: true,
      type: "line",
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: false,
        },
      },
    };
  } else {
    options = {
      animation: false,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      elements: {
        point: {
          radius: 0,
        },

        responsive: true,
        type: "line",
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: false,
          },
        },
      },
    };
  }

  const data = {
    labels,
    datasets: [
      {
        data: [],
        fill: true,
        backgroundColor: "rgba(51, 214, 146, 0.7)",
      },
    ],
  };

  return (
    <>
    <Line
      options={options}
      data={data}
      width={500}
      height={300}
      ref={chartRef}
    />
      <button onClick={() => onButtonClick(chartRef.current)}>Actualizar data</button>
    </>
  );
}
