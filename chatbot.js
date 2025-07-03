const body = document.querySelector('body');
const chatInput = document.querySelector('.chat-input textarea');
const sendChatBtn = document.querySelector('.chat-input span');
const chatbox = document.querySelector('.chatbox');
const chatbotToggler = document.querySelector('.chatbot-toggler');
const closeBtn = document.querySelector('.chatbot header span');

let userMessage;
const API_KEY = ""; // <-- Add your OpenAI API

// Create chat list item
const createChatLi = (message, className) => {
    const chatLi = document.createElement('li');
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing"
        ? `<p>${message}</p>`
        : `<span class="material-icons-sharp">account_circle</span><p class="incoming">${message}</p>`;
    chatLi.innerHTML = chatContent;
    return chatLi;
};

// Get response (modified to not use API)
const generateResponse = (incomingChatLi) => {
    const messageElement = incomingChatLi.querySelector("p");
// Simple response without API call
    messageElement.innerHTML = `
    Hi! Let me know how I can help you:
    <ul class="chat-options">
        <li>✅ Assist with beneficiaries</li>
        <li>💸 Make a payment</li>
        <li>📄 Download statements</li>
    </ul>
`;

// Scroll to bottom
    chatbox.scrollTo(0, chatbox.scrollHeight);
};

// Send user message
const handleChat = () => {
    userMessage = chatInput.value.trim();
    if (!userMessage) return;

    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatInput.value = "";
    chatbox.scrollTo(0, chatbox.scrollHeight);

    setTimeout(() => {
        const incomingChatLi = createChatLi("Thinking...", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLi);
    }, 600);
};

// Send button click
sendChatBtn.addEventListener('click', handleChat);

// Toggle chatbot open/close
chatbotToggler.addEventListener('click', () => {
    body.classList.toggle('show-chatbot');
});

// Close button in header (only visible on mobile)
closeBtn.addEventListener('click', () => {
    body.classList.remove('show-chatbot');
});

// Remove the show-chatbot class from body initially
body.classList.remove('show-chatbot');