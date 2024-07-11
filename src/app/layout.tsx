import type { Metadata } from "next";
import { Inter, Montserrat,  Patrick_Hand} from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PraFazê!",
  description: "Simple tasks app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className='antialiased' >{children}</body>
    </html>

  );
}
