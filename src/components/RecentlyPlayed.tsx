import React from "react";
import { useRadioContext } from "../context/RadioContext";
import RadioStation from "./RadioStation";
import Subtitlebar from "./ui snippets/Subtitlebar";
import FlexContainer from "./ui snippets/FlexContainer";

const RecentlyPlayed: React.FC = () => {
    const { recentlyPlayed } = useRadioContext();

    if (recentlyPlayed.length === 0) {
        return null;
    }

    return (
        <div className="flex-1">
            <Subtitlebar>Recently Played</Subtitlebar>

            <FlexContainer>
                {recentlyPlayed.map((station) => (
                    <RadioStation key={station.stationuuid} station={station} favIcon={true} />
                ))}
            </FlexContainer>
        </div>
    );
};

export default RecentlyPlayed;
