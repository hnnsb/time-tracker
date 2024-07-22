import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthContext from "@/app/AuthContext";
import SideNav from "@/components/side-nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Time Tracker",
    description: "track your time on tasks",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <AuthContext>
            <SideNav />
        </AuthContext>
        <main className="p-4">
            {children}
        </main>
        </body>
        </html>
    );
}