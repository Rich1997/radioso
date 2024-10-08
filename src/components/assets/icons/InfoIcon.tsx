import { IconProps } from "@/utils/types";

const InfoIcon: React.FC<IconProps> = ({ size = 24, fill = false }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height={size} viewBox="0 -960 960 960" fill="currentColor">
            {fill ? (
                <path d="M480-280q17 0 28.5-11.5T520-320v-160q0-17-11.5-28.5T480-520t-28.5 11.5T440-480v160q0 17 11.5 28.5T480-280m0-320q17 0 28.5-11.5T520-640t-11.5-28.5T480-680t-28.5 11.5T440-640t11.5 28.5T480-600m0 520q-83 0-156-31.5T197-197t-85.5-127T80-480t31.5-156T197-763t127-85.5T480-880t156 31.5T763-763t85.5 127T880-480t-31.5 156T763-197t-127 85.5T480-80" />
            ) : (
                <path d="M480-280q17 0 28.5-11.5T520-320v-160q0-17-11.5-28.5T480-520t-28.5 11.5T440-480v160q0 17 11.5 28.5T480-280m0-320q17 0 28.5-11.5T520-640t-11.5-28.5T480-680t-28.5 11.5T440-640t11.5 28.5T480-600m0 520q-83 0-156-31.5T197-197t-85.5-127T80-480t31.5-156T197-763t127-85.5T480-880t156 31.5T763-763t85.5 127T880-480t-31.5 156T763-197t-127 85.5T480-80m0-80q134 0 227-93t93-227-93-227-227-93-227 93-93 227 93 227 227 93m0-320" />
            )}
        </svg>
    );
};

export default InfoIcon;
