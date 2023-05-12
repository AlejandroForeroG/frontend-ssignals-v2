import { useState, useContext,useEffect } from "react";
import { createContext } from "react";

const stateContext = createContext();
const setStateContext = createContext();
const socketContext = createContext();
export function useGlobalState() {
  return useContext(stateContext);
}
export function useSetGlobalState() {
  return useContext(setStateContext);
}

export function useSocket() {
    return useContext(socketContext);
}
export function ContextProvider(props) {


  return (
    <socketContext.Provider value={props.socket}>
      <stateContext.Provider value={props.state}>
        <setStateContext.Provider value={props.setState}>
          {props.children}
        </setStateContext.Provider>
      </stateContext.Provider>
    </socketContext.Provider>
  );
}
