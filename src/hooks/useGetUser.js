import { useGetUserActiveQuery } from "../store/services/userApi";
import { useDispatch } from "react-redux";
import { editUser } from "../store/slices/user";
import {useEffect} from "react";



export function useGetUserData() {
  const dispatch = useDispatch();
  const { data, isLoading, error, isSuccess } = useGetUserActiveQuery();
  
  useEffect(() => {
    if (data) {
     dispatch(editUser(data));
    }
  }, [dispatch, data]);
  return { data, isLoading,isSuccess,error };
}
