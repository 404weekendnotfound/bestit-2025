import { useEffect, useState } from "react";
import axios from "axios";
import { useUserData } from "../../context/UserDataContext";
import ReactMarkdown from 'react-markdown';
interface Message {
    role: "user" | "assistant";
    content: string;
}
import "./Chat.scss"

const Chat = () => {

    const [messages, setMessages] = useState<Message[]>([]);
    const [message, setMessage] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { userData } = useUserData();

    useEffect(() => {
        const fetchData = async () => {
                const response = await axios.post("https://n8n.weekendnotfound.pl/webhook/568a8ce3-4c91-42e3-9be2-a571309fa494/chat", {
                    chatInput: userData,
                    sessionId: userData?.email,
                    action: "sendMessage"
            });
            console.log(response);
            setMessages([...messages, { role: "assistant", content: response?.data.output }]);
        }
        fetchData();
    }, []);

    const handleSendMessage = async () => {
        setIsLoading(true);
        setMessage("");
        setMessages([...messages, { role: "user", content: message }]);
        const response = await axios.post("https://n8n.weekendnotfound.pl/webhook/568a8ce3-4c91-42e3-9be2-a571309fa494/chat", {
            chatInput: message,
            sessionId: userData?.email,
            action: "sendMessage"
        });
        const data = response.data;
        setMessages([...messages, { role: "assistant", content: data.output }]);
        setIsLoading(false);
    }
    
    return (
            <div className="chat-container box">
                <div className="chat-header">
                    <h2>Chat</h2>
                </div>
                <div className="chat-messages">
                    {messages.map((message, index) => (
                        <div key={index} className={`message ${message.role}`}>
                            {message.role === 'assistant' ? (
                                <div className="message-content markdown-content">
                                    <ReactMarkdown>{message.content}</ReactMarkdown>
                                </div>
                            ) : (
                                <span className="message-content">{message.content}</span>
                            )}
                        </div>
                    ))}
                </div>
                <div className="chat-input">
                    <input type="text" placeholder="Wiadomość" value={message} onChange={(e) => setMessage(e.target.value)} />
                    <button onClick={handleSendMessage} disabled={isLoading} className="btn">{isLoading ? "Wysyłanie..." : "Wyślij"}</button>
                </div>
            </div>
    )
}

export default Chat;