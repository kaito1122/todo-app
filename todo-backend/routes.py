from flask import Blueprint, request, jsonify
from models import todo_collection
from bson.objectid import ObjectId

todo_routes = Blueprint("todo_routes", __name__)

@todo_routes.route("/", methods=["GET"])
def get_todos():
    todos = todo_collection.find()
    todos_list = [{'_id': str(todo['_id']), 'title': todo['title'], 'completed': todo['completed']} for todo in todos]
    return jsonify(todos_list)

@todo_routes.route("/", methods=["POST"])
def create_todo():
    data = request.json
    new_todo = {'title': data.get('title'), 'completed': False}
    result = todo_collection.insert_one(new_todo)
    new_todo['_id'] = str(result.inserted_id)
    return jsonify(new_todo), 201

@todo_routes.route("/<id>", methods=["PUT"])
def update_todo(id):
    data = request.json
    todo_collection.update_one({'_id': ObjectId(id)}, {'$set': {'title': data.get('title'), 'completed': data.get('completed')}})
    updated_todo = todo_collection.find_one({'_id': ObjectId(id)})
    updated_todo['_id'] = str(updated_todo['_id'])
    return jsonify(updated_todo)

@todo_routes.route("/<id>", methods=["DELETE"])
def delete_todo(id):
    todo_collection.delete_one({'_id': ObjectId(id)})
    return jsonify({"message": "Todo deleted"})
