export function validator(data, config) {
    const errors = {};
    function validate(validateMethod, data, config) {
        const emailRegEx = /\S+@\S+\.\S+/g;
        const capitalRegEx = /[A-Z]+/g;
        const digitRegEx = /\d+/g;
        let statusValidate;
        switch (validateMethod) {
            case "isRequired":
                if (typeof data === "boolean") { statusValidate = !data; } else {
                    statusValidate = data.trim() === "";
                }
                break;
            case "isEmail":
                statusValidate = !emailRegEx.test(data);
                break;
            case "isContainCapital":
                statusValidate = !capitalRegEx.test(data);
                break;
            case "isContainDigit":
                statusValidate = !digitRegEx.test(data);
                break;
            case "min":
                statusValidate = data.length <= config.value;
                break;
            case "notEmpty":
                statusValidate = data.length === 0;
                break;
            default:
                break;
        }
        if (statusValidate) return config.message;
    }
    for (const fieldName in data) {
        for (const validateMethod in config[fieldName]) {
            const error = validate(
                validateMethod,
                data[fieldName],
                config[fieldName][validateMethod]);
            if (error && !errors[fieldName]) {
                errors[fieldName] = error;
            }
        }
    } return errors;
}
