import { ReactNode } from "react";

type GridContainerProps = {
    children: ReactNode;
};

const GridContainer: React.FC<GridContainerProps> = ({ children }) => {
    return (
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 grid-cols-1 gap-x-4 sm:gap-y-2 gap-y-1 sm:pb-8 pb-6 w-full sm:mt-0 -mt-2">
            {children}
        </div>
    );
};

export default GridContainer;
