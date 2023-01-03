import React from "react";
import NavBar from "./components/navBar";
import { Route, Switch } from "react-router-dom";
import Login from "./layout/login";
import Main from "./layout/main";
import Users from "./layout/users";

function App() {
    return (
        <>
            <NavBar/>
            <Switch>
                <Route path={"/login"} component={Login} />
                <Route path={"/users"} component={Users}/>
                <Route path={"/"} component={Main}/>
            </Switch>
        </>
    );
}

export default App;
