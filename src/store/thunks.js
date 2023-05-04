import { editUser } from "./slices/user"
import { useGetUsersQuery } from "./services/userApi";

export const getUser = () => async (id) => {
    return async (dispatch,getState)=>{
            const response = await useGetUsersQuery();
            console.log(response)
    }

}