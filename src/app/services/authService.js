import axios from "axios";

const httpAuth = axios.create({
    baseURL: "https://identitytoolkit.googleapis.com/v1/",
    params: {
        key: process.env.REACT_APP_FIREBASE_KEY
    }
});

const authService = {
    register: async ({ email, password }) => {
        const { data } = httpAuth.post("accounts:signUp", {
            email,
            password,
            returnSecureToken: true
        });
        return data;
    }
};

export default authService;
