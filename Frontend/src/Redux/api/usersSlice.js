import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../constants";
export const usersSlice =apiSlice.injectEndpoints({
    endpoints:(builder)=>{
        login:builder.mutation({
            query:(data)=>
            ({
                url:`${USERS_URL}/login`, // https://localhost:3000/api/users/login this line means
                method:"POST",
                body:data,
            })
        })
    }
})
export const {useLoginMutation}=usersSlice;