from flask import Flask, render_template, request
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config["SECRET_KEY"] = "support-chat-secret"
socketio = SocketIO(app, cors_allowed_origins="*")

@app.route("/")
def index():
    return render_template("index.html")

@socketio.on("join")
def handle_join(data):
    name = data.get("name", "Guest")
    emit("system_message", {"message": f"{name} joined the chat."}, broadcast=True)

@socketio.on("send_message")
def handle_message(data):
    emit("receive_message", data, broadcast=True)

if __name__ == "__main__":
    socketio.run(app, debug=True)
