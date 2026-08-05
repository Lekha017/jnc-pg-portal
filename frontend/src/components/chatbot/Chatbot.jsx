import { useState } from "react";
import { X, Send } from "lucide-react";
import { BsChatDotsFill } from "react-icons/bs";
import { askChatbot } from "../../services/chatService";

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text:
        "Hi 👋 Welcome to Jyoti Nivas College PG Centre Assistant.\n\nAsk me anything about admissions, fees, programmes, departments, faculty, HODs, placements, events, announcements and the college.",
    },
  ]);

  const sendMessage = async () => {
    if (!question.trim() || loading) return;

    const currentQuestion = question.trim();

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: currentQuestion,
      },
    ]);

    setQuestion("");
    setLoading(true);

    try {
      const data = await askChatbot(currentQuestion);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text:
            data.answer ||
            "Sorry, I couldn't find that information.",
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text:
            error?.response?.data?.message ||
            "Sorry, I couldn't process your request. Please try again.",
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
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-[0_15px_40px_rgba(45,42,112,0.35)] hover:scale-110 hover:-translate-y-1 transition-all duration-300"
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
        <div className="fixed bottom-24 right-6 w-[380px] h-[560px] bg-white rounded-3xl border border-gray-200 flex flex-col z-50 shadow-[0_30px_80px_rgba(45,42,112,0.20)]">

          <div className="bg-[#2D2A70] text-white px-5 py-4 rounded-t-3xl font-bold">
            JNC PG Assistant
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`max-w-[85%] px-4 py-3 rounded-2xl whitespace-pre-wrap text-sm ${
                  msg.sender === "user"
                    ? "ml-auto bg-[#2D2A70] text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {loading && (
              <div className="bg-gray-100 text-gray-600 px-4 py-3 rounded-2xl text-sm w-fit">
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
              placeholder="Ask about fees, HOD, admissions..."
              className="flex-1 border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#2D2A70]"
            />

            <button
              onClick={sendMessage}
              disabled={loading}
              className="bg-[#2D2A70] text-white p-3 rounded-xl disabled:opacity-50"
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