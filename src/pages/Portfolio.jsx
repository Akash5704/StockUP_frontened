import React, { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import { usersStocks } from '../api';
import { TrendingUp, DollarSign, ArrowUpRight, ArrowDownRight, X } from 'lucide-react';
import { buyStock } from '../api';
import { sellStock } from '../api';
import { useSnackbar } from 'notistack';

const Portfolio = () => {
    const [portfolio, setPortfolio] = useState(null);
    const [mockStockPrices, setMockStockPrices] = useState({});
    const [modalState, setModalState] = useState({ isOpen: false, stock: null, shares: '' });
    const [isLoading, setIsLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar()

    const getUserFromToken = () => {
        const token = sessionStorage.getItem("User");
        if (!token) return null;

        try {
            return jwtDecode(token);
        } catch (error) {
            console.error("Failed to decode token:", error);
            return null;
        }
    };

    const user = getUserFromToken();

    const aggregateStocks = (stocks) =>
        stocks.reduce((acc, stock) => {
            const quantity = parseFloat(stock.quantity) || 0;
            const total = parseFloat(stock.total) || 0;

            if (acc[stock.symbol]) {
                acc[stock.symbol].quantity += quantity;
                acc[stock.symbol].total += total;
            } else {
                acc[stock.symbol] = { ...stock, quantity, total };
            }
            return acc;
        }, {});

    // Mock stock prices (for example purposes)
    const mockPrices = {
        "AAPL": 150,
        "GOOGL": 142,
        "AMZN": 174.42,
        "TSLA": 175.34,
    };
    const showAlert = (message, type) => {
      setAlert({ show: true, message, type });
      setTimeout(() => {
          setAlert({ show: false, message: '', type: '' });
      }, 3000);
  };

    useEffect(() => {
        setMockStockPrices(mockPrices); // Set mock prices when component loads
        
        const loadStocks = async () => {
            if (user?.email) {
                setIsLoading(true);
                try {
                    const data = await usersStocks(user.email);
                    if (data?.stocks) {
                        const aggregatedStocks = Object.values(aggregateStocks(data.stocks));
                        setPortfolio({ ...data, stocks: aggregatedStocks });
                    } else {
                        setPortfolio(data);
                    }
                } catch (error) {
                    console.error("Error loading portfolio:", error);
                } finally {
                    setIsLoading(false);
                }
            }
        };
        loadStocks();
    }, [user?.email]);

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
                <div className="text-center p-8 bg-white rounded-xl shadow-lg transform transition-all hover:scale-105 w-full max-w-md">
                    <TrendingUp className="w-16 h-16 text-indigo-600 mx-auto mb-6" />
                    <p className="text-2xl font-semibold text-gray-800">Please log in to view your portfolio</p>
                    <p className="mt-2 text-gray-600">Access your investments and track your performance</p>
                </div>
            </div>
        );
    }

    const handleTrade = (stock, action) => {
        setModalState({ isOpen: true, stock: { ...stock, action }, shares: '' });
    };

    const closeModal = () => {
        setModalState({ isOpen: false, stock: null, shares: '' });
    };
    const handleConfirmTrade = async () => {
      if (!modalState.shares || modalState.shares <= 0) {
          alert("Please enter a valid number of shares.");
          return;
      }
  
      const { stock, shares } = modalState;
      const stockPrice = mockStockPrices[stock.symbol] || 0;
      const total = stockPrice * parseFloat(shares);
      
      try {
          if (modalState.stock.action === 'buy') {
              await buyStock(user.email, stock.symbol, total, shares);
              enqueueSnackbar(`Successfully bought ${shares} shares of ${stock.symbol}!`);
          } else if (modalState.stock.action === 'sell') {
              // Check if user has enough shares to sell
              if (parseFloat(shares) > parseFloat(stock.quantity)) {
                enqueueSnackbar(`You only have ${stock.quantity} shares available to sell.`);
                  return;
              }
              
              await sellStock(user.email, stock.symbol, total, shares);
              enqueueSnackbar(`Successfully sold ${shares} shares of ${stock.symbol}!`);
          }
  
          setModalState({ isOpen: false, stock: null, shares: '' });
  
          // Reload portfolio
          const data = await usersStocks(user.email);
          if (data?.stocks) {
              const aggregatedStocks = Object.values(aggregateStocks(data.stocks));
              setPortfolio({ ...data, stocks: aggregatedStocks });
          } else {
              setPortfolio(data);
          }
  
      } catch (error) {
          console.error("Error during trade:", error);
          enqueueSnackbar(error.message || "An error occurred while processing the trade. Please try again.");
      }
  };

    

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-4 sm:py-6 lg:py-8 px-2 sm:px-4 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
                    <div className="px-3 sm:px-6 py-6 sm:py-8">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 space-y-4 sm:space-y-0">
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
                                    Portfolio Overview
                                    {isLoading && (
                                        <div className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-indigo-600 border-t-transparent"></div>
                                    )}
                                </h1>
                                <p className="mt-2 text-gray-600">{portfolio?.name}</p>
                            </div>
                            <DollarSign className="w-10 h-10 sm:w-12 sm:h-12 text-indigo-600" />
                        </div>

                        {portfolio ? (
                            <div className="overflow-x-auto -mx-3 sm:-mx-6">
                                <div className="inline-block min-w-full align-middle">
                                    <div className="overflow-hidden border border-gray-200 sm:rounded-lg">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Symbol</th>
                                                    <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                                    <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                                                    <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {portfolio.stocks?.map((stock, index) => {
                                                    const stockPrice = mockStockPrices[stock.symbol] || 0;
                                                    return (
                                                        <tr key={index} className="hover:bg-gray-50 transition-colors">
                                                            <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                                {stock.symbol}
                                                            </td>
                                                            <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                                ${stock.total.toFixed(2)}
                                                            </td>
                                                            <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                                {stock.quantity}
                                                            </td>
                                                            <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                                <div className="flex flex-col sm:flex-row gap-2">
                                                                    <button
                                                                        onClick={() => handleTrade(stock, 'buy')}
                                                                        className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                                                                    >
                                                                        <ArrowUpRight className="w-4 h-4 mr-1" />
                                                                        Buy
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleTrade(stock, 'sell')}
                                                                        className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                                                                    >
                                                                        <ArrowDownRight className="w-4 h-4 mr-1" />
                                                                        Sell
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                                <p className="mt-4 text-gray-600">Loading portfolio...</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Trade Modal */}
            {modalState.isOpen && modalState.stock && (
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm overflow-y-auto h-full w-full flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl max-w-md w-full relative">
                        <div className="p-6 sm:p-8">
                            <button
                                onClick={closeModal}
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-900 pr-8">
                                {modalState.stock.action === 'buy' ? 'Buy' : 'Sell'} {modalState.stock.symbol}
                            </h2>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Current Holdings
                                    </label>
                                    <p className="text-lg font-semibold text-gray-900">
                                        {modalState.stock.quantity} shares
                                    </p>
                                </div>

                                <div>
                                    <label htmlFor="shares" className="block text-sm font-medium text-gray-700 mb-2">
                                        Number of Shares
                                    </label>
                                    <input
                                        id="shares"
                                        type="number"
                                        min="0"
                                        step="1"
                                        value={modalState.shares}
                                        onChange={(e) => setModalState({ ...modalState, shares: e.target.value })}
                                        className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="Enter number of shares"
                                    />
                                </div>

                                <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4 mt-6">
                                    <button
                                        onClick={closeModal}
                                        className="px-6 py-2.5 text-gray-700 font-medium hover:text-gray-900 transition-colors text-center"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleConfirmTrade}
                                        className={`px-6 py-2.5 text-white font-medium rounded-lg transition-colors text-center ${
                                            modalState.stock.action === 'buy'
                                                ? 'bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-green-500'
                                                : 'bg-red-600 hover:bg-red-700 focus:ring-2 focus:ring-red-500'
                                        }`}
                                    >
                                        Confirm
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Portfolio;
