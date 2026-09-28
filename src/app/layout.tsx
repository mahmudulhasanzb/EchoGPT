import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EchoGPT — Redesigned Multi-AI Ecosystem & Browser Copilot",
  description:
    "Chat, write, code, and translate across multiple frontier AI models (GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro, DeepSeek R1) in one unified workspace and Chrome Extension.",
  authors: [{ name: "Mahmudul Hasan", url: "https://mahmudulhasan-dev.vercel.app/" }],
  creator: "Mahmudul Hasan",
  publisher: "Mahmudul Hasan",
  keywords: [
    "EchoGPT",
    "Mahmudul Hasan",
    "Full-Stack Web Developer",
    "AI Integration Specialist",
    "Multi-AI Copilot",
    "AI Playground",
    "Prompt Engineering",
    "Next.js 16",
    "Side-by-Side Model Comparison",
  ],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "EchoGPT — Redesigned Multi-AI Ecosystem & Browser Copilot",
    description:
      "Engineered by Mahmudul Hasan, Full-Stack Web Developer & AI Integration Specialist.",
    url: "https://github.com/mahmudulhasanzb/EchoGPT",
    siteName: "EchoGPT",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": "https://github.com/mahmudulhasanzb/EchoGPT#webapp",
      "name": "EchoGPT",
      "url": "https://github.com/mahmudulhasanzb/EchoGPT",
      "applicationCategory": "ProductivityApplication",
      "operatingSystem": "All",
      "description":
        "Unified multi-AI workspace and browser extension simulator for model comparison, coding, and prompt workflows.",
      "creator": {
        "@type": "Person",
        "@id": "https://mahmudulhasan-dev.vercel.app/#person",
        "name": "Mahmudul Hasan",
        "jobTitle": "Full-Stack Web Developer & AI Integration Specialist",
        "url": "https://mahmudulhasan-dev.vercel.app/",
        "sameAs": [
          "https://github.com/mahmudulhasanzb",
          "https://mahmudulhasan-dev.vercel.app/"
        ],
        "description":
          "My name is Mahmudul Hasan, and I'm a full-stack web developer and AI integration specialist who built EchoGPT."
      }
    },
    {
      "@type": "Person",
      "@id": "https://mahmudulhasan-dev.vercel.app/#person",
      "name": "Mahmudul Hasan",
      "jobTitle": "Full-Stack Web Developer & AI Integration Specialist",
      "url": "https://mahmudulhasan-dev.vercel.app/",
      "sameAs": [
        "https://github.com/mahmudulhasanzb",
        "https://mahmudulhasan-dev.vercel.app/"
      ],
      "description":
        "My name is Mahmudul Hasan, and I'm a full-stack web developer and AI integration specialist."
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-slate-50 dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 transition-colors duration-200">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
