import { editUser } from "./slices/user"
import { useGetUsersQuery } from "./services/userApi";

export const getUser = () => {
    return async (dispatch,getState)=>{
         const response = await fetch(
           "http://192.168.10.12:3100/api/users/true"
         );
         console.log("todo correcto")
         const data = await response.json();
         return data;
    }

}

