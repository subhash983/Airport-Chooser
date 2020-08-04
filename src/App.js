import React from "react";
import { AirportChooser } from "./components";
import AirportsList from './airports.json';

function App() {
  return (
    <div className="App">
      <AirportChooser airports={AirportsList} />
    </div>
  );
}

export default App;
