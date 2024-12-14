import { ChatConfig } from './types';

export const chatConfig: ChatConfig = {
  apiKey: process.env.LYZR_API_KEY || '',
  apiUrl: 'https://agent.api.lyzr.app/v2/chat/',
  userId: 'test-user',
  agentId: '6750b99261f92e3cfef1bb25'
};