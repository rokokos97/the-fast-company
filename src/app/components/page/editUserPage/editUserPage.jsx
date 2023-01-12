import React, { useEffect, useState } from "react";
import TextFiled from "../../common/form/textField";
import * as yup from "yup";
import RadioField from "../../common/form/radioField";

const EditUserPage = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        sex: "male",
        rate: "",
        completedMeetings: "",
        profession: "",
        qualities: [{}]
    });
    const [errors, setErrors] = useState({});

    const validateSchema = yup.object().shape({
        completedMeetings: yup.string()
            .required("Completed Meetings is required")
            .matches(/[0-9]$/, "Completed Meetings must contain only numbers")
            .matches(/^(\d){1,3}$/g, "Completed Meetings must contain not more than 3 digits"),
        rate: yup.string()
            .required("Rate is required")
            .matches(/[0-9]$/, "Rate must contain only numbers")
            .matches(/^(\d){1,3}$/g, "Rate must contain not more than 3 digits"),
        email: yup.string()
            .required("Email is required")
            .email("Email is not correct"),
        name: yup.string()
            .required("Name is required")
            .matches(/(?=.*[A-Z])/, "Name must contain capital latter")
            .matches(/(?=.{2,})/, "Name must contain at least 2 letters")
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
        validateSchema
            .validate(data)
            .then(() => setErrors({}))
            .catch((err) => setErrors({ [err.path]: err.message }));

        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;
    return (<>
        <div className="container">
            <div className="row">
                <div className="card col-md-6 offset-md-3">
                    <div className="card-body">
                        <form onSubmit={handelSubmit} className={""}>
                            <TextFiled
                                label={"Name"}
                                name={"name"}
                                value={data.name}
                                error={errors.name}
                                onChange={handelChange}/>
                            <TextFiled
                                label={"Email"}
                                name={"email"}
                                value={data.email}
                                onChange={handelChange}
                                error={errors.email}
                            />
                            <RadioField
                                label={"Sex"}
                                name={"sex"}
                                value={data.sex}
                                options={
                                    [
                                        { name: "Male", value: "male" },
                                        { name: "Female", value: "female" },
                                        { name: "Other", value: "other" }
                                    ]
                                }
                                onChange={handelChange}
                            />
                            <TextFiled
                                label={"Rate"}
                                name={"rate"}
                                value={data.rate}
                                error={errors.rate}
                                onChange={handelChange}
                            />
                            <TextFiled
                                label={"Complete Meetings"}
                                name={"completedMeetings"}
                                value={data.completedMeetings}
                                error={errors.completedMeetings}
                                onChange={handelChange}/>
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
