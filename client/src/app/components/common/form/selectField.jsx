import React from "react";
import PropTypes from "prop-types";

const SelectField = ({ label, name, value, onChange, defaultOption, options, error }) => {
    // console.log("options", options);
    const optionsArray = !Array.isArray(options) && typeof options === "object"
        ? Object.values(options)
        : options;
    // console.log("optionsArray", optionsArray);
    const renderClass = () => {
        return "form-select" + (error ? " is-invalid" : "");
    };
    const handleChange = ({ target }) => {
        onChange({ name: [target.name], value: target.value });
    };
    return (
        <>
            <div className="mb-4">
                <label
                    htmlFor={name}
                    className="form-label"
                >
                    {label}
                </label>
                <select
                    id={name}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    className={renderClass()}
                >
                    <option
                        disabled
                        value=""
                    >
                        {defaultOption}
                    </option>
                    {}
                    {optionsArray && optionsArray.map((option) => <option
                        key={option.value}
                        value={option.value}
                    >{option.label}</option>)
                    }
                </select>
                <div className="invalid-feedback">
                    { error && <p>{ error }</p>}
                </div>
            </div>
        </>
    );
};
SelectField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    defaultOption: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    error: PropTypes.string,
    name: PropTypes.string
};
export default SelectField;
