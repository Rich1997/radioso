import { IconProps } from "@/utils/types";

const PauseCircleIcon: React.FC<IconProps> = ({ size = 24 }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height={size} fill="currentColor">
            <path d="M256 512a256 256 0 1 0 0-512 256 256 0 1 0 0 512m-32-320v128c0 17.7-14.3 32-32 32s-32-14.3-32-32V192c0-17.7 14.3-32 32-32s32 14.3 32 32m128 0v128c0 17.7-14.3 32-32 32s-32-14.3-32-32V192c0-17.7 14.3-32 32-32s32 14.3 32 32" />
        </svg>
    );
};

export default PauseCircleIcon;
