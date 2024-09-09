import { FiRadio } from "react-icons/fi";

const Topbar = () => {
    return (
        <div className="flex sticky top-0 bg-background pt-4 w-full z-10">
            <div className="font-black text-4xl tracking-tight flex items-center gap-2 container mx-auto px-4">
                <FiRadio size={36} />
                <div>radioso</div>
            </div>
        </div>
    );
};

export default Topbar;
