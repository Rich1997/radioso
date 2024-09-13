import { NavLink } from "react-router-dom";

const Sidebar = () => {
    return (
        <aside className="sticky top-[75px] h-[calc(100dvh-172px)] hidden shrink-0 md:sticky md:block py-4 border-r pr-4 lg:w-[300px] md:w-[200px]">
            <nav className="h-full scrollarea mb-4 overflow-auto">
                <ul className="flex flex-col gap-2">
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
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
