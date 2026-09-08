const socket = io();
let userName = "";

function joinChat() {
    const input = document.getElementById("name");
    userName = input.value.trim() || "Guest";
    document.getElementById("login").classList.add("hidden");
    document.getElementById("chat").classList.remove("hidden");
    socket.emit("join", { name: userName });
    addSystemMessage("You joined the support chat.");
    document.getElementById("message").focus();
}

document.getElementById("messageForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const input = document.getElementById("message");
    const message = input.value.trim();
    if (!message) return;

    socket.emit("send_message", {
        name: userName,
        message: message
    });
    input.value = "";
});

socket.on("receive_message", (data) => {
    addMessage(data.name, data.message);
});

socket.on("system_message", (data) => {
    addSystemMessage(data.message);
});

function addMessage(name, message) {
    const box = document.getElementById("messages");
    const div = document.createElement("div");
    div.className = "message";
    div.innerHTML = `<strong>${escapeHtml(name)}:</strong> ${escapeHtml(message)}`;
    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
}

function addSystemMessage(message) {
    const box = document.getElementById("messages");
    const div = document.createElement("div");
    div.className = "system";
    div.textContent = message;
    box.appendChild(div);
}

function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}
