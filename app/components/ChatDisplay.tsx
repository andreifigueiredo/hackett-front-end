import { useEffect, useRef } from "react";
import type { ChatMessage } from "../interfaces";
import ReactMarkdown from 'react-markdown';

interface ChatMessageDisplayProps {
  messages: ChatMessage[];
}

const ChatMessageDisplay = ({ messages }: ChatMessageDisplayProps) => {
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="chat-display">
      {messages.map((message, index) => (
        <div
          key={index}
          className="chat-display-message-line"
          style={{
            justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
          }}
        >
          <div
            className="chat-display-message-content"
            style={{
              backgroundColor: message.sender === 'user' ? '#9c9c9c' : 'transparent',
              maxWidth: "100%",
            }}
          >
            <ReactMarkdown>{message.text}</ReactMarkdown>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  )
}

export default ChatMessageDisplay;