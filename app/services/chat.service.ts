export const fetchChatResponse = async (message: string): Promise<string> => {
  if (!message || message.trim() === '') {
    throw new Error('Message cannot be empty.');
  }

  const API_BASE_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:3000';

  try {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      if (response.status === 400) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Bad Request');
      }
      throw new Error('Connection lost, please retry.');
    }

    const data = await response.json();
    return data.reply;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Connection lost, please retry.');
  }
};