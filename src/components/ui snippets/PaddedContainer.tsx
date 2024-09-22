import { ReactNode } from "react";

type PaddedContainerProps = {
    children: ReactNode;
};

const PaddedContainer: React.FC<PaddedContainerProps> = ({ children }) => {
    return <div className="w-full sm:px-0 px-4">{children}</div>;
};

export default PaddedContainer;
