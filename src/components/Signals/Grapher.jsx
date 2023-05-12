import React, { useContext } from "react";
import { useRef, useEffect } from "react";
import Signals from "../../store/slices/Signals";
import SignalController from "../../controllers/SignalController";
import { Line } from "react-chartjs-2";
import { config } from "../../controllers/configSignal";
import { useState } from "react";
import { appContext } from "../../pages/Home/Home";
import {
  useGlobalState,
  useSetGlobalState,
  useSocket,
} from "../../context/contextProvider";
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

export function Grapher({ signal }) {
  const id = signal.id;
  // const state = useContext(appContext);
  const state = useGlobalState();
  const chartRef = useRef(null);
  const socket = useSocket();
  //FUNCION PARA LOS AJUSTES DE LA GRAFICA
  const { options, data } = config(signal);
  const [signalsObject, setSignalsObject] = useState({});

  useEffect(() => {
    const chart = chartRef.current;
    const signalObj = new SignalController(chart, signal);
    const evento = `${signal.dataName}`;

    if (socket) {
      socket.on("rasberry:data", (data) => {
        // const datos = data
        signalObj.ejecutor(parseFloat(data[signal.dataName]));
      });
    }
    setSignalsObject(signalObj);
    return () => {
      if (socket) {
        socket.off("rasberry:data");
        signalObj.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (state && signalsObject) {
      console.log("clearing");
      signalsObject.clear();
    }
  }, [state, signalsObject]);

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
