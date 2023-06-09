import { useRef, useEffect } from "react";
import Signals from "../../store/slices/Signals";
import SignalController from "../../controllers/SignalController";
import { Line } from "react-chartjs-2";
import { config } from "../../controllers/configSignal";
import { useState } from "react";

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
  const state = useGlobalState();
  const socket = useSocket();
  const chartRef = useRef(null);
  const { options, data } = config(signal);
  const [signalsObject, setSignalsObject] = useState({});

  useEffect(() => {
    const chart = chartRef.current;
    const signalObj = new SignalController(chart, signal);
    console.log(chart);
    if (socket) {
      socket.on("rasberry:data", (data) => {
        signalObj.setNextValue(parseFloat(data[signal.dataName]));
      });
    }
    setSignalsObject(signalObj);
    return () => {
      if (socket) {
        socket.off("rasberry:data");
      }
      signalObj.destroy();
    };
  }, []);

  useEffect(() => {
    if (state == 0 && signalsObject) {
      console.log("parando");
      signalsObject.stop();
    }
    if (state == 1 && signalsObject) {
      console.log("Iniciando");
      signalsObject.start();
    }
    if (state == 2 && signalsObject) {
      console.log("reiniciando");
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
