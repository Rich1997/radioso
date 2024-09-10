import { ReactNode } from "react";

type FlexContainerProps = {
    children: ReactNode;
};

const FlexContainer: React.FC<FlexContainerProps> = ({ children }) => {
    return <div className="flex flex-col gap-2 w-full overflow-auto pb-6 scrollarea">{children}</div>;
};

export default FlexContainer;
