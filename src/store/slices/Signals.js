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
    data: "temperature",
    unit: "°C",
    labels: arrayTen,
    values: [],
    samplingTime: "1",
    color: "rgba(51, 214, 146, 1)",
  },
  {
    id: 2,
    name: "Beats Por Minuto",
    data: "bpm",
    unit: "bpm",
    labels: arrayTen,
    values: [],
    samplingTime: "1",
    color: "rgba(51, 214, 146, 1)",
  },
  {
    id: 3,
    name: "Saturación De Oxígeno",
    data: "oxigenSaturation",
    unit: "%",
    labels: arrayTen,
    values: [],
    samplingTime: "1",
    color: "rgba(51, 214, 146, 1)",
  },
  {
    id: 4,
    name: "GSR",
    data: "grsVoltage",
    unit: "V",
    labels: arrayThousands,
    values: [],
    samplingTime: "1",
    color: "rgba(51, 214, 146, 1)",
  },
  {
    id: 5,
    name: "Flujo De Aire",
    data: "airflux",
    unit: "m3/h",
    labels: arrayThousands,
    values: [],
    samplingTime: "1",
    color: "rgba(51, 214, 146, 1)",
  },
  {
    id: 6,
    name: "ECG",
    unit: "mV",
    labels: arrayThousands,
    values: [],
    samplingTime: "0.001",
    color: "rgba(51, 214, 146, 1)",
  },
];



export const signalsSlice = createSlice({
  name: "signals",
  initialState,
  reducers: {
    setInitSignals: (state, action) => {
      state=initialState;
      console.log(state)
    },
    setTime: (state, action) => {
      action.payload.forEach((signal) => {
        state.forEach((signalState) => {
          if (signalState.id === signal.id) {
            signalState.samplingTime = signal.samplingTime;
          }
        });
      });
    }
  },
});
export const { setTime,setInitSignals } = signalsSlice.actions;
export default signalsSlice.reducer;
