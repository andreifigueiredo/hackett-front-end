import { useState, useRef } from 'react';
import { fetchChatResponse } from '../services/chat.service';
import ChatMessageDisplay from './ChatDisplay';
import type { ChatMessage } from '../interfaces';
import ChatForm from './ChatForm';
import ChatError from './ChatError';

const ChatBox = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    const userMessage: ChatMessage = {
      id: Date.now(),
      sender: 'user',
      text: input,
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    const typingMessage: ChatMessage = {
      id: Date.now() + 1,
      sender: 'bot',
      text: 'Typing...',
    };

    setMessages((prevMessages) => [...prevMessages, typingMessage]);
    scrollToBottom();

    try {
      const botReply = await fetchChatResponse(input);
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === typingMessage.id ? { ...msg, text: botReply } : msg
        )
      );
    } catch (err: any) {
      setError(err.message);
      setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== typingMessage.id));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-box">
      <ChatMessageDisplay messages={messages} messagesEndRef={messagesEndRef} scrollToBottom={scrollToBottom} />

      <ChatForm handleSendMessage={handleSendMessage} input={input} setInput={setInput} isLoading={isLoading} />
      
      <ChatError error={error} />
    </div>
  );
};

export default ChatBox;