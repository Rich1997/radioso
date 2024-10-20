import React from "react";
import { useRadioContext } from "../../context/RadioContext";
import RadioStation from "../RadioStation";
import Subtitlebar from "../ui snippets/Subtitlebar";
import GridContainer from "../ui snippets/GridContainer";

type RecentlyPlayedProps = {
    items?: number;
};

const RecentlyPlayed: React.FC<RecentlyPlayedProps> = ({ items = 5 }) => {
    const { recentlyPlayed } = useRadioContext();
    const firstNStations = recentlyPlayed.slice(0, items);

    if (recentlyPlayed.length === 0) {
        return null;
    }

    return (
        <div className="flex-1">
            <Subtitlebar>Recently Played</Subtitlebar>
            <GridContainer>
                {firstNStations.map((station) => (
                    <RadioStation key={station.stationuuid} station={station} favIcon={true} />
                ))}
            </GridContainer>
        </div>
    );
};

export default RecentlyPlayed;
