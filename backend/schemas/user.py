def taskEntity(item) -> dict:
    return {
        "id": str(item["_id"]),
        "title": item["title"],
        "description": item["description"],
        "completed": item["completed"]
    }


def tasksEntity(entity) -> list:
    return [taskEntity(item) for item in entity]