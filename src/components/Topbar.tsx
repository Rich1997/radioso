import Logo from "./assets/Logo";

const Topbar = () => {
    return (
        <div className="flex bg-background pt-4 w-full">
            <div className="font-black text-4xl tracking-tight flex items-center gap-2 px-4">
                <Logo height={30} />
            </div>
        </div>
    );
};

export default Topbar;
