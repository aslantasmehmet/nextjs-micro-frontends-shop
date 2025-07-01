import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReduxProvider from "./providers/ReduxProvider";
import DynamicHeader from "./components/DynamicHeader";
import URLCartLoader from "./components/URLCartLoader";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sepet - NextShop",
  description: "Alışveriş sepetiniz",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-gray-100 text-gray-900 antialiased`}
      >
        <ReduxProvider>
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
          <URLCartLoader />
          <DynamicHeader />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
