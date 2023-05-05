

import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUser = createAsyncThunk("user/getUser", async () => {
  const response = await fetch("http://192.168.10.12:3100/api/users/true");
  const data = await response.json();
  console.log(data)
  return data;
});

const initialState = {
  id: null,
  name: "",
  age: null,
  weight: null,
  height: null,
  pp: "",
  isActive: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    editUser: (state, action) => {
      const { id, name, weight, height, age, pp, isActive } = action.payload;

      state.id = id;
      state.name = name;
      state.age = age;
      state.weight = weight;
      state.height = height;
      state.pp = pp;
      state.isActive = isActive;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        // Actualizamos el estado inicial a "loading" mientras se obtienen los datos de la API.
        state.id = null;
        state.name = "";
        state.age = null;
        state.weight = null;
        state.height = null;
        state.pp = "";
        state.isActive = false;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        console.log(action.payload[0]);
        const { id, name, weight, height, age, pp, isactive } =
          action.payload[0];

        state.id = id;
        state.name = name;
        state.age = age;
        state.weight = weight;
        state.height = height;
        state.pp = pp;
        state.isActive = isactive;
      })
      .addCase(getUser.rejected, (state) => {
        // Si se produce un error, mantenemos el estado inicial actual.
        // Alternativamente, puedes actualizar el estado con un valor por defecto.
      });
  },
});

export const { editUser } = userSlice.actions;
export default userSlice.reducer;