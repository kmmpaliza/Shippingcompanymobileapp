import React, { useState } from 'react';
import {
  ArrowLeft,
  Package,
  CheckCircle,
  AlertCircle,
  MapPin,
  Camera,
  FileText,
  Send,
  Sparkles,
  Upload,
  Clock,
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Label } from './ui/label';
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Chutes } from '../types/chutes';

interface ActionPageProps {
  actionType: string;
  onBack: () => void;
}

export function ActionPage({ actionType, onBack }: ActionPageProps) {
  const [notes, setNotes] = useState('');
  const [location, setLocation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  // const [chutes, setChutes] = useState<Chutes[]>([]); 
  const [chutes, setChutes] = useState<Chutes[]>([
    { id: 1, name: 'Chute 1', status: 'Normal', fillLevel: 45, lastUpdated: '10:23:15 AM', hasActiveAlert: false },
    { id: 2, name: 'Chute 2', status: 'Warning', fillLevel: 75, lastUpdated: '10:20:42 AM', hasActiveAlert: false },
    { id: 3, name: 'Chute 3', status: 'Full', fillLevel: 100, lastUpdated: '10:15:30 AM', hasActiveAlert: true },
    { id: 4, name: 'Chute 4', status: 'Normal', fillLevel: 30, lastUpdated: '10:25:01 AM', hasActiveAlert: false },
    { id: 5, name: 'Chute 5', status: 'Offline', fillLevel: 0, lastUpdated: '09:45:12 AM', hasActiveAlert: false },
  ]);
  const [selected, setSelected] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      // Reset after 2 seconds and go back
      setTimeout(() => {
        setIsSuccess(false);
        onBack();
      }, 2000);
    }, 1500);
  };

  const getActionDetails = () => {
    switch (actionType) {
      case 'Chute Full':
        return {
          title: 'Chute Full Alert',
          description: 'Report that the chute is at full capacity',
          icon: Package,
          gradient: 'from-blue-500 to-cyan-500',
          fields: [
            { label: 'Location', type: 'input', placeholder: 'Enter location or scan QR code' },
            { label: 'Notes', type: 'textarea', placeholder: 'Add any additional details...' },
          ],
        };
      default:
        return {
          title: actionType,
          description: 'Complete this action',
          icon: Package,
          gradient: 'from-purple-500 to-pink-500',
          fields: [
            { label: 'Details', type: 'textarea', placeholder: 'Enter details...' },
          ],
        };
    }
  };

  const actionDetails = getActionDetails();
  const ActionIcon = actionDetails.icon;

  // Confirmation screen
  if (!isConfirmed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Animated background effect */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Header */}
        <div className="relative backdrop-blur-xl bg-white/10 border-b border-white/10 sticky top-0 z-10">
          <div className="px-4 py-4 flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 hover:bg-white/10 rounded-xl transition-colors backdrop-blur-sm"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div className="flex-1">
              <h1 className="text-lg font-bold text-white">Confirm Action</h1>
              <p className="text-xs text-purple-200">Please review before proceeding</p>
            </div>
          </div>
        </div>

        <div className="relative p-4 space-y-6 pb-20 flex items-center justify-center min-h-[calc(100vh-80px)]">
          <div className="w-full max-w-md space-y-6">
            {/* Confirmation Card */}
            <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-8 border border-white/10 shadow-xl text-center">
              <div className={`w-24 h-24 bg-gradient-to-br ${actionDetails.gradient} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-${actionDetails.gradient}/50 ring-4 ring-white/10`}>
                <ActionIcon className="w-12 h-12 text-white" />
              </div>

              <h2 className="text-2xl font-bold text-white mb-2">{actionDetails.title}</h2>
              <p className="text-purple-200 mb-6">{actionDetails.description}</p>

              {/* Warning Notice */}
              <div className="backdrop-blur-xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-xl p-4 border border-amber-400/30 mb-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                  <div className="text-left">
                    <p className="text-xs font-semibold text-amber-200 mb-1">Important</p>
                    <p className="text-xs text-amber-100">
                      This will notify the web app that the chute is at full capacity. Make sure this is accurate before proceeding.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  onClick={() => setIsConfirmed(true)}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white shadow-lg shadow-cyan-500/50 transition-all hover:shadow-xl hover:shadow-cyan-500/60"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Confirm & Continue
                </Button>

                <Button
                  onClick={onBack}
                  variant="outline"
                  className="w-full bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-900 text-white"
                >
                  Cancel
                </Button>
              </div>
            </div>

            {/* AI Insight */}
            <div className="backdrop-blur-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-4 border border-purple-400/30 shadow-xl">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-purple-200 mb-1">AI Recommendation</p>
                  <p className="text-xs text-purple-100">
                    Based on current data, immediate action is recommended. Average response time: 12 minutes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-emerald-500/50 ring-8 ring-emerald-400/20 animate-pulse">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Success!</h2>
          <p className="text-purple-200">Your alert has been submitted</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <div className="relative backdrop-blur-xl bg-white/10 border-b border-white/10 sticky top-0 z-10">
        <div className="px-4 py-4 flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 hover:bg-white/10 rounded-xl transition-colors backdrop-blur-sm"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-white">{actionDetails.title}</h1>
            <p className="text-xs text-purple-200">{actionDetails.description}</p>
          </div>
        </div>
      </div>

      <div className="relative p-4 space-y-6 pb-20">
        {/* Action Icon Card */}
        <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10 shadow-xl">
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-16 h-16 bg-gradient-to-br ${actionDetails.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
              <ActionIcon className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-white mb-1">{actionDetails.title}</h3>
              <Badge variant="outline" className="text-xs border-cyan-400/50 text-cyan-300 bg-cyan-500/20">
                <Sparkles className="w-3 h-3 mr-1" />
                AI Assisted
              </Badge>
            </div>
          </div>

          {/* AI Suggestion */}
          <div className="backdrop-blur-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-3 border border-purple-400/30">
            <div className="flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold text-purple-200 mb-1">AI Recommendation</p>
                <p className="text-xs text-purple-100">
                  Based on current data, immediate action is recommended. Average response time: 12 minutes.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Form Fields */}
          <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-4 border border-white/10 shadow-xl space-y-4">
            <div className="space-y-2">
              <Label htmlFor="location" className="text-white/90">
                Chute ID
              </Label>
              {/* <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., Warehouse A - Chute 5"
                className="bg-white/5 border-white/20 text-white placeholder:text-white/40 backdrop-blur-sm focus:bg-white/10 focus:border-cyan-400/50"
                required
              /> */}
              <div className="space-y-2">
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger
                    id="dropdown"
                    className="w-full p-3 bg-white/5 border border-white/20 text-white placeholder:text-white/40 rounded-lg backdrop-blur-sm text-left focus:bg-white/10 focus:border-cyan-400/50"
                  >
                    {selected || "Tap to select reason"}
                  </DropdownMenu.Trigger>

                  <DropdownMenu.Portal>
                    <DropdownMenu.Content
                      className="mt-2 w-full max-w-sm bg-white/5 border border-white/20 backdrop-blur-sm rounded-lg shadow-lg z-[1000]" 
                      align="start"
                      sideOffset={5}
                    >
                      {chutes.map((option) => (
                        <DropdownMenu.Item
                          key={option.id}
                          onSelect={() => setSelected(option.name)}
                          className="p-3 text-white cursor-pointer hover:bg-white/10 rounded"
                        >
                          {option.name}
                        </DropdownMenu.Item>
                      ))}
                    </DropdownMenu.Content>
                  </DropdownMenu.Portal>
                </DropdownMenu.Root>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes" className="text-white/90">
                Action taken / Additional Notes
              </Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Describe the situation in detail..."
                rows={4}
                className="bg-white/5 border-white/20 text-white placeholder:text-white/40 backdrop-blur-sm focus:bg-white/10 focus:border-cyan-400/50 resize-none"
              />
            </div>
          </div>

          {/* Recent Activity */}
          <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-4 border border-white/10 shadow-xl">
            <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-purple-400" />
              Recent Activity
            </h4>
            <div className="space-y-2">
              {[
                { time: '2 hours ago', action: 'Chute 3 - Full Alert Resolved' },
                { time: '5 hours ago', action: 'Chute 7 - Maintenance Complete' },
                { time: '1 day ago', action: 'Chute 5 - Full Alert Resolved' },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 pb-2 border-b border-white/5 last:border-0"
                >
                  <div className="w-2 h-2 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-white/80">{item.action}</p>
                    <p className="text-xs text-white/40 mt-0.5">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white shadow-lg shadow-cyan-500/50 transition-all hover:shadow-xl hover:shadow-cyan-500/60 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Submit Alert
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}