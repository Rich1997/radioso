import Logo from "./assets/Logo";
import MobileLogo from "./assets/MobileLogo";
import Search from "./Search";

const Topbar = () => {
    return (
        <div className="flex gap-4 bg-background w-full justify-between sm:items-center px-4 sm:py-4 pt-6 pb-4 items-center sm:h-[75px] h-[90px]">
            <div className="hidden sm:block">
                <Logo height={24} primaryColor="hsl(var(--primary))" secondaryColor="hsl(var(--secondary))" />
            </div>
            <div className="sm:hidden block">
                <MobileLogo height={24} />
            </div>
            <Search />
        </div>
    );
};

export default Topbar;
