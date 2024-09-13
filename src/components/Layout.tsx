import React from "react";
import { Outlet } from "react-router-dom";
import NowPlaying from "./NowPlaying";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import BottomNav from "./BottomNav";

export const Layout: React.FC = () => {
    return (
        <div className="relative flex min-h-patch flex-col bg-background">
            <div className="flex flex-1 flex-col">
                <div className="max-w-7xl container mx-auto sticky top-0 z-10">
                    <Topbar />
                </div>
                <div className="border-b sticky top-[74px] h-0 z-20" />
                {/* <Sidebar /> */}
                <div className="flex gap-4 flex-1 container max-w-7xl mx-auto px-4">
                    <Sidebar />
                    <Outlet />
                </div>
            </div>
            <footer className="sm:h-24 h-[180px] sticky bottom-0 bg-muted z-30 border-t w-full border-b-0">
                <div className="container h-[95px] sm:px-0 w-full mx-auto max-w-7xl">
                    <NowPlaying />
                </div>
                <BottomNav />
            </footer>
        </div>
    );
};

export default Layout;
