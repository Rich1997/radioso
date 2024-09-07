import { FiRadio } from "react-icons/fi";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
    return (
        <aside className="sticky top-0 z-30 hidden shrink-0 md:sticky md:block py-4 border-r h-[calc(100svh-(6rem))] pr-4 w-[300px]">
            <div className="font-black text-4xl tracking-tight flex items-center gap-2 pb-4">
                <FiRadio size={36} />
                <div>SkyRadio</div>
            </div>
            <nav className="h-full scrollarea mb-4">
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
