import { BrowserRouter, Routes, Route } from "react-router-dom"
import Homepage from "./pages/Homepage"
import TaksForm from "./pages/TaskForm"
import Navbar from "./components/Navbar"


function App() {
 

  return (
    <BrowserRouter>
    <div className="container mx-auto px-10">

      <Navbar />
    <Routes>
      <Route path="/" element={<Homepage />}/>
      <Route path="/tasks/:id" element={<TaksForm/>}/>
      <Route path="/tasks/new" element={<TaksForm/>}/>
      </Routes>

    </div>
   
    </BrowserRouter>
  )
}

export default App
