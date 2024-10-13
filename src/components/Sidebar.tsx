import { NavLink } from "react-router-dom";
import HomeIcon from "./assets/icons/HomeIcon";
import FavoriteIcon from "./assets/icons/FavoriteIcon";
import { Download } from "lucide-react";
import { Button } from "./ui/button";
import InfoIcon from "./assets/icons/InfoIcon";
import ExploreIcon from "./assets/icons/ExploreIcon";
import SettingsIcon from "./assets/icons/SettingsIcon";
import { ListItem } from "@/utils/types";
import { useFavoritesContext } from "@/context/FavoritesContext";
import { ScrollArea } from "./ui/scroll-area";
// import SidebarLogo from "./assets/SidebarLogo";

const Sidebar = () => {
    const { favorites } = useFavoritesContext();

    const listItems: ListItem[] = [
        {
            to: "/",
            label: "Home",
            icon: (isActive) => <HomeIcon fill={isActive} size={16} />,
        },
        {
            to: "/favorites",
            label: "Favorites",
            icon: (isActive) => <FavoriteIcon fill={isActive} size={16} />,
            count: favorites.length,
        },
        {
            to: "/discover",
            label: "Discover",
            icon: (isActive) => <ExploreIcon fill={isActive} size={16} />,
        },
        {
            to: "/settings",
            label: "Settings",
            icon: (isActive) => <SettingsIcon fill={isActive} size={16} />,
        },
        {
            to: "/about",
            label: "About",
            icon: (isActive) => <InfoIcon fill={isActive} size={16} />,
        },
    ];

    return (
        <aside className="sticky top-[76px] h-[calc(100dvh-172px)] hidden shrink-0 sm:sticky sm:block py-8 border-r w-[232px] select-none">
            <ScrollArea className="h-full mb-4 overflow-y-auto overflow-x-hidden px-3">
                <div className="flex flex-col items-stretch gap-6 justify-between h-full">
                    <div className="flex flex-col gap-1 text-sm font-medium">
                        {listItems.map((item, index) => (
                            <NavLink
                                key={index}
                                to={item.to}
                                className={({ isActive }) =>
                                    isActive
                                        ? "bg-muted hover:bg-secondary/40 rounded-lg"
                                        : "hover:bg-secondary/40 rounded-lg"
                                }
                            >
                                {({ isActive }) => (
                                    <div className="flex gap-2 h-9 py-2 px-3 items-center">
                                        <div>{item.icon(isActive)}</div>
                                        <div className="flex items-center gap-2 text-sm justify-between w-full">
                                            <div>{item.label}</div>
                                            <div>{item.count ?? item.count}</div>
                                        </div>
                                    </div>
                                )}
                            </NavLink>
                        ))}
                    </div>
                    <div className="opacity-20 px-3 flex justify-center">{/* <SidebarLogo height={136} /> */}</div>
                    <Button variant={"outline"} className="gap-2">
                        <Download size={16} />
                        Export library
                    </Button>
                </div>
            </ScrollArea>
        </aside>
    );
};

export default Sidebar;
