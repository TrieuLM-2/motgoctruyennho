'use client';

import { useState } from 'react';

const genres = [
    'Tất cả',
    'Tiên hiệp',
    'Huyền huyễn',
    'Ngôn tình',
    'Đô thị',
    'Lịch sử',
    'Kiếm hiệp',
    'Khoa huyễn',
    'Trinh thám',
    'Truyện ngắn',
];

interface CategoryFilterProps {
    onCategoryChange?: (category: string) => void;
}

export default function CategoryFilter({
    onCategoryChange,
}: CategoryFilterProps) {
    const [activeCategory, setActiveCategory] = useState('Tất cả');

    const handleCategoryClick = (category: string) => {
        setActiveCategory(category);
        onCategoryChange?.(category);
    };

    return (
        <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Thể loại
            </h2>
            <div className="flex flex-wrap gap-3">
                {genres.map((genre) => (
                    <button
                        key={genre}
                        onClick={() => handleCategoryClick(genre)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeCategory === genre
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/50'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                            }`}
                    >
                        {genre}
                    </button>
                ))}
            </div>
        </div>
    );
}
