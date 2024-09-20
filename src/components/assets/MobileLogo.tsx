import React from "react";

type MobileLogoProps = {
    width?: number;
    height?: number;
    primaryColor?: string;
    secondaryColor?: string;
};

const MobileLogo: React.FC<MobileLogoProps> = ({
    width,
    height,
    primaryColor = "hsl(var(--primary))",
    secondaryColor = "hsl(var(--secondary))",
}) => {
    return (
        <svg width={width} height={height} viewBox="0 0 146 110" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="grad" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" style={{ stopColor: primaryColor }} />
                    <stop offset="100%" style={{ stopColor: secondaryColor }} />
                </linearGradient>
            </defs>
            <path
                style={{ fill: "url(#grad)" }}
                d="M54 52c0-6.627 5.373-12 12-12s12 5.373 12 12v46c0 6.627-5.373 12-12 12s-12-5.373-12-12zm34-20c0-6.627 5.373-12 12-12s12 5.373 12 12v66c0 6.627-5.373 12-12 12s-12-5.373-12-12zm34-20c0-6.627 5.373-12 12-12s12 5.373 12 12v86c0 6.627-5.373 12-12 12s-12-5.373-12-12zM21.98 110q-.87 0-1.748-.315a4.2 4.2 0 0 1-1.56-.986l-3.745-3.426Q9.242 100.076 4.62 94.876 0 89.676 0 83.326q0-5.266 3.51-8.796Q7.023 71 12.28 71q2.831 0 5.35 1.156 2.52 1.157 4.35 3.21a13.1 13.1 0 0 1 4.35-3.21A12.7 12.7 0 0 1 31.68 71q5.259 0 8.79 3.53Q44 78.058 44 83.327q0 6.348-4.613 11.576-4.612 5.226-10.407 10.437l-3.677 3.371a4.2 4.2 0 0 1-1.567.981 5.3 5.3 0 0 1-1.756.308"
            />
        </svg>
    );
};

export default MobileLogo;
