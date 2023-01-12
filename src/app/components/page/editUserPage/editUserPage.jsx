import React, { useEffect, useState } from "react";
import TextFiled from "../../common/form/textField";
import * as yup from "yup";
import RadioField from "../../common/form/radioField";
import api from "../../../api";
import SelectedField from "../../common/form/selectedFild";
import MultiSelectField from "../../common/form/multiselectField";
import { useParams } from "react-router-dom";

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
    const [isLoading] = useState(false);
    const [professions, setProfessions] = useState([]);
    const [qualities, setQualities] = useState({});
    const { userId } = useParams();
    // console.log("userId", userId);
    useEffect(() => {
        api.users.getById(userId).then(({ profession, qualities, ...data }) => setData(
            (prevState) => ({
                ...prevState,
                ...data,
                profession: profession._id,
                qualities: transformQual(qualities)
            }))
        );
        api.professions.fetchAll().then((data) => {
            const professionList =
            Object.keys(data).map((profession) => (
                { label: data[profession].name, value: data[profession]._id }
            ));
            setProfessions(professionList);
            console.log("professionList", professionList);
        });
        api.qualities.fetchAll().then((data) => {
            const qualitiesList =
            Object.keys(data).map((qualityName) => (
                {
                    label: data[qualityName].name,
                    value: data[qualityName]._id,
                    color: data[qualityName].color
                }
            ));
            setQualities(qualitiesList);
            console.log("qualitiesList", qualitiesList);
        });
    }, []);
    useEffect(() => { validate(); }, [data]);
    // const getQuality = (ItemsArr, qualities) => {
    //     const userQualities = [];
    //     for (const item of ItemsArr) {
    //         for (const quality of qualities) {
    //             if (item._id === quality.value) {
    //                 userQualities.push(quality);
    //             }
    //         }
    //     }
    //     console.log("userQualities", userQualities);
    //     return userQualities;
    // };
    const transformQual = (arr) => arr.map((obj) => ({ label: obj.name, value: obj._id, color: obj.color }));
    const validateSchema = yup.object().shape({
        profession: yup.string().required("Profession is required"),
        completedMeetings: yup.string()
            .required("Completed Meetings is required")
            .matches(/[0-9]$/, "Completed Meetings must contain only numbers")
            .matches(/^(\d){1,3}$/g, "Completed Meetings must contain not more than 3 digits"),
        rate: yup.string()
            .required("Rate is required")
            .matches(/[0-9]$/, "Rate must contain only numbers")
            .matches(/^[0-5]/, "Rate cannot be more than 5")
            .matches(/^\d(\.\d)?$/, "Rate should look like n.n"),
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
                {(!isLoading && Object.keys(professions).length > 0 && Object.keys(qualities).length)
                    ? <div className="card col-md-6 offset-md-3">
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
                                <SelectedField
                                    label={"Profession"}
                                    name={"profession"}
                                    value={data.profession}
                                    options={professions}
                                    defaultOption={"Choose..."}
                                    error={errors.profession}
                                    onChange={handelChange}/>
                                <MultiSelectField
                                    label={"Qualities"}
                                    name={"qualities"}
                                    options={qualities}
                                    error={errors.qualities}
                                    onChange={handelChange}
                                    defaultValue={data.qualities}
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
                    : <p>Loading...</p>}
            </div>
        </div>
    </>);
};

export default EditUserPage;
