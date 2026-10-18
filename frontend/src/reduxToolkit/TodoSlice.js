import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = {
    blog: [{ id: 1, text: "hello sir i am learning react js" }],
    isEditedValue: null
}

const todoSlice = createSlice({
    name: 'todoSlice',
    initialState,
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
            state.blog = state.blog.map(ele => ele.id === id ? { ...ele, text: text } : ele)
            state.isEditedValue=null
        },

        deleteTodo: (state, action) => {
            const id  = action.payload
            state.blog = state.blog.filter(ele => ele.id != id)
        },

        isEdit:(state, action)=>{
            state.isEditedValue = action.payload
        }
    }

})

export const { addTodo, editTodo, deleteTodo,isEdit } = todoSlice.actions 

export default todoSlice.reducer