import React, { useMemo } from "react";
import RadioStation from "../RadioStation";
import { useRadioContext } from "../../context/RadioContext";
import GridContainer from "../ui snippets/GridContainer";
import Subtitlebar from "../ui snippets/Subtitlebar";
import PaddedContainer from "../ui snippets/PaddedContainer";

export const Favorites: React.FC = () => {
    const { favorites } = useRadioContext();

    const filteredFavorites = useMemo(() => {
        return favorites.filter((station) => station.name.toLowerCase());
    }, [favorites]);

    return (
        <div className="w-full sm:pt-8 pt-2">
            <Subtitlebar>
                <div className="flex items-center">
                    <div>Favorites</div>
                    <div className="ml-2 text-muted-foreground font-medium sm:text-base text-sm sm:mt-1 mt-0">
                        ({filteredFavorites.length})
                    </div>
                </div>
            </Subtitlebar>

            <GridContainer>
                {filteredFavorites.map((station) => {
                    return <RadioStation key={station.stationuuid} station={station} />;
                })}
            </GridContainer>

            {filteredFavorites.length === 0 && <PaddedContainer>No favorite stations found.</PaddedContainer>}
        </div>
    );
};

export default Favorites;
