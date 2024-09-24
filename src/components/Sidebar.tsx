import { NavLink } from "react-router-dom";
import HomeIcon from "./assets/icons/HomeIcon";
import FavoriteIcon from "./assets/icons/FavoriteIcon";
import { Compass, Info, Settings } from "lucide-react";
import { useRadioContext } from "@/context/RadioContext";
import SidebarLogo from "./assets/SidebarLogo";

const Sidebar = () => {
    const { favorites } = useRadioContext();

    return (
        <aside className="sticky top-[76px] h-[calc(100dvh-172px)] hidden shrink-0 sm:sticky sm:block py-8 border-r w-[200px] select-none">
            <nav className="h-full scrollarea mb-4 overflow-y-auto overflow-x-hidden">
                <div className="flex flex-col items-stretch gap-6 justify-between h-full">
                    <div className="flex flex-col gap-1 text-sm font-medium">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive
                                    ? "bg-secondary/50 rounded-l-lg hover:bg-secondary/70"
                                    : "hover:bg-muted rounded-l-lg"
                            }
                        >
                            <div className="flex gap-2 h-9 py-2 px-3 items-center">
                                <HomeIcon size={16} />
                                <div className="flex items-center gap-2 text-sm">Home</div>
                            </div>
                        </NavLink>
                        <NavLink
                            to="/favorites"
                            className={({ isActive }) =>
                                isActive
                                    ? "bg-secondary/50 rounded-l-lg hover:bg-secondary/70"
                                    : "hover:bg-muted rounded-l-lg"
                            }
                        >
                            <div className="flex gap-2 h-9 py-2 px-3 items-center">
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
                                    ? "bg-secondary/50 rounded-l-lg hover:bg-secondary/70"
                                    : "hover:bg-muted rounded-l-lg"
                            }
                        >
                            <div className="flex gap-2 h-9 py-2 px-3 items-center">
                                <Compass size={16} />
                                <div className="flex items-center gap-2 text-sm">Discover</div>
                            </div>
                        </NavLink>
                        <NavLink
                            to="/settings"
                            className={({ isActive }) =>
                                isActive
                                    ? "bg-secondary/50 rounded-l-lg hover:bg-secondary/70"
                                    : "hover:bg-muted rounded-l-lg"
                            }
                        >
                            <div className="flex gap-2 h-9 py-2 px-3 items-center">
                                <Settings size={16} />
                                <div className="flex items-center gap-2 text-sm">Settings</div>
                            </div>
                        </NavLink>
                        <NavLink
                            to="/about"
                            className={({ isActive }) =>
                                isActive
                                    ? "bg-secondary/50 rounded-l-lg hover:bg-secondary/70"
                                    : "hover:bg-muted rounded-l-lg"
                            }
                        >
                            <div className="flex gap-2 h-9 py-2 px-3 items-center">
                                <Info size={16} />
                                <div className="flex items-center gap-2 text-sm">About</div>
                            </div>
                        </NavLink>
                    </div>
                    <div className="opacity-20">
                        <SidebarLogo height={140} />
                    </div>
                </div>
            </nav>
        </aside>
    );
};

export default Sidebar;
