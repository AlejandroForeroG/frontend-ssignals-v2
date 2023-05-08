import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    editUser: (state, action) => {
      const { id, name, weight, height, age, pp, isactive } = action.payload;

      state.id = id;
      state.name = name;
      state.age = age;
      state.weight = weight;
      state.height = height;
      state.pp = pp;
      state.isactive = isactive;
    },
  },
});

export const { editUser } = userSlice.actions;
export default userSlice.reducer;
