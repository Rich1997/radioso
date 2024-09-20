import React, { ReactNode } from "react";

interface SubtitlebarProps {
    children: ReactNode;
}

const Subtitlebar: React.FC<SubtitlebarProps> = ({ children }) => {
    return <div className="sm:text-xl text-lg font-semibold tracking-tight pb-4">{children}</div>;
};

export default Subtitlebar;
