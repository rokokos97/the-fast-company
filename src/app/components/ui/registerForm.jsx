import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextFiled from "../common/form/textField";
import SelectedField from "../common/form/selectedField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiselectField";
import CheckBoxField from "../common/form/checkBoxField";
import { useProfessions } from "../../hooks/useProfessions";
import { useQualities } from "../../hooks/useQualities";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";

const RegisterForm = () => {
    const history = useHistory();
    const { qualities } = useQualities();
    const newQualities = qualities.map((q) => ({ label: q.name, value: q._id }));
    const { professions } = useProfessions();
    const newProfessions = professions.map((p) => ({ label: p.name, value: p._id }));
    // const newProfessions = professions.map((p)=> name: )
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        sex: "male",
        qualities: [{}],
        license: false
    });
    const { signUp } = useAuth();
    const [errors, setErrors] = useState({});
    const handelChange = (target) => {
        setData((prevState) =>
            ({ ...prevState, [target.name]: target.value }));
    };
    const handelSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const newData = { ...data, qualities: data.qualities.map((q) => q.value) };
        console.log(newData);
        try {
            await signUp(newData);
            history.push("/");
        } catch (error) {
            setErrors(error);
        }
    };
    useEffect(() => { validate(); }, [data]);

    const validatorConfig = {
        email: {
            isRequired: { message: "Email is required" },
            isEmail: { message: "Email is not correct" }
        },
        password: {
            isRequired: { message: "Password is required" },
            isContainCapital: { message: "Password must include capital latter" },
            isContainDigit: { message: "password must contain number" },
            isContainSpecialSymbol: { message: "Password must contain on of specific symbol _!$%&*#" },
            min: { message: "Password must contain at least 8 characters", value: 8 }
        },
        profession: {
            isRequired: { message: "Profession is required" }
        },
        qualities: {
            notEmpty: { message: "Qualities is required" }
        },
        license: {
            isRequired: { message: "Confirm license before proceeding." }
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
            <SelectedField
                label={"Choose your profession"}
                name={"profession"}
                defaultOption={"Choose..."}
                options={newProfessions}
                onChange={handelChange}
                value={data.profession}
                error={errors.profession}
            />
            <RadioField
                label={"Choose your sex"}
                options={[{ name: "Male", value: "male" },
                    { name: "Female", value: "female" },
                    { name: "Other", value: "other" }]}
                value={data.sex}
                name={"sex"}
                onChange={handelChange}
            />
            <MultiSelectField
                options={newQualities}
                onChange={handelChange}
                defaultOption={data.qualities}
                name={"qualities"}
                label={"Choose your qualities"}
                error={errors.qualities}
            />
            <CheckBoxField
                value={data.license}
                onChange={handelChange}
                name={"license"}
                error={errors.license}
            >
                Allow the <a href={"#"}>license</a>
            </CheckBoxField>
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

export default RegisterForm;
