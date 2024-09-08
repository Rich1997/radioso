import React, { ReactNode } from "react";

interface TitlebarProps {
    children: ReactNode;
}

const Titlebar: React.FC<TitlebarProps> = ({ children }) => {
    return (
        <div className="text-2xl font-bold tracking-tight sm:leading-snug leading-5 sm:pt-0 pt-2 pb-6 px-4">
            {children}
        </div>
    );
};

export default Titlebar;
