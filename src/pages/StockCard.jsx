import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function StockCard({ symbol, name, price, change, onBuyClick }) {
  const isPositive = change >= 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{symbol}</h3>
          <p className="text-sm text-gray-500">{name}</p>
        </div>
        <div className={`flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          <span className="ml-1 text-sm">{change.toFixed(2)}%</span>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-2xl font-bold text-gray-900">${price.toFixed(2)}</span>
        <button
          onClick={onBuyClick}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Buy
        </button>
      </div>
    </div>
  );
}
