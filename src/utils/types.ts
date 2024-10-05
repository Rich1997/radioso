export type IconProps = {
    size?: number;
    fill?: boolean;
};

export type ListItem = {
    to: string;
    label: string;
    icon: (isActive: boolean) => JSX.Element;
    count?: number;
};

export type Station = {
    stationuuid: string;
    name: string;
    url: string;
    url_resolved: string;
    homepage: string;
    favicon: string;
    tags: string;
    country: string;
    countrycode: string;
    state: string;
    language: string;
    votes: number;
    lastchangetime: string;
    codec: string;
    bitrate: number;
    hls: number;
    lastcheckok: number;
    lastchecktime: string;
    clickcount: number;
    clicktrend: number;
    ssl_error: number;
    geo_lat: number;
    geo_long: number;
    has_extended_info: boolean;
};
