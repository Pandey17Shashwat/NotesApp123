import { createSlice } from "@reduxjs/toolkit"

const initialState=true;

const addNotesSlice= createSlice({
    name:'note',
    initialState,
    reducers:{
        changeNote(state,action){
            return !state
        },
        dontAdd(state,action){
            return state=false
        }
    }
})

export const {changeNote,dontAdd}= addNotesSlice.actions;
export default addNotesSlice.reducer;