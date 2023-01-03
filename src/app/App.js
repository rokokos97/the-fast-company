import React from "react";
import Users from "./layout/users";
import NavBar from "./components/navBar";
import { Redirect, Route, Switch } from "react-router-dom";
import Main from "./layout/main";
import Login from "./layout/login";
import NotFound from "./layout/404";

function App() {
    return (
        <>
            <NavBar/>
            <Switch>
                <Route path={"/"} component={Main} exact/>
                <Route path={"/login"} component={Login}/>
                <Route
                    path={"/users/:userId?"}
                    render={(props) => <Users {...props}/>}
                />
                <Route path={"/404"} component={NotFound}/>
                <Redirect to={"/404"}/>
            </Switch>
        </>
    );
}
export default App;
