import { Message as MessageType } from "../types/chat";
import ReactMarkdown from "react-markdown";

interface Props {
  message: MessageType;
}

export default function Message({ message }: Props) {
  const isUser = message.role === "user";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        marginBottom: "10px",
      }}
    >
      <div
        style={{
          padding: "10px",
          borderRadius: "10px",
          background: isUser ? "#3f009eff" : "#e5e5ea",
          color: isUser ? "white" : "black",
          maxWidth: "60%",
        }}
      >
        <div className="assistant-message">
          <ReactMarkdown>{message.content}</ReactMarkdown>
        </div>

      </div>
    </div>
  );
}
