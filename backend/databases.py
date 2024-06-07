# from pymongo import MongoClient

# client = MongoClient('localhost', 27017)
# db = client['farm']
# collection = db['farm']

from motor.motor_asyncio import AsyncIOMotorClient
from models import Task, UpdateTask
from bson import ObjectId
from schemas.user import taskEntity, tasksEntity
from pymongo import MongoClient
from starlette.status import HTTP_204_NO_CONTENT
from fastapi import Response
# client = AsyncIOMotorClient('mongodb://localhost')
# database = client.farm
# collection = database.farm

client = MongoClient('localhost', 27017)
db = client['farm']
collection = db['farm']

async def get_one_task_id(id):
    return taskEntity(collection.find_one({"_id": ObjectId(id)}))  
    

async def get_one_task(title):
    task = await collection.find_one({"title": title})
    return task

async def get_all_tasks():
    return tasksEntity(collection.find())

async def create_task(task):
    
    new_user = dict(task)
 
    del new_user["id"]
    id = collection.insert_one(new_user).inserted_id
    user = collection.find_one({"_id": id})
    return taskEntity(user)

async def update_task(id: str, data: Task):
    new_user = dict(data)
    collection.find_one_and_update({'_id': ObjectId(id)}, {'$set': dict(new_user)})
    return taskEntity(collection.find_one({'_id': ObjectId(id)}))
    # task = {k: v for k, v in data.dict().items() if v is not None}
    # await collection.update_one({'_id': ObjectId(id)}, {'$set': task})
    # document = await collection.find_one({'_id': ObjectId(id)})   
    # return document

async def delete_task(id: str):
    
    collection.find_one_and_delete({
        "_id": ObjectId(id)
    })
    return Response(status_code=HTTP_204_NO_CONTENT)

