import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Badge,
  Button,
  Input,
  List,
  Avatar,
  Typography,
  Space,
  Empty,
} from "antd";
import {
  MessageOutlined,
  CloseOutlined,
  SearchOutlined,
  SendOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

// Mock Data (Keep this for demonstration)
const mockShops = [
  {
    id: 1,
    name: "Shop A",
    avatar: "https://placekitten.com/40/40",
    lastMessage: "Hello there!",
    unread: 2,
    messages: [
      { id: 1, sender: "shop", content: "Hi!", timestamp: new Date() },
      { id: 2, sender: "user", content: "Hello!", timestamp: new Date() },
    ],
  },
  {
    id: 2,
    name: "Shop B",
    avatar: "https://placekitten.com/41/41",
    lastMessage: "How can I help?",
    unread: 0,
    messages: [],
  },
  {
    id: 3,
    name: "Shop C",
    avatar: "https://placekitten.com/42/42",
    lastMessage: "Thanks for your order!",
    unread: 1,
    messages: [],
  },
  {
    id: 4,
    name: "Shop D",
    avatar: "https://placekitten.com/43/43",
    lastMessage: "We are open!",
    unread: 0,
    messages: [],
  },
];

const ChatUI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedShop, setSelectedShop] = useState(mockShops[0]); // Select first shop by default for demo
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() && selectedShop) {
      const newMessage = {
        id: Date.now(),
        sender: "user",
        content: message,
        timestamp: new Date(),
      };
      setSelectedShop({
        ...selectedShop,
        messages: [...selectedShop.messages, newMessage],
      });
      setMessage("");
      // In a real app, you would send the message to the server here
    }
  };

  const filteredShops = mockShops.filter((shop) =>
    shop.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end">
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2, ease: "easeOut" }} // Smoother easeOut
      >
        <Badge count={3} offset={[-5, 5]}>
          {" "}
          {/* Adjusted badge position */}
          <Button
            type="primary"
            shape="circle"
            size="large"
            icon={<MessageOutlined />}
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow duration-200" // Softer shadow, hover effect
          />
        </Badge>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }} // Smoother easeOut
            className="fixed inset-x-8 bottom-8 md:inset-x-auto md:right-8 md:bottom-8 md:w-[80vw] lg:w-[900px] h-[70vh] md:h-[600px] bg-white rounded-xl shadow-xl flex overflow-hidden border-none backdrop-blur-sm bg-opacity-95" // Responsive width, softer shadow, rounded-xl, removed border, bg-opacity
            style={{ maxWidth: "1000px", maxHeight: "700px" }} // Max width and height
          >
            {/* Left Sidebar */}
            <motion.div
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }} // Smoother easeOut
              className="w-[320px] border-r border-gray-100 flex flex-col" // Lighter border
            >
              <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                <Title level={4} className="!mb-0">
                  Messages
                </Title>{" "}
                {/* "Messages" in English for broader appeal */}
                <Button
                  type="text"
                  icon={<CloseOutlined />}
                  onClick={() => setIsOpen(false)}
                  className="hover:bg-gray-100 rounded-full transition-colors" // Hover effect on close button
                />
              </div>
              <div className="p-4 border-b border-gray-100">
                <Input
                  prefix={<SearchOutlined className="text-gray-400" />}
                  placeholder="Search..." // "Search..." in English
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="rounded-full bg-gray-50 border-none focus:ring-primary focus:ring-1" // Lighter background, focus ring
                />
              </div>
              <div className="flex-1 overflow-y-auto">
                <List
                  className="chat-shops"
                  itemLayout="horizontal"
                  dataSource={filteredShops} // Use filteredShops here
                  renderItem={(shop) => (
                    <List.Item
                      className={`cursor-pointer transition-colors px-4 py-2 hover:bg-gray-50 ${
                        selectedShop?.id === shop.id ? "bg-gray-100" : "" // Slightly darker selected background
                      }`}
                      onClick={() => setSelectedShop(shop)}
                    >
                      <List.Item.Meta
                        avatar={
                          <Badge
                            dot={shop.unread > 0}
                            status="success"
                            offset={[-4, 32]}
                          >
                            <Avatar src={shop.avatar} size={40} />
                          </Badge>
                        }
                        title={<Text strong>{shop.name}</Text>}
                        description={
                          <Text
                            type="secondary"
                            className="text-sm line-clamp-1 text-gray-500"
                          >
                            {" "}
                            {/* Darker secondary text */}
                            {shop.lastMessage}
                          </Text>
                        }
                      />
                    </List.Item>
                  )}
                />
              </div>
            </motion.div>

            {/* Right Content */}
            <motion.div
              initial={{ x: 20 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }} // Smoother easeOut
              className="flex-1 flex flex-col"
            >
              {selectedShop ? (
                <>
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <Avatar src={selectedShop.avatar} size={40} />
                      <div>
                        <Text strong className="block">
                          {selectedShop.name}
                        </Text>
                        <Text
                          type="secondary"
                          className="text-sm text-gray-500"
                        >
                          Active
                        </Text>{" "}
                        {/* "Active" in English, darker text */}
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {selectedShop.messages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }} // Smoother easeOut
                        className={`flex ${
                          msg.sender === "user"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        {msg.sender === "shop" && (
                          <Avatar
                            src={selectedShop.avatar}
                            size={32}
                            className="mr-2 self-end"
                          />
                        )}
                        <div
                          className={`max-w-[70%] p-3 rounded-2xl ${
                            msg.sender === "user" // Increased max-width for messages
                              ? "bg-[var(--primary)] text-white shadow-md" // Added shadow to user messages
                              : "bg-gray-100 shadow-sm" // Softer shadow for shop messages
                          }`}
                        >
                          <Text
                            className={
                              msg.sender === "user" ? "text-white" : ""
                            }
                          >
                            {msg.content}
                          </Text>
                          <div
                            className={`text-xs mt-1 ${
                              msg.sender === "user"
                                ? "text-white/80"
                                : "text-gray-500"
                            }`}
                          >
                            {msg.timestamp.toLocaleTimeString()}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }} // Smoother easeOut
                    className="p-4 border-t border-gray-100 backdrop-blur-sm bg-opacity-95"
                  >
                    <Space.Compact className="w-full">
                      <Input
                        placeholder="Type a message..." // "Type a message..." in English
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onPressEnter={handleSend}
                        className="!rounded-full transition-shadow focus:shadow-md border-none bg-gray-50 focus:ring-primary focus:ring-1" // Focus ring, lighter background
                      />
                      <Button
                        type="primary"
                        icon={<SendOutlined />}
                        onClick={handleSend}
                        className="!rounded-full hover:scale-105 transition-transform shadow-md hover:shadow-lg" // Added shadows
                      />
                    </Space.Compact>
                  </motion.div>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex-1 flex items-center justify-center"
                >
                  <Empty
                    description="Select a chat to start messaging" // "Select a chat..." in English
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                  />
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatUI;
