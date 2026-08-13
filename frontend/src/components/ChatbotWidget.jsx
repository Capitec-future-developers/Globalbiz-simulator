import { useRef, useState } from 'react';

export default function ChatbotWidget() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([
        { type: 'incoming', text: 'Welcome to Bizchat, how can I assist.' }
    ]);
    const [input, setInput] = useState('');
    const thinkingTimer = useRef(null);

    function sendMessage() {
        const text = input.trim();
        if (!text) return;
        setMessages((prev) => [...prev, { type: 'outgoing', text }]);
        setInput('');
        thinkingTimer.current = setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                { type: 'incoming', text: 'Thanks for your message — an agent will follow up shortly.' }
            ]);
        }, 700);
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    }

    return (
        <>
            <button className="chatbot-toggler" onClick={() => setOpen((v) => !v)}>
                <span className="material-icons-sharp">mode_comment</span>
                <span className="material-icons-sharp">close</span>
            </button>

            <div className="chatbot" style={{ display: open ? 'block' : 'none' }}>
                <header>
                    <h2>BIZCHAT</h2>
                    <span className="material-icons-sharp" onClick={() => setOpen(false)}>close</span>
                </header>
                <ul className="chatbox">
                    {messages.map((m, i) => (
                        <li className={'chat ' + m.type} key={i}>
                            {m.type === 'incoming' && <span className="material-icons-sharp">account_circle</span>}
                            <p>{m.text}</p>
                        </li>
                    ))}
                </ul>
                <div className="chat-input">
                    <textarea
                        placeholder="Type your message here..."
                        required
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                    ></textarea>
                    <span id="send-btn" className="material-icons-sharp" onClick={sendMessage}>send</span>
                </div>
            </div>
        </>
    );
}
