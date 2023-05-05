// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { getUser } from "../thunks";

// //TODO: actualizar para que venga desde la base de datos
// const initialState = {

// };

// //TODO: conectarlo con la base de datos y condicionarlo

// export const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     editUser: (state, action) => {
//       const { id, name, weight, height, age,pp,isActive } = action.payload;

//       state.id = id;
//       state.name = name;
//       state.age = age;
//       state.weight =weight ;
//       state.height = height;
//       state.pp= pp;
//       state.isActive = isActive;
     
//     },
//   },
// });
// export const { editUser} = userSlice.actions;
// export default userSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUser = createAsyncThunk("user/getUser", async () => {
  const response = await fetch("http://192.168.10.12:3100/api/users/true");
  const data = await response.json();
  console.log(data)

  // En este punto, data debería ser un objeto que contenga las propiedades que necesitas
  // para inicializar el estado del slice. Por ejemplo, si tienes un objeto como este:
  // { id: 1, name: "John", age: 30, weight: 80, height: 180, pp: "avatar.png", isActive: true }
  // Puedes devolverlo directamente como el valor de retorno del createAsyncThunk.
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