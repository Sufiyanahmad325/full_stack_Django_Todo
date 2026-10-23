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


export const addTodo = createAsyncThunk(
    "addTodo",
    async ({ title }) => {
        const response = await axios.post('http://127.0.0.1:8000/api/todos/', { title })

        return {
            id: response.data.id,
            title: response.data.title
        }
    }


);


export const editTodo = createAsyncThunk(
    "editTodo",
    async ({ id, title }) => {
        const response = await axios.patch(
            `http://127.0.0.1:8000/api/todos/${id}/`,
            { title }
        );

        return {
            id: response.data.id,
            title: response.data.title,
        };
    }
);


export const deleteTodo = createAsyncThunk(
    'deleteTodo',
    async ({ id }) => {
        const response = await await axios.delete(`http://127.0.0.1:8000/api/todos/${id}/`)
        return id
    }
)

const initialState = {
    blog: [],
    isEditedValue: null,
    loading: false,
    error: null
}

const todoSlice = createSlice({
    name: 'todoSlice',
    initialState,

    extraReducers: (builder) => {
        builder
            .addCase(getTodos.pending, (state) => {
                state.error = null
                state.loading = true
            })
            .addCase(getTodos.fulfilled, (state, action) => {
                state.loading = false
                state.blog = action.payload
            })
            .addCase(getTodos.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })


            // addTodo

            .addCase(addTodo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addTodo.fulfilled, (state, action) => {
                state.loading = false;
                state.blog.unshift(action.payload);
            })
            .addCase(addTodo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })



            //edit todo

            .addCase(editTodo.pending, (state) => {
                state.error = null;
                state.loading = true
            })

            .addCase(editTodo.fulfilled, (state, action) => {
                const updatedTodo = action.payload
                state.blog = state.blog.map(ele =>
                    ele.id === updatedTodo.id ? { ...ele, title: updatedTodo.title } : ele
                )
            })

            .addCase(editTodo.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })


            // Delete Todo
            .addCase(deleteTodo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.loading = false;

                state.blog = state.blog.filter(
                    (todo) => todo.id !== action.payload
                );
            })
            .addCase(deleteTodo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
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