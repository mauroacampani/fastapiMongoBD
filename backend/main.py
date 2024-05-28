from fastapi import FastAPI
from routes.task import task

app = FastAPI()

@app.get('/')
def welcome():
    return {'messa.ge': 'Hola mundo'}

app.include_router(task)

