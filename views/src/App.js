import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import PrivateRoute from "./Components/PsudoComponents/PrivateRoute";
import Home from "./Components/Home";
import Profile from "./Components/Profile";
import Blog from "./Components/Blog";
import Post from "./Components/Post";
import Blogs from "./Components/Blogs";
import Edit from "./Components/Edit";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import About from "./Components/About";

function App() {
  return (
    <div className="container min-h-scree min-w-full">

    <Router>
    
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/blogs" component={Blogs} />
        <Route exact path="/about" component={About} />
        <PrivateRoute exact path="/me" component={Profile} />
        <PrivateRoute exact path="/post" component={Post} />
        <PrivateRoute exact path="/blog/:id" component={Blog} />
        <PrivateRoute exact path="/blog/:id/edit" component={Edit} />
      </Switch>
    
    </Router>

    </div>
  );
}

export default App;
