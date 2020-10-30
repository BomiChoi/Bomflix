import React from "react";
import {BrowserRouter as Router, Route, Redirect, Switch} from "react-router-dom";
import Header from "Components/Header";
import Home from "Routes/Home";
import TV from "Routes/TV";
import Search from "Routes/Search";

export default () => (
    <Router>
        <>
        <Header/>
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/TV" exact component={TV} />
            <Route path="/TV/popular" render = {() => <h1>Popular</h1>} />
            <Route path="/Search" component={Search} />
            <Redirect from="*" to="/" />
        </Switch>
        </>
    </Router>
);