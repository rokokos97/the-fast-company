import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextFiled from "../common/form/textField";
import api from "../../api";
import SelectedField from "../common/form/selectedFild";

const AddComment = () => {
    const [users, setUsers] = useState([]);
    const [data, setData] = useState({
        user: "",
        message: ""
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        api.users.fetchAll().then((data) => {
            const usersList =
                Object.keys(data).map((user) => ({
                    label: data[user].name,
                    value: data[user]._id
                }));
            setUsers(usersList);
        });
    }, []);
    const handelChange = (target) => {
        console.log("target", target.name);
        console.log("data", data);
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

    const validatorConfig = {
        user: {
            isRequired: { message: "User is required" }
        },
        message: {
            isRequired: { message: "Message is required" }
        }
    };
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;
    return (<>
        <form onSubmit={handelSubmit} className={""}>
            <SelectedField
                label={"Choose name of user"}
                name={"user"}
                defaultOption={"Choose..."}
                options={users}
                onChange={handelChange}
                value={data.user}
                error={errors.user}
            />
            <TextFiled
                label={"Message"}
                name={"message"}
                value={data.message}
                onChange={handelChange}
                error={errors.message}
            />
            <button
                type={"submit"}
                className={"btn btn-success w-100 mx-auto"}
                disabled={!isValid}
            >
                Submit
            </button>
        </form>
    </>);
};

export default AddComment;
