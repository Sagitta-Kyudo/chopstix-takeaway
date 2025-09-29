
import React from 'react';
import { Category } from '../types';

interface CategoryTabsProps {
  categories: Category[];
  activeCategory?: Category;
  onSelectCategory: (category: Category) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ categories, activeCategory, onSelectCategory }) => {
  return (
    <div className="flex space-x-2 overflow-x-auto pb-2 -mx-4 px-4">
      {categories.map(category => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`
            px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors duration-300
            ${activeCategory === category 
              ? 'bg-red-600 text-white shadow' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }
          `}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;