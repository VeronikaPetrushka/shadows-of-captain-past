import { View, Text, Image, TouchableOpacity, Dimensions, StyleSheet, Share } from "react-native"
import { useNavigation } from "@react-navigation/native";

const { height } = Dimensions.get('window');

const CaptainTaleMap = ({ tale }) => {
    const navigation = useNavigation();

    const shareCaptainTale = async () => {
        try {
            const message = `${tale.name}\n\n${tale.tale.join('\n\n')}`;

            await Share.share({
                message,
            });
        } catch (error) {
            console.error('Error sharing tale:', error);
        }
    };

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>

            <View style={styles.row}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        source={require('../pastAssets/routeIcons/arrowBtn.png')}
                        style={styles.backButton}
                    />
                </TouchableOpacity>
                <Text style={styles.taleName}>Map</Text>
                <TouchableOpacity onPress={shareCaptainTale}>
                    <Image
                        source={require('../pastAssets/routeIcons/share.png')}
                        style={{ width: 21, height: 21, resizeMode: 'contain' }}
                    />
                </TouchableOpacity>
            </View>

            <View style={{ width: '100%', height: height * 0.72 }}>
                
                <Image source={require('../pastAssets/appDecor/captainMap.png')} style={styles.map} />

                {
                    tale.map.map((item, idx) => (
                        <View key={idx} style={{position: 'absolute', top: height * item.position.top, left: item.position.left, flexDirection: 'row', alignItems: 'flex-end'}}>
                            <Image source={require('../pastAssets/routeIcons/mapMarker.png')} style={styles.marker} />
                            <Image source={item.image} style={{width: 123, height: 81, resizeMode: 'contain'}} />
                        </View>
                    ))
                }

            </View>
            
        </View>
    )
};

const styles = StyleSheet.create({

    taleName: {
        fontSize: 26,
        lineHeight: 28,
        fontWeight: '400',
        fontStyle: 'italic',
        color: '#fff',
        width: '70%',
        textAlign: 'center'
    },

    backButton: {
        width: 27,
        height: 21,
        resizeMode: 'contain',
        tintColor: '#E95205',
        transform: [{ rotate: '180deg' }],
        zIndex: 10
    },

    row: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
    },

    map: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },

    marker: {
        width: 37,
        height: 34,
        resizeMode: 'contain',
        marginRight: 10
    }

})

export default CaptainTaleMap;