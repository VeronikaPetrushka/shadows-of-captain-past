import { View, Dimensions } from "react-native";
import CaptainPanel from "./CaptainPanel";

const { height } = Dimensions.get('window');

const RouteWrapper = ({ children, capitanPanel }) => {
    return (
        <View style={{ flex: 1, backgroundColor: '#000' }}>

            <View
                style={{
                    width: '100%',
                    height: '100%',
                    paddingHorizontal: 20,
                    paddingTop: height * 0.08
                }}>
                {children}
            </View>

            {
                capitanPanel && (
                    <View
                        style={{
                            width: '100%',
                            position: 'absolute',
                            alignSelf: 'center',
                            bottom: 35
                        }}>
                        <CaptainPanel />
                    </View>
                )
            }

        </View>
    )
};

export default RouteWrapper;