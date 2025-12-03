'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Search, Menu, X, BookOpen } from 'lucide-react';

export default function Header() {
    const [showSearch, setShowSearch] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm dark:bg-gray-900/95">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <BookOpen className="w-8 h-8 text-blue-600 group-hover:text-blue-700 transition-colors" />
                        <span className="text-xl font-bold text-gray-900 dark:text-white">
                            Mê đọc truyện
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link
                            href="/"
                            className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
                        >
                            Trang chủ
                        </Link>
                        <Link
                            href="/genres"
                            className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
                        >
                            Thể loại
                        </Link>
                        <Link
                            href="/library"
                            className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
                        >
                            Thư viện
                        </Link>
                    </nav>

                    {/* Search Button */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setShowSearch(!showSearch)}
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            aria-label="Search"
                        >
                            <Search className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                        </button>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setShowMobileMenu(!showMobileMenu)}
                            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            aria-label="Menu"
                        >
                            {showMobileMenu ? (
                                <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                            ) : (
                                <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Search Bar */}
                {showSearch && (
                    <div className="pb-4 pt-2">
                        <input
                            type="text"
                            placeholder="Tìm kiếm truyện..."
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            autoFocus
                        />
                    </div>
                )}
            </div>

            {/* Mobile Menu */}
            {showMobileMenu && (
                <div className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                    <nav className="px-4 py-4 space-y-3">
                        <Link
                            href="/"
                            className="block text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
                            onClick={() => setShowMobileMenu(false)}
                        >
                            Trang chủ
                        </Link>
                        <Link
                            href="/genres"
                            className="block text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
                            onClick={() => setShowMobileMenu(false)}
                        >
                            Thể loại
                        </Link>
                        <Link
                            href="/library"
                            className="block text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
                            onClick={() => setShowMobileMenu(false)}
                        >
                            Thư viện
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}
