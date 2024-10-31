import { ColorTheme, useColorTheme } from "@/context/ColorThemeContext";
import { colorThemes } from "@/utils/constants";
import { capitalizeFirstLetter } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import StyledSelect from "./ui snippets/StyledSelect";

const ColorThemeSelector = () => {
    const { colorTheme, setColorTheme } = useColorTheme();

    return (
        <>
            <Select
                onValueChange={(value) => {
                    setColorTheme(value as ColorTheme);
                }}
                value={colorTheme}
            >
                <SelectTrigger className="sm:flex hidden">
                    <SelectValue placeholder={capitalizeFirstLetter(colorTheme)} />
                </SelectTrigger>
                <SelectContent>
                    {colorThemes.map((colorTheme, colorThemeID) => (
                        <SelectItem
                            value={colorTheme.colorThemeName}
                            key={colorThemeID}
                            className="cursor-pointer justify-between"
                        >
                            {colorTheme.colorThemeAlias}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <StyledSelect
                value={colorTheme}
                onChange={(e) => {
                    setColorTheme(e.target.value as ColorTheme);
                }}
                options={colorThemes}
                optionValueKey="colorThemeName"
                optionLabelKey="colorThemeAlias"
            />
        </>
    );
};

export default ColorThemeSelector;
