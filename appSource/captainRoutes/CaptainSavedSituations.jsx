import React, { useState, useCallback } from "react";
import { View, Text, Image, TouchableOpacity, Dimensions, StyleSheet, ScrollView } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";

const { height } = Dimensions.get('window');

const CaptainSavedSituations = () => {
    const navigation = useNavigation();
    const [savedSituations, setSavedSituations] = useState([]);

    useFocusEffect(
        useCallback(() => {
            const loadSavedSituations = async () => {
            try {
                const stored = await AsyncStorage.getItem('CAPTAIN_SAVED_MIRRORS');
                if (stored) {
                const parsed = JSON.parse(stored);
                setSavedSituations(parsed);
                }
            } catch (e) {
                console.error('Failed to load saved mirror situations:', e);
            }
            };

            loadSavedSituations();
        }, [])
    );

    const deleteMirrorSituation = async (situationId) => {
        try {
            const updated = savedSituations.filter(item => item.id !== situationId);
            setSavedSituations(updated);
            await AsyncStorage.setItem('CAPTAIN_SAVED_MIRRORS', JSON.stringify(updated));
        } catch (e) {
            console.error('Failed to delete mirror situation:', e);
        }
    };

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>          

            <View style={[styles.row, {marginBottom: 24}]}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        source={require('../pastAssets/routeIcons/arrowBtn.png')}
                        style={styles.backButton}
                    />
                </TouchableOpacity>
                <Text style={styles.topicName}>Saved</Text>
                <View style={{width: 27, height: 21}} />
            </View>

            {
                savedSituations.length > 0 && (
                    <ScrollView style={{width: '100%'}}>
                        {
                            savedSituations.map((situation, index) => (
                                <View key={index} style={{ width: '100%', alignItems: 'center' }}>
                                    <Text style={[styles.topicName, {marginBottom: 30, fontSize: 22, color: '#FB9301'}]}>{situation.mirror.topic}</Text>
                                    <Text style={[styles.aboutText, {fontWeight: 600, alignSelf: 'flex-start'}]}>📌 Situation:</Text>
                                    <Text style={[styles.aboutText, {marginBottom: 30}]}>{situation.mirror.situation}</Text>

                                    <Text style={styles.yellowText}>Question:</Text>
                                    <Text style={[styles.yellowText, { marginBottom: 30 }]}>{situation.mirror.question}</Text>
                                    
                                    <View style={styles.optionBtn}>
                                        <LinearGradient
                                            colors={['#BA4603', '#FB9301']}
                                            style={styles.gradient}
                                        />
                                        <Text style={styles.optionText}>{situation.selectedMove.option}</Text>
                                    </View>
                                    <Text style={[styles.yellowText, {fontWeight: '100', textAlign: 'right', alignSelf: 'flex-end'}]}>{situation.selectedMove.meaning}</Text>
                                    
                                    <Text style={[styles.aboutText, {width: '100%', textAlign: 'left', marginVertical: 30}]}>{situation.actDescription}</Text>

                                    <TouchableOpacity
                                        style={[styles.optionBtn, {alignSelf: 'center', borderColor: '#4e4e4e', backgroundColor: '#4e4e4e'}]}
                                        onPress={() => deleteMirrorSituation(situation.id)}
                                    >
                                        <Text style={styles.optionText}>Delete</Text>
                                    </TouchableOpacity>

                                    <View style={{width: '100%', height: 2, backgroundColor: '#BA4603', marginVertical: 30}} />
                                </View>
                            ))
                        }
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

})

export default CaptainSavedSituations;