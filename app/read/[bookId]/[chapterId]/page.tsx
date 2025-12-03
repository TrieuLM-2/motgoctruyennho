'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { useReaderSettings } from '@/lib/store/reader-settings';
import { BilingualText } from '@/components/BilingualText';
import ReaderSettingsModal from '@/components/ReaderSettingsModal';
import CommentSection from '@/components/CommentSection';
import RatingModal from '@/components/RatingModal';
import { sampleBooks, sampleChapters, sampleComments } from '@/lib/data/sample-data';

export default function ReadPage() {
    const params = useParams();
    const router = useRouter();
    const contentRef = useRef<HTMLDivElement>(null);

    const bookId = params.bookId as string;
    const chapterId = params.chapterId as string;

    const [progress, setProgress] = useState(0);
    const [showRatingModal, setShowRatingModal] = useState(false);

    const { fontFamily, fontSize, lineHeight, theme, languageMode } = useReaderSettings();

    const book = sampleBooks.find((b) => b.id === bookId);
    const allChapters = sampleChapters.filter((ch) => ch.bookId === bookId);
    const currentChapter = allChapters.find((ch) => ch.id === chapterId);
    const currentChapterIndex = allChapters.findIndex((ch) => ch.id === chapterId);
    const chapterComments = sampleComments.filter(
        (c) => c.bookId === bookId && c.chapterId === chapterId
    );

    const isLastChapter = currentChapterIndex === allChapters.length - 1;
    const prevChapter = currentChapterIndex > 0 ? allChapters[currentChapterIndex - 1] : null;
    const nextChapter =
        currentChapterIndex < allChapters.length - 1
            ? allChapters[currentChapterIndex + 1]
            : null;

    // Calculate reading progress
    useEffect(() => {
        const handleScroll = () => {
            if (contentRef.current) {
                const scrollTop = window.scrollY;
                const scrollHeight = contentRef.current.scrollHeight;
                const clientHeight = window.innerHeight;
                const scrolled = (scrollTop / (scrollHeight - clientHeight)) * 100;
                setProgress(Math.min(Math.max(scrolled, 0), 100));

                // Check if reached bottom of last chapter
                if (isLastChapter && scrolled > 95 && !showRatingModal) {
                    setShowRatingModal(true);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isLastChapter, showRatingModal]);

    // Save progress to localStorage
    useEffect(() => {
        localStorage.setItem(
            'reading-progress',
            JSON.stringify({ bookId, chapterId, progress })
        );
    }, [bookId, chapterId, progress]);

    if (!book || !currentChapter) {
        return <div>Chapter not found</div>;
    }

    const handleRatingSubmit = (rating: number) => {
        console.log('Rating submitted:', rating);
        // In a real app, this would update Firebase
    };

    const themeClass = `theme-${theme}`;

    return (
        <div className={`min-h-screen ${themeClass} transition-colors duration-300`}>
            {/* Header */}
            <header className="sticky top-0 z-30 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-sm">
                <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
                    <button
                        onClick={() => router.push(`/book/${bookId}`)}
                        className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span className="hidden sm:inline">Quay lại</span>
                    </button>

                    <div className="flex-1 text-center px-4">
                        <h1 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                            {currentChapter.title}
                        </h1>
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                            {book.title}
                        </p>
                    </div>

                    <div className="w-20"></div>
                </div>

                {/* Progress Bar */}
                <div className="h-1 bg-gray-200 dark:bg-gray-700">
                    <div
                        className="h-full bg-blue-600 transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </header>

            {/* Main Content */}
            <main
                ref={contentRef}
                className={`reading-content max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12`}
            >
                {/* Chapter Title */}
                <h2 className="text-3xl font-bold mb-8 text-center">
                    {currentChapter.title}
                </h2>

                {/* Bilingual Text Content */}
                <div className="mb-16">
                    <BilingualText
                        contentVN={currentChapter.contentVN}
                        contentEN={currentChapter.contentEN}
                        languageMode={languageMode}
                        fontSize={fontSize}
                        lineHeight={lineHeight}
                        fontFamily={fontFamily}
                    />
                </div>

                {/* Chapter Navigation */}
                <div className="flex items-center justify-between py-8 border-t border-b border-gray-300 dark:border-gray-600 mb-12">
                    {prevChapter ? (
                        <button
                            onClick={() => router.push(`/read/${bookId}/${prevChapter.id}`)}
                            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <ChevronLeft className="w-5 h-5" />
                            Chương trước
                        </button>
                    ) : (
                        <div></div>
                    )}

                    {nextChapter ? (
                        <button
                            onClick={() => router.push(`/read/${bookId}/${nextChapter.id}`)}
                            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Chương sau
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    ) : (
                        <button
                            onClick={() => router.push(`/book/${bookId}`)}
                            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                            Hoàn thành
                        </button>
                    )}
                </div>

                {/* Chapter Comments */}
                <div className="mb-8">
                    <CommentSection comments={chapterComments} />
                </div>
            </main>

            {/* Reader Settings Modal */}
            <ReaderSettingsModal />

            {/* Rating Modal */}
            {showRatingModal && (
                <RatingModal
                    bookTitle={book.title}
                    onSubmit={handleRatingSubmit}
                    onClose={() => setShowRatingModal(false)}
                />
            )}
        </div>
    );
}
