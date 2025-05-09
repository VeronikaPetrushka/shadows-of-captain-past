import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Share, Dimensions, Alert } from "react-native"
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

const { height } = Dimensions.get('window');

const ReadCaptainJourneyStory = ({ item }) => {
    const navigation = useNavigation();
    const [index, setIndex] = useState(0);

    const shareCaptainJourney = async () => {
        try {
            const message = `${item.title}\n\n${item.story[index]}`;
            await Share.share({
                message,
            });
        } catch (error) {
            Alert.alert('Error', 'Cannot share the captain journey');
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
                <Text style={styles.taleName}>{item.title}</Text>
                <TouchableOpacity onPress={shareCaptainJourney}>
                    <Image
                        source={require('../pastAssets/routeIcons/share.png')}
                        style={{ width: 27, height: 21, resizeMode: 'contain' }}
                    />
                </TouchableOpacity>
            </View>

                
            <Image source={item.image[index]} style={styles.mainTaleImage} />

            <ScrollView style={{width: '100%'}}>
                <Text style={styles.taleText}>{item.story[index]}</Text>
            </ScrollView>

            <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'center', position: 'absolute', bottom: height * 0.05}}>
                <Text style={styles.nextBtnText}>{index === 2 ? 'Return to the shop' : 'Next'}</Text>
                <TouchableOpacity onPress={() => { index === 2 ? navigation.goBack() : setIndex((prev) => prev + 1)}}>
                    <Image source={require('../pastAssets/appDecor/nextBtn.png')} style={{width: 60, height: 60, resizeMode: 'contain'}} />
                </TouchableOpacity>
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
        height: 225,
        resizeMode: 'contain',
        marginBottom: 20
    },

    nextBtnText: {
        fontSize: 28,
        lineHeight: 30,
        fontWeight: '400',
        color: '#fff',
        marginRight: 12,
        width: 120,
        textAlign: 'center',
        fontStyle: 'italic'
    },

})

export default ReadCaptainJourneyStory;