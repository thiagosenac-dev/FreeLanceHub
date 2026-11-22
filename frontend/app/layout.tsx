import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StoreProvider from "./redux/StoreProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FreeLanceHub",
  description: "Plataforma que conecta empresas e freelancers",
};

// layout raiz: envolve toda a aplicação com o Redux (StoreProvider)
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className="h-full">
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
