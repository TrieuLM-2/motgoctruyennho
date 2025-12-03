# Mê đọc truyện (Love Reading)

A beautiful, minimalist novel reading web application with bilingual support (Vietnamese/English).

## 🌟 Features

- **Beautiful UI**: Clean, modern design inspired by e-reader apps
- **Bilingual Support**: Read in Vietnamese, English, or both simultaneously
- **Customizable Reader**: Adjust font, size, spacing, and theme (Light/Sepia/Dark)
- **Progress Tracking**: Automatically saves your reading position
- **Smart Comments**: Chapter-specific and global comment sections
- **Rating System**: Rate books upon completion
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop

## 🚀 Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: Zustand
- **Backend**: Firebase (Firestore, Authentication, Hosting)
- **Fonts**: Nunito (sans-serif), Merriweather (serif)

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/motgoctruyennho.git
cd motgoctruyennho
```

2. Install dependencies:
```bash
npm install
```

3. Set up Firebase:
   - Create a Firebase project at https://console.firebase.google.com
   - Enable Firestore Database and Authentication
   - Copy your Firebase config to `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
motgoctruyennho/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage
│   ├── book/[id]/         # Book detail page
│   └── read/[bookId]/[chapterId]/  # Reading page
├── components/            # React components
│   ├── BookCard.tsx
│   ├── Header.tsx
│   ├── CategoryFilter.tsx
│   ├── BilingualText.tsx
│   ├── ReaderSettingsModal.tsx
│   ├── CommentSection.tsx
│   └── RatingModal.tsx
├── lib/
│   ├── firebase/          # Firebase configuration
│   ├── store/             # Zustand stores
│   ├── utils/             # Utility functions
│   └── data/              # Sample data
└── public/                # Static assets
```

## 🎨 Key Features Explained

### Bilingual Reading
- **Vietnamese Only**: Display original Vietnamese content
- **English Only**: Display English translation
- **Bilingual Mode**: Show both languages side-by-side with color-coded borders

### Reader Settings
- **Font Family**: Choose between Nunito, Serif (Merriweather), or Sans
- **Font Size**: Adjustable from 14px to 28px
- **Line Height**: Customize spacing from 1.4 to 2.5
- **Theme**: Switch between Light, Sepia, and Dark modes
- **Language**: Toggle between Vietnamese, English, or Bilingual

### Progress Tracking
- Automatically saves scroll position
- Shows progress bar during reading
- Resume from where you left off

### Rating System
- Triggered when finishing the last chapter
- 5-star rating interface
- Updates book's average rating

## 🔥 Firebase Data Structure

### Collections

**books**
```typescript
{
  id: string
  title: string
  author: string
  coverUrl: string
  synopsis: string
  status: 'ongoing' | 'completed'
  genres: string[]
  avgRating: number
  totalRatings: number
}
```

**chapters**
```typescript
{
  id: string
  bookId: string
  title: string
  order: number
  contentVN: string  // Vietnamese content
  contentEN: string  // English content
}
```

**comments**
```typescript
{
  id: string
  userId: string
  userName: string
  bookId: string
  chapterId: string | null  // null for global comments
  content: string
  likes: number
  likedBy: string[]
  createdAt: Timestamp
}
```

## 🛠️ Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## 📝 To-Do

- [ ] Add Firebase Authentication
- [ ] Implement real-time comments
- [ ] Add search functionality
- [ ] Create admin panel for adding books
- [ ] Add bookmarks feature
- [ ] Implement reading statistics
- [ ] Add social sharing

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 💬 Contact

For questions or feedback, please open an issue on GitHub.

---

Made with ❤️ for book lovers