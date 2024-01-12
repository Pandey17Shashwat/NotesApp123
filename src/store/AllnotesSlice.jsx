import { createSlice } from "@reduxjs/toolkit"
import { db } from "../config/firebase";
import { getDocs,collection } from "firebase/firestore";


export const STATUSES = Object.freeze({
    IDLE:"idle",
    ERROR:"error",
    LOADING:"loading"
})

const AllnotesSlice= createSlice({
    name:'allNotes',
    initialState:{
        data:[],
        status:STATUSES.IDLE,
    },
    reducers:{
        setNotes(state,action){
            state.data=action.payload;
        },
        setStatus(state,action){
            state.status=action.payload;
        },
        add(state,action){
            state.data.push(action.payload);
        },
        remove(state, action) {
            return {
              ...state,
              data: state.data.filter((item) => item.id !== action.payload)
            };
        },
        updateItem(state, action) {
            const { id, ...updatedProperties } = action.payload;
            const itemToUpdate = state.data.find((item) => item.id === id);
            if (itemToUpdate) {
              Object.assign(itemToUpdate, updatedProperties);
            }
        },
       
    }
})

export const {setNotes , setStatus, add , remove, updateItem} = AllnotesSlice.actions;
export default AllnotesSlice.reducer;
const notesRef=collection(db,"notes")
export function fetchNotes(){
    return async function fetchNotes(dispatch,getState){
        dispatch(setStatus(STATUSES.LOADING))
        try{    
            const data = await getDocs(notesRef);
            const filteredData= data.docs.map((doc)=>(
              {
                ...doc.data(),id:doc.id
              }
            ))
            dispatch(setNotes(filteredData))
            dispatch(setStatus(STATUSES.IDLE))
        }catch(e){
            dispatch(setStatus(STATUSES.ERROR))
            console.log(e);
        }
    }
}


