import {
    collection,
    doc,
    addDoc,
    updateDoc,
    increment,
    arrayUnion,
    arrayRemove,
    serverTimestamp,
    setDoc,
} from 'firebase/firestore';
import { db } from './config';

// Add a comment
export async function addComment(
    userId: string,
    userName: string,
    bookId: string,
    content: string,
    chapterId?: string | null
) {
    try {
        const commentsRef = collection(db, 'comments');
        const newComment = await addDoc(commentsRef, {
            userId,
            userName,
            bookId,
            chapterId: chapterId || null,
            content,
            likes: 0,
            likedBy: [],
            createdAt: serverTimestamp(),
        });
        return newComment.id;
    } catch (error) {
        console.error('Error adding comment:', error);
        throw error;
    }
}

// Toggle like on a comment
export async function toggleCommentLike(commentId: string, userId: string) {
    try {
        const commentRef = doc(db, 'comments', commentId);
        // Note: In a real app, you'd first check if user has already liked
        // For simplicity, this toggles the like
        await updateDoc(commentRef, {
            likes: increment(1),
            likedBy: arrayUnion(userId),
        });
    } catch (error) {
        console.error('Error toggling like:', error);
        throw error;
    }
}

// Submit book rating
export async function rateBook(userId: string, bookId: string, rating: number) {
    try {
        // Add/update rating document
        const ratingRef = doc(db, 'ratings', `${userId}_${bookId}`);
        await setDoc(ratingRef, {
            userId,
            bookId,
            rating,
            createdAt: serverTimestamp(),
        });

        // Update book's average rating
        // Note: In a real app, you'd use Cloud Functions to calculate this properly
        const bookRef = doc(db, 'books', bookId);
        await updateDoc(bookRef, {
            totalRatings: increment(1),
            // avgRating calculation should be done in Cloud Function
        });

        return true;
    } catch (error) {
        console.error('Error rating book:', error);
        throw error;
    }
}

// Update user reading progress
export async function updateProgress(
    userId: string,
    bookId: string,
    chapterId: string,
    position: number
) {
    try {
        const userRef = doc(db, 'users', userId);
        await updateDoc(userRef, {
            currentBookId: bookId,
            currentChapterId: chapterId,
            lastPosition: position,
        });
    } catch (error) {
        console.error('Error updating progress:', error);
        throw error;
    }
}
