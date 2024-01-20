"use client";

function MainComponent() {
  const [messages, setMessages] = React.useState([]);
  const [inputValue, setInputValue] = React.useState("");
  const botResponses = ["go away", "i don't care"];
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    setMessages((currentMessages) => [
      ...currentMessages,
      { text: inputValue, author: "user" },
    ]);
    setInputValue("");
    setTimeout(() => {
      const responseIndex = Math.floor(Math.random() * botResponses.length);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: botResponses[responseIndex], author: "ai" },
      ]);
    }, 1500);
  };
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };
  let messageList = messages.map((message, index) => (
    <div
      key={index}
      className={`flex mb-2 ${
        message.author === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`px-4 py-2 rounded-lg ${
          message.author === "user"
            ? "bg-[#5865F2] text-white"
            : "bg-[#35373E] text-white"
        }`}
        style={{
          animation:
            message.author === "user" ? "slideRight .5s" : "slideLeft .5s",
        }}
      >
        {message.text}
      </div>
    </div>
  ));
  return (
    <div className="font-roboto flex flex-col h-screen">
      <div className="flex-none h-[60px] bg-[#40444B] text-white flex items-center px-4">
        <span className="text-2xl">
          <i className="fas fa-robot"></i> AI Chat
        </span>
      </div>
      <div className="flex-1 px-4 py-2 overflow-y-auto bg-[#36393F] space-y-2">
        {messageList}
      </div>
      <form onSubmit={handleSendMessage} className="flex-none bg-[#40444B]">
        <input
          name="message"
          type="text"
          placeholder="Message..."
          className="w-full p-2 bg-[#2F3136] text-white rounded-b-lg focus:outline-none"
          value={inputValue}
          onChange={handleChange}
        />
      </form>
      <style jsx global>{`
        @keyframes slideRight {
          from {
            opacity: 0;
            transform: translateX(50%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideLeft {
          from {
            opacity: 0;
            transform: translateX(-50%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}

export default MainComponent;
