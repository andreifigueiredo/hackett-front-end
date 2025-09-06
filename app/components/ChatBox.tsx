import { useState, useRef } from 'react';
import ChatMessageDisplay from './ChatDisplay';
import type { ChatMessage } from '../interfaces';
import ChatForm from './ChatForm';
import ChatError from './ChatError';
import { fetchChatStream } from '../services/chat.service';

const ChatBox = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim()) {
      return;
    }

    const userMessage: ChatMessage = {
      id: Date.now(),
      sender: 'user',
      text: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    const typingMessage: ChatMessage = {
      id: Date.now() + 1,
      sender: 'bot',
      text: 'Typing...',
    };

    setMessages((prev) => [...prev, typingMessage]);

    try {
      await fetchChatStream(input, (token) => {
        setMessages((prev) =>
          prev.map((msg) => {
            if (msg.id !== typingMessage.id) {
              return msg;
            }

            if (msg.text === 'Typing...') {
              return { ...msg, text: token };
            }

            return { ...msg, text: msg.text + token };
          })
        );
      });
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Unexpected error, please try again');
      }
      setMessages((prev) =>
        prev.filter((msg) => msg.id !== typingMessage.id)
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-box">
      <ChatMessageDisplay
        messages={messages}
        messagesEndRef={messagesEndRef}
        scrollToBottom={scrollToBottom}
      />
      <ChatForm
        handleSendMessage={handleSendMessage}
        input={input}
        setInput={setInput}
        isLoading={isLoading}
      />
      <ChatError error={error} />
    </div>
  );
};

export default ChatBox;
