import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type FontFamily = 'nunito' | 'serif' | 'sans';
export type Theme = 'light' | 'sepia' | 'dark';
export type LanguageMode = 'vietnamese' | 'english' | 'bilingual';

interface ReaderSettings {
    fontFamily: FontFamily;
    fontSize: number;
    lineHeight: number;
    theme: Theme;
    languageMode: LanguageMode;
    setFontFamily: (font: FontFamily) => void;
    setFontSize: (size: number) => void;
    setLineHeight: (height: number) => void;
    setTheme: (theme: Theme) => void;
    setLanguageMode: (mode: LanguageMode) => void;
}

export const useReaderSettings = create<ReaderSettings>()(
    persist(
        (set) => ({
            fontFamily: 'nunito',
            fontSize: 18,
            lineHeight: 1.8,
            theme: 'light',
            languageMode: 'vietnamese',
            setFontFamily: (fontFamily) => set({ fontFamily }),
            setFontSize: (fontSize) => set({ fontSize }),
            setLineHeight: (lineHeight) => set({ lineHeight }),
            setTheme: (theme) => set({ theme }),
            setLanguageMode: (languageMode) => set({ languageMode }),
        }),
        {
            name: 'reader-settings',
        }
    )
);
