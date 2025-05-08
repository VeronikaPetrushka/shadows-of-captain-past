import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, Dimensions, StyleSheet, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";
import leadershipQuoutes from "../captainConstants/leadershipQuoutes";

const { height } = Dimensions.get('window');

const LeadershipQuoutes = () => {
    const navigation = useNavigation();
    const [captainStep, setCaptainStep] = useState(0);

    const pickQuouteFromTopic = (topicObject) => {
        if (!topicObject.quoutes || topicObject.quoutes.length === 0) return;

        const randomIndex = Math.floor(Math.random() * topicObject.quoutes.length);
        const selectedQuoute = topicObject.quoutes[randomIndex];

        navigation.navigate('ReadLeadershipQuouteRoute', { quoute: selectedQuoute, topic: topicObject.topic });
    };

    const pickRandomQuoute = () => {
        const allQuoutes = leadershipQuoutes.flatMap(q => q.quoutes);
        if (allQuoutes.length === 0) return;

        const randomIndex = Math.floor(Math.random() * allQuoutes.length);
        const selectedQuoute = allQuoutes[randomIndex];

        navigation.navigate('ReadLeadershipQuouteRoute', { quoute: selectedQuoute });
    };

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>

            <Image
                source={require('../pastAssets/routeNames/leadershipQuoutes.png')}
                style={{ width: '100%', height: 40, resizeMode: 'contain', marginBottom: 24 }}
            />

            {
                captainStep === 0 && (
                    <ScrollView style={{ width: '100%' }}>
                        
                        <View style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', width: '100%', marginTop: height * 0.06}}>
                            <View style={{width: '73%'}}>
                                <Text style={styles.aboutText}>
                                    A place where words carry the power of the wind and quotes set your course.
                                    Choose a theme: ⚓ Strategy, 🛡️ Courage, or ⚖️ Responsibility — and discover an inspiring quote that once served as an anchor or a sail for legendary captains.
                                </Text>
                                <Text style={[styles.aboutText, {marginBottom: 20}]}>
                                    Expand the quote to see how it played out in a real maritime story.
                                </Text>
                                <Text style={styles.aboutText}>
                                    🧭 Let their experience guide your journey.
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
                            leadershipQuoutes.map((quoute, index) => (
                                <View key={index} style={[styles.outerCard, index !== 0 && {marginTop: -90}]}>
                                    <LinearGradient colors={['#BA4603', '#FB9301']} style={styles.gradient}>
                                        <View style={styles.innerCard}>

                                            <View style={[styles.row, {alignItems: 'center'}]}>
                                                <Text style={styles.quouteName}>{quoute.topic}</Text>

                                                <TouchableOpacity onPress={() => pickQuouteFromTopic(quoute)}>
                                                    <Image
                                                        source={require('../pastAssets/routeIcons/arrowBtn.png')}
                                                        style={{ width: 27, height: 21, resizeMode: 'contain' }}
                                                    />
                                                </TouchableOpacity>
                                            </View>

                                            <Text style={styles.quouteAbout}>{quoute.about}</Text>
                                            
                                        </View>
                                    </LinearGradient>
                                </View>
                            ))
                        }

                        <TouchableOpacity style={{marginTop: 40, alignSelf: 'center'}} onPress={pickRandomQuoute}>
                            <Image
                                source={require('../pastAssets/appDecor/randomQuouteBtn.png')}
                                style={{ width: 61, height: 67, resizeMode: 'contain' }} />
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
        paddingVertical: 17,
        paddingHorizontal: 20
    },

    quouteName: {
        fontSize: 26,
        lineHeight: 28,
        fontWeight: '400',
        fontStyle: 'italic',
        color: '#fff',
        width: '70%',
        textAlign: 'flex-start'
    },

    quouteAbout: {
        fontSize: 15,
        fontWeight: '300',
        fontStyle: 'italic',
        color: '#fff',
        marginTop: 18
    },

})

export default LeadershipQuoutes;