import { createSlice } from "@reduxjs/toolkit"

const initialError={
    errorStatus:"",
    errorMessage:""
}

const errorSlice= createSlice({
    name:'note',
    initialState:initialError,
    reducers:{
        err(state,action){
            state.errorStatus="error";
            state.errorMessage=action.payload
        },
        success(state,action){
            state.errorStatus="success";
            state.errorMessage=action.payload
        },
        failure(state,action){
            state.errorStatus="failure";
            state.errorMessage=action.payload
        },
        nothing(state,action){
            state.errorStatus="";
            state.errorMessage="";
        }
       
    }
})

export const {err,success,failure,nothing}= errorSlice.actions;
export default errorSlice.reducer;