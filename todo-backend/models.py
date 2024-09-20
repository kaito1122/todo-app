from pymongo import MongoClient
from config import config

# Setup MongoDB connection
client = MongoClient(config.MONGO_URI)
db = client.get_database()
todo_collection = db.todos
