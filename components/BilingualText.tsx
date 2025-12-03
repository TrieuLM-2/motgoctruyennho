import { LanguageMode } from '@/lib/store/reader-settings';

interface BilingualTextProps {
    contentVN: string;
    contentEN: string;
    languageMode: LanguageMode;
    fontSize: number;
    lineHeight: number;
    fontFamily: string;
}

export function BilingualText({
    contentVN,
    contentEN,
    languageMode,
    fontSize,
    lineHeight,
    fontFamily,
}: BilingualTextProps) {
    const paragraphsVN = contentVN.split('\n\n').filter((p) => p.trim());
    const paragraphsEN = contentEN.split('\n\n').filter((p) => p.trim());

    const fontClass =
        fontFamily === 'serif'
            ? 'font-merriweather'
            : fontFamily === 'sans'
                ? 'font-sans'
                : 'font-nunito';

    const baseStyle = {
        fontSize: `${fontSize}px`,
        lineHeight: `${lineHeight}`,
    };

    // Vietnamese only
    if (languageMode === 'vietnamese') {
        return (
            <div className={`space-y-6 ${fontClass}`}>
                {paragraphsVN.map((para, index) => (
                    <p key={index} style={baseStyle} className="text-justify">
                        {para}
                    </p>
                ))}
            </div>
        );
    }

    // English only
    if (languageMode === 'english') {
        return (
            <div className={`space-y-6 ${fontClass}`}>
                {paragraphsEN.map((para, index) => (
                    <p key={index} style={baseStyle} className="text-justify">
                        {para}
                    </p>
                ))}
            </div>
        );
    }

    // Bilingual - alternating paragraphs
    if (languageMode === 'bilingual') {
        const maxLength = Math.max(paragraphsVN.length, paragraphsEN.length);
        return (
            <div className={`space-y-8 ${fontClass}`}>
                {Array.from({ length: maxLength }).map((_, index) => (
                    <div key={index} className="space-y-3">
                        {paragraphsVN[index] && (
                            <p
                                style={baseStyle}
                                className="text-justify border-l-4 border-blue-500 pl-4"
                            >
                                {paragraphsVN[index]}
                            </p>
                        )}
                        {paragraphsEN[index] && (
                            <p
                                style={baseStyle}
                                className="text-justify border-l-4 border-green-500 pl-4 opacity-80"
                            >
                                {paragraphsEN[index]}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        );
    }

    return null;
}
