import React, { useEffect, useState } from "react";
import TextFiled from "../../common/form/textField";
import * as yup from "yup";

const EditUserPage = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        sex: "male",
        qualities: [{}],
        license: false
    });
    const [errors, setErrors] = useState({});

    const validateSchema = yup.object().shape({
        email: yup.string()
            .required("Email is required")
            .email("Email is not correct")
    });
    const handelChange = (target) => {
        setData((prevState) =>
            ({ ...prevState, [target.name]: target.value }));
    };
    const handelSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        console.log(data);
    };
    useEffect(() => { validate(); }, [data]);
    const validate = () => {
        // const errors = validator(data, validatorConfig);
        validateSchema
            .validate(data)
            .then(() => setErrors({}))
            .catch((err) => setErrors({ [err.path]: err.message }));
        // setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;
    return (<>
        <div className="container">
            <div className="row">
                <div className="card text-center col-md-6 offset-md-3">
                    <div className="card-body">
                        <form onSubmit={handelSubmit} className={""}>
                            <TextFiled
                                label={"Email"}
                                name={"email"}
                                value={data.email}
                                onChange={handelChange}
                                error={errors.email}
                            />
                            <button
                                type={"submit"}
                                className={"btn btn-success w-100 mx-auto"}
                                disabled={!isValid}
                            >
                                Save info
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>);
};

export default EditUserPage;
