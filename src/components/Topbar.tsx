import Logo from "./assets/Logo";
import Search from "./Search";

const Topbar = () => {
    return (
        <div className="flex gap-4 bg-background w-full justify-between items-center p-4 -mb-[2px]">
            <Logo height={30} />
            <Search />
        </div>
    );
};

export default Topbar;
