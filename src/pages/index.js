import React from "react";
import useResize from "../functions/use-resize.function";
import "normalize.css";
import "./index.css";

import CalculatorComponent from "../components/calculator.component";

const Home = () => {
const size = useResize()

  return (
    <main>
      <CalculatorComponent windowSize={size} />
    </main>
  );
};

export default Home;

export const Head = () => <title>Home Page</title>;
