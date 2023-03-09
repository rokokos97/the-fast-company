import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Users from "./layouts/users";
import Login from "./layouts/login";
import Main from "./layouts/main";
import NavBar from "./components/ui/navBar";
import ProtectedRouth from "./components/common/protectedRouth";
import "react-toastify/dist/ReactToastify.css";
import LogOut from "./layouts/logOut";
import AppLoader from "./components/ui/HOC/appLoader";
function App() {
    return (
        <div>
            <AppLoader>
                <NavBar />
                <Switch>
                    <ProtectedRouth
                        path="/users/:userId?/:edit?"
                        component={Users} />
                    <Route
                        path="/login/:type?"
                        component={Login} />
                    <Route
                        path="/"
                        exact component={Main} />
                    <Route
                        path="/logout"
                        exact component={LogOut} />
                    <Redirect
                        to="/" />
                </Switch>
            </AppLoader>
            <ToastContainer/>
        </div>
    );
}

export default App;
