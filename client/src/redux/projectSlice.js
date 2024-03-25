import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    project: [],
    loading: false,
    error: false,
};

const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        startLoading: (state) => {
            state.loading = true;
        },
        endLoading: (state) => {
            state.loading = false;
        },
        createProject: (state, action) => {
            state.project =[...state.project, action.payload]
        },
        fetchProject: (state, action) => {
           state.project = action.payload; 
        },
        fetchAllProject: (state, action) => {
            state.project = action.payload;

        },
        updateProject: (state, action) => {
            state.project = state.project.map((project) => {
                if (project._id === action.payload._id) {
                    return action.payload;
                }
                return project;
            });
        },
        deleteProject: (state, action) => {
           state.project = state.project.filter((project) => project._id !== action.payload._id);
        },
    },
});

export const { setProject, createProject, fetchProject, fetchAllProject, updateProject, deleteProject } = projectSlice.actions;
export default projectSlice.reducer;
