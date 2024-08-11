'use client'
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "@/styles/globals.css";
import NextAuthSessionProvider from "@/providers/sessionProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <title>T-ALPHA</title>
      </head>
      <body className={inter.className}>
        <NextAuthSessionProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
        </NextAuthSessionProvider>
        <Toaster richColors position="top-right"/>
      </body>
    </html>
  );
}
