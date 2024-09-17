import React, { useMemo } from "react";
import RadioStation from "../RadioStation";
import { useRadioContext } from "../../context/RadioContext";
import GridContainer from "../ui snippets/GridContainer";
import Subtitlebar from "../ui snippets/Subtitlebar";

export const Favorites: React.FC = () => {
    const { favorites } = useRadioContext();

    const filteredFavorites = useMemo(() => {
        return favorites.filter((station) => station.name.toLowerCase());
    }, [favorites]);

    return (
        <div className="w-full sm:pt-8 pt-2">
            <Subtitlebar>Favorites</Subtitlebar>

            <GridContainer>
                {filteredFavorites.map((station) => {
                    return <RadioStation key={station.stationuuid} station={station} />;
                })}
            </GridContainer>

            {filteredFavorites.length === 0 && <p>No favorite stations found.</p>}
        </div>
    );
};

export default Favorites;
