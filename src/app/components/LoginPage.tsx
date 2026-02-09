import React, { useState } from 'react';
import { Package, Lock, User, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface LoginPageProps {
  onLogin: () => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - in a real app, this would validate credentials
    if (email && password) {
      onLogin();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>
      </div>

      <div className="relative w-full max-w-sm">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl mb-4 shadow-2xl shadow-cyan-500/50 ring-4 ring-cyan-400/30 relative">
            <Package className="w-10 h-10 text-white" />
            <div className="absolute -top-1 -right-1">
              <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
            </div>
          </div>
          <h1 className="text-white text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            BeltSense AI
          </h1>
          <p className="text-purple-200 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" />
            Next-Gen Logistics Platform
          </p>
        </div>

        {/* Login Form */}
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl p-6 border border-white/20 relative overflow-hidden">
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none"></div>
          
          <div className="relative">
            <h2 className="text-2xl font-semibold mb-6 text-white">Welcome Back</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white/90">Email</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300 w-5 h-5 z-10" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-white/40 backdrop-blur-sm focus:bg-white/10 focus:border-cyan-400/50"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white/90">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300 w-5 h-5 z-10" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-white/40 backdrop-blur-sm focus:bg-white/10 focus:border-cyan-400/50"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-purple-200 cursor-pointer">
                  <input type="checkbox" className="rounded bg-white/5 border-white/20" />
                  Remember me
                </label>
                <button type="button" className="text-cyan-300 hover:text-cyan-200 transition-colors">
                  Forgot password?
                </button>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white shadow-lg shadow-cyan-500/50 transition-all hover:shadow-xl hover:shadow-cyan-500/60"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Sign In with AI
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-purple-200">
              Don't have an account?{' '}
              <button className="text-cyan-300 hover:text-cyan-200 font-medium transition-colors">
                Contact Admin
              </button>
            </div>
          </div>
        </div>

        <p className="text-center text-purple-300/60 text-sm mt-6">
          © 2026 BeltSense AI. Powered by Advanced Intelligence.
        </p>
      </div>
    </div>
  );
}
