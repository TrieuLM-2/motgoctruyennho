// Sample data for development and testing
export const sampleBooks = [
    {
        id: '1',
        title: 'Trường Sinh Giới',
        author: 'Ngã Ăn Tây Qua',
        coverUrl: '/images/truong-sinh-gioi.jpg',
        synopsis:
            'Một thế giới huyền bí nơi con người tìm kiếm sự trường sinh bất tử...',
        status: 'ongoing' as const,
        genres: ['Tiên hiệp', 'Huyền huyễn'],
        avgRating: 4.5,
        totalRatings: 128,
    },
    {
        id: '2',
        title: 'Hoàn Mỹ Thế Giới',
        author: 'Thần Đông',
        coverUrl: '/images/hoan-my-the-gioi.jpg',
        synopsis: 'Trong một thế giới hoàn mỹ, những anh hùng trỗi dậy...',
        status: 'completed' as const,
        genres: ['Tiên hiệp', 'Khoa huyễn'],
        avgRating: 4.8,
        totalRatings: 567,
    },
    {
        id: '3',
        title: 'Đấu Phá Thương Khung',
        author: 'Thiên Tàm Thổ Đậu',
        coverUrl: '/images/dau-pha-thuong-khung.jpg',
        synopsis: 'Câu chuyện về một thiếu niên cùng nhẫn giới kỳ lạ...',
        status: 'completed' as const,
        genres: ['Tiên hiệp', 'Huyền huyễn'],
        avgRating: 4.7,
        totalRatings: 892,
    },
];

export const sampleChapters = [
    {
        id: 'ch1',
        bookId: '1',
        title: 'Chương 1: Khởi Đầu',
        order: 1,
        contentVN: `Đây là đoạn văn tiếng Việt đầu tiên của chương truyện. Nội dung mô tả về nhân vật chính và bối cảnh câu chuyện.

Đoạn văn thứ hai tiếp tục kể về cuộc hành trình của nhân vật. Những thử thách đầu tiên bắt đầu xuất hiện.

Đoạn văn thứ ba mở ra một thế giới mới đầy kỳ bí và phiêu lưu đang chờ đợi phía trước.`,
        contentEN: `This is the first English paragraph of the chapter. It describes the main character and the story's setting.

The second paragraph continues telling about the character's journey. The first challenges begin to appear.

The third paragraph opens up a new world full of mystery and adventure waiting ahead.`,
    },
    {
        id: 'ch2',
        bookId: '1',
        title: 'Chương 2: Cuộc Gặp Gỡ',
        order: 2,
        contentVN: `Chương hai bắt đầu với một cuộc gặp gỡ bất ngờ.

Nhân vật chính gặp người bạn đồng hành đầu tiên.

Họ cùng nhau bước vào hành trình mới.`,
        contentEN: `Chapter two begins with an unexpected encounter.

The main character meets their first companion.

Together they embark on a new journey.`,
    },
];

export const sampleComments = [
    {
        id: 'c1',
        userName: 'Nguyễn Văn A',
        bookId: '1',
        chapterId: 'ch1',
        chapterTitle: 'Chương 1: Khởi Đầu',
        content: 'Chương này hay quá! Mong tác giả ra chập tiếp theo sớm.',
        likes: 15,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        isLiked: false,
    },
    {
        id: 'c2',
        userName: 'Trần Thị B',
        bookId: '1',
        chapterId: 'ch1',
        chapterTitle: 'Chương 1: Khởi Đầu',
        content: 'Nhân vật chính rất thú vị, tôi rất thích cách tác giả xây dựng.',
        likes: 8,
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        isLiked: true,
    },
];
