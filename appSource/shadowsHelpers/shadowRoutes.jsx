import RouteWrapper from "./RouteWrapper";
import ShadowsAnimation from "../captainRoutes/ShadowsAnimation";
import AboutCaptain from "../captainRoutes/AboutCaptain";
import CaptainTales from "../captainRoutes/CaptainTales";
import ReadCaptainTale from "../captainRoutes/ReadCaptainTale";
import ReadCaptainSubTale from "../captainRoutes/ReadCaptainSubTale";
import CaptainTaleMap from "../captainRoutes/CaptainTaleMap";
import CaptainSettings from "../captainRoutes/CaptainSettings";

export const ShadowsAnimationRoute = () => {
    return (
        <RouteWrapper children={<ShadowsAnimation />} />
    )
};

export const AboutCaptainRoute = () => {
    return (
        <RouteWrapper children={<AboutCaptain />} />
    )
};

export const CaptainTalesRoute = () => {
    return (
        <RouteWrapper children={<CaptainTales />} capitanPanel={true} />
    )
};

export const ReadCaptainTaleRoute = ({ route }) => {
    const { tale } = route.params;

    return (
        <RouteWrapper children={<ReadCaptainTale tale={tale} />} />
    )
};

export const ReadCaptainSubTaleRoute = ({ route }) => {
    const { tale, name } = route.params;

    return (
        <RouteWrapper children={<ReadCaptainSubTale tale={tale} name={name} />} />
    )
};

export const CaptainTaleMapRoute = ({ route }) => {
    const { tale } = route.params;

    return (
        <RouteWrapper children={<CaptainTaleMap tale={tale} />} />
    )
};

export const CaptainSettingsRoute = () => {
    return (
        <RouteWrapper children={<CaptainSettings />} capitanPanel={true} />
    )
};