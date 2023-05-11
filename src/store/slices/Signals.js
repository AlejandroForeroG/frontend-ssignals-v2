import { createSlice } from "@reduxjs/toolkit";

//TODO: conectarlo con la base de datos y condicionarlo

const arrayTen = Array.from(Array(10), (_, i) => (i + 1).toString());
const arrayHundred = Array.from(Array(100), (_, i) => (i + 1).toString());
const arrayThousands = Array.from(Array(1000), (_, i) => (i + 1).toString());

//estado inicial de las señales
const initialState = [
  {
    id: 1,
    name: "Temperatura",
    dataName: "temperature",
    unit: "°C",
    labels: arrayTen,
    values: [],
    samplingTime: "1",
    color: "rgba(51, 214, 146, 1)",
    isShort: "short",
  },
  {
    id: 2,
    name: "Beats Por Minuto",
    dataName: "bpm",
    unit: "bpm",
    labels: arrayTen,
    values: [],
    samplingTime: "1",
    color: "rgba(51, 214, 146, 1)",
    isShort: true,
  },
  {
    id: 3,
    name: "Saturación De Oxígeno",
    dataName: "oxigenSaturation",
    unit: "%",
    labels: arrayTen,
    values: [],
    samplingTime: "1",
    color: "rgba(51, 214, 146, 1)",
    isShort: true,
  },
  {
    id: 4,
    name: "GSR",
    dataName: "grsVoltage",
    unit: "V",
    labels: arrayHundred,
    values: [],
    samplingTime: "1",
    color: "rgba(51, 214, 146, 1)",
    isShort: false,
  },
  {
    id: 5,
    name: "Flujo De Aire",
    dataName: "airflux",
    unit: "m3/h",
    labels: arrayThousands,
    values: [],
    samplingTime: "1",
    color: "rgba(51, 214, 146, 1)",
    isShort: false,
  },
  {
    id: 6,
    name: "ECG",
    dataName:"ECG",
    unit: "mV",
    labels: arrayThousands,
    values: [],
    samplingTime: "0.001",
    color: "rgba(51, 214, 146, 1)",
    isShort: false,
  },
];

export const signalsSlice = createSlice({
  name: "signals",
  initialState,
  reducers: {
    setInitSignals: (state, action) => {
      state = initialState;
      
    },
    setTime: (state, action) => {
      action.payload.forEach((signal) => {
        state.forEach((signalState) => {
          if (signalState.id === signal.id) {
            signalState.samplingTime = signal.samplingTime;
          }
        });
      });
    },
  },
});
export const { setTime, setInitSignals, setObject } = signalsSlice.actions;
export default signalsSlice.reducer;
