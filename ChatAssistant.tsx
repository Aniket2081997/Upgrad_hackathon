import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, X, Minimize2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { UserData } from "./Dashboard";
import aiAvatar from "@/assets/ai-avatar.jpg";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface ChatAssistantProps {
  userData: UserData | null;
}

const ChatAssistant = ({ userData }: ChatAssistantProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm your AI Career Counsellor. I'm here to help you explore career opportunities and find the perfect course for your goals. How can I assist you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes("course") || lowerMessage.includes("program")) {
      return "Based on your profile, I'd recommend exploring our Data Science or Full Stack Development programs. They align well with current market demands and offer excellent ROI. Would you like me to show you specific course details?";
    }
    
    if (lowerMessage.includes("salary") || lowerMessage.includes("pay")) {
      return "Great question! Our alumni typically see 50-150% salary increases after completing their programs. The exact increase depends on your current experience and the program you choose. Data Science roles average ₹8-15 LPA for freshers and ₹15-25 LPA for experienced professionals.";
    }
    
    if (lowerMessage.includes("career") || lowerMessage.includes("job")) {
      return "Career growth is one of our strongest points! Our industry partnerships ensure 90%+ placement rates. I can help you understand which career path suits your interests and current skills best. What specific role interests you most?";
    }
    
    if (lowerMessage.includes("time") || lowerMessage.includes("duration")) {
      return "Our programs are designed to fit your schedule! Most programs range from 6-12 months with flexible learning options. You can study part-time while working. The key is consistent learning - just 2-3 hours daily can transform your career!";
    }

    // Default responses
    const defaultResponses = [
      "That's an interesting question! Based on your background, I'd suggest focusing on building skills that complement your current experience. Would you like me to recommend specific learning paths?",
      "I understand your concern. Many of our successful learners had similar questions initially. The key is choosing the right program that matches your goals and timeline. What matters most to you - quick skill building or comprehensive career change?",
      "Great point! Let me help you think through this systematically. Your success depends on choosing the right fit for your situation. What's your primary career objective right now?",
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(userMessage.text),
        sender: "ai",
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-primary rounded-full shadow-elevated hover:shadow-glow transition-all duration-300 flex items-center justify-center z-50 animate-pulse-glow"
      >
        <MessageCircle className="w-6 h-6 text-primary-foreground" />
      </button>
    );
  }

  return (
    <div 
      className={cn(
        "fixed bottom-6 right-6 bg-card rounded-xl shadow-elevated border z-50 transition-all duration-300",
        isMinimized ? "w-80 h-16" : "w-96 h-96"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-gradient-primary rounded-t-xl">
        <div className="flex items-center gap-3">
          <img 
            src={aiAvatar} 
            alt="AI Career Counsellor"
            className="w-8 h-8 rounded-full object-cover"
          />
          <div>
            <h3 className="font-heading font-semibold text-primary-foreground text-sm">
              AI Career Counsellor
            </h3>
            <p className="text-primary-foreground/80 text-xs">
              {isTyping ? "Typing..." : "Online"}
            </p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsMinimized(!isMinimized)}
            className="w-6 h-6 p-0 text-primary-foreground hover:bg-primary-foreground/20"
          >
            <Minimize2 className="w-3 h-3" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsOpen(false)}
            className="w-6 h-6 p-0 text-primary-foreground hover:bg-primary-foreground/20"
          >
            <X className="w-3 h-3" />
          </Button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="h-64 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex",
                  message.sender === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "chat-message",
                    message.sender === "user" ? "chat-message-user" : "chat-message-ai"
                  )}
                >
                  {message.sender === "ai" && (
                    <div className="flex items-start gap-2">
                      <img 
                        src={aiAvatar} 
                        alt="AI"
                        className="w-6 h-6 rounded-full object-cover flex-shrink-0 mt-0.5"
                      />
                      <div>
                        <p className="text-sm">{message.text}</p>
                        <span className="text-xs opacity-60">
                          {message.timestamp.toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                      </div>
                    </div>
                  )}
                  
                  {message.sender === "user" && (
                    <div>
                      <p className="text-sm">{message.text}</p>
                      <span className="text-xs opacity-80">
                        {message.timestamp.toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="chat-message chat-message-ai">
                  <div className="flex items-center gap-2">
                    <img 
                      src={aiAvatar} 
                      alt="AI"
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about your career..."
                className="flex-1"
              />
              <Button 
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                size="sm"
                className="btn-hero"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatAssistant;