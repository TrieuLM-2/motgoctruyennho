'use client';

import { useState } from 'react';
import { Star, X } from 'lucide-react';

interface RatingModalProps {
    bookTitle: string;
    onSubmit: (rating: number) => void;
    onClose: () => void;
}

export default function RatingModal({
    bookTitle,
    onSubmit,
    onClose,
}: RatingModalProps) {
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);

    const handleSubmit = () => {
        if (rating > 0) {
            onSubmit(rating);
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Đánh giá truyện
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </button>
                </div>

                {/* Content */}
                <div className="text-center space-y-6">
                    <p className="text-gray-700 dark:text-gray-300">
                        Bạn đã hoàn thành truyện <strong>{bookTitle}</strong>!
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                        Hãy đánh giá truyện từ 1 đến 5 sao
                    </p>

                    {/* Star Rating */}
                    <div className="flex justify-center gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setHoveredRating(star)}
                                onMouseLeave={() => setHoveredRating(0)}
                                className="transition-transform hover:scale-110"
                            >
                                <Star
                                    className={`w-12 h-12 ${star <= (hoveredRating || rating)
                                            ? 'fill-yellow-400 text-yellow-400'
                                            : 'text-gray-300 dark:text-gray-600'
                                        }`}
                                />
                            </button>
                        ))}
                    </div>

                    {rating > 0 && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Bạn đã chọn {rating} sao
                        </p>
                    )}

                    {/* Buttons */}
                    <div className="flex gap-3 mt-6">
                        <button
                            onClick={onClose}
                            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                            Để sau
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={rating === 0}
                            className="flex-1 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                        >
                            Gửi đánh giá
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
