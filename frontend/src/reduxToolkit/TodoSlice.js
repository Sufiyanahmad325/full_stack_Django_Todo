import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


export const getTodos = createAsyncThunk(
    'getTodos',
    async () => {
        const response = await axios.get('http://127.0.0.1:8000/api/todos/');
        console.log(response.data)
        return response.data
    }
)

const initialState = {
    blog: [],
    isEditedValue: null,
    loading:false,
    error:null
}

const todoSlice = createSlice({
    name: 'todoSlice',
    initialState,

    extraReducers:(builder)=>{
        builder
        .addCase(getTodos.pending,(state)=>{
            state.error = null
            state.loading =true
        })
        .addCase(getTodos.fulfilled,(state,action)=>{
            state.loading=false
            state.blog=action.payload
        })
        .addCase(getTodos.rejected,(state,action)=>{
            state.loading= false
            state.error = action.error.message
        })



    },

    reducers: {
        addTodo: (state, action) => {
            const getInfo = {
                id: nanoid(),
                text: action.payload.text
            }
            state.blog = [...state.blog, getInfo]
        },

        editTodo: (state, action) => {
            const { id, text } = action.payload;
            state.blog = state.blog.map(
                ele => ele.id === id
                    ? { ...ele, text: text }
                    : ele
            )
            state.isEditedValue = null
        },

        deleteTodo: (state, action) => {
            const id = action.payload
            state.blog = state.blog.filter(ele => ele.id != id)
        },

        isEdit: (state, action) => {
            state.isEditedValue = action.payload
        },
        
    }

})

export const { addTodo, editTodo, deleteTodo, isEdit } = todoSlice.actions

export default todoSlice.reducer