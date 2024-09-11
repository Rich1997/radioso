import { NavLink } from "react-router-dom";
import PaddedContainer from "./ui snippets/PaddedContainer";
import Search from "./Search";

const Navbar = () => {
    return (
        <div className="bg-background py-4 -mb-[1px]">
            <PaddedContainer padding="4">
                <div className="flex justify-between sm:items-center items-start gap-4 sm:gap-6 flex-col sm:flex-row">
                    <div className="flex gap-6">
                        <NavLink to="/" className={({ isActive }) => (isActive ? "text-primary font-bold" : "")}>
                            Home
                        </NavLink>
                        <NavLink
                            to="/favorites"
                            className={({ isActive }) => (isActive ? "text-primary font-bold" : "")}
                        >
                            Favorites
                        </NavLink>
                    </div>
                    <Search />
                </div>
            </PaddedContainer>
        </div>
    );
};

export default Navbar;
