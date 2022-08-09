import "./App.css";

import React from "react";
import CameraPage from "./components/CameraPage/CameraPage";

// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App() {
  return (

      <div className="App">
        {/* <Route path="cameraPage" component={CameraPage}/> */}
        <CameraPage />
      </div>
  );
}

export default App;
