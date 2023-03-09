import React from "react";
import PropTypes from "prop-types";

const RadioField = ({ options, value, name, onChange, label }) => {
    const handleChange = ({ target }) => {
        onChange({ name: [target.name], value: target.value });
    };
    return (
        <>
            <div className="mb-4">
                <div>
                    <label className={"form-label"}>{label}</label>
                </div>
                {options.map((option) => (
                    <div
                        key={option.name + "_" + option.value}
                        className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name={name}
                            checked={option.value === value}
                            id={option.name + "_" + option.value}
                            value={option.value}
                            onChange={handleChange}
                        />
                        <label
                            className="form-check-label"
                            htmlFor={option.name + "_" + option.value}
                        >
                            {option.name}
                        </label>
                    </div>))}
            </div>
        </>
    );
};
RadioField.propTypes = {
    label: PropTypes.string,
    options: PropTypes.array,
    value: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func
};
export default RadioField;
