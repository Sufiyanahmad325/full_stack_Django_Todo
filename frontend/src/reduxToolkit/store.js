import {configureStore} from "@reduxjs/toolkit";
import todoReduces from './TodoSlice.js'

const store = configureStore({
    reducer: {
        todo:todoReduces
    }
})


export default store