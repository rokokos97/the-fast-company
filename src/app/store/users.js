import { createAction, createSlice } from "@reduxjs/toolkit";
import userService from "../services/userService";
import authService from "../services/authService";
import localStorageService from "../services/localStorageService";
import { getRandomInt } from "../utils/getRandomInt";
import history from "../utils/history";

const initialState = localStorageService.getAccessToken()
    ? {
        entities: null,
        isLoading: true,
        error: null,
        auth: { userId: localStorageService.getUserId() },
        isLoggedIn: true,
        dataLoaded: false
    }
    : {
        entities: null,
        isLoading: false,
        error: null,
        auth: null,
        isLoggedIn: false,
        dataLoaded: false
    };
const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        usersRequested: (state) => {
            state.isLoading = true;
        },
        usersReceived: (state, action) => {
            state.entities = action.payload;
            state.dataLoaded = true;
            state.isLoading = false;
        },
        usersRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        authRequestSuccess: (state, action) => {
            state.auth = action.payload;
            state.isLoading = true;
        },
        authRequestFailed: (state, action) => {
            state.auth = action.payload;
        },
        userCreated: (state, action) => {
            if (Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.push(action.payload);
        },
        userLoggedOut: (state) => {
            state.entities = null;
            state.isLoggedIn = false;
            state.auth = null;
            state.dataLoaded = false;
        }
    }
});
const { reducer: usersReducer, actions } = usersSlice;
const {
    usersRequestFiled,
    usersReceived,
    usersRequested,
    authRequestSuccess,
    authRequestFailed,
    userCreated,
    userLoggedOut
} = actions;

const authRequested = createAction("users/authRequested");
const userCreateRequested = createAction("users/createUserRequested");
const userCreateFailed = createAction("users/userCreateFailed");

export const logIn = ({ payload, redirect }) => async (dispatch) => {
    const { email, password } = payload;
    dispatch(authRequested());
    try {
        const data = await authService.login({ email, password });
        dispatch(authRequestSuccess({ userId: data.localId }));
        localStorageService.setTokens(data);
        history.push(redirect);
    } catch (error) {
        dispatch(authRequestFailed(error.message));
    }
};
export const logOut = () => (dispatch) => {
    localStorageService.removeAuthData();
    dispatch(userLoggedOut());
    history.push("/");
};
const createUser = (payload) => async (dispatch) => {
    dispatch(userCreateRequested());
    try {
        const { content } = await userService.create(payload);
        dispatch(userCreated(content));
        history.push("/users");
    } catch (error) {
        dispatch(userCreateFailed(error.message));
    }
};
export const singUp = ({ email, password, ...rest }) => async (dispatch) => {
    dispatch(authRequested());
    try {
        const data = await authService.register({ email, password });
        console.log(data);
        localStorageService.setTokens(data);
        dispatch(authRequestSuccess({ userId: data.localId }));
        dispatch(createUser({
            _id: data.localId,
            email,
            completedMeetings: getRandomInt(1, 200),
            image: `https://avatars.dicebear.com/api/avataaars/${
                (Math.random() + 1)
                    .toString(36)
                    .substring(7)}.svg`,
            rate: getRandomInt(1, 5),
            ...rest
        }));
    } catch (error) {
        dispatch(authRequestFailed(error.message));
    }
};
export const loadUsersList = () => async (dispatch) => {
    dispatch(usersRequested());
    try {
        const { content } = await userService.get();
        dispatch(usersReceived(content));
    } catch (error) {
        dispatch(usersRequestFiled(error.message));
    }
};
export const getUsers = () => (state) => state.users.entities;
export const getCurrentUserData = () => (state) => state.users.entities.map(u => u._id === state.users.auth.userId);
// export const getUsersLoadingStatus = () => (state) => state.users.isLoading;
export const getUserById = (userId) => (state) => {
    if (state.users.entities) {
        return state.users.entities.find((user) =>
            user._id === userId);
    }
};
export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;
export const getDataStatus = () => (state) => state.users.dataLoaded;
export const getCurrentUserId = () => (state) => state.users.auth.userId;

export const getUsersLoadingStatus = () => (state) => state.users.isLoading;
export default usersReducer;
