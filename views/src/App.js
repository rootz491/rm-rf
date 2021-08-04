import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Home from "./Components/Home";
import Blog from "./Components/Blog";

function App() {
  return (
    <div className="container min-h-scree min-w-full">

    <Router>
    
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/blog/:id" component={Blog} />
      </Switch>
    
    </Router>

    </div>
  );
}

export default App;
