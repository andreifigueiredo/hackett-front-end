interface ChatErrorProps {
  error: string | null;
}

const ChatError = ({ error }: ChatErrorProps) => {

  if (!error) {
    return null;
  }

  return (
    <div className="chat-error">
      {error}
    </div>
  )
}

export default ChatError;