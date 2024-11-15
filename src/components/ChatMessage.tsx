import React from 'react';
import { motion } from 'framer-motion';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: string;
  isBot: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, isBot }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-4 p-4 ${isBot ? 'bg-gray-50' : 'bg-white'}`}
    >
      <div className="flex-shrink-0">
        {isBot ? (
          <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
        ) : (
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-gray-600" />
          </div>
        )}
      </div>
      <div className="flex-1">
        <p className={`text-sm ${isBot ? 'font-medium' : ''}`}>
          {isBot ? 'Dr. Parthip Ashok MBBS LLB' : 'You'}
        </p>
        <p className="mt-1 text-gray-800">{message}</p>
      </div>
    </motion.div>
  );
};