import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Home from "./Components/Home";
import Blog from "./Components/Blog";
import Post from "./Components/Post";
import Blogs from "./Components/Blogs";

function App() {
  return (
    <div className="container min-h-scree min-w-full">

    <Router>
    
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/blog/:id" component={Blog} />
        <Route exact path="/post" component={Post} />
        <Route exact path="/blogs" component={Blogs} />
      </Switch>
    
    </Router>

    </div>
  );
}

export default App;
