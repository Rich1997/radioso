import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import NowPlaying from "./NowPlaying";

export const Layout: React.FC = () => {
    return (
        <div className="relative min-h-patch p-6 container mx-auto max-w-5xl">
            <nav className="mb-4">
                <ul className="flex space-x-4">
                    <li>
                        <NavLink to="/" className={({ isActive }) => (isActive ? "text-primary" : "")}>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/favorites" className={({ isActive }) => (isActive ? "text-primary" : "")}>
                            Favorites
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/search" className={({ isActive }) => (isActive ? "text-primary" : "")}>
                            Search
                        </NavLink>
                    </li>
                </ul>
            </nav>

            <Outlet />

            <footer className="mt-8">
                <NowPlaying />
            </footer>
        </div>
    );
};

export default Layout;
