import React, { useMemo } from "react";
import RadioStation from "../RadioStation";
import GridContainer from "../ui snippets/GridContainer";
import Subtitlebar from "../ui snippets/Subtitlebar";
import PaddedContainer from "../ui snippets/PaddedContainer";
import FavoritesImportExport from "../FavoritesExportImport";
import { useFavoritesContext } from "@/context/FavoritesContext";
import { Edit } from "lucide-react";
import { Button } from "../ui/button";

export const Favorites: React.FC = () => {
    const { favorites, isImporting } = useFavoritesContext();

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
                <div className="flex items-center gap-4 text-muted-foreground justify-between sm:w-auto w-full sm:px-0 px-2 sm:pb-0 pb-2">
                    <Button variant="ghost_alt" size="oo">
                        <div className="flex items-center gap-2">
                            <Edit size={16} />
                            Select
                        </div>
                    </Button>
                    <FavoritesImportExport />
                </div>
            </Subtitlebar>

            {isImporting ? (
                <PaddedContainer>Importing favorites...</PaddedContainer>
            ) : (
                <>
                    <GridContainer>
                        {filteredFavorites.map((station) => {
                            return <RadioStation key={station.stationuuid} station={station} />;
                        })}
                    </GridContainer>

                    {filteredFavorites.length === 0 && <PaddedContainer>No favorite stations found.</PaddedContainer>}
                </>
            )}
        </div>
    );
};

export default Favorites;
