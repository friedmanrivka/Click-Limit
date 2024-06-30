import { createSlice } from "@reduxjs/toolkit";
export const inisialuserslice = {
    userName: '',
    token: 0
};
export const userSlice = createSlice({
    name: 'user',
    initialState: inisialuserslice,
    reducers: {
        setUserName: (state, action)=> {
        state.userName = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        }
    }
});
export const { setToken, setUserName }= userSlice.actions;