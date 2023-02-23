import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/userService";

const usersSlice = createSlice({
    name: "users",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
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
        }
    }
});
const { reducer: usersReducer, actions } = usersSlice;
const { usersRequestFiled, usersReceived, usersRequested } = actions;

export const singUp = (payload) => (dispatch) => {
    try {

    } catch (error) {

    }
}
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
