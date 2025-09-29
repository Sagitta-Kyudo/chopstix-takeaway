import React, { useMemo } from 'react';
import { OrderItem, Dish, MenuListItem, Screen } from '../types';
import { PlusIcon } from './icons/PlusIcon';


interface CartScreenProps {
    order: OrderItem[];
    setOrder: React.Dispatch<React.SetStateAction<OrderItem[]>>;
    onNavigate: (screen: Screen | string) => void;
    menuData: MenuListItem[];
    onAddToOrder: (dish: Dish) => void;
    onUpdateRemarks: (dishId: number, remarks: string) => void;
}

const CartScreen: React.FC<CartScreenProps> = ({ order, setOrder, onNavigate, menuData, onAddToOrder, onUpdateRemarks }) => {

    const handleQuantityChange = (dishId: number, newQuantity: number) => {
        if (newQuantity <= 0) {
            setOrder(prevOrder => prevOrder.filter(item => item.dish.id !== dishId));
        } else {
            setOrder(prevOrder => prevOrder.map(item =>
                item.dish.id === dishId ? { ...item, quantity: newQuantity } : item
            ));
        }
    };

    const { totalPrice, totalItems } = useMemo(() => {
        return order.reduce((acc, item) => {
            acc.totalPrice += item.dish.price * item.quantity;
            acc.totalItems += item.quantity;
            return acc;
        }, { totalPrice: 0, totalItems: 0 });
    }, [order]);

    const suggestedItems = useMemo(() => {
        const orderCategorySet = new Set(order.map(item => item.dish.category));
        const orderDishIds = new Set(order.map(item => item.dish.id));
        
        let suggestions: Dish[] = [];
        const menuDishes = menuData.filter((item): item is Dish => item.type === 'dish');

        // Try to suggest specials first
        if (!orderCategorySet.has('Chopstix\'s Special New Dishes 新推荐')) {
            const specialDishes = menuDishes
                .filter(dish => dish.category === 'Chopstix\'s Special New Dishes 新推荐' && !orderDishIds.has(dish.id))
                .slice(0, 2);
            suggestions.push(...specialDishes);
        }

        if (!orderCategorySet.has('Chef Specials') && suggestions.length < 3) {
            const chefSpecials = menuDishes
                .filter(dish => dish.category === 'Chef Specials' && !orderDishIds.has(dish.id))
                .slice(0, 2);
            suggestions.push(...chefSpecials);
        }
        
        // Fallback if no specials were suggested
        if (suggestions.length === 0) {
            const fallbackAppetizers = menuDishes
                .filter(dish => dish.category === 'Appetisers' && !orderDishIds.has(dish.id))
                .slice(0, 3);
            suggestions.push(...fallbackAppetizers);
        }
        
        return suggestions.slice(0, 3);
    }, [order, menuData]);

    return (
        <div className="bg-gray-50 flex flex-col">
            <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="container mx-auto px-4 py-4 flex items-center">
                    <button onClick={() => onNavigate('menu')} className="text-gray-600 hover:text-red-600 mr-4">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <h1 className="text-xl font-bold text-gray-900">Your Order</h1>
                </div>
            </header>

            <div className="container mx-auto p-4 pb-40 flex-grow">
                {order.length === 0 ? (
                    <div className="text-center py-16">
                        <p className="text-gray-500">Your cart is empty.</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 divide-y divide-gray-200">
                        {order.map(({ dish, quantity, remarks }) => (
                            <div key={dish.id} className="p-4">
                                <div className="flex items-start justify-between">
                                    <div className="flex-grow pr-4">
                                        <p className="font-bold text-gray-900">{dish.name}</p>
                                        {dish.description && <p className="text-sm text-gray-500 mt-1">{dish.description}</p>}
                                        <p className="text-red-600 font-semibold mt-1">£{dish.price.toFixed(2)}</p>
                                    </div>
                                    <div className="flex items-center gap-3 flex-shrink-0">
                                        <button 
                                            onClick={() => handleQuantityChange(dish.id, quantity - 1)}
                                            className="w-7 h-7 flex items-center justify-center bg-gray-200 rounded-full font-bold text-lg text-gray-700 hover:bg-gray-300"
                                        >
                                            -
                                        </button>
                                        <span className="font-bold w-6 text-center text-gray-900">{quantity}</span>
                                        <button
                                            onClick={() => handleQuantityChange(dish.id, quantity + 1)}
                                            className="w-7 h-7 flex items-center justify-center bg-gray-200 rounded-full font-bold text-lg text-gray-700 hover:bg-gray-300"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <textarea 
                                        placeholder="Add special requests (e.g. no onions)"
                                        value={remarks}
                                        onChange={(e) => onUpdateRemarks(dish.id, e.target.value)}
                                        className="w-full text-sm border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 px-3 py-2"
                                        rows={1}
                                    ></textarea>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                
                {suggestedItems.length > 0 && order.length > 0 && (
                    <div className="mt-8">
                        <h2 className="text-lg font-bold mb-4">You might also like...</h2>
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 divide-y divide-gray-200">
                           {suggestedItems.map((dish) => (
                               <div key={dish.id} className="p-4 flex items-center justify-between">
                                   <div>
                                       <p className="font-semibold text-gray-800">{dish.name}</p>
                                       <p className="text-red-600 font-bold">£{dish.price.toFixed(2)}</p>
                                   </div>
                                   <button 
                                     onClick={() => onAddToOrder(dish)}
                                     className="flex items-center justify-center w-8 h-8 rounded-md font-semibold bg-amber-400 text-gray-900 hover:bg-amber-300 transition-all duration-300"
                                     aria-label={`Add ${dish.name} to order`}
                                    >
                                       <PlusIcon className="h-5 w-5" />
                                   </button>
                               </div>
                           ))}
                        </div>
                    </div>
                )}
            </div>
            
            {order.length > 0 && (
                <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-gray-200 p-4 z-10">
                    <div className="container mx-auto">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-lg font-semibold text-gray-900">Total ({totalItems} {totalItems === 1 ? 'item' : 'items'}):</span>
                            <span className="text-2xl font-bold text-red-600">£{totalPrice.toFixed(2)}</span>
                        </div>
                        <button 
                            onClick={() => onNavigate('checkout')}
                            className="w-full bg-red-600 text-white font-bold py-3 px-6 rounded-md hover:bg-red-700 transition-colors duration-300"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartScreen;