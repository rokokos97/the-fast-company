import { createAction, createSlice } from "@reduxjs/toolkit";
import commentService from "../services/commentService";
import { nanoid } from "nanoid";
import { getCurrentUserId } from "./users";

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true;
        },
        commentsReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        commentsRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        commentCreated: (state, action) => {
            state.entities.push(action.payload);
        },
        commentRemoved: (state, action) => {
            state.entities = state.entities.filter(c => c._id !== action.payload);
        }
    }
});
const { reducer: commentsReducer, actions } = commentsSlice;
const { commentsRequestFiled, commentsReceived, commentsRequested, commentCreated, commentRemoved } = actions;
const createCommentRequested = createAction("comments/createCommentRequested");
const removeCommentRequested = createAction("comments/removeCommentRequested");

export const loadCommentsList = (userId) => async (dispatch) => {
    dispatch(commentsRequested());
    try {
        const { content } = await commentService.getComments(userId);
        dispatch(commentsReceived(content));
    } catch (error) {
        dispatch(commentsRequestFiled(error.message));
    }
};
export const removeComment = (commentId) => async (dispatch) => {
    dispatch(removeCommentRequested());
    try {
        const { content } = await commentService.removeComment(commentId);
        if (content === null) {
            dispatch(commentRemoved(commentId));
        }
    } catch (error) {
        dispatch(commentsRequestFiled(error.message));
    }
};
export const createComment = (payload) => async (dispatch, getState) => {
    dispatch(createCommentRequested());
    try {
        const comment = {
            ...payload,
            created_at: Date.now(),
            userId: getCurrentUserId()(getState()),
            _id: nanoid()
        };
        const { content } = await commentService.createComment(comment);
        console.log("content", comment);
        dispatch(commentCreated(content));
    } catch (error) {
        dispatch(commentsRequestFiled());
    }
};
export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) => state.comments.isLoading;

export default commentsReducer;
