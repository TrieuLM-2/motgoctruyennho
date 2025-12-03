import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    where,
    orderBy,
} from 'firebase/firestore';
import { db } from './config';

// Fetch all books
export async function fetchBooks() {
    try {
        const booksRef = collection(db, 'books');
        const snapshot = await getDocs(booksRef);
        return snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
    } catch (error) {
        console.error('Error fetching books:', error);
        return [];
    }
}

// Fetch single book
export async function fetchBook(bookId: string) {
    try {
        const bookRef = doc(db, 'books', bookId);
        const snapshot = await getDoc(bookRef);
        if (snapshot.exists()) {
            return { id: snapshot.id, ...snapshot.data() };
        }
        return null;
    } catch (error) {
        console.error('Error fetching book:', error);
        return null;
    }
}

// Fetch chapters for a book
export async function fetchChapters(bookId: string) {
    try {
        const chaptersRef = collection(db, 'chapters');
        const q = query(
            chaptersRef,
            where('bookId', '==', bookId),
            orderBy('order', 'asc')
        );
        const snapshot = await getDocs(q);
        return snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
    } catch (error) {
        console.error('Error fetching chapters:', error);
        return [];
    }
}

// Fetch single chapter
export async function fetchChapter(chapterId: string) {
    try {
        const chapterRef = doc(db, 'chapters', chapterId);
        const snapshot = await getDoc(chapterRef);
        if (snapshot.exists()) {
            return { id: snapshot.id, ...snapshot.data() };
        }
        return null;
    } catch (error) {
        console.error('Error fetching chapter:', error);
        return null;
    }
}

// Fetch comments for a book (global or chapter-specific)
export async function fetchComments(bookId: string, chapterId?: string | null) {
    try {
        const commentsRef = collection(db, 'comments');
        let q;

        if (chapterId) {
            // Chapter-specific comments
            q = query(
                commentsRef,
                where('bookId', '==', bookId),
                where('chapterId', '==', chapterId),
                orderBy('createdAt', 'desc')
            );
        } else {
            // Global comments (all chapters)
            q = query(
                commentsRef,
                where('bookId', '==', bookId),
                orderBy('createdAt', 'desc')
            );
        }

        const snapshot = await getDocs(q);
        return snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate(),
        }));
    } catch (error) {
        console.error('Error fetching comments:', error);
        return [];
    }
}

// Fetch user progress
export async function fetchUserProgress(userId: string) {
    try {
        const userRef = doc(db, 'users', userId);
        const snapshot = await getDoc(userRef);
        if (snapshot.exists()) {
            return snapshot.data();
        }
        return null;
    } catch (error) {
        console.error('Error fetching user progress:', error);
        return null;
    }
}
