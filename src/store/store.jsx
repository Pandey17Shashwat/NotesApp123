import { configureStore } from "@reduxjs/toolkit";
import modeReducer from "./modeSlice"
import addNotesReducer from "./addNotesSlice"
import AllnotesReducer from "./AllnotesSlice"
import paginationReducer from "./paginationSlice"
import updateReducer from "./updateSlice";
import errorReducer from "./errorSlice"

const store = configureStore({
    reducer:{
        mode: modeReducer,
        addNote:addNotesReducer,
        allNotes:AllnotesReducer,
        page:paginationReducer,
        update:updateReducer,
        error:errorReducer
    }
})

export default store