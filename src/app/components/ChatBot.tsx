import {
    X
} from 'lucide-react';
import { useState, useEffect, useRef } from "react";

import { sendMessage } from "../services/ollama";
import { Message as MessageType } from "../types/chat";
import Message from "./Message";


const SESSION_TIMEOUT = 5 * 60 * 1000; // 5 minutes in ms
const INITIAL_GREETING = "Hello! I am your Logistics and Warehouse AI assistant. Please provide reject reasons.";


interface ChatBotPageProps {
    onClose: () => void;
}

export function ChatBotPage({ onClose }: ChatBotPageProps) {

    const [input, setInput] = useState<string>("");
    const [messages, setMessages] = useState<MessageType[]>([
        { role: "assistant", content: INITIAL_GREETING },
    ]);
    const [loading, setLoading] = useState<boolean>(false);

    // Track last activity timestamp
    const lastActivity = useRef<number>(Date.now());

    // Reset session after 5 min inactivity
    useEffect(() => {
        const interval = setInterval(() => {
            if (Date.now() - lastActivity.current > SESSION_TIMEOUT) {
                // Reset chat session
                setMessages([{ role: "assistant", content: INITIAL_GREETING }]);
                if (onClose) onClose();
                lastActivity.current = Date.now();
            }
        }, 10_000); // check every 10s

        return () => clearInterval(interval);
    }, []);

    const handleSend = async () => {
        if (!input.trim()) return;

        const newMessages = [
            ...messages,
            { role: "user" as const, content: input },
        ];

        setMessages(newMessages);
        setInput("");
        setLoading(true);
        lastActivity.current = Date.now(); // update last activity

        const reply = await sendMessage(newMessages);

        setMessages([
            ...newMessages,
            { role: "assistant", content: reply },
        ]);

        setLoading(false);
        lastActivity.current = Date.now(); // update last activity
    };

    return (
        <div className="fixed bottom-24 right-5 w-[350px] h-[500px] rounded-lg shadow-lg flex flex-col overflow-hidden z-[999] bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative">

            {/* Animated background effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center gap-3 px-4 py-3 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 border-b border-purple-800">
                <button
                    onClick={onClose}
                    className="p-2 hover:bg-purple-800/20 rounded-xl transition-colors"
                >
                    <X className="w-5 h-5 text-white" />
                </button>
                <div className="flex-1">
                    <h1 className="text-lg font-bold text-white">AI Assistant</h1>
                </div>
            </div>

            {/* Messages / Body */}
            <div className="flex-1 p-3 overflow-y-auto bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
                {messages.map((msg, i) => (
                    <Message key={i} message={msg} />
                ))}
                {loading && (
                    <div className="mt-2 inline-flex items-center bg-[#e5e5ea] px-3 py-2 rounded-lg">
                        <span className="flex space-x-1">
                            <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-75"></span>
                            <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-150"></span>
                            <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-300"></span>
                        </span>
                    </div>
                )}
            </div>

            {/* Input */}
            <div className="flex border-t border-purple-700 p-3 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    className="flex-1 p-2 border border-purple-700 rounded bg-slate-800 text-white placeholder-purple-300"
                />
                <button
                    onClick={handleSend}
                    className="ml-2 px-3 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
                >
                    Send
                </button>
            </div>

        </div>
    );
}
