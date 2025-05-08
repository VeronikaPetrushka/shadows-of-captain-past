import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native";

const CaptainMirrorImage = ({ mirror }) => {
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>

            <View style={styles.row}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        source={require('../pastAssets/routeIcons/arrowBtn.png')}
                        style={styles.backButton}
                    />
                </TouchableOpacity>
                <Text style={styles.mirrorTopic}>{mirror.topic}</Text>
                <View style={{width: 27, height: 21}} />
            </View>

                
            <Image source={mirror.image} style={styles.mirrorImage} />

        </View>
    )
};

const styles = StyleSheet.create({

    mirrorTopic: {
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
        marginBottom: 41
    },

    mirrorImage: {
        width: 353,
        height: 207,
        resizeMode: 'contain',
    }

})

export default CaptainMirrorImage;