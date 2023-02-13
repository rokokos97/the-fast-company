import React, { useEffect, useState } from "react";
import TextFiled from "../common/form/textField";
import CheckBoxField from "../common/form/checkBoxField";
import * as yup from "yup";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";

const LoginForm = () => {
    const [data, setData] = useState({ email: "", password: "", stayOn: false });
    const [errors, setErrors] = useState({});
    const [enterError, setEnterError] = useState(null);
    const { logIn } = useAuth();
    const history = useHistory();
    const validateSchema = yup.object().shape({
        password: yup.string()
            .required("Password is required"),
        /* .matches(/(?=.*[A-Z])/, "Password must contain capital latter")
            .matches(/(?=.*[0-9])/, "Password must contain number")
            .matches(/(?=.*[_!$%&*#])/, "Password must contain on of specific symbol _!$%&*#")
            .matches(/(?=.{8,})/, "Password must contain at least 8 characters") */
        email: yup.string()
            .required("Email is required")
            .email("Email is not correct")
    });
    const handelChange = (target) => {
        setData((prevState) =>
            ({ ...prevState, [target.name]: target.value }));
        setEnterError(null);
    };
    const handelSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        try {
            await logIn(data);
            history.push(
                history.location.state
                    ? history.location.state.from.pathname
                    : "/"
            );
        } catch (error) {
            setEnterError(error.message);
        }
    };
    useEffect(() => { validate(); }, [data]);
    // const validatorConfig = {
    //     email: {
    //         isRequired: { message: "Email is required" },
    //         isEmail: { message: "Email is not correct" }
    //     },
    //     password: {
    //         isRequired: { message: "Password is required" },
    //         isContainCapital: { message: "Password must contain capital latter" },
    //         isContainDigit: { message: "Password must contain number" },
    //         min: { message: "Password must contain at least 8 characters", value: 8 }
    //     }
    // };
    const validate = () => {
        // const errors = validator(data, validatorConfig);
        validateSchema
            .validate(data)
            .then(() => setErrors({}))
            .catch((err) => setErrors({ [err.path]: err.message }));
        // setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = (Object.keys(errors).length === 0);
    return (<>
        <form onSubmit={handelSubmit} className={""}>
            <TextFiled
                label={"Email"}
                name={"email"}
                value={data.email}
                onChange={handelChange}
                error={errors.email}
            />
            <TextFiled
                label={"Password"}
                type={"password"}
                name={"password"}
                value={data.password}
                onChange={handelChange}
                error={errors.password}
            />
            <CheckBoxField
                value={data.stayOn}
                onChange={handelChange}
                name={"stayOn"}
            >
                Remember me
            </CheckBoxField>
            {enterError && <p className={"text-danger"}>{enterError}</p>}
            <button
                type={"submit"}
                className={"btn btn-success w-100 mx-auto"}
                disabled={!isValid || enterError}
            >
                            Submit
            </button>
        </form>
    </>);
};

export default LoginForm;
