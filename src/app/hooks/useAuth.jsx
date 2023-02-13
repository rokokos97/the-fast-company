import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import userService from "../services/userService";
import { toast } from "react-toastify";
import localStorageService, { setTokens } from "../services/localStorageService";
import { useHistory } from "react-router-dom";

export const httpAuth = axios.create({
    baseURL: "https://identitytoolkit.googleapis.com/v1/",
    params: {
        key: process.env.REACT_APP_FIREBASE_KEY
    }
});
const AuthContext = React.createContext();
export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);
    const [error, setError] = useState(null);
    const history = useHistory();
    async function logIn({ email, password }) {
        try {
            const { data } = await httpAuth.post(`accounts:signInWithPassword`, {
                email,
                password,
                returnSecureToken: true
            });
            setTokens(data);
            await getUserData();
        } catch (error) {
            catchError(error);
            const { code, message } = error.response.data.error;
            if (code === 400) {
                if (message === "INVALID_PASSWORD") {
                    throw new Error("Email or Password is not correct");
                } else if (message === "EMAIL_NOT_FOUND") {
                    throw new Error("Email or Password is not correct");
                } else {
                    throw new Error("Too many attempts try latter");
                }
            }
        }
    }
    async function signUp({ email, password, ...rest }) {
        const randomInt = (min, max) => {
            return Math.floor(Math.random() * ((max - min + 1) + min));
        };
        try {
            const { data } = await httpAuth.post("accounts:signUp", {
                email,
                password,
                returnSecureToken: true
            });
            setTokens(data);
            await createUser({
                _id: data.localId,
                email,
                completedMeetings: randomInt(1, 200),
                image: `https://avatars.dicebear.com/api/avataaars/${
                    (Math.random() + 1)
                        .toString(36)
                        .substring(7)}.svg`,
                rate: randomInt(1, 5),
                ...rest
            });
        } catch (error) {
            catchError(error);
            const { code, message } = error.response.data.error;
            if (code === 400) {
                if (message === "EMAIL_EXISTS") {
                    const errorObject = { email: "User with this email already does exist" };
                    throw errorObject;
                }
            }
        }
    }
    async function updateUserData(data) {
        try {
            const { content } = await userService.update(data);
            console.log(content);
            setCurrentUser(content);
        } catch (error) {
            catchError(error);
        }
    }
    async function createUser(data) {
        try {
            const { content } = await userService.create(data);
            setCurrentUser(content);
        } catch (error) {
            catchError(error);
        }
    }
    const catchError = (error) => {
        const { message } = error.response.data;
        setError(message);
    };
    const getUserData = async () => {
        try {
            const { content } = await userService.getCurrentUser();
            setCurrentUser(content);
        } catch (error) {
            catchError(error);
        } finally {
            setIsLoading(false);
        }
    };
    const logOut = () => {
        localStorageService.removeAuthData();
        setCurrentUser(null);
        history.push("/");
    };
    useEffect(() => {
        if (localStorageService.getAccessToken()) {
            getUserData();
        } else {
            setIsLoading(false);
        }
    }, []);
    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);
    return (
        <AuthContext.Provider value={{ signUp, logIn, logOut, currentUser, updateUserData }}>
            { !isLoading ? children : "Loading..." }
        </AuthContext.Provider>
    );
};
AuthProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
export default AuthProvider;
