import React, { useMemo } from 'react';
import { OrderItem } from '../types';
import { ShoppingCartIcon } from './icons/ShoppingCartIcon';

interface OrderSummaryProps {
  order: OrderItem[];
  onViewOrderClick: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ order, onViewOrderClick }) => {
  const { totalItems, totalPrice } = useMemo(() => {
    return order.reduce(
      (acc, item) => {
        acc.totalItems += item.quantity;
        acc.totalPrice += item.dish.price * item.quantity;
        return acc;
      },
      { totalItems: 0, totalPrice: 0 }
    );
  }, [order]);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-gray-200 shadow-2xl z-20">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="relative">
                <ShoppingCartIcon className="h-6 w-6 text-red-600" />
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                </span>
            </div>
            <div className="text-gray-900 font-bold text-lg">
              £{totalPrice.toFixed(2)}
            </div>
          </div>
          <button
            onClick={onViewOrderClick}
            className="bg-red-600 text-white font-bold py-2 px-6 rounded-md hover:bg-red-700 transition-colors duration-300"
          >
            View Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
