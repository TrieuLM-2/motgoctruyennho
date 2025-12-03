import type { Metadata } from 'next';
import { Nunito, Merriweather } from 'next/font/google';
import './globals.css';

const nunito = Nunito({
    subsets: ['latin', 'vietnamese'],
    variable: '--font-nunito',
    display: 'swap',
});

const merriweather = Merriweather({
    subsets: ['latin', 'vietnamese'],
    weight: ['300', '400', '700'],
    variable: '--font-merriweather',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'Mê đọc truyện - Love Reading',
    description: 'A beautiful novel reading web application',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="vi" className={`${nunito.variable} ${merriweather.variable}`}>
            <body className={nunito.className}>{children}</body>
        </html>
    );
}
