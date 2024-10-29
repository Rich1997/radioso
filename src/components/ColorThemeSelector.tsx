import { ColorTheme, useColorTheme } from "@/context/ColorThemeContext";
import { colors } from "@/utils/constants";
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
                    {colors.map((color, colorID) => (
                        <SelectItem value={color.colorName} key={colorID} className="cursor-pointer justify-between">
                            {color.colorAlias}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <StyledSelect
                value={colorTheme}
                onChange={(e) => {
                    setColorTheme(e.target.value as ColorTheme);
                }}
                options={colors}
                optionValueKey="colorName"
                optionLabelKey="colorAlias"
            />
        </>
    );
};

export default ColorThemeSelector;
