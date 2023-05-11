import React, { useContext } from "react";
import { useRef, useEffect } from "react";
import Signals from "../../store/slices/Signals";
import SignalController from "../../controllers/SignalController";
import { Line } from "react-chartjs-2";
import { config } from "../../controllers/configSignal";
import { useState } from "react";
import { appContext } from "../../pages/Home/Home";
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
  const clear = useContext(appContext);

  const chartRef = useRef();
  //FUNCION PARA LOS AJUSTES DE LA GRAFICA
  const { options, data } = config(signal);
  const [signalsObject, setSignalsObject] = useState(null);

  useEffect(() => {
    const chart = chartRef.current;
    const signalObj = new SignalController(chartRef.current, signal);
    const evento = `${signal.dataName}`;
    console.log(signalObj);
    if (socket) {
      socket.on(evento, (data) => {
        signalObj.ejecutor(data);
      });
    }
    setSignalsObject(signalObj);
  }, []);



  useEffect(() => {
    if (clear&&signalsObject) {
      console.log("clearing");
      signalsObject.clear();   
    }
  }, [clear,signalsObject]);

  return (
    <>
      <Line
        options={options}
        data={data}
        width={500}
        height={300}
        ref={chartRef}
      />
    </>
  );
}
