import { NavLink } from "react-router-dom";
import HomeIcon from "./assets/icons/HomeIcon";
import FavoriteIcon from "./assets/icons/FavoriteIcon";
import { Compass, Download, Info, Settings } from "lucide-react";
import { useRadioContext } from "@/context/RadioContext";
import { Button } from "./ui/button";
// import SidebarLogo from "./assets/SidebarLogo";

const Sidebar = () => {
    const { favorites } = useRadioContext();

    return (
        <aside className="sticky top-[76px] h-[calc(100dvh-172px)] hidden shrink-0 sm:sticky sm:block py-8 border-r w-[232px] select-none px-2">
            <nav className="h-full scrollarea mb-4 overflow-y-auto overflow-x-hidden">
                <div className="flex flex-col items-stretch gap-6 justify-between h-full">
                    <div className="flex flex-col gap-1 text-sm font-medium">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive
                                    ? "bg-muted hover:bg-secondary/40 rounded-lg"
                                    : "hover:bg-secondary/40 rounded-lg"
                            }
                        >
                            <div className="flex gap-2 h-9 py-2 px-2 items-center">
                                <HomeIcon size={16} />
                                <div className="flex items-center gap-2 text-sm">Home</div>
                            </div>
                        </NavLink>
                        <NavLink
                            to="/favorites"
                            className={({ isActive }) =>
                                isActive
                                    ? "bg-muted hover:bg-secondary/40 rounded-lg"
                                    : "hover:bg-secondary/40 rounded-lg"
                            }
                        >
                            <div className="flex gap-2 h-9 py-2 px-2 items-center">
                                <FavoriteIcon size={16} />
                                <div className="flex items-center gap-2 text-sm justify-between w-full">
                                    <div>Favorites</div>
                                    <div>{favorites.length}</div>
                                </div>
                            </div>
                        </NavLink>
                        <NavLink
                            to="/discover"
                            className={({ isActive }) =>
                                isActive
                                    ? "bg-muted hover:bg-secondary/40 rounded-lg"
                                    : "hover:bg-secondary/40 rounded-lg"
                            }
                        >
                            <div className="flex gap-2 h-9 py-2 px-2 items-center">
                                <Compass size={16} />
                                <div className="flex items-center gap-2 text-sm">Discover</div>
                            </div>
                        </NavLink>
                        <NavLink
                            to="/settings"
                            className={({ isActive }) =>
                                isActive
                                    ? "bg-muted hover:bg-secondary/40 rounded-lg"
                                    : "hover:bg-secondary/40 rounded-lg"
                            }
                        >
                            <div className="flex gap-2 h-9 py-2 px-2 items-center">
                                <Settings size={16} />
                                <div className="flex items-center gap-2 text-sm">Settings</div>
                            </div>
                        </NavLink>
                        <NavLink
                            to="/about"
                            className={({ isActive }) =>
                                isActive
                                    ? "bg-muted hover:bg-secondary/40 rounded-lg"
                                    : "hover:bg-secondary/40 rounded-lg"
                            }
                        >
                            <div className="flex gap-2 h-9 py-2 px-2 items-center">
                                <Info size={16} />
                                <div className="flex items-center gap-2 text-sm">About</div>
                            </div>
                        </NavLink>
                    </div>
                    <div className="opacity-20 px-2 flex justify-center">{/* <SidebarLogo height={136} /> */}</div>
                    <Button variant={"outline"} className="gap-2">
                        <Download size={16} />
                        Export library
                    </Button>
                </div>
            </nav>
        </aside>
    );
};

export default Sidebar;
