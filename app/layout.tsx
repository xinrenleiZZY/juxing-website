import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ScrollToTop } from "@/components/ui/scroll-to-top";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "企业官网 - 专业的解决方案提供商",
    template: "%s | 企业官网",
  },
  description: "我们提供专业的产品和服务，致力于为客户创造价值",
  keywords: ["企业官网", "产品服务", "解决方案"],
  authors: [{ name: "企业名称" }],
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://example.com",
    siteName: "企业官网",
    title: "企业官网 - 专业的解决方案提供商",
    description: "我们提供专业的产品和服务，致力于为客户创造价值",
  },
  twitter: {
    card: "summary_large_image",
    title: "企业官网 - 专业的解决方案提供商",
    description: "我们提供专业的产品和服务，致力于为客户创造价值",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
