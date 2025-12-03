'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/Header';
import CommentSection from '@/components/CommentSection';
import { Star, BookOpen, CheckCircle, Clock } from 'lucide-react';
import { sampleBooks, sampleChapters, sampleComments } from '@/lib/data/sample-data';

type Tab = 'intro' | 'chapters';

export default function BookDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<Tab>('intro');

    const bookId = params.id as string;
    const book = sampleBooks.find((b) => b.id === bookId);
    const chapters = sampleChapters.filter((ch) => ch.bookId === bookId);
    const globalComments = sampleComments.filter((c) => c.bookId === bookId);

    if (!book) {
        return <div>Book not found</div>;
    }

    const handleChapterClick = (chapterId: string) => {
        router.push(`/read/${bookId}/${chapterId}`);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Header />

            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Book Header */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 mb-8">
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Book Cover */}
                        <div className="flex-shrink-0">
                            <div className="relative w-48 h-72 rounded-lg overflow-hidden shadow-xl">
                                <Image
                                    src={book.coverUrl}
                                    alt={book.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>

                        {/* Book Info */}
                        <div className="flex-1 space-y-4">
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                                {book.title}
                            </h1>
                            <p className="text-lg text-gray-600 dark:text-gray-400">
                                Tác giả: <span className="font-semibold">{book.author}</span>
                            </p>

                            {/* Status */}
                            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                {book.status === 'completed' ? (
                                    <>
                                        <CheckCircle className="w-5 h-5 text-green-500" />
                                        <span>Hoàn thành</span>
                                    </>
                                ) : (
                                    <>
                                        <Clock className="w-5 h-5 text-blue-500" />
                                        <span>Đang cập nhật</span>
                                    </>
                                )}
                            </div>

                            {/* Rating */}
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                            key={star}
                                            className={`w-5 h-5 ${star <= Math.round(book.avgRating)
                                                    ? 'fill-yellow-400 text-yellow-400'
                                                    : 'text-gray-300 dark:text-gray-600'
                                                }`}
                                        />
                                    ))}
                                </div>
                                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {book.avgRating.toFixed(1)}
                                </span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    ({book.totalRatings} đánh giá)
                                </span>
                            </div>

                            {/* Genres */}
                            <div className="flex flex-wrap gap-2">
                                {book.genres.map((genre) => (
                                    <span
                                        key={genre}
                                        className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                                    >
                                        {genre}
                                    </span>
                                ))}
                            </div>

                            {/* Start Reading Button */}
                            <button
                                onClick={() => handleChapterClick(chapters[0]?.id || 'ch1')}
                                className="mt-4 flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
                            >
                                <BookOpen className="w-5 h-5" />
                                Bắt đầu đọc
                            </button>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden mb-8">
                    <div className="flex border-b border-gray-200 dark:border-gray-700">
                        <button
                            onClick={() => setActiveTab('intro')}
                            className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${activeTab === 'intro'
                                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                                }`}
                        >
                            Giới thiệu
                        </button>
                        <button
                            onClick={() => setActiveTab('chapters')}
                            className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${activeTab === 'chapters'
                                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                                }`}
                        >
                            Mục lục ({chapters.length})
                        </button>
                    </div>

                    <div className="p-6">
                        {activeTab === 'intro' ? (
                            <div className="prose dark:prose-invert max-w-none">
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                    {book.synopsis}
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-2 max-h-96 overflow-y-auto">
                                {chapters.map((chapter) => (
                                    <button
                                        key={chapter.id}
                                        onClick={() => handleChapterClick(chapter.id)}
                                        className="w-full text-left px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-gray-600 transition-colors"
                                    >
                                        <span className="text-gray-900 dark:text-white font-medium">
                                            {chapter.title}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Global Comments Section */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                    <CommentSection comments={globalComments} showChapterInfo />
                </div>
            </main>
        </div>
    );
}
