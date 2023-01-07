import React, { useState } from "react";
import LoginForm from "../components/ui/loginForm";
import { useParams } from "react-router-dom";
import RegisterForm from "../components/ui/registerForm";
const Login = () => {
    const { type } = useParams();
    const [formType, setFormType] = useState(type === "register" ? type : "login");
    const toggleFormType = () => {
        setFormType(prevState => prevState === "register" ? "login" : "register");
    };
    return (
        <div className={"container mt-5"}>
            <div className="row">
                <div className={"col-md-6 offset-md-3 shadow p-3"}>
                    {formType === "register"
                        ? <>
                            <h1>Register</h1>
                            <RegisterForm/>
                            <p>Already have an account?
                                <a
                                    role={"button"}
                                    onClick={toggleFormType}
                                    className={"link-success"}
                                > Sign in
                                </a>
                            </p>
                        </>
                        : <>
                            <h1>Login</h1>
                            <LoginForm/>
                            <p>Dont have an account?
                                <a
                                    role={"button"}
                                    onClick={toggleFormType}
                                    className={"link-success"}
                                >  Sign up
                                </a>
                            </p>
                        </>}
                </div>
            </div>
        </div>
    );
};
export default Login;
