export interface ChatMessage {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export interface ChatResponse {
  response: string;
  status: number;
}

export interface ChatConfig {
  apiKey: string;
  apiUrl: string;
  userId: string;
  agentId: string;
}