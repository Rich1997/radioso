import React, { ReactNode } from "react";

interface TitlebarProps {
    children: ReactNode;
}

const Titlebar: React.FC<TitlebarProps> = ({ children }) => {
    return (
        <div className="px-4 text-2xl font-bold tracking-tight pb-6 sm:leading-snug leading-5 sm:pt-0 pt-2">
            {children}
        </div>
    );
};

export default Titlebar;
