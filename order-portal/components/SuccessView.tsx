
import React from 'react';
import { OrderData } from '../types';

interface SuccessViewProps {
  order: OrderData;
  onBack: () => void;
}

const SuccessView: React.FC<SuccessViewProps> = ({ order, onBack }) => {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      <div className="bg-white rounded-2xl shadow-2xl shadow-gray-200/50 border border-gray-100 p-12 text-center">
        <div className="w-16 h-16 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
          <i className="fas fa-check text-2xl"></i>
        </div>
        <h2 className="text-3xl font-bold text-[#1A1A1A] mb-3 tracking-tight">送信完了</h2>
        <p className="text-gray-400 mb-10 text-sm leading-relaxed max-w-sm mx-auto">
          オーダーを受け付けました。<br/>
          ご入力いただいたメールアドレス宛に、自動確認メールを送信しております。
        </p>

        <div className="grid grid-cols-2 gap-6 text-left max-w-md mx-auto mb-12 p-8 bg-gray-50 rounded-xl border border-gray-100">
          <div>
            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1">撮影ID</p>
            <p className="font-bold text-[#1A1A1A]">{order.shootingId}</p>
          </div>
          <div>
            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1">料金</p>
            <p className="font-bold text-orange-600">¥{order.price.toLocaleString()} <span className="text-[10px] font-normal text-gray-400">/ 税抜</span></p>
          </div>
        </div>

        <div className="mb-10 p-4 border-l-4 border-orange-500 bg-orange-50 text-left max-w-md mx-auto">
          <p className="text-[11px] text-orange-800 font-bold mb-1">💡 納品について</p>
          <p className="text-xs text-orange-900 leading-relaxed">
            お写真は撮影の翌日に <span className="font-bold">Openframe</span> より納品されます。
          </p>
        </div>

        <button
          onClick={onBack}
          className="bg-[#1A1A1A] hover:bg-gray-800 text-white font-bold px-10 py-4 rounded-lg transition-all text-sm tracking-wide shadow-lg"
        >
          新しいオーダーを作成
        </button>
      </div>
    </div>
  );
};

export default SuccessView;
