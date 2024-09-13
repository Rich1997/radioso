import { NavLink } from "react-router-dom";

const BottomNav = () => {
    return (
        <nav className="sm:hidden flex h-[84px] bg-background items-center px-4 justify-around text-xs gap-2">
            <NavLink to="/" className={({ isActive }) => (isActive ? "text-primary fill" : "")}>
                <div className="flex flex-col items-center">
                    <span className="material-symbols-rounded">home</span>
                    <div>Home</div>
                </div>
            </NavLink>
            <NavLink to="/favorites" className={({ isActive }) => (isActive ? "text-primary fill" : "")}>
                <div className="flex flex-col items-center">
                    <span className="material-symbols-rounded">favorite</span>
                    <div>Favorites</div>
                </div>
            </NavLink>
            <NavLink to="#" className={({ isActive }) => (isActive ? "text" : "")}>
                <div className="flex flex-col items-center">
                    <span className="material-symbols-rounded">explore</span>
                    <div>Discover</div>
                </div>
            </NavLink>
            <NavLink to="#" className={({ isActive }) => (isActive ? "text" : "")}>
                <div className="flex flex-col items-center">
                    <span className="material-symbols-rounded">settings</span>
                    <div>Settings</div>
                </div>
            </NavLink>
        </nav>
    );
};

export default BottomNav;
