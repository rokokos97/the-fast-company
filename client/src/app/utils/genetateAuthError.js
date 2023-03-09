export function generateAuthError(message) {
    switch (message) {
        case "INVALID_PASSWORD":
            return "Email or Password is not correct";
        case "EMAIL_NOT_FOUND":
            return "Email or Password is not correct";
        case "EMAIL_EXISTS":
            return "User with this email already does exist";
        default:
            return "Too many attempts try latter";
    }
}
