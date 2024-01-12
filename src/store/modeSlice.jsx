import { createSlice } from "@reduxjs/toolkit"

const initialState=true;

const modeSlice= createSlice({
    name:'mode',
    initialState,
    reducers:{
        changeMode(state,action){
            // state=!state;
            return !state
        }
    }
})

export const {changeMode}= modeSlice.actions;
export default modeSlice.reducer;