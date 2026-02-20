import React, { useState, useEffect } from "react";
import {
  Package,
  User,
  LogOut,
  Sparkles,
  Brain,
  MessageSquare,
  Plus,
  CircleAlert,
  TriangleAlert,
} from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { getAlertRecommendation } from '../services/ollama';
import alertRingtone from "../media/alert_message.mp3";

interface DashboardProps {
  onLogout: () => void;
  onActionClick: (actionType: string) => void;
  onCreateAction: () => void;
  onChatBotClick: () => void;
}

export function Dashboard({ onLogout, onActionClick, onCreateAction, onChatBotClick }: DashboardProps) {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [activeAlert, setActiveAlert] = useState(0);

  const mockChuteData = [
    { chute: "A12", fillLevel: 60 },
    { chute: "B07", fillLevel: 100 },
    // { chute: "C03", fillLevel: 100 },
  ];

  const actions = [
    {
      label: "Chute Cleared",
      icon: Package,
      gradient: "from-blue-500 to-cyan-500",
      description: "",
    },
    {
      label: "Pallet Changed",
      icon: Package,
      gradient: "from-blue-500 to-cyan-500",
      description: "",
    },
  ];

  const aiInsightsIcons = [
    {
      icon: CircleAlert,
      color: "text-red-400",
      severity: "CRITICAL",
    },
    {
      icon: TriangleAlert,
      color: "text-orange-400",
      severity: "MEDIUM",
    },
    {
      icon: TriangleAlert,
      color: "text-orange-400",
      severity: "HIGH",
    },
  ];


  // Handle incoming data
  const handleIncomingData = (data: { chute: string; fillLevel: number }) => {
    if (data.fillLevel >= 75) {
      getAlertRecommendation(data.chute, data.fillLevel).then(recommendation => {
        setAlerts(prev => {
          // Avoid duplicates for the same chute
          const filtered = prev.filter(a => a.chute !== recommendation.chute);
          const updatedAlerts = [...filtered, recommendation];

          // Trigger sound/vibration if it's a CRITICAL alert
          if (recommendation.Severity === "CRITICAL" || recommendation.Severity === "HIGH") {
            triggerMobileAlert();
          }

          return updatedAlerts;
        });
      });
    }
  };

  const triggerMobileAlert = () => {
    // Vibrate
    if (navigator.vibrate) navigator.vibrate([300, 100, 300]);

    // Play sound
    const sound = new Audio(alertRingtone);
    sound.play().catch(() => console.log("Cannot play sound"));
  };

  useEffect(() => {

    // const interval = setInterval(() => {
    // Here you would fetch real backend data, we use mock data
    mockChuteData.forEach(data => handleIncomingData(data));

    // }, 5000);

    // return () => clearInterval(interval);
  }, []);


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <div className="relative backdrop-blur-xl bg-white/10 border-b border-white/10 sticky top-0 z-10">
        <div className="px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/50">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">
                BeltSense AI
              </h1>
              <p className="text-xs text-cyan-300 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Powered by AI
              </p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="p-2 hover:bg-white/10 rounded-xl transition-colors backdrop-blur-sm"
          >
            <LogOut className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      <div className="relative p-4 space-y-6 pb-20">
        {/* User Welcome */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/50 ring-2 ring-purple-400/30">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">
              Welcome back, John
            </h2>
            <p className="text-sm text-purple-200">
              AI has analyzed your operations
            </p>
          </div>
        </div>

        {/* AI Insights Carousel */}
        <div className="relative">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Brain className="w-4 h-4 text-purple-400" />
              Alerts
            </h3>
            <div className="flex gap-1">
              {alerts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveAlert(index)}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${activeAlert === index
                    ? "bg-purple-400 w-4"
                    : "bg-white/30"
                    }`}
                />
              ))}
            </div>
          </div>
          <div className="backdrop-blur-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-4 border border-purple-400/30 shadow-xl">
            {alerts.length > 0 && alerts[activeAlert] ? (
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-white/10">
                  {/* {React.createElement(
                    alerts[activeAlert].Severity ==,
                    {
                      className: `w-5 h-5 ${aiInsights[activeInsight].color}`,
                    },
                  )} */}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-white text-sm mb-1">
                    {alerts[activeAlert].Summary}
                  </h4>
                  <p className="text-xs text-purple-100">
                    {alerts[activeAlert].Recommendations}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-white/70 text-sm">No alerts yet</p>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h3 className="text-sm font-semibold text-white mb-3">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {actions.map((action, index) => (
              <button
                key={index}
                onClick={() => onActionClick(action.label)}
                className="relative backdrop-blur-xl bg-white/5 rounded-2xl p-4 border border-white/10 hover:border-white/30 transition-all active:scale-95 text-left group overflow-hidden shadow-xl hover:shadow-2xl"
              >
                {/* Gradient hover effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-20 transition-opacity`}
                ></div>

                <div className="relative">
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${action.gradient} rounded-xl flex items-center justify-center mb-3 shadow-lg`}
                  >
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-white text-sm mb-1">
                    {action.label}
                  </h4>
                  <p className="text-xs text-white/60">
                    {action.description}
                  </p>
                </div>
              </button>
            ))}
            <button
              onClick={onCreateAction}
              className="relative backdrop-blur-xl bg-white/5 rounded-2xl p-4 border border-white/10 hover:border-white/30 transition-all active:scale-95 text-left group overflow-hidden shadow-xl hover:shadow-2xl"
            >
              {/* Gradient hover effect */}
              <div
                className={`absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-20 transition-opacity`}
              ></div>

              <div className="relative">
                <div
                  className={`w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-3 shadow-lg`}
                >
                  <Plus className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-white text-sm mb-1">
                  Create Action
                </h4>
                <p className="text-xs text-white/60">
                  Add a new action
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* AI Assistant FAB */}
        <button
          onClick={onChatBotClick}
          className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl shadow-purple-500/50 hover:scale-110 transition-transform ring-4 ring-purple-400/30">
          <MessageSquare className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
}