import React from 'react';
import { MenuListItem, Dish } from '../types';
import { VegetarianIcon } from './icons/VegetarianIcon';
import { PlusIcon } from './icons/PlusIcon';

interface MenuItemProps {
  item: MenuListItem;
  onAddToOrder: (dish: Dish) => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ item, onAddToOrder }) => {
  if (item.type === 'heading') {
    return (
      <div className="p-4 bg-gray-100 border-b border-dashed border-gray-200">
        <h2 className="text-xl font-bold text-red-700">{item.title}</h2>
        <p className="text-sm text-gray-600 mt-1">{item.subtitle}</p>
      </div>
    );
  }

  // It's a dish
  const dish = item;
  return (
    <div className="p-4 border-b border-dashed border-gray-200 last:border-b-0">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-grow">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-base text-gray-800">{dish.name}</h3>
            {dish.isVegetarian && (
                <div title="Vegetarian">
                    <VegetarianIcon className="h-5 w-5" />
                </div>
            )}
          </div>
          {dish.description && <p className="text-sm text-gray-500 mt-1">{dish.description}</p>}
        </div>
        <div className="flex items-center space-x-4 flex-shrink-0">
          <p className="font-semibold text-gray-800">£{dish.price.toFixed(2)}</p>
          <button 
            onClick={() => onAddToOrder(dish)} 
            className="flex items-center justify-center w-8 h-8 rounded-md font-semibold bg-amber-400 text-gray-900 hover:bg-amber-300 transition-colors duration-300"
            aria-label={`Add ${dish.name} to order`}
          >
            <PlusIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;