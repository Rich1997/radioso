import { IconProps } from "@/utils/types";

const ChevronRightIcon: React.FC<IconProps> = ({ size = 24 }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height={size} viewBox="0 -960 960 960" fill="currentColor">
            <path d="M504-480 348-636q-11-11-11-28t11-28 28-11 28 11l184 184q6 6 8.5 13t2.5 15-2.5 15-8.5 13L404-268q-11 11-28 11t-28-11-11-28 11-28z" />
        </svg>
    );
};

export default ChevronRightIcon;
