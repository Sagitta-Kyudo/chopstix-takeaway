import React, { useState, useMemo } from 'react';
import { OrderItem } from '../types';

interface CheckoutScreenProps {
    order: OrderItem[];
    onPlaceOrder: () => void;
    onBack: () => void;
}

const CheckoutScreen: React.FC<CheckoutScreenProps> = ({ order, onPlaceOrder, onBack }) => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');

    const totalPrice = useMemo(() => {
        return order.reduce((total, item) => total + item.dish.price * item.quantity, 0);
    }, [order]);
    
    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name && address && phone) {
            onPlaceOrder();
        } else {
            alert('Please fill in all delivery details.');
        }
    }

    return (
        <div className="bg-gray-50 flex flex-col">
            <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="container mx-auto px-4 py-4 flex items-center">
                    <button onClick={onBack} className="text-gray-600 hover:text-red-600 mr-4">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <h1 className="text-xl font-bold text-gray-900">Checkout</h1>
                </div>
            </header>
            
            <div className="container mx-auto p-4 pb-24 flex-grow">
                {/* Order Summary */}
                <div className="mb-8">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 divide-y divide-gray-200 p-4 space-y-3">
                        {order.map(({ dish, quantity }) => (
                            <div key={dish.id} className="flex justify-between items-center pt-3 first:pt-0">
                                <div>
                                    <p className="font-semibold text-gray-800">{quantity}x {dish.name}</p>
                                </div>
                                <p className="font-bold text-gray-900">£{(dish.price * quantity).toFixed(2)}</p>
                            </div>
                        ))}
                        <div className="flex justify-between items-center font-bold text-lg pt-4">
                            <p className="text-gray-900">Total</p>
                            <p className="text-red-600">£{totalPrice.toFixed(2)}</p>
                        </div>
                    </div>
                </div>

                {/* Delivery Details */}
                <form onSubmit={handleFormSubmit}>
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Delivery Details</h2>
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 space-y-4">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Full Name</label>
                            <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} className="shadow-sm appearance-none border border-gray-600 bg-gray-700 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-red-500" required />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">Address</label>
                            <input type="text" id="address" value={address} onChange={e => setAddress(e.target.value)} className="shadow-sm appearance-none border border-gray-600 bg-gray-700 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-red-500" required />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">Phone Number</label>
                            <input type="tel" id="phone" value={phone} onChange={e => setPhone(e.target.value)} className="shadow-sm appearance-none border border-gray-600 bg-gray-700 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-red-500" required />
                        </div>
                    </div>

                     {/* Payment Details Placeholder */}
                    <h2 className="text-lg font-bold text-gray-900 my-4">Payment Details</h2>
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center text-gray-500">
                        <p>Payment integration coming soon.</p>
                        <p>For now, click "Place Order" to complete.</p>
                    </div>

                    <div className="mt-8">
                         <button 
                            type="submit"
                            className="w-full bg-red-600 text-white font-bold py-3 px-6 rounded-md hover:bg-red-700 transition-colors duration-300"
                        >
                            Place Order (Total: £{totalPrice.toFixed(2)})
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CheckoutScreen;