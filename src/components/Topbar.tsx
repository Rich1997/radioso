import Logo from "./assets/Logo";
import MobileLogo from "./assets/MobileLogo";
import Search from "./Search";
import ThemeSwitcher from "./ThemeSwitcher";

const Topbar = () => {
    return (
        <div className="flex gap-4 bg-background w-full justify-between sm:items-center px-4 sm:py-4 pt-6 pb-4 items-center sm:h-[75px] h-[90px]">
            <div className="hidden sm:block min-w-[200px]">
                <Logo height={24} primaryColor="hsl(var(--primary))" secondaryColor="hsl(var(--secondary))" />
            </div>
            <div className="sm:hidden block">
                <MobileLogo height={24} />
            </div>
            <div className="flex items-center justify-between sm:max-w-[calc(100%-200px)] max-w-full mx-auto sm:w-[1240px] w-full gap-4">
                <Search />
                <ThemeSwitcher />
            </div>
        </div>
    );
};

export default Topbar;
