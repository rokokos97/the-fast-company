import React from "react";
import PropTypes from "prop-types";
const TextAreaFiled = ({ label, name, value, onChange, error }) => {
    const handleChange = ({ target }) => {
        onChange({ name: [target.name], value: target.value });
    };

    const renderClass = () => {
        return "form-control" + (error ? " is-invalid" : "");
    };
    return (
        <>
            <div className={"mb-4"}>
                <label className={"form-label"} htmlFor={name}>{label}</label>{" "}
                <div className="input-group has-validation">
                    <textarea
                        id={name}
                        placeholder={`Enter your ${name}`}
                        value={value}
                        name={name}
                        onChange={handleChange}
                        className={renderClass()}
                        rows={3}
                    />
                    {error && <div className={"invalid-feedback"}><p>{error}</p></div>}
                </div>
            </div>
        </>
    );
};
TextAreaFiled.defaultProps = { type: "text" };
TextAreaFiled.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    error: PropTypes.string
};
export default TextAreaFiled;
