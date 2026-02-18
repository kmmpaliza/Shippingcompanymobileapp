import { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { Dashboard } from './components/Dashboard';
import { ActionPage } from './components/ActionPage';
import { CreateActionPage } from './components/CreateActionPage';
import { ChatBotPage } from './components/ChatBot';

type Page = 'login' | 'dashboard' | 'action' | 'createAction';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [selectedAction, setSelectedAction] = useState<string>('');

  const [showChatBot, setShowChatBot] = useState(false);

  const handleChatBot = () => setShowChatBot(true);
  const handleCloseChatBot = () => setShowChatBot(false);

  const handleLogin = () => {
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setCurrentPage('login');
  };

  const handleActionClick = (actionType: string) => {
    setSelectedAction(actionType);
    setCurrentPage('action');
  };

  const handleCreateAction = () => {
    setCurrentPage('createAction');
  };

  const handleBackToDashboard = () => {
    setCurrentPage('dashboard');
    setSelectedAction('');
  };

  return (
    <div className="size-full">
      {currentPage === 'login' && (
        <LoginPage onLogin={handleLogin} />
      )}
      {currentPage === 'dashboard' && (
        <Dashboard
          onLogout={handleLogout}
          onActionClick={handleActionClick}
          onCreateAction={handleCreateAction}
          onChatBotClick={handleChatBot}
        />
      )}
      {currentPage === 'action' && (
        <ActionPage
          actionType={selectedAction}
          onBack={handleBackToDashboard}
        />
      )}
      {currentPage === 'createAction' && (
        <CreateActionPage onBack={handleBackToDashboard} />
      )}

      {/* Floating Button */}
      {showChatBot && (
        <div className="fixed bottom-6 right-6 z-50">
          <ChatBotPage onClose={handleCloseChatBot} />
        </div>
      )}
    </div>
  );
}
