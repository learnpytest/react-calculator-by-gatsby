import React, { useState } from "react";
import Draggable from "react-draggable";
import {
  updateEquation,
  updateResult,
  clearAll,
} from "../functions/calculator.function";
import styled from "styled-components";

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
  &:nth-child(3) span {
    transform: translateY(-1px);
  }
  &:nth-child(4) span {
    transform: translateY(6px);
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
  @media screen and (hover: hover) {
    &:hover {
      background-color: var(--hover-red);
    }
  }
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
`;
const ResultStyle = styled.div`
  width: 100%;
  border-bottom: 1px solid var(--main-blue-green);
`;

const ExceedLimitStyle = styled.span`
  color: var(--main-purple);
`;

const InputStyle = styled.input`
  width: 100%;
  border: none;
  background-color: inherit;
  box-sizing: border-box;
  line-height: 1.5;
  text-align: right;
  color: var(--grey-extra-dark);
  &:focus {
    outline: 1px solid var(--main-blue-green);
  }
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
  UPDATE_EQUATION: (input, calc, setCalc, limit, type) =>
    updateEquation(input, calc, setCalc, limit, type),
  UPDATE_RESULT: (calc, setCalc, operators, LIMIT) =>
    updateResult(calc, setCalc, operators, LIMIT),
  CLEAR_ALL: (calcState, setCalc) => clearAll(calcState, setCalc),
};

const CalculatorComponent = ({ windowSize }) => {
  const calcState = getCalcState();
  const [calc, setCalc] = useState(calcState);

  return (
    <Draggable
      disabled={windowSize?.width < 992}
      position={windowSize?.width < 992 ? { x: 0, y: 0 } : null}
    >
      <RcContainerStyle>
        <RcContentStyle>
          <DisplayStyle>
            <TextStyle>
              <ResultStyle>
                <InputStyle
                  type="text"
                  readOnly
                  value={`Ans: ${calc.result || 0}`}
                />
              </ResultStyle>
            </TextStyle>
            <TextStyle>
              <InputStyle type="text" readOnly value={calc.equation || 0} />
            </TextStyle>
            {calc.isExceedLimit && (
              <ExceedLimitStyle>超過數字上限</ExceedLimitStyle>
            )}
          </DisplayStyle>
          {OPERATORS.map((operator, index) => {
            return (
              <HatchStyle key={index}>
                <ButtonStyle
                        onClick={() =>  handleCalculator["UPDATE_EQUATION"](
                      operator,
                      calc,
                      setCalc,
                      LIMIT,
                      "operator",
                    )
                  }
                >
                  <span>{operator}</span>
                </ButtonStyle>
              </HatchStyle>
            );
          })}
          <HatchStyle>
            <ButtonStyle
              onClick={() => handleCalculator["CLEAR_ALL"](calcState, setCalc)}
            >
              C
            </ButtonStyle>
          </HatchStyle>
          <HatchStyle>
            <ButtonStyle
              onClick={() =>
                handleCalculator["UPDATE_RESULT"](
                  calc,
                  setCalc,
                  OPERATORS,
                  LIMIT
                )
              }
            >
              =
            </ButtonStyle>
          </HatchStyle>
          {Array(9)
            .fill(0)
            .map((_, index) => {
              return (
                <HatchStyle key={index + 1}>
                  <ButtonStyle
                          onClick={() => handleCalculator["UPDATE_EQUATION"](
                                  index + 1,
                                  calc,
                                  setCalc,
                                  LIMIT,
                                  "digit",
                              )
                    }
                  >
                    <span>{index + 1}</span>
                  </ButtonStyle>
                </HatchStyle>
              );
            })}
          <HatchStyle>
            <ButtonStyle
                  onClick={() => handleCalculator["UPDATE_EQUATION"](
                  0,
                  calc,
                  setCalc,
                  LIMIT,
                  "0",
                )
              }
            >
              <span>0</span>
            </ButtonStyle>
          </HatchStyle>
        </RcContentStyle>
      </RcContainerStyle>
    </Draggable>
  );
};

export default CalculatorComponent;
