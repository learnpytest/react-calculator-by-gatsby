import * as React from "react"
import "normalize.css";
import "./index.css";

import CalculatorComponent from "../components/calculator.component"

const Home = () => {
  return (
    <main>
      <CalculatorComponent />
    </main>
  )
}

export default Home

export const Head = () => <title>Home Page</title>