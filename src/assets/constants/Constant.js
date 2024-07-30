/**
 *  @description This file contains all system constants.
 */

const cdnLink = import.meta.env.VITE_CDN_LINK;
export const apiBaseURL = import.meta.env.VITE_BASE_URL;
export const googlePlacesApiKey = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;

// Google place api
export const googlePlacesApiUrl = "https://places.googleapis.com/v1/places:searchNearby"

// Miscellaneous images
export const FallbackIcon = `${cdnLink}/images/fallback.avif`;

export const Logo = `${cdnLink}/images/png/future-path.png`;
export const BackgroundImage = `${cdnLink}/images/png/landing-bg.png`;

export const ExamIcon = `${cdnLink}/images/svg/exam.svg`;
export const AcademicIcon = `${cdnLink}/images/svg/academic.svg`;
export const ComputerIcon = `${cdnLink}/images/svg/computer.svg`;
export const CareerIcon = `${cdnLink}/images/svg/flag.svg`;
export const SendIcon = `${cdnLink}/images/svg/send.svg`;
export const CopyIcon = `${cdnLink}/images/svg/copy.svg`;
export const SpeakIcon = `${cdnLink}/images/svg/speak.svg`;
export const MuteIcon = `${cdnLink}/images/svg/mute.svg`;
export const OpenXcell = `${cdnLink}/images/svg/OpenXcell.svg`;
export const RedHeart = `${cdnLink}/images/svg/red-heart.svg`;
export const MapIcon = `${cdnLink}/images/svg/map.svg`;
export const WebsiteIcon = `${cdnLink}/images/svg/website.svg`;

export const LoadingIcon = `${cdnLink}/images/gif/loading.gif`;

// Chat types
export const CHAT_TYPE = {
    USER: "USER",
    SYSTEM: "SYSTEM"
}

// Suggestion types
export const SUGGESTION_TYPE = {
    GOOGLE_MAP: "GOOGLE_MAP",
    UPLOAD: "UPLOAD"
}
