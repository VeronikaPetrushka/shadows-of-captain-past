import RouteWrapper from "./RouteWrapper";
import ShadowsAnimation from "../captainRoutes/ShadowsAnimation";
import AboutCaptain from "../captainRoutes/AboutCaptain";
import CaptainTales from "../captainRoutes/CaptainTales";
import ReadCaptainTale from "../captainRoutes/ReadCaptainTale";
import ReadCaptainSubTale from "../captainRoutes/ReadCaptainSubTale";
import CaptainTaleMap from "../captainRoutes/CaptainTaleMap";
import CaptainSettings from "../captainRoutes/CaptainSettings";
import LeadershipQuoutes from "../captainRoutes/LeadershipQuoutes";
import ReadLeadershipQuoute from "../captainRoutes/ReadLeadershipQuoute";
import CaptainMirror from "../captainRoutes/CaptainMirror";
import CaptainMirrorImage from "../captainRoutes/CaptainMirrorImage";
import CaptainSavedSituations from "../captainRoutes/CaptainSavedSituations";
import CaptainJourney from "../captainRoutes/CaptainJourney";
import CaptainJourneyShop from "../captainRoutes/CaptainJourneyShop";
import ReadCaptainJourneyStory from "../captainRoutes/ReadCaptainJourneyStory";

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

export const LeadershipQuoutesRoute = () => {
    return (
        <RouteWrapper children={<LeadershipQuoutes />} capitanPanel={true} />
    )
};

export const ReadLeadershipQuouteRoute = ({ route }) => {
    const { quoute } = route.params;

    return (
        <RouteWrapper children={<ReadLeadershipQuoute quoute={quoute} />} />
    )
};

export const CaptainMirrorRoute = () => {
    return (
        <RouteWrapper children={<CaptainMirror />} capitanPanel={true} />
    )
};

export const CaptainMirrorImageRoute = ({ route }) => {
    const { mirror } = route.params;

    return (
        <RouteWrapper children={<CaptainMirrorImage mirror={mirror} />} />
    )
};

export const CaptainSavedSituationsRoute = () => {
    return (
        <RouteWrapper children={<CaptainSavedSituations />} />
    )
};

export const CaptainJourneyRoute = () => {
    return (
        <RouteWrapper children={<CaptainJourney />} capitanPanel={true} />
    )
};

export const CaptainJourneyShopRoute = () => {
    return (
        <RouteWrapper children={<CaptainJourneyShop />} />
    )
};

export const ReadCaptainJourneyStoryRoute = ({ route }) => {
    const { item } = route.params;

    return (
        <RouteWrapper children={<ReadCaptainJourneyStory item={item} />} />
    )
};