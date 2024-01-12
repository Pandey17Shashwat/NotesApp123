import { createSlice } from "@reduxjs/toolkit"

const initialState={
    currentpage:1,
    startindex:0,
    endIndex:6,
    endpage:50,
};

const paginationSlice=createSlice({
    name:'pagination',
    initialState,
    reducers:{
        next(state,action){
            if(state.currentpage!==state.endpage){
                state.currentpage=state.currentpage+1;
                state.startindex=state.startindex+6;
                state.endIndex=state.endIndex+6;
            }
        },
        prev(state,action){
            if(state.currentpage!==1){
                state.currentpage=state.currentpage-1;
                state.startindex=state.startindex-6;
                state.endIndex=state.endIndex-6;
            }
        },
        particular(state,action){
            state.currentpage=action.payload;
            state.endIndex=state.currentpage*action.payload;
            state.startindex=state.endIndex-6;
        },
        total(state,action){
            state.endpage=action.payload;
        }
    }
})

export const {next,prev,particular,total}= paginationSlice.actions;
export default paginationSlice.reducer;