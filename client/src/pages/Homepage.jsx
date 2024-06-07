import { useEffect, useState } from "react";
import axios  from "axios";
import TaskList from "../components/TaskList";
import { listTask } from "../api/tasks";

function Homepage() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
      listTask()
      .then(res => {
        setTasks(res.data)
      })
      .catch((err) => console.log(err))
    }, []);

    return (
    
      <TaskList tasks={tasks} />
    
    );
  }
  
  export default Homepage