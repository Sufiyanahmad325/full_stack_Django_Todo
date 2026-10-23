import { useEffect, useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import { useSelector, useDispatch } from 'react-redux'
import { addTodo, deleteTodo, editTodo, getTodos, isEdit } from './reduxToolkit/TodoSlice'

function App() {
  const [count, setCount] = useState(0)
  const [text, setText] = useState('')

  const { blog, isEditedValue } = useSelector(state => state.todo)
  const dispatch = useDispatch()

  const handleAdd = async() => {
   if(isEditedValue != null){
    let a =  await dispatch(editTodo({id:isEditedValue.id , title:text})).unwrap()
    console.log(a)
      setText("")
      return
   }
    dispatch(addTodo({title:text}))
      setText("")

  }

  const handleEdit = (obj) => {
        dispatch(isEdit(obj))
  }


  const handleDelete = async(id) => {
      const res =await dispatch(deleteTodo({id})).unwrap()
      console.log(res)
  }

  useEffect(() => {
    if (isEditedValue != null) {
      setText(isEditedValue.title)
    }
  }, [isEditedValue])


useEffect(()=>{
  dispatch(getTodos())
  console.log(blog)
},[])

  return (
    <>
      <div className="flex flex-col items-center w-screen h-screen">
        <div className='flex flex-row gap-4 items-center'>
          <input
            onChange={(e) => setText(e.target.value)}
            value={text}
            className='border-2 border-green-500 px-4 py-2 rounded-full  ' type="text" placeholder="Enter text..." />
          <button
            onClick={handleAdd}
            className='bg-green-500 text-white px-4 py-2 rounded'>Add Blog</button>
        </div>

        <div className='flex flex-col items-center gap-4 mt-4 border-2 border-gray-300 p-4 rounded w-1/2'>
          {
            blog.length > 0 ? (
              blog.map((ele) => (
                <div key={ele.id}>
                  <p>{ele.title}</p>
                  <div className='flex flex-row gap-4'>
                    <button
                      className='bg-blue-500 text-white px-4 py-2 rounded'
                      onClick={() => handleEdit(ele)}
                    >
                      Edit
                    </button>
                    <button 
                    className='bg-red-500 text-white px-4 py-2 rounded'
                    onClick={()=>handleDelete(ele.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : <>
              <p>There is no blog</p>
            </>
          }
        </div>
      </div>
    </>
  )
}

export default App
