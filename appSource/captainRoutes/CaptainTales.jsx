import React, { useState, useCallback } from "react";
import { View, Text, Image, TouchableOpacity, Dimensions, StyleSheet, ScrollView } from "react-native"
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LinearGradient from "react-native-linear-gradient";
import captainTales from "../captainConstants/captainTales";

const { height } = Dimensions.get('window');

const CaptainTales = () => {
    const navigation = useNavigation();
    const [captainStep, setCaptainStep] = useState(0);
    const [pinnedTales, setPinnedTales] = useState([]);

    useFocusEffect(
        useCallback(() => {
            const loadPinned = async () => {
            try {
                const stored = await AsyncStorage.getItem('PINNED_CAPTAIN_TALES');
                if (stored) {
                setPinnedTales(JSON.parse(stored));
                }
            } catch (e) {
                console.error('Failed to load pinned tales:', e);
            }
            };
            loadPinned();
        }, [])
    );


    const captainPinTale = async (tale) => {
        try {
            let updated = [...pinnedTales];
            const index = updated.findIndex((t) => t.name === tale.name);

            if (index !== -1) {
                updated.splice(index, 1);
            } else {
                updated.unshift(tale);
            }

            setPinnedTales(updated);
            await AsyncStorage.setItem('PINNED_CAPTAIN_TALES', JSON.stringify(updated));
        } catch (e) {
            console.error('Failed to toggle pinned tale:', e);
        }
    };


    const isPinned = (tale) => {
        return pinnedTales.some((t) => t.name === tale.name);
    };

    const combinedTales = [
        ...pinnedTales,
        ...captainTales.filter(t => !isPinned(t))
    ];

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>

            <Image
                source={require('../pastAssets/routeNames/captainTales.png')}
                style={{ width: '100%', height: 40, resizeMode: 'contain', marginBottom: 24 }}
            />

            {
                captainStep === 0 && (
                    <ScrollView style={{ width: '100%' }}>
                        
                        <View style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', width: '100%', marginTop: height * 0.06}}>
                            <View style={{width: '73%'}}>
                                <Text style={styles.aboutText}>
                                    This is an archive of failures: ⚔️ battles lost, 🌍 expeditions that ended in disaster, and ⚖️ fateful decisions.
                                    You’ll explore the reasons for the failures, their context, and consequences.
                                    Every fall leaves a lesson worth learning. 📚
                                </Text>
                                <Text style={[styles.aboutText, {marginBottom: 20}]}>
                                    Every fall leaves a lesson worth learning. 📚
                                </Text>
                                <Text style={styles.aboutText}>
                                    📜 Study the mistakes.
                                </Text>
                                <Text style={styles.aboutText}>
                                    Understand the causes.
                                </Text>
                                <Text style={styles.aboutText}>
                                    Draw the lessons. 💡
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
                    <Text style={styles.yellowText}>When captains faced defeat — we learn to win.</Text>
                )
            }

            {
                captainStep === 1 && (
                    <ScrollView style={{ width: '100%' }}>

                        {
                            combinedTales.map((tale, index) => (
                                <View key={index} style={[styles.outerCard, index !== 0 && {marginTop: -90}]}>
                                    <LinearGradient colors={['#BA4603', '#FB9301']} style={styles.gradient}>
                                        <View style={styles.innerCard}>

                                            <TouchableOpacity onPress={() => captainPinTale(tale)}>
                                                <Image
                                                    source={isPinned(tale) ?
                                                        require('../pastAssets/routeIcons/pinned.png')
                                                        : require('../pastAssets/routeIcons/pin.png')}
                                                    style={{width: 22, height: 22, resizeMode: 'contain'}}
                                                />
                                            </TouchableOpacity>

                                            <Text style={styles.taleName}>{tale.name}</Text>

                                            <TouchableOpacity onPress={() => navigation.navigate('ReadCaptainTaleRoute', { tale })}>
                                                <Image
                                                    source={require('../pastAssets/routeIcons/arrowBtn.png')}
                                                    style={{ width: 27, height: 21, resizeMode: 'contain' }}
                                                />
                                            </TouchableOpacity>
                                            
                                        </View>
                                    </LinearGradient>
                                </View>
                            ))
                        }

                        <View style={{height: 200}} />
                        
                    </ScrollView>
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

    yellowText: {
        fontSize: 15,
        fontWeight: '200',
        fontStyle: 'italic',
        color: '#FFDC74',
        marginBottom: 17,
        alignSelf: 'flex-start'
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
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        paddingVertical: 17,
        paddingHorizontal: 20
    },

    taleName: {
        fontSize: 26,
        lineHeight: 28,
        fontWeight: '400',
        fontStyle: 'italic',
        color: '#fff',
        width: '70%',
        textAlign: 'center'
    }

})

export default CaptainTales;