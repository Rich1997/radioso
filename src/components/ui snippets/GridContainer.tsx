import { ReactNode } from "react";

type GridContainerProps = {
    children: ReactNode;
};

const GridContainer: React.FC<GridContainerProps> = ({ children }) => {
    return <div className="grid lg:grid-cols-2 xl:grid-cols-3 grid-cols-1 gap-x-4 gap-y-2 pb-4 w-full">{children}</div>;
};

export default GridContainer;
