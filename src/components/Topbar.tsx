import { FiRadio } from "react-icons/fi";

const Topbar = () => {
    return (
        <div className="flex bg-background pt-4 w-full">
            <div className="font-black text-4xl tracking-tight flex items-center gap-2 px-4">
                <FiRadio size={36} />
                <div>radioso</div>
            </div>
        </div>
    );
};

export default Topbar;
