import React, { useState, useCallback } from "react";
import { View, Text, Image, TouchableOpacity, Dimensions, StyleSheet, ScrollView } from "react-native"
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LinearGradient from "react-native-linear-gradient";

const { height } = Dimensions.get('window');

const ship = require('../pastAssets/captainJourney/ship.png');
const point = require('../pastAssets/captainJourney/point.png');
const obstacles = [
    require('../pastAssets/captainJourney/obstacles/crash.png'),
    require('../pastAssets/captainJourney/obstacles/island.png'),
    require('../pastAssets/captainJourney/obstacles/rock.png'),
];

const CaptainJourney = () => {
    const navigation = useNavigation();
    const [captainStep, setCaptainStep] = useState(0);
    const [points, setPoints] = useState(0);

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>

            {
                captainStep === 0 && (
                    <View style={[styles.row, {marginBottom: 24}]}>
                        <TouchableOpacity onPress={() => navigation.navigate('CaptainJourneyShop')}>
                            <Image
                                source={require('../pastAssets/routeIcons/captainShop.png')}
                                style={{ width: 22, height: 20, resizeMode: 'contain' }}
                            />
                        </TouchableOpacity>
                        <Image
                            source={require('../pastAssets/routeNames/captainJourney.png')}
                            style={{ width: 259, height: 40, resizeMode: 'contain' }}
                        />
                        <View style={{ width: 27, height: 21 }} />
                    </View>
                )
            }       

            {
                captainStep === 0 && (
                    <ScrollView style={{ width: '100%' }}>
                        
                        <View style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', width: '100%', marginTop: height * 0.06}}>
                            <View style={{width: '73%'}}>
                                <Text style={styles.aboutText}>
                                    You are the captain of your ship, and ahead of you lie storms 🌩️ and obstacles ⛵! Your journey is filled with dangers ⚔️, but the reward for each mile you conquer is unique stories 📖 about great captains of the past.
                                </Text>
                            </View>
                            <TouchableOpacity onPress={() => setCaptainStep(1)}>
                                <Image
                                    source={require('../pastAssets/appDecor/nextBtn.png')}
                                    style={{ width: 60, height: 60, resizeMode: 'contain' }}
                                />
                            </TouchableOpacity>
                        </View>

                        <Image
                            source={require('../pastAssets/animationElements/ship.png')}
                            style={{ width: 217, height: height * 0.25, resizeMode: 'contain', marginTop: height * 0.06, alignSelf: 'center' }}
                        />

                        <View style={{height: 200}} />

                    </ScrollView>
                )
            }

            {
                captainStep === 1 && (
                    <View style={{ width: '100%', flexGrow: 1, paddingBottom: 150 }}>
                        
                        <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end', marginBottom: height * 0.05 }}>
                            <Image
                                source={point}
                                style={{ width: 25, height: 25, resizeMode: 'contain', marginRight: 10 }}
                            />
                            <Text style={styles.points}>{points}</Text>
                        </View>

                        {/* game area */}
                        <View style={{width: '100%', height: height * 0.7, borderWidth: 2, borderColor: '#BA4603'}}>

                        </View>

                    </View>
                )
            }

            
        </View>
    )
};

const styles = StyleSheet.create({

    row: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },

    aboutText: {
        fontSize: 15,
        fontWeight: '400',
        fontStyle: 'italic',
        color: '#fff',
        lineHeight: 21,
    },

    points: {
        fontSize: 24,
        fontWeight: '400',
        fontStyle: 'italic',
        color: '#BA4603',
        lineHeight: 26,
    }

})

export default CaptainJourney;