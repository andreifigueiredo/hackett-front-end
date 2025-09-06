export const fetchChatStream = async (
  message: string,
  onToken: (token: string) => void
): Promise<void> => {
  if (!message || message.trim() === '') {
    throw new Error('Message cannot be empty.');
  }

  const API_BASE_URL =
    import.meta.env.VITE_APP_API_URL || 'http://localhost:3000';

  try {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });

    if (response.status === 429) {
      throw new Error('You are making too many questions. Please try again in a moment.');
    }

    if (!response.ok || !response.body) {
      throw new Error('Connection lost, please retry.');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let partial = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        return;
      }

      partial += decoder.decode(value, { stream: true });

      const lines = partial.split('\n');
      partial = lines.pop() || '';

      for (const line of lines) {
        if (!line.startsWith('data:')) {
          continue;
        }

        const raw = line.slice(5).trim();

        if (raw === '[DONE]') {
          continue;
        }

        if (raw === '[ERROR]') {
          throw new Error('Stream failed. Please try again.');
        }

        try {
          const token = JSON.parse(raw);
          onToken(token);
        } catch {
          console.warn('Invalid SSE token:', raw);
        }
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Connection lost, please retry.');
  }
};
