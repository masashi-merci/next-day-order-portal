
import React, { useState } from 'react';
import { OrderData, ViewState, AppSettings } from './types';
import Header from './components/Header';
import OrderForm from './components/OrderForm';
import SuccessView from './components/SuccessView';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('FORM');
  const [lastOrder, setLastOrder] = useState<OrderData | null>(null);
  
  // 固定された連携先URL（GAS）
  const settings: AppSettings = {
    spreadsheetWebhookUrl: 'https://script.google.com/macros/s/AKfycbyMYLVLOxJGNIT8t5rWXK_0qYsOQsgBznVqgBip2tA6SjOP604C9DneKzVBBnQ_3Jeg2g/exec',
  };

  const handleOrderSubmit = async (formData: Omit<OrderData, 'id' | 'timestamp'>) => {
    setView('SUBMITTING');
    
    const newOrder: OrderData = {
      ...formData,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toLocaleString('ja-JP'),
    };

    // Google スプレッドシート（GAS）へのデータ送信
    if (settings.spreadsheetWebhookUrl) {
      try {
        await fetch(settings.spreadsheetWebhookUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newOrder),
        });
      } catch (e) {
        console.error('Spreadsheet Sync Error:', e);
      }
    }

    // 送信完了状態へ移行
    setLastOrder(newOrder);
    setView('SUCCESS');
  };

  const resetForm = () => {
    setView('FORM');
    setLastOrder(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFDFD]">
      <Header onLogoClick={resetForm} />

      <main className="flex-grow container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        {view === 'FORM' && <OrderForm onSubmit={handleOrderSubmit} />}
        
        {view === 'SUBMITTING' && (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="w-12 h-12 border-[3px] border-orange-500 border-t-transparent rounded-full animate-spin mb-8"></div>
            <h2 className="text-xl font-bold text-[#1A1A1A] tracking-tight">オーダーを送信中</h2>
            <p className="text-gray-400 text-sm mt-3 text-center max-w-xs">
              スプレッドシートへの記録と<br/>確認メールの送信を行っています
            </p>
          </div>
        )}

        {view === 'SUCCESS' && lastOrder && (
          <SuccessView 
            order={lastOrder} 
            onBack={resetForm} 
          />
        )}
      </main>

      <footer className="bg-white border-t border-gray-100 py-10 mt-auto">
        <div className="container mx-auto max-w-4xl px-4 flex flex-col items-center">
          <p className="text-[11px] font-bold text-gray-800 tracking-widest uppercase mb-2">翌日納品オーダーポータル</p>
          <p className="text-gray-400 text-[10px]">&copy; {new Date().getFullYear()} Openframe Order Portal</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
