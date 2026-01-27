
import React, { useState } from 'react';
import { OrderData } from '../types';

interface OrderFormProps {
  onSubmit: (data: Omit<OrderData, 'id' | 'timestamp'>) => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ onSubmit }) => {
  const FIXED_PRICE = 4000;
  const [formData, setFormData] = useState({
    shootingId: '',
    centerName: '',
    contactName: '',
    email: '',
    phoneNumber: '',
  });

  const [errors, setErrors] = useState<Partial<typeof formData>>({});

  const validate = () => {
    const newErrors: Partial<typeof formData> = {};
    if (!formData.shootingId) newErrors.shootingId = '撮影IDを入力してください';
    if (!formData.centerName) newErrors.centerName = 'センター名を入力してください';
    if (!formData.contactName) newErrors.contactName = '担当者氏名を入力してください';
    if (!formData.email) {
      newErrors.email = 'メールアドレスを入力してください';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '有効なメールアドレスを入力してください';
    }
    if (!formData.phoneNumber) newErrors.phoneNumber = '電話番号を入力してください';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({ ...formData, price: FIXED_PRICE });
    }
  };

  const inputClasses = (name: keyof typeof formData) => `
    w-full px-4 py-3 rounded-lg border transition-all outline-none text-gray-800 text-sm
    ${errors[name] 
      ? 'border-red-300 bg-red-50 focus:border-red-500' 
      : 'border-gray-200 bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-50'}
  `;

  return (
    <div className="bg-white rounded-2xl shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
      {/* Header section with Gray aesthetic and Orange accent */}
      <div className="bg-[#1A1A1A] px-8 py-12 text-white relative overflow-hidden">
        <div className="absolute right-0 bottom-0 p-8 opacity-5 transform translate-x-1/4 translate-y-1/4">
          <i className="fas fa-camera-retro text-[10rem]"></i>
        </div>
        <div className="relative z-10">
          <div className="inline-block bg-orange-500 px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest mb-4">
            Order Form
          </div>
          <h1 className="text-4xl font-bold mb-3 tracking-tight">翌日納品オーダー</h1>
          <p className="text-gray-400 leading-relaxed max-w-lg text-sm mb-6">
            撮影の翌日に、完成したお写真が <span className="text-white font-bold">Openframe</span> より納品されます。
          </p>
          
          <div className="bg-white/5 border-l-2 border-orange-500/50 p-4 rounded-r-lg max-w-lg">
            <p className="text-xs text-gray-300 leading-relaxed mb-2">
              <i className="fas fa-info-circle text-orange-500 mr-2"></i>
              Openframeより通常通りご発注いただいた後、<br/>
              撮影翌日での納品完了を希望する撮影番号をご記入ください。
            </p>
            <p className="text-xs text-orange-400 font-bold ml-6">
              オーダーは撮影日前日の18:00までとなります。
            </p>
          </div>
        </div>
      </div>

      {/* Pricing Section - Updated to emphasize additional cost */}
      <div className="p-8 bg-orange-50/30 border-b border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3 text-gray-600">
            <div className="bg-white p-2 rounded-lg border border-gray-100 shadow-sm">
                <i className="fas fa-receipt text-lg text-orange-500"></i>
            </div>
            <div>
                <span className="font-bold text-sm text-gray-800">オプション料金</span>
                <p className="text-[10px] text-gray-500 mt-0.5">Next-Day Delivery Option Fee</p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">
              ¥4,000 <span className="text-xs font-normal text-gray-400">/ 税抜</span>
            </div>
          </div>
        </div>

        <div className="mt-4 bg-orange-100/50 border border-orange-200 rounded-lg p-3 flex items-start space-x-3 animate-pulse-slow">
            <i className="fas fa-exclamation-circle text-orange-600 mt-0.5 text-sm"></i>
            <p className="text-xs font-bold text-orange-800 leading-relaxed">
                こちらの料金は、通常の撮影料金に追加となります。
            </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider">
              撮影ID <span className="text-red-500">*</span>
              <span className="text-[10px] font-normal text-orange-500 ml-2 italic">※Pから始まる番号</span>
            </label>
            <input
              type="text"
              className={inputClasses('shootingId')}
              value={formData.shootingId}
              onChange={(e) => setFormData({ ...formData, shootingId: e.target.value })}
            />
            {errors.shootingId && <p className="text-red-500 text-[10px] font-bold mt-1">{errors.shootingId}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider">
              センター名 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className={inputClasses('centerName')}
              value={formData.centerName}
              onChange={(e) => setFormData({ ...formData, centerName: e.target.value })}
            />
            {errors.centerName && <p className="text-red-500 text-[10px] font-bold mt-1">{errors.centerName}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider">
            担当者氏名 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className={inputClasses('contactName')}
            value={formData.contactName}
            onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
          />
          {errors.contactName && <p className="text-red-500 text-[10px] font-bold mt-1">{errors.contactName}</p>}
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider">
            メールアドレス <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            className={inputClasses('email')}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          {errors.email && <p className="text-red-500 text-[10px] font-bold mt-1">{errors.email}</p>}
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider">
            電話番号 <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            className={inputClasses('phoneNumber')}
            value={formData.phoneNumber}
            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
          />
          {errors.phoneNumber && <p className="text-red-500 text-[10px] font-bold mt-1">{errors.phoneNumber}</p>}
        </div>

        <div className="pt-6">
          <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-lg shadow-xl shadow-orange-100 transition-all transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center space-x-3"
          >
            <i className="fas fa-paper-plane text-sm"></i>
            <span className="tracking-wide">オーダーを送信する</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrderForm;
