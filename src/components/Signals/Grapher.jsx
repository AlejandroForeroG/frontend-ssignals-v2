import React, { useContext } from "react";
import { useRef, useEffect } from "react";
import Signals from "../../store/slices/Signals";
import SignalController from "../../controllers/SignalController";
import { Line } from "react-chartjs-2";
import { config} from "../../controllers/configSignal";
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
  const {state,setState}= useContext(appContext);
  
  const chartRef = useRef(null);
  
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
        signalObj.setValue = data;
       
      });
    }
    setSignalsObject(signalObj);
    return () => {
      if (socket) {
        socket.off("rasberry:data ");
        signalObj.destroy();
      }
    }
   
  }, [ ]);



  useEffect(() => {
    if(state==1&&signalsObject){
      signalsObject.ejecutor();
    }else if (state==2&&signalsObject) {
      console.log("clearing");
      signalsObject.clear(); 
      setState(0);  
    }
  }, [state,signalsObject]);

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
