import { createAction, createSlice } from "@reduxjs/toolkit";
import userService from "../services/userService";
import authService from "../services/authService";
import localStorageService from "../services/localStorageService";
import { randomInt } from "../utils/randomInt";
import history from "../utils/history";

const usersSlice = createSlice({
    name: "users",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        auth: null,
        isLoggedIn: false
    },
    reducers: {
        usersRequested: (state) => {
            state.isLoading = true;
        },
        usersReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        usersRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        authRequestSuccess: (state, action) => {
            state.auth = { ...action.payload, isLoggedIn: true };
        },
        authRequestFailed: (state, action) => {
            state.auth = action.payload;
        },
        userCreated: (state, action) => {
            if (Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.push(action.payload);
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
    userCreated
} = actions;

const authRequested = createAction("users/authRequested");
const userCreateRequested = createAction("users/createUserRequested");
const userCreateFailed = createAction("users/userCreateFailed");
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
            completedMeetings: randomInt(1, 200),
            image: `https://avatars.dicebear.com/api/avataaars/${
                (Math.random() + 1)
                    .toString(36)
                    .substring(7)}.svg`,
            rate: randomInt(1, 5),
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
// export const getUsersLoadingStatus = () => (state) => state.users.isLoading;
export const getUserById = (userId) => (state) => {
    if (state.users.entities) {
        return state.users.entities.find((user) =>
            user._id === userId);
    }
};
export default usersReducer;
