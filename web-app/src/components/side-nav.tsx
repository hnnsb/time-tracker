"use client";

import Link from "next/link";
import {signIn, signOut, useSession} from "next-auth/react";
import {useState} from "react";
import {FaBars, FaTimes} from "react-icons/fa";
import ThemeSwitcher from "@/components/theme-switcher";

export default function SideNav() {
    const {data: session} = useSession();
    const [isOpen, setIsOpen] = useState(false);

    function toggleNav() {
        setIsOpen(!isOpen);
        document.body.classList.toggle("nav-open", !isOpen);
    }

    return (
        <div className="bg-light-bg_secondary dark:bg-dark-bg_secondary">
            <button onClick={toggleNav}
                    className="text-lg font-semibold hover:text-gray-400 m-2">
                {isOpen ? <FaTimes/> : <FaBars/>}
            </button>
            <nav className={`side-nav w-64 h-full fixed ${isOpen ? "translate-x-0" : "-translate-x-full"}
            flex justify-between flex-col
            bg-light-bg_secondary dark:bg-dark-bg_secondary`}>
                <ul className="flex flex-col p-4">
                    <li className="mb-4">
                        <Link href="/">Home</Link>
                    </li>
                    {!session ? (
                        <li className="mb-4">
                            <button onClick={() => signIn("google")}
                                    className="text-lg font-semibold hover:text-gray-400">
                                Login with Google
                            </button>
                        </li>
                    ) : (<>
                        <li className="mb-4">
                            <p>Welcome, {session.user?.name}</p>
                        </li>
                        <li className="mb-4">
                            <button onClick={() => signOut()} className="text-lg font-semibold hover:text-gray-400">
                                Logout
                            </button>
                        </li>

                    </>)}
                </ul>
                <div className="mx-2 pb-12">
                    <ThemeSwitcher/>
                </div>
            </nav>
        </div>
    );
}