import { createSlice } from "@reduxjs/toolkit";
const initialState = 0;

export const slideSlice = createSlice({


    name: "slide",
    initialState,
    reducers: {
        setInitSlide: (state, action) => {
            state = 0;
        }
    }
});
export const { setInitSlide} = slideSlice.actions;
export default slideSlice.reducer;