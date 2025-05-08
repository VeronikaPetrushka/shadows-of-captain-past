import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native"
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

const ReadLeadershipQuoute = ({ quoute }) => {
    const navigation = useNavigation();
    const [expandedQuote, setExpandedQuote] = useState(false);

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>

            <View style={styles.row}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        source={require('../pastAssets/routeIcons/arrowBtn.png')}
                        style={styles.backButton}
                    />
                </TouchableOpacity>
                <Text style={[styles.quouteName, {width: '90%', textAlign: 'center'}]}>Quote from great captains</Text>
            </View>

            <View style={styles.row}>
                <Text style={[styles.quouteName, {textAlign: 'left'}]}>Quote</Text>
                <TouchableOpacity onPress={() => setExpandedQuote((prev) => !prev)}>
                    <Image
                        source={require('../pastAssets/routeIcons/readMore.png')}
                        style={[{width: 23, height: 11, resizeMode: 'contain'}, expandedQuote && {transform: [{ rotate: '180deg' }]}]}
                    />
                </TouchableOpacity>
            </View>

            <ScrollView style={{width: '100%'}}>
                <Text style={styles.taleText}>{quoute.quoute}</Text>
                {
                    expandedQuote && (
                        <Text style={styles.taleText}>{quoute.expandedQuoute}</Text>
                    )
                }
            </ScrollView>
            
        </View>
    )
};

const styles = StyleSheet.create({

    quouteName: {
        fontSize: 26,
        lineHeight: 28,
        fontWeight: '400',
        fontStyle: 'italic',
        color: '#fff',
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
        fontSize: 15,
        fontWeight: '300',
        fontStyle: 'italic',
        color: '#fff',
        lineHeight: 21,
        marginBottom: 20
    },

})

export default ReadLeadershipQuoute;