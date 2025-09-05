import { useEffect } from "react";
import type { ChatMessage } from "../interfaces";
import ReactMarkdown from 'react-markdown';

interface ChatMessageDisplayProps {
  messages: ChatMessage[];
  messagesEndRef: React.RefObject<any>;
  scrollToBottom: () => void
}

const ChatMessageDisplay = ({ messages, messagesEndRef, scrollToBottom }: ChatMessageDisplayProps) => {
    useEffect(() => {
      scrollToBottom();
    }, [messages]);

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
                  backgroundColor: message.sender === 'user' ? '#007bff' : '#e5e5e5',
                  color: message.sender === 'user' ? 'white' : 'black',
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