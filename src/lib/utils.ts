import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const COUNTRY_CODES: { [key: string]: string } = {
    US: "The United States Of America",
    DE: "Germany",
    RU: "The Russian Federation",
    FR: "France",
    GR: "Greece",
    CN: "China",
    GB: "The United Kingdom Of Great Britain And Northern Ireland",
    AU: "Australia",
    MX: "Mexico",
    IT: "Italy",
    CA: "Canada",
    IN: "India",
    ES: "Spain",
    BR: "Brazil",
    PL: "Poland",
    AR: "Argentina",
    NL: "The Netherlands",
    PH: "The Philippines",
    AE: "The United Arab Emirates",
    UG: "Uganda",
    CH: "Switzerland",
    RO: "Romania",
    CO: "Colombia",
    TR: "Turkey",
    ID: "Indonesia",
    BE: "Belgium",
    CL: "Chile",
    RS: "Serbia",
    AT: "Austria",
    UA: "Ukraine",
    HU: "Hungary",
    PE: "Peru",
    CZ: "Czechia",
    PT: "Portugal",
    BG: "Bulgaria",
    HR: "Croatia",
    DK: "Denmark",
    NZ: "New Zealand",
    IE: "Ireland",
    SE: "Sweden",
    JP: "Japan",
    EC: "Ecuador",
    SK: "Slovakia",
    UY: "Uruguay",
    AF: "Afghanistan",
    SA: "Saudi Arabia",
    NO: "Norway",
    ZA: "South Africa",
    MY: "Malaysia",
    BA: "Bosnia And Herzegovina",
    VE: "Bolivarian Republic Of Venezuela",
    GI: "Gibraltar",
    FI: "Finland",
    DO: "The Dominican Republic",
    SI: "Slovenia",
    IL: "Israel",
    TH: "Thailand",
    KE: "Kenya",
    MA: "Morocco",
    EE: "Estonia",
    TW: "Taiwan Province Of China",
    KR: "The Republic Of Korea",
    LT: "Lithuania",
    TN: "Tunisia",
    BO: "Bolivia",
    LV: "Latvia",
    GT: "Guatemala",
    LK: "Sri Lanka",
    DZ: "Algeria",
    BY: "Belarus",
    PK: "Pakistan",
    HK: "Hong Kong",
    NG: "Nigeria",
    CR: "Costa Rica",
    IR: "Islamic Republic Of Iran",
    EG: "Egypt",
    ME: "Montenegro",
    MK: "Republic Of North Macedonia",
    CU: "Cuba",
    HN: "Honduras",
    PY: "Paraguay",
    LB: "Lebanon",
    SN: "Senegal",
    AL: "Albania",
    KZ: "Kazakhstan",
    SV: "El Salvador",
    CY: "Cyprus",
    VN: "Vietnam",
    MD: "The Republic Of Moldova",
    SG: "Singapore",
    ET: "Ethiopia",
    PR: "Puerto Rico",
    JM: "Jamaica",
    MO: "Macao",
    LU: "Luxembourg",
    GE: "Georgia",
    NP: "Nepal",
    TZ: "United Republic Of Tanzania",
    IQ: "Iraq",
    JO: "Jordan",
    SY: "Syrian Arab Republic",
    NI: "Nicaragua",
    AZ: "Azerbaijan",
    CW: "Curacao",
    HT: "Haiti",
    GH: "Ghana",
    IS: "Iceland",
    XK: "Kosovo",
    BD: "Bangladesh",
    ML: "Mali",
    QA: "Qatar",
    RW: "Rwanda",
    NA: "Namibia",
    PA: "Panama",
    TT: "Trinidad And Tobago",
    BH: "Bahrain",
    CD: "The Democratic Republic Of The Congo",
    MT: "Malta",
    AO: "Angola",
    UZ: "Uzbekistan",
    KW: "Kuwait",
    AM: "Armenia",
    VA: "The Holy See",
    AQ: "Antarctica",
    AS: "American Samoa",
    AD: "Andorra",
    AW: "Aruba",
    BQ: "Bonaire",
    LY: "Libya",
    MG: "Madagascar",
    MU: "Mauritius",
    PF: "French Polynesia",
    RE: "Reunion",
    BB: "Barbados",
    CI: "Coted Ivoire",
    OM: "Oman",
    PS: "State Of Palestine",
    YE: "Yemen",
    BF: "Burkina Faso",
    MC: "Monaco",
    NE: "The Niger",
    AG: "Antigua And Barbuda",
    BM: "Bermuda",
    BS: "The Bahamas",
    FJ: "Fiji",
    GF: "French Guiana",
    KG: "Kyrgyzstan",
    LC: "Saint Lucia",
    SO: "Somalia",
    TM: "Turkmenistan",
    UM: "The United States Minor Outlying Islands",
    GD: "Grenada",
    KY: "The Cayman Islands",
    MQ: "Martinique",
    MW: "Malawi",
    NC: "New Caledonia",
    SR: "Suriname",
    BJ: "Benin",
    VI: "US Virgin Islands",
    ZM: "Zambia",
    ER: "Eritrea",
    GL: "Greenland",
    IO: "British Indian Ocean Territory",
    MZ: "Mozambique",
    SL: "Sierra Leone",
    SM: "San Marino",
    TG: "Togo",
    VC: "Saint Vincent And The Grenadines",
    ZW: "Zimbabwe",
    AI: "Anguilla",
    BW: "Botswana",
    BZ: "Belize",
    CM: "Cameroon",
    FO: "The Faroe Islands",
    GU: "Guam",
    GY: "Guyana",
    KN: "Saint Kitts And Nevis",
    KP: "The Democratic Peoples Republic Of Korea",
    LA: "The Lao Peoples Democratic Republic",
    MM: "Myanmar",
    BI: "Burundi",
    BN: "Brunei Darussalam",
    FK: "The Falkland Islands Malvinas",
    GP: "Guadeloupe",
    PG: "Papua New Guinea",
    SD: "The Sudan",
    TJ: "Tajikistan",
    YT: "Mayotte",
    AX: "Aland Islands",
    CF: "The Central African Republic",
    CG: "The Congo",
    CV: "Cabo Verde",
    DM: "Dominica",
    GQ: "Equatorial Guinea",
    IM: "Isle Of Man",
    KH: "Cambodia",
    LS: "Lesotho",
    MN: "Mongolia",
    PM: "Saint Pierre And Miquelon",
    ST: "Sao Tome And Principe",
    TF: "The French Southern Territories",
    CK: "The Cook Islands",
    GG: "Guernsey",
    GN: "Guinea",
    GW: "Guinea Bissau",
    KM: "The Comoros",
    LI: "Liechtenstein",
    MS: "Montserrat",
    NU: "Niue",
    PW: "Palau",
    SC: "Seychelles",
    SH: "Ascension And Tristan Da Cunha Saint Helena",
    SS: "South Sudan",
    SZ: "Eswatini",
    TC: "The Turks And Caicos Islands",
    TD: "Chad",
    TL: "Timor Leste",
    VG: "British Virgin Islands",
    VU: "Vanuatu",
    WF: "Wallis And Futuna",
};

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function concatenateFirstLetters(inputString: string) {
    const initialsArray = inputString
        .replace(/\d+/g, "")
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase());
    const result = initialsArray.join("");

    return result;
}

export const getCountryName = (countryCode: string): string => {
    const code = countryCode.toUpperCase();
    return COUNTRY_CODES[code] || countryCode;
};

export function handleImageError(channelName: string) {
    return "https://placehold.co/192?text=" + concatenateFirstLetters(channelName);
}

export function isMobileUserAgent() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
