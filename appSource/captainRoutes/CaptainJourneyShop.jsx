import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";
import captainJourneyShop from "../captainConstants/captainJourneyShop";

const CaptainJourneyShop = () => {
    const navigation = useNavigation();
    const [points, setPoints] = useState(0);
    const [unlockedStories, setUnlockedStories] = useState([]);

    useEffect(() => {
        getPoints();
        getUnlockedStories();
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getPoints();
            getUnlockedStories();
        });

        return unsubscribe;
    }, [navigation]);

    const getPoints = async () => {
        try {
            const storedPoints = await AsyncStorage.getItem('CAPTAIN_JOURNEY_POINTS');
            if (storedPoints !== null) {
                setPoints(parseInt(storedPoints));
            }
        } catch (error) {
            Alert.alert('Error', 'Cannot retrie points');
        }
    };

    const getUnlockedStories = async () => {
        try {
            const stored = await AsyncStorage.getItem('UNLOCKED_CAPTAIN_JOURNEYS');
            const unlockedArray = stored ? JSON.parse(stored) : [];
            setUnlockedStories(unlockedArray);
        } catch (error) {
            Alert.alert('Error', 'Could not load unlocked stories');
        }
    };

    const unlockCaptainStory = async (item) => {
        try {
            const storedPoints = await AsyncStorage.getItem('CAPTAIN_JOURNEY_POINTS');
            const currentPoints = storedPoints ? parseInt(storedPoints) : 0;

            if (currentPoints < 30) {
                Alert.alert('Not enough points');
                return;
            }

            const updatedPoints = currentPoints - 30;
            await AsyncStorage.setItem('CAPTAIN_JOURNEY_POINTS', updatedPoints.toString());
            setPoints(updatedPoints);

            const stored = await AsyncStorage.getItem('UNLOCKED_CAPTAIN_JOURNEYS');
            const unlockedArray = stored ? JSON.parse(stored) : [];

            const newUnlocked = [...unlockedArray, item.title];
            await AsyncStorage.setItem('UNLOCKED_CAPTAIN_JOURNEYS', JSON.stringify(newUnlocked));
            setUnlockedStories(newUnlocked);

        } catch (error) {
            Alert.alert('Error', 'Could not unlock story');
        }
    };

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>

            <View style={[styles.row, {marginBottom: 41}]}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        source={require('../pastAssets/routeIcons/arrowBtn.png')}
                        style={styles.backButton}
                    />
                </TouchableOpacity>
                <Text style={styles.routeName}>Shop</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end'}}>
                    <Image
                        source={require('../pastAssets/captainJourney/point.png')}
                        style={{ width: 25, height: 25, resizeMode: 'contain', marginRight: 10 }}
                    />
                    <Text style={styles.points}>{points}</Text>
                </View>
            </View>

            <ScrollView style={{ width: '100%' }}>

                {
                    captainJourneyShop.map((item, index) => (
                        <View key={index} style={[styles.outerCard, index !== 0 && { marginTop: -70, zIndex: 12 }]}>
                            {
                                !unlockedStories.includes(item.title) && (
                                    <View style={{
                                        width: '100%',
                                        height: 187,
                                        borderRadius: 32,
                                        backgroundColor: 'rgba(0, 0, 0, 0.9)',
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        zIndex: 10
                                }}>
                                        <View style={[styles.row, {alignItems: 'center', justifyContent: 'flex-end', padding: 10}]}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 22}}>
                                                <Text style={styles.points}>30</Text>
                                                <Image
                                                    source={require('../pastAssets/captainJourney/point.png')}
                                                    style={{ width: 25, height: 25, resizeMode: 'contain', marginLeft: 10 }}
                                                />
                                            </View>
                                            <TouchableOpacity
                                                style={[points < 30 && {opacity: 0.5}]}
                                                onPress={() => unlockCaptainStory(item)}
                                                disabled={points < 30}
                                            >
                                                <Image
                                                    source={require('../pastAssets/captainJourney/unlockBtn.png')}
                                                    style={{ width: 105, height: 60, resizeMode: 'contain' }}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )
                            }
                            <LinearGradient colors={['#BA4603', '#FB9301']} style={styles.gradient}>
                                <View style={styles.innerCard}>

                                    <View style={[styles.row, {alignItems: 'center'}]}>
                                        <Text style={styles.itemTitle}>{item.title}</Text>

                                        <TouchableOpacity onPress={() => navigation.navigate('ReadCaptainJourneyStoryRoute', { item })}>
                                            <Image
                                                source={require('../pastAssets/routeIcons/arrowBtn.png')}
                                                style={{ width: 27, height: 21, resizeMode: 'contain' }}
                                            />
                                        </TouchableOpacity>
                                    </View>

                                    <Text style={styles.itemAbout}>{item.about}</Text>
                                    
                                </View>
                            </LinearGradient>
                        </View>
                    ))
                }

                <View style={{height: 200}} />
                
            </ScrollView>

        </View>
    )
};

const styles = StyleSheet.create({

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
        alignItems: 'flex-start',
    },

    routeName: {
        fontSize: 26,
        lineHeight: 28,
        fontWeight: '400',
        fontStyle: 'italic',
        color: '#fff',
        width: '70%',
        textAlign: 'center'
    },

    points: {
        fontSize: 24,
        fontWeight: '400',
        fontStyle: 'italic',
        color: '#BA4603',
        lineHeight: 26,
    },

    outerCard: {
        width: '100%',
        height: 187,
        borderRadius: 32
    },

    gradient: {
        width: '100%',
        height: '100%',
        borderRadius: 32
    },

    innerCard: {
        width: '100%',
        paddingVertical: 17,
        paddingHorizontal: 20
    },

    itemTitle: {
        fontSize: 26,
        lineHeight: 28,
        fontWeight: '400',
        fontStyle: 'italic',
        color: '#fff',
        width: '80%',
        textAlign: 'flex-start'
    },

    itemAbout: {
        fontSize: 15,
        fontWeight: '300',
        fontStyle: 'italic',
        color: '#fff',
        marginTop: 18
    },

})

export default CaptainJourneyShop;