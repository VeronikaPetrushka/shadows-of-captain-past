import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, Dimensions, StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native";
import aboutCaptain from "../captainConstants/aboutCaptain";

const { height } = Dimensions.get('window');

const AboutCaptain = () => {
    const navigation = useNavigation();
    const [moreAboutApp, setMoreAboutApp] = useState(0);

    const handleMoreAboutApp = () => {
        if(moreAboutApp < aboutCaptain.length - 1) {
            setMoreAboutApp(moreAboutApp + 1);
        } else {
            navigation.navigate('CaptainTalesRoute');
        }
    }

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>

            <Image
                source={require('../pastAssets/welcomeAssets/welcome.png')}
                style={{ width: 200, height: 57, resizeMode: 'contain', marginBottom: 24 }}
            />

            <Image
                source={require('../pastAssets/animationElements/ship.png')}
                style={{ width: 217, height: height * 0.25, resizeMode: 'contain', marginBottom: height * 0.04 }}
            />

            <Image
                source={require('../pastAssets/welcomeAssets/logo.png')}
                style={{ width: 264, height: height * 0.14, resizeMode: 'contain', marginBottom: height * 0.05 }}
            />

            <View style={styles.row}>
                <Text style={styles.text}>{aboutCaptain[moreAboutApp]}</Text>
                <TouchableOpacity onPress={handleMoreAboutApp}>
                    <Image
                        source={require('../pastAssets/appDecor/nextBtn.png')}
                        style={{ width: 60, height: 60, resizeMode: 'contain' }}
                    />
                </TouchableOpacity>
            </View>
            
        </View>
    )
};

const styles = StyleSheet.create({

    row: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        position: 'absolute',
        bottom: height * 0.15,
    },

    text: {
        fontSize: 15,
        fontWeight: '400',
        fontStyle: 'italic',
        color: '#fff',
        width: '75%'
    }

})

export default AboutCaptain;