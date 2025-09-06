import { useEffect, useRef, type FormEvent, type KeyboardEvent } from 'react';

interface ChatFormProps {
  handleSendMessage: () => void;
  input: string;
  setInput: (data: string) => void;
  isLoading: boolean
}

const ChatForm = ({ handleSendMessage, input, setInput, isLoading }: ChatFormProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isLoading) {
      inputRef.current?.focus();
    }
  }, [isLoading]);

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      handleSendMessage();
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleFormSubmit(e);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className='chat-form'>
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
        disabled={isLoading}
        className='chat-form-input'
      />
      <button
        type="submit"
        disabled={isLoading || !input.trim()}
        className='chat-form-button'
        style={{
          backgroundColor: (isLoading || !input.trim()) ? '#7b7b7b' : '#9c9c9c',
          color: (isLoading || !input.trim()) ? 'white' : 'black',
          cursor: (isLoading || !input.trim()) ? 'not-allowed' : 'pointer'
        }}
      >
        Send
      </button>
    </form>
  )
}

export default ChatForm;