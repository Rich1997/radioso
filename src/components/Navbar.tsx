import { NavLink } from "react-router-dom";
import PaddedContainer from "./ui snippets/PaddedContainer";
import Search from "./Search";

const Navbar = () => {
    return (
        <div className="sticky top-[56px] bg-background py-4 container mx-auto">
            <PaddedContainer padding="4">
                <div className="flex justify-between items-center gap-4">
                    <ul className="flex gap-6">
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
                    <Search />
                </div>
            </PaddedContainer>
        </div>
    );
};

export default Navbar;