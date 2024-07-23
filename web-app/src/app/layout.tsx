import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import AuthContext from "@/contexts/AuthContext";
import SideNav from "@/components/side-nav";
import {ThemeProvider} from "@/contexts/theme-context";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Time Tracker",
    description: "track your time on tasks",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
        <body className={`${inter.className} bg-bg_primary dark:bg-dark-bg_primary text-light-text dark:text-dark-text`}>
        <ThemeProvider>
            <AuthContext>
                <SideNav />
            </AuthContext>
            <main className="p-4">
                {children}
            </main>
        </ThemeProvider>
        </body>
        </html>
    );
}