import ColorThemeSelector from "../ColorThemeSelector";
import Subtitlebar from "../ui snippets/Subtitlebar";

const Settings = () => {
    return (
        <div className="w-full sm:pt-8 pt-2">
            <div className="sm:text-3xl text-2xl font-bold sm:pb-8 pb-6 sm:px-0 px-4">Settings</div>
            <Subtitlebar>Color themes</Subtitlebar>
            <div className="sm:px-0 px-4">
                <ColorThemeSelector />
            </div>
        </div>
    );
};

export default Settings;
