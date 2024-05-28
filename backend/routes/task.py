from fastapi import APIRouter, HTTPException
from databases import get_all_tasks, get_one_task, create_task, get_one_task_id, delete_task, update_task
from models import Task, UpdateTask

task = APIRouter()

@task.get('/api/tasks')
async def get_tasks():
    response = await get_all_tasks()
    return response

@task.post('/api/tasks/', response_model=Task)
async def save_task(task: Task):
    
    taskFound = await get_one_task(task.title)
    if taskFound:
        raise HTTPException(409, "Task already exists")

    response = await create_task(task.dict())
    
    if response:
        return response
    raise HTTPException(400, "Something went wrong")

@task.get('/api/tasks/{id}', response_model=Task)
async def get_task(id: str):
    task = await get_one_task_id(id)
    if task:
        return task
    raise HTTPException(400, f'Task with {id} not found')

@task.put('/api/tasks/{id}', response_model=Task)
async def put_task(id: str, data: UpdateTask):
    response = await update_task(id, data)
    if response:
        return response
    raise HTTPException(400, f'Task with {id} not found')

@task.delete('/api/tasks/{id}')
async def remove_task(id: str):
    response = await delete_task(id)
    if response:
        return "task deleted"
    raise HTTPException(404, f"There is no task with the id {id}")