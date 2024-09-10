import React, { ReactNode } from "react";

interface SubtitlebarProps {
    children: ReactNode;
}

const Subtitlebar: React.FC<SubtitlebarProps> = ({ children }) => {
    return <div className="text-xl font-semibold tracking-tight pb-4">{children}</div>;
};

export default Subtitlebar;
