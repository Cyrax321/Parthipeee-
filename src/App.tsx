import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { generateAIResponse } from './utils/api';

interface Message {
  text: string;
  isBot: boolean;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hello! I'm Dr. Parthip Ashok, an AI medical and legal consultant. How can I assist you today?",
      isBot: true,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (message: string) => {
    setMessages(prev => [...prev, { text: message, isBot: false }]);
    setIsLoading(true);
    
    try {
      const response = await generateAIResponse(message);
      setMessages(prev => [...prev, { text: response, isBot: true }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        text: "I apologize, but I'm having trouble connecting right now. Please try again later.", 
        isBot: true 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto h-screen flex flex-col">
        <header className="bg-black text-white p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6 text-black" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Dr. Parthip Ashok</h1>
              <p className="text-sm text-gray-300">MBBS, LLB - AI Medical & Legal Consultant</p>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="space-y-2">
            {messages.map((message, index) => (
              <ChatMessage
                key={index}
                message={message.text}
                isBot={message.isBot}
              />
            ))}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4"
              >
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </main>

        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
}

export default App;