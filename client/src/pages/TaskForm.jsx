import { useState, useEffect } from "react"
import axios from "axios"
import { useParams, useNavigate } from "react-router-dom"
import { fetchTask, createTask, updateTask, deleteTask } from "../api/tasks"


function TaksForm() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const params = useParams()
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
      e.preventDefault();
     
      try {
        if (!params.id) {
          const res = await createTask({title, description})
        console.log(res)
        }else{
          console.log(title)
          const res = await updateTask(params.id, {title, description})
          
        console.log(res)
        
        }
        navigate("/")
      } catch (error) {
        console.log(error)
      }
      
      
      //const data = await res.json()
      
      e.target.reset()
     
    };


    useEffect(() => {
      if (params.id) {
        fetchTask(params.id)
        .then(res => {
          setTitle(res.data.title)
          setDescription(res.data.description)
        })
        .catch((err) => console.log(err))
      }

        
      

    }, []);

    return (
     <div className="flex items-center justify-center h-[calc(100vh-10rem)]">
        <div>
        <form className="bg-zinc-950 p-10" onSubmit={handleSubmit}>
          <h1
          className="text-3xl font-bold my-4"
          >{params.id ? "Actualizar Tarea" : "Crear Tarea"}</h1>
          <input type="text" placeholder="Titulo" className="block py-2 px-3 mb-4 w-full text-black" 
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          autoFocus
          />
          <textarea placeholder="Descripcion" rows={3} className="block py-2 px-3 mb-4 w-full text-black"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          ></textarea>
          <button
          className="bg-white hover:bg-slate-800 hover:text-white
          text-slate-800 py-2 px-4 rounded"
          >
            {params.id ? "Actualizar Tarea" : "Crear Tarea"}
          </button>
        </form>

        {params.id && (
          <button 
          className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded mt-5"
          onClick={ async () => {
            try {
              const res = await deleteTask(params.id);
            console.log(res)
            navigate("/")
            } catch (error) {
              console.log(error)
            }
          }}
          >
            Eliminar Tarea
          </button>
        )}
        </div>
     </div>
    )
  }
  
  export default TaksForm