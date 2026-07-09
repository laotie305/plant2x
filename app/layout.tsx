import type {Metadata} from 'next';
import { Inter, Noto_Serif_SC } from 'next/font/google';
import './globals.css'; // Global styles

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const notoSerif = Noto_Serif_SC({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-serif',
});

export const metadata: Metadata = {
  title: '植物大战僵尸：人教版二年级下册数学图鉴海报',
  description: '融合《植物大战僵尸》西游古风主题，采用【现代图鉴风】打造的人教版小学二年级下册数学科普海报与趣味互动程序。',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="zh-CN" className={`${inter.variable} ${notoSerif.variable}`}>
      <body className="bg-[#121410] text-[#eae5d8] min-h-screen antialiased select-none font-sans" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
