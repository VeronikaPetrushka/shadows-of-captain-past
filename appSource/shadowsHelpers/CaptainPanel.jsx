import { View, Image, TouchableOpacity, StyleSheet } from "react-native"
import captainPanel from "../captainConstants/captainPanel";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const CaptainPanel = () => {
    const navigation = useNavigation();
    const [focusedRoute, setFocusedRoute] = useState('CaptainTalesRoute');  

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const state = navigation.getState();
            setFocusedRoute(state.routes[state.index]?.name || 'UnknownRoute');
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <View style={styles.capitanPanel}>
            {
                captainPanel.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => { setFocusedRoute(item.name); navigation.navigate(item.name); }}
                        style={styles.button}
                    >
                        <Image
                            source={item.image}
                            style={[{ width: 21, height: 21, resizeMode: 'contain' },
                            focusedRoute === item.name && { tintColor: '#e95205' }]}
                        />
                    </TouchableOpacity>
                ))
            }
        </View>
    )
};

const styles = StyleSheet.create({

    capitanPanel: {
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center'
    }

})

export default CaptainPanel;