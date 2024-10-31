import Logo from "../assets/Logo";
import MobileLogo from "../assets/MobileLogo";

type BottomPromoProps = { show?: boolean };

const BottomPromo: React.FC<BottomPromoProps> = ({ show = false }) => {
    return (
        <div
            className={`h-1/3 sm:w-2/3 w-full pb-14 opacity-10 text-7xl font-bold tracking-tighter sm:px-0 px-4 flex-wrap gap-x-6 leading-[64px] select-none ${
                show ? "flex" : "hidden"
            }`}
        >
            <div className="h-full sm:block hidden">
                <Logo height={64} />
            </div>
            <div className="sm:hidden block">
                <MobileLogo height={72} />
            </div>
            your everyday radio app
        </div>
    );
};

export default BottomPromo;
