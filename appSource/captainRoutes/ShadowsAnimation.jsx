import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('window');

const animationElements = [
    require('../pastAssets/animationElements/captain.png'),
    require('../pastAssets/animationElements/shadows.png'),
    require('../pastAssets/animationElements/past.png'),
    require('../pastAssets/animationElements/ship.png')
]

const ShadowsAnimation = () => {
    const navigation = useNavigation();

    const captainOpacity = useRef(new Animated.Value(0)).current;
    const shadowsOpacity = useRef(new Animated.Value(0)).current;
    const pastOpacity = useRef(new Animated.Value(0)).current;
    const shipOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.timing(captainOpacity, { toValue: 1, duration: 700, useNativeDriver: true }),
            Animated.timing(shadowsOpacity, { toValue: 1, duration: 700, useNativeDriver: true }),
            Animated.timing(pastOpacity, { toValue: 1, duration: 700, useNativeDriver: true }),
            Animated.timing(shipOpacity, { toValue: 1, duration: 700, useNativeDriver: true }),
        ]).start(() => {
              setTimeout(() => {
                navigation.navigate('AboutCaptainRoute');
              }, 1000);
            });
    }, []);

    return (
        <View style={{flex: 1, alignItems: 'center'}}>

            <Animated.Image
                source={animationElements[3]}
                style={[styles.ship, { opacity: shipOpacity }]}
            />

            <View style={{ width: 264, height: 132, marginTop: 20 }}>
                <Animated.Image
                    source={animationElements[1]}
                    style={[styles.shadows, { opacity: shadowsOpacity }]}
                />
                <Animated.Image
                    source={animationElements[0]}
                    style={[styles.captain, { opacity: captainOpacity }]}
                />
                <Animated.Image
                    source={animationElements[2]}
                    style={[styles.past, { opacity: pastOpacity }]}
                />
            </View>

        </View>
    )
};

const styles = StyleSheet.create({

    ship: {
        width: 217,
        height: 241,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: height * 0.12,
    },

    shadows: {
        width: 165,
        height: 90,
        resizeMode: 'contain',
        position: 'absolute',
        bottom: 40,
        left: 15,
    },

    captain: {
        width: 145,
        height: 58,
        resizeMode: 'contain',
        position: 'absolute',
        bottom: 0,
        left: 15,
    },

    past: {
        width: 80,
        height: 114,
        resizeMode: 'contain',
        position: 'absolute',
        bottom: 10,
        right: 15,
    }
})

export default ShadowsAnimation;