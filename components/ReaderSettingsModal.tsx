'use client';

import { useState } from 'react';
import { Settings, X } from 'lucide-react';
import { useReaderSettings } from '@/lib/store/reader-settings';

export default function ReaderSettingsModal() {
    const [isOpen, setIsOpen] = useState(false);
    const {
        fontFamily,
        fontSize,
        lineHeight,
        theme,
        languageMode,
        setFontFamily,
        setFontSize,
        setLineHeight,
        setTheme,
        setLanguageMode,
    } = useReaderSettings();

    return (
        <>
            {/* Floating Settings Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-8 right-8 z-40 p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-200 hover:scale-110"
                aria-label="Open settings"
            >
                <Settings className="w-6 h-6" />
            </button>

            {/* Settings Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Cài đặt đọc truyện
                            </h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                            </button>
                        </div>

                        {/* Settings Content */}
                        <div className="p-6 space-y-6">
                            {/* Font Family */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                    Phông chữ
                                </label>
                                <div className="grid grid-cols-3 gap-2">
                                    <button
                                        onClick={() => setFontFamily('nunito')}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${fontFamily === 'nunito'
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                                            }`}
                                    >
                                        Nunito
                                    </button>
                                    <button
                                        onClick={() => setFontFamily('serif')}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${fontFamily === 'serif'
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                                            }`}
                                    >
                                        Serif
                                    </button>
                                    <button
                                        onClick={() => setFontFamily('sans')}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${fontFamily === 'sans'
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                                            }`}
                                    >
                                        Sans
                                    </button>
                                </div>
                            </div>

                            {/* Font Size */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                    Cỡ chữ: {fontSize}px
                                </label>
                                <input
                                    type="range"
                                    min="14"
                                    max="28"
                                    value={fontSize}
                                    onChange={(e) => setFontSize(Number(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-blue-600"
                                />
                                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    <span>14px</span>
                                    <span>28px</span>
                                </div>
                            </div>

                            {/* Line Height */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                    Khoảng cách dòng: {lineHeight.toFixed(1)}
                                </label>
                                <input
                                    type="range"
                                    min="1.4"
                                    max="2.5"
                                    step="0.1"
                                    value={lineHeight}
                                    onChange={(e) => setLineHeight(Number(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-blue-600"
                                />
                                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    <span>1.4</span>
                                    <span>2.5</span>
                                </div>
                            </div>

                            {/* Theme */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                    Giao diện
                                </label>
                                <div className="grid grid-cols-3 gap-2">
                                    <button
                                        onClick={() => setTheme('light')}
                                        className={`p-4 rounded-lg border-2 transition-all ${theme === 'light'
                                                ? 'border-blue-600 bg-white'
                                                : 'border-gray-200 bg-white hover:border-gray-300'
                                            }`}
                                    >
                                        <div className="w-full h-8 bg-white border border-gray-300 rounded"></div>
                                        <p className="text-xs mt-2 text-gray-700">Sáng</p>
                                    </button>
                                    <button
                                        onClick={() => setTheme('sepia')}
                                        className={`p-4 rounded-lg border-2 transition-all ${theme === 'sepia'
                                                ? 'border-blue-600 bg-sepia-100'
                                                : 'border-gray-200 bg-sepia-100 hover:border-gray-300'
                                            }`}
                                    >
                                        <div className="w-full h-8 bg-sepia-200 rounded"></div>
                                        <p className="text-xs mt-2 text-sepia-900">Sepia</p>
                                    </button>
                                    <button
                                        onClick={() => setTheme('dark')}
                                        className={`p-4 rounded-lg border-2 transition-all ${theme === 'dark'
                                                ? 'border-blue-600 bg-gray-900'
                                                : 'border-gray-200 bg-gray-900 hover:border-gray-300'
                                            }`}
                                    >
                                        <div className="w-full h-8 bg-gray-800 rounded"></div>
                                        <p className="text-xs mt-2 text-white">Tối</p>
                                    </button>
                                </div>
                            </div>

                            {/* Language Mode */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                    Ngôn ngữ
                                </label>
                                <div className="grid grid-cols-3 gap-2">
                                    <button
                                        onClick={() => setLanguageMode('vietnamese')}
                                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${languageMode === 'vietnamese'
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                                            }`}
                                    >
                                        Tiếng Việt
                                    </button>
                                    <button
                                        onClick={() => setLanguageMode('english')}
                                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${languageMode === 'english'
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                                            }`}
                                    >
                                        English
                                    </button>
                                    <button
                                        onClick={() => setLanguageMode('bilingual')}
                                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${languageMode === 'bilingual'
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                                            }`}
                                    >
                                        Song ngữ
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
