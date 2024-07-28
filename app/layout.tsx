import '@/app/ui/global.css'
import { inter } from '@/app/ui/fonts'
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'NextJS练习',
  description: '一个新手入门NextJS练习',
  keywords: ['react', 'nextjs', 'typescript'],
  openGraph: {
    images: '/opengraph-image.png'
  },
  metadataBase: new URL('https://nextjs-dashboard-ecru-xi-54.vercel.app'),
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
