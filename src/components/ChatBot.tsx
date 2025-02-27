'use client';
import React, { useState } from 'react';
import { Button, Input, Avatar, Typography, Tooltip } from 'antd';
import { SendOutlined, CloseOutlined, RobotOutlined } from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Xin chào! Tôi có thể giúp gì cho bạn?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: "Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi sớm nhất có thể!",
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        {!isOpen && <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          className="absolute -top-12 right-0 bg-white px-4 py-2 rounded-full shadow-lg whitespace-nowrap text-sm"
        >
          <div className="flex items-center gap-2">
            <MessageOutlined className="text-indigo-600" />
            <span>Hỏi đáp cùng trợ lý ảo</span>
          </div>
          <div className="absolute -bottom-2 right-5 w-3 h-3 bg-white transform rotate-45"></div>
        </motion.div>
        }

        <Tooltip title={isOpen ? "Đóng chat" : "Mở chat"} placement="left">
          <Button
            type="primary"
            shape="circle"
            size="large"
            className="!w-14 !h-14 bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-indigo-200/50"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <CloseOutlined /> : <RobotOutlined />}
          </Button>
        </Tooltip>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 right-6 w-96 bg-white rounded-2xl shadow-2xl overflow-hidden z-40 border border-gray-100"
          >
            <div className="p-4 bg-gradient-to-r from-white to-[var(--primary)] text-white flex items-center gap-3">
              <Avatar src="/static/bot.jpg" size="large" className="border-2 border-white/30" />
              <div>
                <Text className="text-white font-bold block text-lg">AI Assistant</Text>
                <Text className="text-white/90 text-sm flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full inline-block"></span>
                  Online
                </Text>
              </div>
            </div>
            <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[80%] ${message.isBot
                        ? 'bg-white border border-gray-100 shadow-sm'
                        : 'bg-[var(--primary)]'
                      } rounded-2xl px-4 py-3`}
                  >
                    <Text className={message.isBot ? 'text-gray-800' : '!text-white'}>
                      {message.text}
                    </Text>
                    <Text className={`text-xs ${message.isBot ? 'text-gray-400' : '!text-white'} block mt-1`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Text>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t bg-white">
              <div className="flex gap-2">
                <Input
                  placeholder="Nhập tin nhắn..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onPressEnter={handleSendMessage}
                  className="rounded-full hover:border-indigo-400 focus:border-indigo-500 shadow-sm"
                />
                <Button
                  type="primary"
                  icon={<SendOutlined />}
                  onClick={handleSendMessage}
                  className="bg-indigo-600 hover:bg-indigo-700 shadow-sm hover:shadow-indigo-200/50"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;