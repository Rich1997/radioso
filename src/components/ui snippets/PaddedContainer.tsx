import { ReactNode } from "react";

type PaddedContainerProps = {
    children: ReactNode;
    padding?: string;
};

const PaddedContainer: React.FC<PaddedContainerProps> = ({ children, padding = "2" }) => {
    const numericPadding = parseInt(padding);
    const inlineStyle = {
        paddingLeft: `${numericPadding * 0.25}rem`,
        paddingRight: `${numericPadding * 0.25}rem`,
    };

    return (
        <div className={`w-full px-${padding}`} style={inlineStyle}>
            {children}
        </div>
    );
};

export default PaddedContainer;
