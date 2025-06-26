const body = document.querySelector('body');
const chatInput = document.querySelector('.chat-input textarea');
const sendChatBtn = document.querySelector('.chat-input span');
const chatbox = document.querySelector('.chatbox');
const chatbotToggler = document.querySelector('.chatbot-toggler');
const closeBtn = document.querySelector('.chatbot header span');

let userMessage;
const API_KEY = ""; // <-- Add your OpenAI API key here

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

// Get OpenAI response
const generateResponse = (incomingChatLi) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement = incomingChatLi.querySelector("p");

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "user", content: userMessage }
            ]
        })
    };

    fetch(API_URL, requestOptions)
        .then(res => {
            if (res.status === 429) {
                messageElement.textContent = "Too many requests - please slow down.";
                throw new Error("Rate limit exceeded");
            }
            return res.json();
        })
        .then(data => {
            if (data && data.choices && data.choices[0]) {
                messageElement.textContent = data.choices[0].message.content;
            } else {
                messageElement.textContent = "No response from server.";
            }
        })
        .catch((error) => {
            if (error.message !== "Rate limit exceeded") {
                messageElement.textContent = "Oops something went wrong!";
            }
            console.error(error);
        })
        .finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
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
