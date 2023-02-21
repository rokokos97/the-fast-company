import { createSlice } from "@reduxjs/toolkit";
import qualityService from "../services/qualityService";

const qualitiesSlice = createSlice({
    name: "qualities",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        qualitiesRequested: (state) => {
            state.isLoading = true;
        },
        qualitiesReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        qualitiesRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});
const { reducer: qualitiesReducer, actions } = qualitiesSlice;
const { qualitiesRequestFiled, qualitiesReceived, qualitiesRequested } = actions;
export const loadQualitiesList = () => async (dispatch) => {
    dispatch(qualitiesRequested());
    try {
        const { content } = await qualityService.fetchAll();
        dispatch(qualitiesReceived(content));
    } catch (error) {
        dispatch(qualitiesRequestFiled(error.message));
    }
};
export const getQualities = () => (state) => state.qualities.entities;
export const getQualitiesLoadingStatus = () => (state) => state.qualities.isLoading;
export default qualitiesReducer;