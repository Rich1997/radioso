import { ReactNode } from "react";

type PaddedFlexContainerProps = {
    children: ReactNode;
};

const PaddedFlexContainer: React.FC<PaddedFlexContainerProps> = ({ children }) => {
    return <div className="px-4 flex flex-col gap-2 w-full overflow-auto pb-14 scrollarea">{children}</div>;
};

export default PaddedFlexContainer;
