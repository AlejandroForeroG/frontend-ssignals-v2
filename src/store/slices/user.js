import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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
      console.log(action.payload)
      const { id, name, weight, height, age,pp,isActive } = action.payload;

      state.id = id;
      state.name = name;
      state.age = age;
      state.weight =weight ;
      state.height = height;
      state.pp= pp;
      state.isActive = isActive;
     
    }
  },
});
export const { editUser} = userSlice.actions;
export default userSlice.reducer;
