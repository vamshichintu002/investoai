import axios from 'axios';
import { chatConfig } from './config';
import type { ChatResponse } from './types';

export async function sendChatRequest(message: string): Promise<string> {
  try {
    const response = await axios.post<ChatResponse>(
      chatConfig.apiUrl,
      {
        user_id: chatConfig.userId,
        agent_id: chatConfig.agentId,
        session_id: `${Date.now()}-${Math.random()}`,
        message: message,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': chatConfig.apiKey,
        },
      }
    );

    return response.data.response;
  } catch (error) {
    console.error('Error sending message:', error);
    throw new Error('Failed to send message');
  }
}