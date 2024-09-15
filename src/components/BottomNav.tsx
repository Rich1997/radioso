import { NavLink } from "react-router-dom";

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
                <span className="material-symbols-rounded">home</span>
            </NavLink>
            <NavLink
                to="/favorites"
                className={({ isActive }) =>
                    isActive
                        ? "text-foreground fill py-2 px-6 bg-muted rounded-full w-14 flex items-center justify-center"
                        : "w-14 flex items-center justify-center"
                }
            >
                <span className="material-symbols-rounded -mb-0.5">favorite</span>
            </NavLink>
            <NavLink
                to="#"
                className={({ isActive }) =>
                    isActive ? "w-14 flex items-center justify-center" : "w-14 flex items-center justify-center"
                }
            >
                <span className="material-symbols-rounded">explore</span>
            </NavLink>
            <NavLink
                to="#"
                className={({ isActive }) =>
                    isActive ? "w-14 flex items-center justify-center" : "w-14 flex items-center justify-center"
                }
            >
                <span className="material-symbols-rounded">queue_music</span>
            </NavLink>
        </nav>
    );
};

export default BottomNav;
