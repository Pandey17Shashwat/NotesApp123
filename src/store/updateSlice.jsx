import { createSlice } from "@reduxjs/toolkit"

const initialStatus=false;
const initialNote={};


const updateSlice= createSlice({
    name:'update',
    initialState:{
        notesStatus:initialStatus,
        initialNote:initialNote
    },
    reducers:{
        updateNote(state,action){
            state.notesStatus=!state.notesStatus;
            state.initialNote=action.payload
        },
        falseNotes(state,action){
            state.notesStatus=false;
            state.initialNote={};
        }
    }
})

export const {updateNote,falseNotes}= updateSlice.actions;
export default updateSlice.reducer;