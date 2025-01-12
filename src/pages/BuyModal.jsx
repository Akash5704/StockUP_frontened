import React, { useState } from 'react';
import { X } from 'lucide-react';
import { buyStock } from '../api';
import {jwtDecode} from "jwt-decode"
import { useSnackbar } from 'notistack';

export default function BuyModal({ isOpen, onClose, stock }) {
  const [shares, setShares] = useState('');
  const [error, setError] = useState('');
  const { enqueueSnackbar } = useSnackbar()

  if (!isOpen) return null;
  function getUserFromToken() {
    const token = sessionStorage.getItem("User");  // Assuming the JWT is stored in sessionStorage as "User"
    
    if (!token) {
        console.log("No token found in session storage.");
        return null;
    }

    try {
        const decoded = jwtDecode(token);  // Decode the JWT
        return decoded;  // The decoded object will contain user details
    } catch (error) {
        console.log("Failed to decode the token:", error);
        return null;
    }
}

  const user = getUserFromToken();


  const totalCost = Number(shares) * stock.price;
  
  async function handleSubmit(e){
    e.preventDefault();
    if (!shares || Number(shares) <= 0) {
      setError('Please enter a valid number of shares');
      return;
    }
    // Handle purchase logic here

    let response = await buyStock(user.email ,stock.symbol,totalCost,shares)
    console.log(response);
    // console.log(sessionStorage.getItem("User"));
    
    enqueueSnackbar(`Buying ${shares} shares of ${stock.symbol}`);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl p-6 z-50 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Buy {stock.symbol}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <p className="text-gray-600">{stock.name}</p>
            <p className="text-lg font-semibold">Current Price: ${stock.price.toFixed(2)}</p>
          </div>

          <div>
            <label htmlFor="shares" className="block text-sm font-medium text-gray-700">
              Number of Shares
            </label>
            <input
              type="number"
              id="shares"
              value={shares}
              name='quantity'
              onChange={(e) => {
                setShares(e.target.value);
                setError('');
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              min="1"
              step="1"
            />
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
          </div>

          <div className="border-t pt-4">
            <p className="text-lg font-semibold">
              Total Cost: ${totalCost ? totalCost.toFixed(2) : '0.00'}
            </p>
          </div>

          <div className="flex space-x-3">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Confirm Purchase
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
