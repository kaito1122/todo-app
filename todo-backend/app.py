from flask import Flask
from flask_cors import CORS
from routes import todo_routes
from config import config

app = Flask(__name__)
app.config.from_object(config)
CORS(app)

# Register routes
app.register_blueprint(todo_routes, url_prefix='/api/todos')

if __name__ == "__main__":
    app.run(debug=True)
