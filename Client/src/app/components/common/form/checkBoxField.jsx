import React from "react";
import PropTypes from "prop-types";

const CheckBoxField = ({ name, value, label, onChange, children, error }) => {
    const handleChange = () => {
        onChange({ name: name, value: !value });
    };
    const renderClass = () => {
        return "form-check-input" + (error ? " is-invalid" : "");
    };
    return <>
        <div className="form-check form-check-inline mb-4">
            <input
                className={renderClass()}
                type="checkbox"
                id={name}
                value=""
                onChange={handleChange}
                checked={value}
            />
            <label
                className="form-check-label"
                htmlFor={name}>
                {children}
            </label>
            <div id="validationServer04Feedback" className="invalid-feedback">
                { error && <p>{ error }</p>}
            </div>
        </div>
    </>;
};
CheckBoxField.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.bool,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    error: PropTypes.string
};
export default CheckBoxField;
