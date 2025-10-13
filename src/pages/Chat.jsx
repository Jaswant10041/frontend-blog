import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth'
import { io } from 'socket.io-client'
import axios from 'axios';
const socket = io("https://backend-blog-28ea.onrender.com", { withCredentials: true })
const Chat = ({ currentUserId, receiverId }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [userInfo, setUserInfo] = useState(null)
    const { authUser, isAuth } = useAuth();
    console.log(userInfo);
    useEffect(() => {
        authUser.then((data) => {
            setUserInfo(data);
            socket.emit("join", data?.accessToken);
        })
            .catch((err) => {
                console.log(err);
            });
        axios.get(`https://backend-blog-28ea.onrender.com/api/messages/${receiverId}`, {
            headers: {
                Authorization: `Bearer ${userInfo?.accessToken}`
            }
        }).then((res) => setMessages(res.data))
            .catch((err) => console.log(err));

        socket.on("receiveMessage", (data) => {
            setMessages((prev) => [...prev, dada]);
        });

        socket.on("messageSaved", (data) => {
            setMessages((prev) => [...prev, data]);
        });
        return () => {
            socket.off("receiveMessage");
            socket.off("messageSaved");
        }
    }, [receiverId, isAuth]);
    const handleSend = () => {
        if (!message.trim()) return;
        socket.emit("sendMessage", { senderId: currentUserId, receiverId, text: message });
        setMessage("");
    }
    return (
        <div className="p-4 pt-24 border rounded-lg max-w-md mx-auto bg-gray-50 shadow-lg">
            <div className="h-64 overflow-y-auto border p-2 mb-3 bg-white">
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className={`my-1 ${msg.senderId === currentUserId ? "text-right" : "text-left"}`}
                    >
                        <span
                            className={`inline-block px-3 py-1 rounded-lg ${msg.senderId === currentUserId ? "bg-blue-500 text-white" : "bg-gray-200"
                                }`}
                        >
                            {msg.text}
                        </span>
                    </div>
                ))}
            </div>

            <div className="flex">
                <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 border p-2 rounded-l-lg"
                />
                <button onClick={handleSend} className="bg-blue-500 text-white px-4 rounded-r-lg">
                    Send
                </button>
            </div>
        </div>
    )
}
export default Chat;