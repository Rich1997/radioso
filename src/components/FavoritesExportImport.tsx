import React, { useState, useEffect, useRef } from "react";
import { useFavoritesContext } from "../context/FavoritesContext";
import { Station } from "@/utils/types";
import { Button } from "./ui/button";
import { Download, Loader2, Upload } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Input } from "./ui/input";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import StyledSelect from "./ui snippets/StyledSelect";

const FavoritesImportExport: React.FC = () => {
    const { favorites, exportFavorites, importFavorites, isImporting, cancelImport } = useFavoritesContext();
    const [importMode, setImportMode] = useState<"overwrite" | "append">("append");
    const [importedStations, setImportedStations] = useState<Station[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!isImporting) {
            clearImport();
        }
    }, [isImporting]);

    const handleExport = () => {
        const exportData = exportFavorites();
        const blob = new Blob([exportData], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const now = new Date();
        const formattedDateTime =
            `${String(now.getDate()).padStart(2, "0")}${String(now.getMonth() + 1).padStart(
                2,
                "0"
            )}${now.getFullYear()}` +
            `${String(now.getHours()).padStart(2, "0")}${String(now.getMinutes()).padStart(2, "0")}${String(
                now.getSeconds()
            ).padStart(2, "0")}`;

        const a = document.createElement("a");
        a.href = url;
        a.download = `radioso_favorites_${formattedDateTime}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const importedData = JSON.parse(e.target?.result as string);
                    if (
                        Array.isArray(importedData) &&
                        importedData.every((station) => "stationuuid" in station && "name" in station)
                    ) {
                        setImportedStations(importedData);
                    } else {
                        throw new Error("Invalid import data format");
                    }
                } catch (error) {
                    console.error("Error parsing import file:", error);
                    alert("Error importing favorites. Please check the file format.");
                    clearImport();
                }
            };
            reader.readAsText(file);
        }
    };

    const handleConfirmImport = () => {
        importFavorites(importedStations, importMode);
    };

    const clearImport = () => {
        setImportedStations([]);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleCancelImport = () => {
        if (isImporting) {
            cancelImport();
        }
        clearImport();
    };

    return (
        <>
            <div className="flex space-x-4 max-w-fit">
                <Button onClick={handleExport} variant="ghost_alt" size="oo">
                    <div className="flex items-center gap-2">
                        <Download size={16} />
                        Export
                    </div>
                </Button>
                <Input
                    type="file"
                    accept=".json"
                    onChange={handleImport}
                    disabled={isImporting}
                    ref={fileInputRef}
                    className="hidden"
                    id="file-upload"
                />
                <Button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isImporting}
                    variant="ghost_alt"
                    size="oo"
                >
                    <div className="flex items-center gap-2">
                        <Upload size={16} />
                        Import
                    </div>
                </Button>
            </div>

            <Dialog open={importedStations.length > 0}>
                <DialogContent className="[&>button]:hidden sm:px-6 px-4">
                    <DialogTitle>Import favorites</DialogTitle>
                    {importedStations.length > 0 && !isImporting && (
                        <div className="space-y-4">
                            <ul className="max-h-48 overflow-y-auto space-y-2 pr-2">
                                {importedStations.map((station) => (
                                    <li key={station.stationuuid} className="flex justify-between items-center">
                                        <span>{station.name}</span>
                                        <span
                                            className={
                                                favorites.some((fav) => fav.stationuuid === station.stationuuid)
                                                    ? "text-muted-foreground"
                                                    : "text-foreground"
                                            }
                                        >
                                            {favorites.some((fav) => fav.stationuuid === station.stationuuid)
                                                ? "Already in favorites"
                                                : "New"}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                            <StyledSelect
                                value={importMode}
                                onChange={(e) => setImportMode(e.target.value as "overwrite" | "append")}
                                options={[
                                    { value: "append", label: "Add new stations only" },
                                    { value: "overwrite", label: "Overwrite existing list" },
                                ]}
                            />
                            <Select
                                value={importMode}
                                onValueChange={(value) => setImportMode(value as "overwrite" | "append")}
                            >
                                <SelectTrigger className="sm:flex hidden">
                                    <SelectValue placeholder="Select import mode" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="append">Add new stations only</SelectItem>
                                    <SelectItem value="overwrite">Overwrite existing list</SelectItem>
                                </SelectContent>
                            </Select>
                            <div className="flex space-x-2">
                                <Button onClick={handleConfirmImport} className="flex-1">
                                    Confirm Import
                                </Button>
                                <Button onClick={handleCancelImport} variant="outline" className="flex-1">
                                    Cancel Import
                                </Button>
                            </div>
                        </div>
                    )}

                    {isImporting && (
                        <div className="text-center space-y-4">
                            <p className="flex items-center justify-center">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Importing favorites...
                            </p>
                            <Button onClick={handleCancelImport} variant="outline">
                                Cancel Import
                            </Button>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default FavoritesImportExport;
