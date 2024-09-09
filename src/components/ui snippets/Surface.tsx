import { ReactNode } from "react";

type SurfaceProps = {
    children: ReactNode;
    padding?: string;
};

const Surface: React.FC<SurfaceProps> = ({ children }) => {
    return (
        <div className="flex-1 rounded-lg border px-4 h-full flex items-center bg-muted/30 justify-between gap-2">
            {children}
        </div>
    );
};

export default Surface;