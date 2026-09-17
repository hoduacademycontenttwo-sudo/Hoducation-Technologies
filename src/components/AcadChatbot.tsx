import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IconSend,
  IconX,
  IconRotateClockwise,
  IconArrowUpRight,
  IconSparkles,
} from '@tabler/icons-react';
import RobotAvatar from './RobotAvatar';
import { askGemini, ChatHistoryItem } from '../services/geminiChat';
import './AcadChatbot.css';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  time: string;
  action?: {
    label: string;
    targetId?: string;
    url?: string;
  };
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 'm-1',
    sender: 'bot',
    text: "Hello! I'm Acad, the AI solutions assistant for Hoducation Technologies. Powered by Gemini, I can explain our software services, calculate requirements, or walk you through our flagship EdTech OS AcadOS. How can I help you today?",
    time: 'Just now',
  },
];

const SUGGESTED_QUERIES = [
  'Tell me about AcadOS',
  'Custom Software & Portals',
  'Enterprise ERP Systems',
  'Intelligent Automations',
  'Direct Contact & Hotline',
];

export const AcadChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatDisplayRef = useRef<HTMLDivElement>(null);

  // Auto-scroll when new messages arrive
  useEffect(() => {
    if (chatDisplayRef.current) {
      chatDisplayRef.current.scrollTop = chatDisplayRef.current.scrollHeight;
    }
  }, [messages, isTyping, isOpen]);

  // Reset conversation
  const handleResetChat = () => {
    setMessages([
      {
        id: `m-${Date.now()}`,
        sender: 'bot',
        text: "Conversation refreshed. Ask me anything about Hoducation Technologies' software services, enterprise ERPs, or our flagship platform AcadOS!",
        time: 'Just now',
      },
    ]);
  };

  // Rule-based fallback if network / Gemini API is unreachable
  const generateFallbackReply = (query: string): Message => {
    const q = query.toLowerCase();
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (q.includes('contact') || q.includes('hotline') || q.includes('phone') || q.includes('email') || q.includes('number') || q.includes('call')) {
      return {
        id: `b-${Date.now()}`,
        sender: 'bot',
        text: 'DIRECT CONTACT SUPPORT:\n• Hotline / Phone: +91 9660034117\n• Email: hoducationtechnologies@gmail.com\n\nOur solutions engineering team is available for direct calls and consultations.',
        time: now,
        action: {
          label: 'Chat on WhatsApp (+91 9660034117)',
          url: 'https://wa.me/919660034117?text=Hello%20Hoducation%20Technologies,%20I%20would%20like%20to%20connect%20with%20your%20engineering%20team.',
        },
      };
    }

    if (q.includes('acados') || q.includes('school') || q.includes('college') || q.includes('student') || q.includes('edtech')) {
      return {
        id: `b-${Date.now()}`,
        sender: 'bot',
        text: 'AcadOS is Hoducation Technologies’ flagship 5-in-1 institutional OS. It powers question paper generation (<60s), AI/CV OMR grading (99.8% precision), CBT exams, and multi-campus management.',
        time: now,
        action: {
          label: 'Visit acados.app',
          url: 'https://acados.app/',
        },
      };
    }

    if (q.includes('leadership') || q.includes('founder') || q.includes('cto') || q.includes('coo') || q.includes('team')) {
      return {
        id: `b-${Date.now()}`,
        sender: 'bot',
        text: 'Hoducation Technologies is led by:\n• Abhishek Agarwal — Chief Technology Officer (CTO)\n• Rohit Jain — Chief Operating Officer (COO)',
        time: now,
        action: {
          label: 'Meet Our Leadership',
          targetId: 'about',
        },
      };
    }

    return {
      id: `b-${Date.now()}`,
      sender: 'bot',
      text: "At Hoducation Technologies, we build custom software, enterprise ERPs, CRMs, automations, and AcadOS. How can our engineering team assist you?",
      time: now,
      action: {
        label: 'Explore Services',
        targetId: 'services',
      },
    };
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputVal).trim();
    if (!text || isTyping) return;

    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text,
      time: now,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    // Build chat history for Gemini multi-turn conversation
    const history: ChatHistoryItem[] = messages
      .filter((m) => m.id !== 'm-1')
      .slice(-6)
      .map((m) => ({
        role: m.sender === 'user' ? 'user' : 'model',
        text: m.text,
      }));

    try {
      const replyText = await askGemini(text, history);
      const q = text.toLowerCase();

      // Contextual action buttons based on topic
      let action: Message['action'];
      if (q.includes('acados') || replyText.toLowerCase().includes('acados.app')) {
        action = { label: 'Visit acados.app', url: 'https://acados.app/' };
      } else if (q.includes('contact') || q.includes('phone') || q.includes('call') || q.includes('hire')) {
        action = {
          label: 'Chat on WhatsApp (+91 9660034117)',
          url: 'https://wa.me/919660034117?text=Hello%20Hoducation%20Technologies,%20I%20would%20like%20to%20discuss%20a%20project.',
        };
      } else if (q.includes('service') || q.includes('erp') || q.includes('custom') || q.includes('portal') || q.includes('crm')) {
        action = { label: 'Explore Services', targetId: 'services' };
      }

      const botMsg: Message = {
        id: `b-${Date.now()}`,
        sender: 'bot',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        action,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.warn('Gemini API call failed, falling back to local engine:', err);
      const fallbackMsg = generateFallbackReply(text);
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleActionClick = (action: Message['action']) => {
    if (!action) return;
    if (action.url) {
      window.open(action.url, '_blank');
      return;
    }
    if (action.targetId) {
      const el = document.getElementById(action.targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* Floating Toggle Launcher Button */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => setIsOpen(true)}
          className="acad-launcher-btn"
          aria-label="Open Acad Assistant"
        >
          <div className="acad-avatar-wrap">
            <RobotAvatar size={30} />
            <span className="acad-online-pip" />
          </div>
          <div className="acad-launcher-text">
            <span className="acad-launcher-label">Ask Acad</span>
            <span className="acad-launcher-sub">Hoducation Assistant</span>
          </div>
        </motion.button>
      )}

      {/* Chat Window Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.92 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="acad-chat-window"
          >
            {/* Header - Matching Image 2 */}
            <div className="acad-chat-header">
              <div className="acad-header-info">
                <RobotAvatar size={38} />
                <div>
                  <h3 className="acad-header-title">
                    <span>Acad</span>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 3,
                      fontSize: 10,
                      fontWeight: 600,
                      color: '#f43f5e',
                      background: 'rgba(244, 63, 94, 0.14)',
                      padding: '2px 6px',
                      borderRadius: 999,
                      marginLeft: 6,
                      border: '1px solid rgba(244, 63, 94, 0.3)'
                    }}>
                      <IconSparkles size={11} />
                      <span>Gemini AI</span>
                    </span>
                  </h3>
                  <p className="acad-header-sub">Hoducation Solutions Assistant</p>
                  <div className="acad-header-status-row">
                    <span className="dot"></span>
                    <span>Online & Ready</span>
                  </div>
                </div>
              </div>

              <div className="acad-header-actions">
                <button
                  type="button"
                  onClick={handleResetChat}
                  className="acad-action-icon-btn"
                  aria-label="Restart Conversation"
                  title="Restart Conversation"
                >
                  <IconRotateClockwise size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="acad-action-icon-btn"
                  aria-label="Close Assistant"
                  title="Close Assistant"
                >
                  <IconX size={18} />
                </button>
              </div>
            </div>

            {/* Chat Display */}
            <div className="acad-chat-display" id="chatDisplay" ref={chatDisplayRef}>
              {messages.map((msg) => (
                <div key={msg.id} className={`acad-msg ${msg.sender}`}>
                  <div className="acad-msg-bubble">
                    <div style={{ whiteSpace: 'pre-line' }}>{msg.text}</div>
                    {msg.action && (
                      <button
                        type="button"
                        onClick={() => handleActionClick(msg.action)}
                        style={{
                          marginTop: 8,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 5,
                          background: 'rgba(255, 77, 109, 0.18)',
                          border: '1px solid rgba(255, 77, 109, 0.4)',
                          color: '#fecdd3',
                          padding: '5px 11px',
                          borderRadius: 6,
                          fontSize: 11,
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        <span>{msg.action.label}</span>
                        <IconArrowUpRight size={12} />
                      </button>
                    )}
                    <div className="acad-msg-time">{msg.time}</div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="acad-typing">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              )}

              {/* Suggested Quick Queries */}
              {messages.length <= 3 && !isTyping && (
                <div className="acad-quick-chips">
                  {SUGGESTED_QUERIES.map((q, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSendMessage(q)}
                      className="acad-chip-btn"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input Row */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="acad-chat-input-row"
            >
              <input
                id="chatInput"
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Ask Acad about software, ERPs, or quote..."
                className="acad-chat-input"
                autoComplete="off"
              />
              <button
                id="sendButton"
                type="submit"
                disabled={!inputVal.trim()}
                className="acad-chat-send"
                aria-label="Send message"
              >
                <IconSend size={15} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AcadChatbot;
