import React from 'react';

interface CategoryFiltersProps {
  whiskeys: any[];
  onSelectCategory: (category: string) => void;
  selectedCategory: string;
}

const CategoryFilters: React.FC<CategoryFiltersProps> = ({ whiskeys, onSelectCategory, selectedCategory }) => {
  const categories = ['Tümü', ...Array.from(new Set(whiskeys.map(whiskey => whiskey.type)))];
  return (
    <div className="py-8">
      <div className="container-custom">
        <h2 className="text-2xl font-heading font-bold mb-6">Kategoriler</h2>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-whiskey-amber text-whiskey-dark'
                  : 'bg-whiskey-dark-lighter text-whiskey-light/70 hover:bg-whiskey-dark-lighter/80'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryFilters;