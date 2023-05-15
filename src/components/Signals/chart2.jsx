import React, { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js";
import { config } from "../../controllers/configSignal";
import SignalController from "../../controllers/SignalController";
import {
  useGlobalState,
  useSetGlobalState,
  useSocket,
} from "../../context/contextProvider";

const LineGraph = ({ signal }) => {
  const chartRef = useRef();
  const state = useGlobalState();
  const socket = useSocket();
  const [signalsObject, setSignalsObject] = useState({});

  useEffect(() => {
    const myChartRef = chartRef.current.getContext("2d");
    const graph = new Chart(myChartRef, {
      type: "line",
      data: {
        //Bring in data
        labels: signal.labels,
        datasets: [
          {
            label: "",
            data: [],
            borderColor: "rgba(51, 214, 146, 1)",
            backgroundColor: "rgba(51, 214, 146, 0.7)"
          },
        ],
      },
      options: {
        responsive: true,
        animation: false,
        elements: {
          point: {
            radius: 0,
          },
        },
      },
    });
    const signalObj = new SignalController(graph, signal);
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

  return <canvas id="myChart" ref={chartRef} height={300} width={470} />;
};

export default LineGraph;
