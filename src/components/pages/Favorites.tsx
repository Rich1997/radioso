import React, { useMemo } from "react";
import RadioStation from "../RadioStation";
import { useRadioContext } from "../../context/RadioContext";
import FlexContainer from "../ui snippets/FlexContainer";
import Subtitlebar from "../ui snippets/Subtitlebar";

export const Favorites: React.FC = () => {
    const { favorites } = useRadioContext();

    const filteredFavorites = useMemo(() => {
        return favorites.filter((station) => station.name.toLowerCase());
    }, [favorites]);

    return (
        <>
            <Subtitlebar>Favorites</Subtitlebar>

            <FlexContainer>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-x-4 gap-y-2">
                    {filteredFavorites.map((station) => {
                        return <RadioStation key={station.stationuuid} station={station} />;
                    })}
                </div>

                {filteredFavorites.length === 0 && <p>No favorite stations found.</p>}
            </FlexContainer>
        </>
    );
};

export default Favorites;
