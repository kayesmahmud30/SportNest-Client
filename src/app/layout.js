import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "./components/Header/Nav";
import { ToastContainer } from "react-toastify";
import Foot from "./components/Footer/Foot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Sport Nest",
  description: "Book world-class premium turfs ",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-surface">
        <Nav></Nav>
        <ToastContainer />
        {children}
        <Foot></Foot>
      </body>
    </html>
  );
}
