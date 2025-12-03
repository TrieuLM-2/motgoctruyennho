'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import CategoryFilter from '@/components/CategoryFilter';
import BookCard from '@/components/BookCard';
import { sampleBooks } from '@/lib/data/sample-data';

export default function HomePage() {
    const [selectedCategory, setSelectedCategory] = useState('Tất cả');
    const [books] = useState(sampleBooks);

    const filteredBooks =
        selectedCategory === 'Tất cả'
            ? books
            : books.filter((book) => book.genres.includes(selectedCategory));

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Hero Section */}
                <div className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Chào mừng đến với
                    </h1>
                    <p className="text-2xl md:text-3xl text-blue-600 dark:text-blue-400 font-semibold mb-2">
                        Góc Truyện Của Tui...
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Khám phá thế giới truyện đa dạng với trải nghiệm đọc tuyệt vời
                    </p>
                </div>

                {/* Category Filter */}
                <CategoryFilter onCategoryChange={setSelectedCategory} />

                {/* Books Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {filteredBooks.map((book) => (
                        <BookCard
                            key={book.id}
                            id={book.id}
                            title={book.title}
                            author={book.author}
                            coverUrl={book.coverUrl}
                            avgRating={book.avgRating}
                            genres={book.genres}
                        />
                    ))}
                </div>

                {filteredBooks.length === 0 && (
                    <div className="text-center py-16">
                        <p className="text-gray-500 dark:text-gray-400 text-lg">
                            Không tìm thấy truyện nào trong thể loại này
                        </p>
                    </div>
                )}
            </main>
        </div>
    );
}
