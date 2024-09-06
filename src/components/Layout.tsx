import React from "react";
import { Outlet } from "react-router-dom";
import NowPlaying from "./NowPlaying";
import Sidebar from "./Sidebar";

export const Layout: React.FC = () => {
    return (
        <div className="relative flex min-h-patch flex-col bg-background">
            <div className="flex flex-1 container mx-auto">
                <Sidebar />
                <div className="flex-1">
                    <Outlet />
                </div>
            </div>
            <footer className="h-24 sticky bottom-0 bg-muted z-30 border-t w-full border-b-0">
                <div className="sm:container h-[95px] sm:px-0 w-full bg-accent mx-auto">
                    <NowPlaying />
                </div>
            </footer>
        </div>
    );
};

export default Layout;
