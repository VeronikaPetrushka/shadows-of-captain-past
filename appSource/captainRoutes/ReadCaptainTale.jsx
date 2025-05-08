import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native"
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const ReadCaptainTale = ({ tale }) => {
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
                <Text style={styles.taleName}>{tale.name}</Text>
                <TouchableOpacity onPress={() => navigation.navigate('CaptainTaleMapRoute', { tale })}>
                    <Image
                        source={require('../pastAssets/routeIcons/map.png')}
                        style={{ width: 27, height: 21, resizeMode: 'contain' }}
                    />
                </TouchableOpacity>
            </View>

            <View style={{ width: '100%', height: 235, marginBottom: 20 }}>
                
                <Image source={tale.mainImage} style={styles.mainTaleImage} />

                <View style={styles.talesBtnContainer}>

                    <TouchableOpacity
                        style={[styles.taleBtn, {marginBottom: 20}]}
                        onPress={() => navigation.navigate('ReadCaptainSubTaleRoute', { tale: tale.subTale[0], name: tale.name })}
                    >
                        <LinearGradient colors={['#BA4603', '#FB9301']} style={styles.gradient}>
                            <View style={styles.taleBtnInner}>
                                <Text style={styles.taleBtnText}>What Failed</Text>
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.taleBtn}
                        onPress={() => navigation.navigate('ReadCaptainSubTaleRoute', { tale: tale.subTale[1], name: tale.name })}
                    >
                        <LinearGradient colors={['#BA4603', '#FB9301']} style={styles.gradient}>
                            <View style={styles.taleBtnInner}>
                                <Text style={styles.taleBtnText}>Aftermath</Text>
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>

                </View>

            </View>

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

    taleText: {
        fontSize: 16,
        fontWeight: '400',
        color: '#fff',
        lineHeight: 21,
        marginBottom: 20
    },

    mainTaleImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },

    talesBtnContainer: {
        position: 'absolute',
        right: 0,
        top: 58
    },

    taleBtn: {
        width: 98,
        height: 50,
        borderRadius: 14
    },

    gradient: {
        width: '100%',
        height: '100%',
        borderRadius: 14
    },

    taleBtnInner: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },

    taleBtnText: {
        fontSize: 14,
        fontWeight: '800',
        color: '#fff',
    }

})

export default ReadCaptainTale;