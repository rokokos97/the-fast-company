import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import api from "../../api";
import SelectedField from "../common/form/selectedFild";
import TextAreaFiled from "../common/form/textAreaField";
import PropTypes from "prop-types";

const AddComment = ({ onSubmit }) => {
    const [users, setUsers] = useState([]);
    const [data, setData] = useState({
        userId: "",
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
        setData({
            userId: "",
            content: ""
        });
        onSubmit(data);
    };
    useEffect(() => { validate(); }, [data]);

    const validatorConfig = {
        userId: {
            isRequired: { message: "User is required" }
        },
        content: {
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
                name={"userId"}
                defaultOption={"Choose..."}
                options={users}
                onChange={handelChange}
                value={data.userId}
                error={errors.userId}
            />
            <TextAreaFiled
                label={"Message"}
                name={"content"}
                value={data.content}
                onChange={handelChange}
                error={errors.content}/>
            <button
                type={"submit"}
                className={"btn btn-success w-100 mx-auto"}
                disabled={!isValid}
            >
                Add comment
            </button>
        </form>
    </>);
};
AddComment.propTypes = {
    onSubmit: PropTypes.func
};
export default AddComment;
