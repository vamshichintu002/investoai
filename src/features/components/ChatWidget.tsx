import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Minimize2, Maximize2, Bot, User } from 'lucide-react';
import clsx from 'clsx';
import { useTheme } from '../contexts/ThemeContext';
import { ChatMessage, sendChatMessage } from '../services/chatService';

const WELCOME_MESSAGE: ChatMessage = {
  text: "Hello! I am your investo assistant created by Mavericks.",
  isUser: false,
  timestamp: new Date()
};

export function ChatWidget() {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isDark = theme === 'dark';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleClose = () => {
    setIsOpen(false);
    setIsMinimized(false);
    setMessages([WELCOME_MESSAGE]);
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage: ChatMessage = {
      text: message,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);

    try {
      const response = await sendChatMessage(message);
      const botMessage: ChatMessage = {
        text: response,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        text: 'Sorry, I encountered an error. Please try again.',
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className={clsx(
          'fixed z-50 p-4 rounded-full shadow-lg transition-all duration-300',
          'hover:scale-110 hover:shadow-xl',
          'bg-gradient-to-r from-blue-600 to-blue-500 text-white',
          'bottom-4 right-4 sm:bottom-6 sm:right-6'
        )}
        aria-label="Open chat"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div 
      className={clsx(
        'fixed z-50 transition-all duration-300 backdrop-blur-sm',
        'border border-border/40',
        isDark ? 'bg-card/95' : 'bg-white/95',
        isMinimized
          ? 'w-[280px] sm:w-[320px] h-14'
          : [
              'w-[calc(100%-2rem)] sm:w-[400px]',
              'h-[calc(100vh-8rem)] sm:h-[600px]',
              'max-h-[calc(100vh-2rem)]'
            ],
        'bottom-4 right-4 sm:bottom-6 sm:right-6',
        'rounded-lg sm:rounded-xl shadow-2xl'
      )}
    >
      <div className={clsx(
        'flex items-center justify-between p-4',
        isDark ? 'border-b border-gray-700/50' : 'border-b border-gray-200/50'
      )}>
        <div className="flex items-center gap-2">
          <Bot className={clsx(
            'w-5 h-5',
            isDark ? 'text-blue-400' : 'text-blue-500'
          )} />
          <h3 className="font-semibold text-base">Investment Assistant</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className={clsx(
              'p-1.5 rounded-lg transition-colors',
              isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
            )}
            aria-label={isMinimized ? 'Maximize chat' : 'Minimize chat'}
          >
            {isMinimized ? (
              <Maximize2 className="w-4 h-4" />
            ) : (
              <Minimize2 className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={handleClose}
            className={clsx(
              'p-1.5 rounded-lg transition-colors',
              isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
            )}
            aria-label="Close chat"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          <div className="h-[calc(100%-8rem)] overflow-y-auto p-4">
            <div className="space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={clsx(
                    'flex items-start gap-2',
                    msg.isUser ? 'justify-end' : 'justify-start'
                  )}
                >
                  {!msg.isUser && (
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-r from-blue-600 to-blue-500">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                  )}
                  <div
                    className={clsx(
                      'max-w-[85%] p-3 rounded-xl shadow-sm',
                      msg.isUser
                        ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white ml-4'
                        : isDark
                          ? 'bg-gray-800 text-white'
                          : 'bg-gray-100 text-gray-900'
                    )}
                  >
                    <p className="text-sm leading-relaxed break-words">{msg.text}</p>
                    <span className={clsx(
                      'text-xs mt-1 block',
                      msg.isUser
                        ? 'text-blue-100'
                        : isDark
                          ? 'text-gray-400'
                          : 'text-gray-500'
                    )}>
                      {msg.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  {msg.isUser && (
                    <div className={clsx(
                      'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
                      isDark ? 'bg-gray-700' : 'bg-gray-200'
                    )}>
                      <User className={clsx(
                        'w-5 h-5',
                        isDark ? 'text-gray-300' : 'text-gray-600'
                      )} />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start items-start gap-2">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-500">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className={clsx(
                    'p-4 rounded-xl',
                    isDark ? 'bg-gray-800' : 'bg-gray-100'
                  )}>
                    <div className="flex space-x-2">
                      <div className={clsx(
                        'w-2 h-2 rounded-full animate-bounce',
                        isDark ? 'bg-gray-500' : 'bg-gray-400'
                      )} style={{ animationDelay: '0ms' }} />
                      <div className={clsx(
                        'w-2 h-2 rounded-full animate-bounce',
                        isDark ? 'bg-gray-500' : 'bg-gray-400'
                      )} style={{ animationDelay: '150ms' }} />
                      <div className={clsx(
                        'w-2 h-2 rounded-full animate-bounce',
                        isDark ? 'bg-gray-500' : 'bg-gray-400'
                      )} style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className={clsx(
            'absolute bottom-0 left-0 right-0 p-4',
            isDark ? 'bg-card/95 border-t border-gray-700/50' : 'bg-white/95 border-t border-gray-200/50'
          )}>
            <div className="flex items-center gap-2">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className={clsx(
                  'flex-1 resize-none rounded-xl p-3 text-sm focus:outline-none focus:ring-2 transition-colors',
                  isDark 
                    ? 'bg-gray-800 text-white placeholder-gray-400 focus:ring-blue-500/50'
                    : 'bg-gray-100 text-gray-900 placeholder-gray-500 focus:ring-blue-500/50'
                )}
                rows={1}
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !message.trim()}
                className={clsx(
                  'p-3 rounded-xl transition-all duration-200',
                  'bg-gradient-to-r from-blue-600 to-blue-500 text-white',
                  'hover:shadow-lg hover:scale-105 active:scale-95',
                  'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'
                )}
                aria-label="Send message"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}