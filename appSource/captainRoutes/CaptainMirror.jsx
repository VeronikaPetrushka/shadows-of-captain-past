import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, Dimensions, StyleSheet, ScrollView, TextInput, Alert } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";
import captainMirror from "../captainConstants/captainMirror";

const { height } = Dimensions.get('window');

const CaptainMirror = () => {
    const navigation = useNavigation();
    const [captainStep, setCaptainStep] = useState(0);
    const [randomMirror, setRandomMirror] = useState(null);
    const [selectedMove, setSelectedMove] = useState({option: null, meaning: null});
    const [actDescription, setActDescription] = useState(null);

    const pickRandomMirror = () => {
        const randomIndex = Math.floor(Math.random() * captainMirror.length);
        const selectedMirror = captainMirror[randomIndex];
        setRandomMirror(selectedMirror);
    };

    const saveMirrorSituation = async () => {
        try {
            const newEntry = {
                id: Date.now(),
                mirror: randomMirror,
                selectedMove,
                actDescription,
            };

            const existing = await AsyncStorage.getItem('CAPTAIN_SAVED_MIRRORS');
            const parsed = existing ? JSON.parse(existing) : [];

            const updated = [newEntry, ...parsed];

            await AsyncStorage.setItem('CAPTAIN_SAVED_MIRRORS', JSON.stringify(updated));

            setRandomMirror(null);
            setSelectedMove({ option: null, meaning: null });
            setActDescription(null);
            setCaptainStep(0);

            navigation.navigate('CaptainSavedSituationsRoute');

        } catch (e) {
            Alert.alert('Error', 'Failed to save mirror situation');
        }
    };

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>

            {
                captainStep === 0 && (
                    <View style={[styles.row, {marginBottom: 24}]}>
                        <TouchableOpacity onPress={() => navigation.navigate('CaptainSavedSituationsRoute')}>
                            <Image
                                source={require('../pastAssets/routeIcons/savedSituations.png')}
                                style={{ width: 23, height: 21, resizeMode: 'contain' }}
                            />
                        </TouchableOpacity>
                        <Image
                            source={require('../pastAssets/routeNames/captainMirror.png')}
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
                                    🧭 Sometimes you need to pause and ask yourself: what kind of captain are you?
                                </Text>
                                <Text style={styles.aboutText}>
                                    Here, you don’t analyze others — you look into your own reflection 🪞.
                                </Text>
                                <Text style={styles.aboutText}>
                                    Through short, atmospheric situations 🌫️, you choose who you resonate with most — a 🧠 Strategist, a ❤️ Heartfelt Leader, or a 🔥 Rebel — and then describe what you would do ✍️.This isn’t a game 🎲. It’s the calm between storms 🌊.
                                </Text>
                                <Text style={styles.aboutText}>
                                    A personal space for self-understanding 🛶.
                                </Text>
                            </View>
                            <TouchableOpacity onPress={() => { pickRandomMirror(); setCaptainStep(1); }}>
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
                    <View style={[styles.row, {marginBottom: 24}]}>
                        <TouchableOpacity onPress={() => setCaptainStep(0)}>
                            <Image
                                source={require('../pastAssets/routeIcons/arrowBtn.png')}
                                style={styles.backButton}
                            />
                        </TouchableOpacity>
                        <Text style={styles.topicName}>{randomMirror.topic}</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('CaptainMirrorImageRoute', {mirror: randomMirror})}>
                            <Image
                                source={require('../pastAssets/routeIcons/mirrorImage.png')}
                                style={{width: 27,
                                    height: 21,
                                    resizeMode: 'contain'
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                )
            }  

            {
                captainStep === 1 && (
                    <ScrollView style={{ width: '100%' }}>

                        <Text style={[styles.aboutText, {fontWeight: 600}]}>📌 Situation:</Text>
                        <Text style={[styles.aboutText, {marginBottom: 30}]}>{randomMirror.situation}</Text>

                        <Text style={styles.yellowText}>Question:</Text>
                        <Text style={[styles.yellowText, { marginBottom: 30 }]}>{randomMirror.question}</Text>
                        
                        {
                            randomMirror.move.map((option, index) => (
                                <View key={index} style={{width: '100%', marginBottom: 43, alignItems: 'center'}}>
                                    <TouchableOpacity
                                        style={styles.optionBtn}
                                        onPress={() => { (selectedMove &&
                                            selectedMove.option === option.option) ?
                                                setSelectedMove(null)
                                                : setSelectedMove({option: option.option, meaning: option.meaning})
                                        }}
                                    >
                                        {
                                            (selectedMove && selectedMove.option === option.option) && (
                                                <LinearGradient
                                                    colors={['#BA4603', '#FB9301']}
                                                    style={styles.gradient}
                                                />
                                            )
                                        }
                                        <Text style={styles.optionText}>{option.option}</Text>
                                    </TouchableOpacity>
                                    <Text style={[styles.yellowText, {fontWeight: '100', textAlign: 'right', alignSelf: 'flex-end'}]}>{option.meaning}</Text>
                                </View>
                            ))
                        }

                        <Text style={[styles.aboutText, { marginBottom: 30 }]}>{randomMirror.finalQuestion}</Text>
                        
                        <TextInput
                            style={[styles.actInput, {borderColor: actDescription ? '#FB9301' : '#BA4603'} ]}
                            value={actDescription}
                            onChangeText={setActDescription}
                            placeholder="Text"
                            placeholderTextColor={'#fff'}
                            multiline
                        />

                        <TouchableOpacity
                            style={[styles.optionBtn,
                                {
                                    backgroundColor: (selectedMove && actDescription) ? 'transparent' : '#4e4e4e',
                                    borderColor: (selectedMove && actDescription) ? '#BA4603' : '#4e4e4e',
                                    alignSelf: 'center'
                             }]}
                            onPress={saveMirrorSituation}
                            disabled={!selectedMove || !actDescription}
                        >
                            {
                                (selectedMove && actDescription) && (
                                    <LinearGradient
                                        colors={['#BA4603', '#FB9301']}
                                        style={styles.gradient}
                                    />
                                )
                            }
                            <Text style={styles.optionText}>Save</Text>
                        </TouchableOpacity>

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
        alignSelf: 'flex-start'
    },

    gradient: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
        position: 'absolute',
        top: 0,
        left: 0
    },

    topicName: {
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

    optionBtn: {
        width: 247,
        height: 50,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        borderWidth: 2,
        borderColor: '#BA4603'
    },

    optionText: {
        fontSize: 20,
        fontWeight: '800',
        color: '#fff',
        zIndex: 10
    },

    actInput: {
        width: '100%',
        minHeight: 176,
        borderRadius: 22,
        borderWidth: 2,
        padding: 20,
        color: '#fff',
        fontSize: 16,
        lineHeight: 21,
        fontWeight: '400',
        fontStyle: 'italic',
        marginBottom: 30
    }

})

export default CaptainMirror;