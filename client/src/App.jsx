import { BrowserRouter, Routes, Route } from "react-router-dom"
import Homepage from "./pages/Homepage"
import TaksForm from "./pages/TaskForm"

function App() {
 

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Homepage />}/>
      <Route path="/tasks/new" element={<TaksForm/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
