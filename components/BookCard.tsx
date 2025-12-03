import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';

interface BookCardProps {
    id: string;
    title: string;
    author: string;
    coverUrl: string;
    avgRating?: number;
    genres: string[];
}

export default function BookCard({
    id,
    title,
    author,
    coverUrl,
    avgRating = 0,
    genres,
}: BookCardProps) {
    return (
        <Link href={`/book/${id}`}>
            <div className="group cursor-pointer transition-all duration-300 hover:scale-105">
                {/* Book Cover */}
                <div className="relative aspect-[2/3] overflow-hidden rounded-lg shadow-lg mb-3">
                    <Image
                        src={coverUrl}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    />
                </div>

                {/* Book Info */}
                <div className="space-y-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 text-lg">
                        {title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{author}</p>

                    {/* Rating */}
                    {avgRating > 0 && (
                        <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {avgRating.toFixed(1)}
                            </span>
                        </div>
                    )}

                    {/* Genre Tags */}
                    <div className="flex flex-wrap gap-2">
                        {genres.slice(0, 3).map((genre) => (
                            <span
                                key={genre}
                                className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                            >
                                {genre}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </Link>
    );
}
