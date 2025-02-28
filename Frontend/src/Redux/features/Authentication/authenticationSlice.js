import { createSlice } from "@reduxjs/toolkit"

const initialState={
    userInfo:localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):null,
};
const authenticationSlice=createSlice({
    name:"login",
    initialState,
    reducers:{
        setCredential:(state,action)=>
        {
            state.userInfo=action.payload,
            localStorage.setItem('userInfo',JSON.stringify(action.payload));
            const expireTime=new Date().getTime()+30*24*60*60*1000;
            localStorage.setItem('expireTime',expireTime);
        },
        logout:(state)=>
        {
            state.userInfo=null,
            localStorage.clear();
        }
    }
})
export const {setCredential,logout}=authenticationSlice.actions;
export default authenticationSlice.reducer;