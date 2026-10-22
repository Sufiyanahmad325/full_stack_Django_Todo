import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


export const getTodos = createAsyncThunk(
    'getTodos',
    async () => {
        const response = await axios.get('http://127.0.0.1:8000/api/todos/');
        console.log(response.data)
        return response.data
    }
);


export const editTodo = createAsyncThunk(
    "editTodo",
    async({id,text})=>{
        const response = await axios.patch(
             `http://127.0.0.1:8000/api/todos/${id}/`,{title:text}
        )

        return {
            id:response.data.id,
            text:response.data.title
        }
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


        //edit todo

        .addCase(editTodo.pending , (state)=>{
            state.error = null;
            state.loading = true
        })

        .addCase(editTodo.fulfilled , (state,action)=>{
            const updatedTodo = action.payload
            state.blog = state.blog.map(ele=>{
                ele.id === updatedTodo.id ? {...ele , text:updatedTodo.text}:ele
            })
        })

        .addCase(editTodo.rejected,(state,action)=>{
            state.loading= false
            state.error = action.error.message
        })


    },

    reducers: {

        isEdit: (state, action) => {
            state.isEditedValue = action.payload
        },
        
    }

})

export const { isEdit } = todoSlice.actions

export default todoSlice.reducer