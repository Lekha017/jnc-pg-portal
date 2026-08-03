import { useState } from "react";
import axios from "axios";
import { X, Send } from "lucide-react";
import { BsChatDotsFill } from "react-icons/bs";

const Chatbot = () => {
    const [open, setOpen] = useState(false);
    const [question, setQuestion] = useState("");
    const [loading, setLoading] = useState(false);

    const [messages, setMessages] = useState([
        {
            sender: "bot",
            text: "Hi 👋 Ask me anything about JNC PG Centre.",
        },
    ]);

    const sendMessage = async () => {
        if (!question.trim()) return;

        const userMessage = {
            sender: "user",
            text: question,
        };

        setMessages((prev) => [...prev, userMessage]);

        const currentQuestion = question;
        setQuestion("");
        setLoading(true);

        try {
            const res = await axios.post(
                "http://localhost:5000/api/chat",
                {
                    question: currentQuestion,
                }
            );

            setMessages((prev) => [
                ...prev,
                {
                    sender: "bot",
                    text: res.data.answer,
                },
            ]);
        } catch (error) {
            console.error(error);

            setMessages((prev) => [
                ...prev,
                {
                    sender: "bot",
                    text: "Sorry, I couldn't process that request.",
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setOpen(!open)}
                className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-white flex items-center justify-center
             shadow-[0_15px_40px_rgba(45,42,112,0.35)]
             hover:scale-110 hover:-translate-y-1
             transition-all duration-300"
            >
                {open ? (
                    <X size={28} color="#2D2A70" />
                ) : (
                    <BsChatDotsFill
                        size={28}
                        color="#2D2A70"
                    />
                )}
            </button>

            {/* Chat Window */}
            {open && (
                <div className="fixed bottom-24 right-6 w-[370px] h-[520px] bg-white rounded-3xl border border-gray-100 flex flex-col z-50 shadow-[0_30px_80px_rgba(45,42,112,0.20)]">

                    <div className="bg-white text-[#2D2A70] px-5 py-4 rounded-t-3xl font-bold border-b">
                        JNC Assistant
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`max-w-[85%] px-3 py-2 rounded-xl text-sm ${msg.sender === "user"
                                    ? "ml-auto bg-[#2D2A70] text-white"
                                    : "bg-gray-100 text-gray-800"
                                    }`}
                            >
                                {msg.text}
                            </div>
                        ))}

                        {loading && (
                            <div className="bg-gray-100 text-gray-600 px-3 py-2 rounded-xl text-sm w-fit">
                                Typing...
                            </div>
                        )}
                    </div>

                    <div className="border-t p-3 flex gap-2">
                        <input
                            type="text"
                            value={question}
                            onChange={(e) =>
                                setQuestion(e.target.value)
                            }
                            onKeyDown={(e) =>
                                e.key === "Enter" && sendMessage()
                            }
                            placeholder="Ask something..."
                            className="flex-1 border rounded-xl px-3 py-2 outline-none"
                        />

                        <button
                            onClick={sendMessage}
                            className="bg-[#2D2A70] text-white p-2 rounded-xl"
                        >
                            <Send size={18} />
                        </button>
                    </div>

                </div>
            )}
        </>
    );
};

export default Chatbot;