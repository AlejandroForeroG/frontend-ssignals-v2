import styled from "styled-components";
import { useState, useRef } from "react";

export function ButtonP(props) {
  return (
    <Container>
      <button
        className={`button-9 ${props.color}`}
        onClick={ props.handle}
        type={props.type}
        form={`${props.form}`}
      >
        {props.text}
      </button>
    </Container>
  );
}
const Container = styled.div`
  .button-9 {
    appearance: button;
    backface-visibility: hidden;
    border-radius: 6px;
    border-width: 0;
    box-shadow: rgba(50, 50, 93, 0.1) 0 0 0 1px inset,
      rgba(50, 50, 93, 0.1) 0 2px 5px 0, rgba(0, 0, 0, 0.07) 0 1px 1px 0;
    box-sizing: border-box;
    color: #fff;
    cursor: pointer;
    font-size: 100%;
    height: 44px;
    line-height: 1.15;
    margin: 12px 0 0;
    outline: none;
    padding: 0 25px;
    position: relative;
    text-align: center;
    text-transform: none;
    transform: translateZ(0);
    user-select: none;
    touch-action: manipulation;
    width: 100%;
  }
  .primary {
    background-color: #405cf5;
  }
  .secondary {
    background-color: #33d692;
  }

  .button-9:disabled {
    cursor: default;
  }
`;
