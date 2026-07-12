import { createSlice } from "@reduxjs/toolkit";

type SubmitState = {
    username: string;
    password: string;
    token: string;
    success: boolean | null;
    error: string | null;
};

const initialState: SubmitState = {
    username: "",
    password: "",
    token: "",
    success: null,
    error: null,
};

export const submitSlice = createSlice({
    name: "submit",
    initialState,
    reducers: {},
});

export default submitSlice.reducer;