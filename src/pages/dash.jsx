import React, { useState } from 'react';
import StockCard from './StockCard';
import BuyModal from './BuyModal';

// Mock stock data
const mockStocks = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 178.72, change: 1.23 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 142.56, change: -0.45 },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: 378.91, change: 2.15 },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 174.42, change: 0.78 },
  { symbol: 'META', name: 'Meta Platforms Inc.', price: 484.03, change: 1.56 },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 175.34, change: -2.34 },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 875.28, change: 3.45 },
  { symbol: 'JPM', name: 'JPMorgan Chase & Co.', price: 183.27, change: 0.67 },
];

export default function Dashboard() {
  const [selectedStock, setSelectedStock] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBuyClick = (stock) => {
    setSelectedStock(stock);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockStocks.map((stock) => (
          <StockCard
            key={stock.symbol}
            {...stock}
            onBuyClick={() => handleBuyClick(stock)}
          />
        ))}
      </div>
      {selectedStock && (
        <BuyModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          stock={selectedStock}
        />
      )}
    </div>
  );
}
