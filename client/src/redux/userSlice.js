import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    status: 'idle',
    user: null,
    loading: false,
    error: null,
    currentRole: (JSON.parse(localStorage.getItem('user')) || {}).role || null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.status = 'success';
            state.user = action.payload;
            state.currentRole = action.payload.role;
            localStorage.setItem('user',  JSON.stringify(action.payload));
        },
        loginFailure: (state) => {
            state.loading = false;
            state.error = true;
        },
        logout: (state) => {
            state.user = null;
            state.loading = false;
            state.error = false;
            localStorage.removeItem('user');
            state.currentRole = null
        },
    },
});

export const { loginStart, loginSuccess, loginFailure, logout } = userSlice.actions;

export default userSlice.reducer;
