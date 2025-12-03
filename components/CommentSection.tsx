'use client';

import { useState } from 'react';
import { Heart, MessageCircle, Reply } from 'lucide-react';
import { formatDistanceToNow } from '@/lib/utils/date';

interface Comment {
    id: string;
    userName: string;
    userAvatar?: string;
    chapterId?: string | null;
    chapterTitle?: string;
    content: string;
    likes: number;
    createdAt: Date;
    isLiked?: boolean;
}

interface CommentSectionProps {
    comments: Comment[];
    onLike?: (commentId: string) => void;
    onReply?: (commentId: string) => void;
    showChapterInfo?: boolean;
}

export default function CommentSection({
    comments,
    onLike,
    onReply,
    showChapterInfo = false,
}: CommentSectionProps) {
    return (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Bình luận ({comments.length})
            </h3>

            {comments.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                    Chưa có bình luận nào. Hãy là người đầu tiên!
                </p>
            ) : (
                <div className="space-y-4">
                    {comments.map((comment) => (
                        <div
                            key={comment.id}
                            className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                            {/* Comment Header */}
                            <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                                        {comment.userName.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900 dark:text-white">
                                            {comment.userName}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            {formatDistanceToNow(comment.createdAt)}
                                            {showChapterInfo && comment.chapterTitle && (
                                                <span className="ml-2">• {comment.chapterTitle}</span>
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Comment Content */}
                            <p className="text-gray-700 dark:text-gray-300 mb-3 ml-13">
                                {comment.content}
                            </p>

                            {/* Comment Actions */}
                            <div className="flex items-center gap-4 ml-13">
                                <button
                                    onClick={() => onLike?.(comment.id)}
                                    className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                                >
                                    <Heart
                                        className={`w-4 h-4 ${comment.isLiked ? 'fill-red-500 text-red-500' : ''
                                            }`}
                                    />
                                    <span>{comment.likes}</span>
                                </button>
                                <button
                                    onClick={() => onReply?.(comment.id)}
                                    className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                                >
                                    <Reply className="w-4 h-4" />
                                    <span>Trả lời</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
