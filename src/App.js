import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route} from "react-router-dom";

import CreateUser from "./components/find-matches.component";

function App() {
  return (
    <Router>
      <div className="container">
        <br/>
        <Route path="/" exact component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
