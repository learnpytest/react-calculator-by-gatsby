import React, { useState } from "react";
import styled from "styled-components";
import { updateEquation, updateResult, clearAll } from "../functions/calculator.function"

// styles
const RcContainerStyle = styled.div`
  padding: 10px;
  width: 100%;
  max-height: 50%;
  overflow-y: scroll;
  margin: auto;
  cursor: move;
  @media screen and (min-width: 768px) {
    max-width: 300px;
    max-height: fit-content;
    overflow: auto;
  }
`;
const RcContentStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(25%, 1fr));
  @media (min-width: 576px) and (max-width: 767px) {
    grid-template-columns: repeat(auto-fill, minmax(12%, 1fr));
  }
`;
const HatchStyle = styled.div`
  padding-top: 100%;
  position: relative;
  @media screen and (hover: hover) {
    button:hover {
      background-color: var(--hover-red);
    }
  }
`;

const ButtonStyle = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 1px solid var(--light-white);
  background-color: rgba(255, 255, 255, 0.55);
  font-size: 1.5rem;
  color: var(--grey-extra-dark);
`;

const DisplayStyle = styled.div`
  padding: 10px;
  grid-column: 1 / -1;
  background-color: var(--light-blue-green);
`;

const TextStyle = styled.div`
  width: 100%;
  font-family: "IBM Plex Mono";
  font-size: 1.5rem;
  input {
    width: 100%;
    border: none;
    background-color: inherit;
    box-sizing: border-box;
    line-height: 1.5;
    text-align: right;
    color: var(--grey-extra-dark);
  }
  input:focus {
    outline: 1px solid var(--main-blue-green);
  }
`;
const ResultStyle = styled.div`
  width: 100%;
  border-bottom: 1px solid var(--main-blue-green);
`;

const ExceedLimit = styled.span`
  color: var(--main-purple);
`;

// Component variables
const LIMIT = Math.pow(2, 32);
const OPERATORS = ["+", "-", "*", "/"];
const getCalcState = () => ({
    equation: "",
    result: null,
    isExceedLimit: false,
});

// Component function
const handleCalculator = {
    "UPDATE_EQUATION": (input, calc, setCalc, limit, type, isTargetValid) => updateEquation(input, calc, setCalc, limit, type, isTargetValid),
    "UPDATE_RESULT": (calc, setCalc, operators, LIMIT) => updateResult(calc, setCalc, operators, LIMIT),
    "CLEAR_ALL": (calcState, setCalc) => clearAll(calcState, setCalc)
}

const isTargetValid = (target1, blackList1, target2, blackList2=[]) => {
    if (target2 === undefined) {
        return !blackList1.includes(target1)
    }
    return !blackList1.includes(target1) || !blackList2.includes(target2)
}

const CalculatorComponent = () => {
  const calcState = getCalcState();
  const [calc, setCalc] = useState(calcState);
  
  return (
    <RcContainerStyle>
      <RcContentStyle>
        <DisplayStyle>
          <TextStyle>
            <ResultStyle>
              <input
                type="text"
                readOnly
                value={`Ans: ${
                  calc.result || 0
                }`}
              />
            </ResultStyle>
          </TextStyle>
          <TextStyle>
            <input
              type="text"
              readOnly
              value={
                calc.equation || 0
              }
            />
          </TextStyle>
          {calc.isExceedLimit && <ExceedLimit>超過數字上限</ExceedLimit>}
        </DisplayStyle>
        {OPERATORS.map((operator, index) => {
          return (
            <HatchStyle key={index}>
                  <ButtonStyle onClick={() => handleCalculator["UPDATE_EQUATION"](operator, calc, setCalc, LIMIT, "operator", isTargetValid(calc.equation.slice(-1), OPERATORS))}>
                <span class={`operator-text-${index}`}>{operator}</span>
              </ButtonStyle>
            </HatchStyle>
          );
        })}
        <HatchStyle>
                  <ButtonStyle onClick={() => handleCalculator["CLEAR_ALL"](calcState, setCalc)}>C</ButtonStyle>
        </HatchStyle>
        <HatchStyle>
                  <ButtonStyle onClick={() => handleCalculator["UPDATE_RESULT"](calc, setCalc, OPERATORS, LIMIT)}>=</ButtonStyle>
        </HatchStyle>
        {Array(10)
          .fill(0)
          .map((_, index) => {
            return (
              <HatchStyle key={index}>
                    <ButtonStyle onClick={() => handleCalculator["UPDATE_EQUATION"](index, calc, setCalc, LIMIT, "digit", isTargetValid(calc.equation.slice(-1), ["0"], calc.equation.slice(-2, -1), OPERATORS))}>
                  <span class={`digit-text-${index}`}>{index}</span>
                </ButtonStyle>
              </HatchStyle>
            );
          })}
      </RcContentStyle>
    </RcContainerStyle>
  );
};

export default CalculatorComponent;
