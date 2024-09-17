import React from "react";

type LogoProps = {
    width?: number;
    height?: number;
    primaryColor?: string;
    secondaryColor?: string;
};

const Logo: React.FC<LogoProps> = ({
    width,
    height,
    primaryColor = "hsl(var(--primary))",
    secondaryColor = "hsl(var(--secondary))",
}) => {
    return (
        <svg width={width} height={height} viewBox="0 0 584 95" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path
                className="text-foreground"
                d="M137.992 93V29h26.496l.64 16q2.176-7.936 6.656-12.544 4.608-4.736 12.16-4.736 2.944 0 4.48.512t2.176 1.024l-2.432 23.68q-1.152-.512-3.328-.896t-4.736-.384q-3.84 0-6.656 1.28-2.816 1.152-4.48 3.456-1.536 2.304-1.536 5.888V93zm88.363-39.936q0-2.944-1.408-4.608-1.28-1.665-4.096-1.664-2.688 0-4.48 1.536t-2.048 6.144l-24.832-3.584q.896-10.624 9.216-16.896t24.192-6.272q11.136 0 18.304 3.072 7.296 3.072 10.752 8.576 3.584 5.505 3.584 12.8v19.84q0 5.248 4.992 5.248 1.408 0 2.176-.384l-1.28 15.104q-4.736 2.304-11.392 2.304-6.017 0-10.752-1.664-4.608-1.792-7.296-5.248-2.56-3.585-2.56-9.088V77h2.816q-.128 4.864-3.2 8.832-2.944 3.84-7.936 6.144t-11.392 2.304q-6.785 0-11.52-2.048-4.608-2.048-7.04-5.888t-2.432-9.088q0-7.04 4.48-11.392 4.48-4.48 12.928-6.144l22.272-4.608-.128 10.368-6.912 1.664q-2.688.64-3.84 2.176-1.152 1.408-1.152 3.584 0 2.048 1.28 3.328t3.584 1.28a4.8 4.8 0 0 0 1.92-.384q1.024-.384 1.664-1.152a5 5 0 0 0 1.152-1.792q.384-1.152.384-2.56z"
            />
            <path
                className="text-foreground"
                d="M285.623 94.28q-7.808 0-13.312-3.84-5.504-3.968-8.32-11.264-2.816-7.424-2.816-17.792 0-10.752 2.816-18.176 2.945-7.552 8.448-11.52t13.312-3.968q9.344 0 14.336 6.144 4.992 6.015 6.272 15.232l-2.56 3.84V3.4h29.44V93h-26.496l-1.792-25.856 3.328 3.712q-.768 6.784-3.712 12.16-2.816 5.248-7.68 8.32-4.736 2.944-11.264 2.944m11.904-20.608q2.048 0 3.328-1.28 1.408-1.409 2.176-4.224t.768-7.168q0-4.096-.64-6.912t-2.048-4.224-3.584-1.408q-3.072 0-4.864 2.56-1.792 2.432-1.792 9.984t1.792 10.112 4.864 2.56m57.21-48.768q-8.704 0-12.416-2.816-3.584-2.816-3.584-9.472 0-6.784 3.584-9.472Q346.033.328 354.737.328t12.288 2.816q3.712 2.689 3.712 9.472 0 6.656-3.712 9.472-3.584 2.816-12.288 2.816M369.457 29v64h-29.44V29zm40.015-1.28q10.752 0 18.688 3.968 8.064 3.84 12.544 11.264T445.184 61q0 10.495-4.48 18.048-4.48 7.425-12.544 11.392-7.936 3.84-18.688 3.84-10.624 0-18.688-3.84-8.064-3.968-12.544-11.392-4.48-7.552-4.48-18.048 0-10.625 4.48-18.048 4.48-7.425 12.544-11.264 8.064-3.968 18.688-3.968m0 19.84q-1.92 0-3.328 1.152-1.408 1.024-2.176 3.968-.64 2.944-.64 8.32t.64 8.32q.768 2.816 2.176 3.968t3.328 1.152q2.048 0 3.328-1.152 1.408-1.151 2.048-3.968.768-2.944.768-8.32t-.768-8.32q-.64-2.944-2.048-3.968-1.28-1.152-3.328-1.152m69.46 46.72q-9.343 0-18.048-2.56-8.575-2.56-14.976-7.68l10.496-15.232q3.456 3.072 9.088 5.504 5.632 2.304 11.264 2.304 2.177 0 3.84-.512 1.792-.512 1.792-1.792 0-1.025-1.024-1.536-.896-.512-4.096-1.024l-4.608-.896q-13.952-2.688-19.712-7.68t-5.76-13.44q0-5.248 3.328-10.24 3.456-5.12 10.88-8.448 7.423-3.328 19.584-3.328 9.984 0 17.92 2.56 7.936 2.432 12.928 6.784l-10.112 14.592q-3.584-2.815-9.216-4.48-5.504-1.792-10.112-1.792-2.048 0-3.328.256t-1.92.768a1.22 1.22 0 0 0-.512 1.024q0 .896 1.28 1.664t4.992 1.408l9.088 1.536q10.368 1.665 15.104 6.656 4.864 4.992 4.864 12.288 0 6.272-3.456 11.648-3.328 5.249-10.624 8.448-7.168 3.2-18.944 3.2m68.89-66.56q10.752 0 18.688 3.968 8.064 3.84 12.544 11.264T583.534 61q0 10.495-4.48 18.048-4.48 7.425-12.544 11.392-7.936 3.84-18.688 3.84-10.624 0-18.688-3.84-8.064-3.968-12.544-11.392-4.48-7.552-4.48-18.048 0-10.625 4.48-18.048 4.48-7.425 12.544-11.264 8.064-3.968 18.688-3.968m0 19.84q-1.92 0-3.328 1.152-1.408 1.024-2.176 3.968-.64 2.944-.64 8.32t.64 8.32q.768 2.816 2.176 3.968t3.328 1.152q2.048 0 3.328-1.152 1.408-1.151 2.048-3.968.768-2.944.768-8.32t-.768-8.32q-.64-2.944-2.048-3.968-1.28-1.152-3.328-1.152"
            />
            <defs>
                <linearGradient id="grad1" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" style={{ stopColor: primaryColor }} />
                    <stop offset="100%" style={{ stopColor: secondaryColor }} />
                </linearGradient>
            </defs>
            <path
                style={{ fill: "url(#grad1)" }}
                d="M28.164 53.727c0-5.422 4.396-9.818 9.818-9.818 5.423 0 9.819 4.396 9.819 9.818v29.455c0 5.422-4.396 9.818-9.819 9.818-5.422 0-9.818-4.396-9.818-9.818zm27.818-24.545c0-5.423 4.396-9.818 9.819-9.818 5.422 0 9.818 4.395 9.818 9.818v54c0 5.422-4.396 9.818-9.818 9.818-5.423 0-9.819-4.396-9.819-9.818zM83.8 12.818C83.8 7.396 88.197 3 93.62 3c5.422 0 9.818 4.396 9.818 9.818v70.364c0 5.422-4.396 9.818-9.818 9.818-5.423 0-9.818-4.396-9.818-9.818zM19.636 83.182c0 5.422-4.395 9.818-9.818 9.818C4.396 93 0 88.604 0 83.182c0-5.423 4.396-9.818 9.818-9.818a9.817 9.817 0 0 1 9.818 9.818"
            />
        </svg>
    );
};

export default Logo;
