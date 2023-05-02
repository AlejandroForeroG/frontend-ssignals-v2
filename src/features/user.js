import { createSlice } from "@reduxjs/toolkit";

//TODO: actualizar para que venga desde la base de datos
const initialState = {
  id: 0,
  name: "",
  weight: "",
  height: "",
  age: "",
  pp:"",
  isActive: false,
};

//TODO: conectarlo con la base de datos y condicionarlo

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    editUser: (state, action) => {
      const { id, name, weight, height, age,pp } = action.payload;

      state.id = id;
      state.name = name;
      state.age = age;
      state.weight =weight ;
      state.height = height;
      state.pp= pp;
      console.log(state.id);
    },
    editUserActive: (state, action) => {
      state.isActive = !state.isActive;
    },
  },
});
export const { editUser, editUserActive } = userSlice.actions;
export default userSlice.reducer;
