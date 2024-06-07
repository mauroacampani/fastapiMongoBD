import axios from "axios";

const URL = 'http://localhost:8000'
const endpoint = `${URL}/api/tasks/`

export const fetchTask = async (id) => await axios.get(`/${endpoint}/${id}`)

export const createTask = (newTask) => axios.post(endpoint, newTask);

export const updateTask = (id, task) => axios.put(`${endpoint}${id}`, task);

export const deleteTask = (id) => axios.delete(`${endpoint}${id}`);

export const listTask = () => axios.get(endpoint);