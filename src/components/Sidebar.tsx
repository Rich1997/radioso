import { NavLink } from "react-router-dom";

const Sidebar = () => {
    return (
        <aside className="sticky top-[75px] h-[calc(100dvh-172px)] hidden shrink-0 sm:sticky sm:block py-8 border-r pr-4 w-[200px] select-none">
            <nav className="h-full scrollarea mb-4 overflow-auto">
                <div className="flex flex-col gap-1 text-sm font-medium">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive
                                ? "bg-secondary/50 rounded-lg flex items-center py-2 px-4 h-9 hover:bg-secondary/70 "
                                : "py-2 px-4 hover:bg-muted rounded-lg"
                        }
                    >
                        <div className="flex items-center gap-2 text-sm">Home</div>
                    </NavLink>
                    <NavLink
                        to="/favorites"
                        className={({ isActive }) =>
                            isActive
                                ? "bg-secondary/50 rounded-lg flex items-center py-2 px-4 h-9 hover:bg-secondary/70 "
                                : "py-2 px-4 hover:bg-muted rounded-lg"
                        }
                    >
                        <div className="flex items-center gap-2 text-sm">Favorites</div>
                    </NavLink>
                </div>
            </nav>
        </aside>
    );
};

export default Sidebar;
