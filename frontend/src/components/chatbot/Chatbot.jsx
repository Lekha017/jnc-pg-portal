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
        className="
          fixed
          bottom-4 right-4
          sm:bottom-6 sm:right-6
          z-50
          w-12 h-12
          sm:w-14 sm:h-14
          rounded-full
          bg-white
          flex items-center justify-center
          shadow-[0_15px_40px_rgba(45,42,112,0.35)]
          hover:scale-110
          hover:-translate-y-1
          transition-all
          duration-300
        "
      >
        {open ? (
          <X
            size={24}
            className="sm:w-7 sm:h-7"
            color="#2D2A70"
          />
        ) : (
          <BsChatDotsFill
            size={24}
            className="sm:w-7 sm:h-7"
            color="#2D2A70"
          />
        )}
      </button>

      {/* Chat Window */}
      {open && (
        <div
          className="
            fixed
            z-50

            bottom-20
            left-3 right-3

            sm:left-auto
            sm:right-6
            sm:bottom-24

            w-auto
            sm:w-[380px]

            h-[70vh]
            max-h-[560px]
            min-h-[420px]

            bg-white
            rounded-2xl
            sm:rounded-3xl

            border border-gray-200

            flex flex-col

            shadow-[0_30px_80px_rgba(45,42,112,0.20)]
          "
        >

          {/* Header */}
          <div
            className="
              bg-[#2D2A70]
              text-white
              px-4 py-3
              sm:px-5 sm:py-4
              rounded-t-2xl
              sm:rounded-t-3xl
              font-bold
              text-sm
              sm:text-base
              flex-shrink-0
            "
          >
            JNC PG Assistant
          </div>

          {/* Messages */}
          <div
            className="
              flex-1
              overflow-y-auto
              p-3
              sm:p-4
              space-y-3
              min-h-0
            "
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`
                  max-w-[90%]
                  sm:max-w-[85%]
                  px-3 py-2.5
                  sm:px-4 sm:py-3
                  rounded-2xl
                  whitespace-pre-wrap
                  text-sm
                  break-words
                  ${
                    msg.sender === "user"
                      ? "ml-auto bg-[#2D2A70] text-white"
                      : "bg-gray-100 text-gray-800"
                  }
                `}
              >
                {msg.text}
              </div>
            ))}

            {loading && (
              <div
                className="
                  bg-gray-100
                  text-gray-600
                  px-3 py-2.5
                  sm:px-4 sm:py-3
                  rounded-2xl
                  text-sm
                  w-fit
                "
              >
                Typing...
              </div>
            )}
          </div>

          {/* Input */}
          <div
            className="
              border-t
              p-2.5
              sm:p-3
              flex
              gap-2
              flex-shrink-0
            "
          >
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
              className="
                flex-1
                min-w-0
                border
                rounded-xl
                px-3
                py-2
                text-sm
                outline-none
                focus:ring-2
                focus:ring-[#2D2A70]
              "
            />

            <button
              onClick={sendMessage}
              disabled={loading}
              className="
                bg-[#2D2A70]
                text-white
                p-2.5
                sm:p-3
                rounded-xl
                flex-shrink-0
                disabled:opacity-50
              "
            >
              <Send size={17} />
            </button>
          </div>

        </div>
      )}
    </>
  );
};

export default Chatbot;