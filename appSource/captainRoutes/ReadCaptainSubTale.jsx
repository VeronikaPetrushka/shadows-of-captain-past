import { View, Text, Image, TouchableOpacity, Dimensions, StyleSheet, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native";

const { height } = Dimensions.get('window');

const ReadCaptainSubTale = ({ tale, name }) => {
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
                <Text style={styles.taleName}>{name}</Text>
                <View style={{ width: 27, height: 21 }} />
            </View>

            <Image source={tale.image} style={styles.mainTaleImage} />

            <ScrollView style={{width: '100%'}}>
                {
                    tale.tale.map((taleText, idx) => (
                        <Text key={idx} style={styles.taleText}>{taleText}</Text>
                    ))
                }
            </ScrollView>
            
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
        transform: [{ rotate: '180deg' }]
    },

    row: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 41
    },

    taleText: {
        fontSize: 16,
        fontWeight: '400',
        color: '#fff',
        lineHeight: 21,
        marginBottom: 20
    },

    mainTaleImage: {
        width: '100%',
        height: 235,
        resizeMode: 'contain',
        marginBottom: 20
    },

})

export default ReadCaptainSubTale;