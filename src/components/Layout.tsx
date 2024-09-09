import React from "react";
import { Outlet } from "react-router-dom";
import NowPlaying from "./NowPlaying";
import Topbar from "./Topbar";
import Navbar from "./Navbar";

export const Layout: React.FC = () => {
    return (
        <div className="relative flex min-h-patch flex-col bg-background">
            <div className="flex flex-1 flex-col">
                <Topbar />
                <Navbar />
                {/* <Sidebar /> */}
                <div className="flex-1 container mx-auto">
                    <Outlet />
                </div>
            </div>
            <footer className="h-24 sticky bottom-0 bg-card z-30 border-t w-full border-b-0">
                <div className="container h-[95px] sm:px-0 w-full mx-auto">
                    <NowPlaying />
                </div>
            </footer>
        </div>
    );
};

export default Layout;
