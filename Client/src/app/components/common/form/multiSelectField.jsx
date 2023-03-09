import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const MultiSelectField = ({ options, onChange, name, label, error, defaultValue }) => {
    const optionsArray = !Array.isArray(options) && typeof options === "object"
        ? Object.keys(options).map(optionName => ({ label: options[optionName].name, value: options[optionName]._id }))
        : options;
    const handelChange = (value) => {
        onChange({ name, value });
    };
    const renderClass = () => {
        return "basic-multi-select" + (error ? " is-invalid" : "");
    };
    return (<>
        <div className={"mb-4"}>
            <label className={"form-label"}>{label}</label>
            <Select
                closeMenuOnSelect={false}
                isMulti
                defaultValue={defaultValue}
                options={optionsArray}
                classNamePrefix="select"
                onChange={handelChange}
                name={name}
                className={renderClass()}
            />
            <div id="validationServer04Feedback" className="invalid-feedback">
                { error && <p>{ error }</p>}
            </div>
        </div>
    </>);
};
MultiSelectField.propTypes = {
    onChange: PropTypes.func,
    options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    name: PropTypes.string,
    label: PropTypes.string,
    error: PropTypes.string,
    defaultValue: PropTypes.array
};
export default MultiSelectField;
