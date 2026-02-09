import React, { useState } from "react";
import {
  Package,
  Truck,
  MapPin,
  BarChart3,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  User,
  LogOut,
  Sparkles,
  TrendingUp,
  Zap,
  Brain,
  MessageSquare,
  Plus,
} from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface DashboardProps {
  onLogout: () => void;
  onActionClick: (actionType: string) => void;
  onCreateAction: () => void;
}

export function Dashboard({ onLogout, onActionClick, onCreateAction }: DashboardProps) {
  const [activeInsight, setActiveInsight] = useState(0);

  const stats = [
    {
      label: "Active Shipments",
      value: "24",
      icon: Truck,
      color: "text-cyan-400",
      bg: "from-cyan-500/20 to-blue-500/20",
      trend: "+12%",
    },
    {
      label: "Delivered Today",
      value: "18",
      icon: CheckCircle,
      color: "text-emerald-400",
      bg: "from-emerald-500/20 to-green-500/20",
      trend: "+8%",
    },
    {
      label: "Pending",
      value: "6",
      icon: Clock,
      color: "text-amber-400",
      bg: "from-amber-500/20 to-orange-500/20",
      trend: "-4%",
    },
    {
      label: "Issues",
      value: "2",
      icon: AlertCircle,
      color: "text-rose-400",
      bg: "from-rose-500/20 to-red-500/20",
      trend: "-50%",
    },
  ];

  const actions = [
    {
      label: "Chute Full",
      icon: Package,
      gradient: "from-blue-500 to-cyan-500",
      description: "Alert Web App that the chute is full",
    },
    // {
    //   label: "Chute",
    //   icon: MapPin,
    //   gradient: "from-emerald-500 to-green-500",
    //   description: "Real-time tracking",
    // },
    // {
    //   label: "AI Insights",
    //   icon: Brain,
    //   gradient: "from-purple-500 to-pink-500",
    //   description: "Smart analytics",
    // },
    // {
    //   label: "Documents",
    //   icon: FileText,
    //   gradient: "from-orange-500 to-amber-500",
    //   description: "Auto-generate",
    // },
    // {
    //   label: "Fleet Status",
    //   icon: Truck,
    //   gradient: "from-teal-500 to-cyan-500",
    //   description: "Live monitoring",
    // },
    // {
    //   label: "Optimize Routes",
    //   icon: Zap,
    //   gradient: "from-violet-500 to-purple-500",
    //   description: "AI optimization",
    // },
  ];

  const aiInsights = [
    {
      icon: TrendingUp,
      title: "Peak Efficiency Detected",
      message:
        "Your fleet is performing 23% above average today",
      color: "text-emerald-400",
    },
    {
      icon: Sparkles,
      title: "Route Optimization Available",
      message:
        "AI suggests 3 routes that could save 45 minutes",
      color: "text-blue-400",
    },
    {
      icon: AlertCircle,
      title: "Weather Alert",
      message: "Potential delays on Route 7 due to conditions",
      color: "text-amber-400",
    },
  ];

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
              AI Insights
            </h3>
            <div className="flex gap-1">
              {aiInsights.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveInsight(index)}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    activeInsight === index
                      ? "bg-purple-400 w-4"
                      : "bg-white/30"
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="backdrop-blur-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-4 border border-purple-400/30 shadow-xl">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-white/10">
                {React.createElement(
                  aiInsights[activeInsight].icon,
                  {
                    className: `w-5 h-5 ${aiInsights[activeInsight].color}`,
                  },
                )}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-white text-sm mb-1">
                  {aiInsights[activeInsight].title}
                </h4>
                <p className="text-xs text-purple-100">
                  {aiInsights[activeInsight].message}
                </p>
              </div>
            </div>
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
        <button className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl shadow-purple-500/50 hover:scale-110 transition-transform ring-4 ring-purple-400/30">
          <MessageSquare className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
}