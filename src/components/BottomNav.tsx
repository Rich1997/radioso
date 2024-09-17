import { NavLink } from "react-router-dom";
import { Compass, Heart, Home, Settings } from "lucide-react";

const BottomNav = () => {
    return (
        <nav className="sm:hidden flex h-[80px] bg-background items-center px-4 justify-around text-xs gap-2 text-muted-foreground">
            <NavLink
                to="/"
                className={({ isActive }) =>
                    isActive
                        ? "text-foreground fill py-2 px-6 bg-muted rounded-full w-14 flex items-center justify-center"
                        : "w-14 flex items-center justify-center"
                }
            >
                <div>
                    <Home size={20} />
                </div>
            </NavLink>
            <NavLink
                to="/favorites"
                className={({ isActive }) =>
                    isActive
                        ? "text-foreground fill py-2 px-6 bg-muted rounded-full w-14 flex items-center justify-center"
                        : "w-14 flex items-center justify-center"
                }
            >
                <div>
                    <Heart size={20} />
                </div>
            </NavLink>
            <NavLink
                to="#"
                className={({ isActive }) =>
                    isActive ? "w-14 flex items-center justify-center" : "w-14 flex items-center justify-center"
                }
            >
                <div>
                    <Compass size={20} />
                </div>
            </NavLink>
            <NavLink
                to="#"
                className={({ isActive }) =>
                    isActive ? "w-14 flex items-center justify-center" : "w-14 flex items-center justify-center"
                }
            >
                <div>
                    <Settings size={20} />
                </div>
            </NavLink>
        </nav>
    );
};

export default BottomNav;
