import React from "react";
import { useRef, useEffect } from "react";
import Signals from "../../store/slices/Signals";
import SignalController from "../../controllers/SignalController";
import { Line } from "react-chartjs-2";
import { config } from "../../controllers/configSignal";
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

export function Grapher({ signal, socket }) {
  const id = signal.id;
  const chartRef = useRef();

  const { options, data } = config(signal);

  // useEffect(() => {
  //   const chart = chartRef.current;
  //   const signalObj = new SignalController(chartRef.current);
  //   const evento = `${signal.data}`;
  //   socket.on(evento, (data) => {
  //     console.log(data);
  //     signalObj.mensaje();
  //     return() =>{
  //       socket.off(evento);
  //     }
  //   },[]);
  // });

  return (
    <>
      <Line
        options={options}
        data={data}
        width={500}
        height={300}
        ref={chartRef}
      />
      <button
        onClick={() => {
          {
            console.log(signalObj);
          }
        }}
      >
        Actualizar data
      </button>
    </>
  );
}
