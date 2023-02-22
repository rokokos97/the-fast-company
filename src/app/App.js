import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Users from "./layouts/users";
import Login from "./layouts/login";
import Main from "./layouts/main";
import NavBar from "./components/ui/navBar";
import AuthProvider from "./hooks/useAuth";
import ProtectedRouth from "./components/common/protectedRouth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LogOut from "./layouts/logOut";
import { useDispatch } from "react-redux";
import { loadQualitiesList } from "./store/qualities";
import { loadProfessionsList } from "./store/professions";
function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadQualitiesList());
        dispatch(loadProfessionsList());
    }, []);
    return (
        <div>
            <AuthProvider>
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
            </AuthProvider>
            <ToastContainer/>
        </div>
    );
}

export default App;
