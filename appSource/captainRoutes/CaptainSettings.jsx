import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet, Modal, Alert, ScrollView, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import Slider from '@react-native-community/slider';
import { useMusic } from '../shadowsHelpers/CaptainMusic.jsx';

const CaptainSettings = () => {
    const [captainResetVisible, setCaptainResetVisible] = useState(false);
    const { isPlaying, togglePlay, volume, setVolume } = useMusic();
    const [captainNotify, setCaptainNotify] = useState(false);

    useEffect(() => {
        const loadNotificationSetting = async () => {
            const stored = await AsyncStorage.getItem('CAPTAIN_NOTIFICATIONS');
            if (stored !== null) setCaptainNotify(JSON.parse(stored));
        };
        loadNotificationSetting();
    }, []);

    const toggleNotifications = async () => {
        const newValue = !captainNotify;
        setCaptainNotify(newValue);
        await AsyncStorage.setItem('CAPTAIN_NOTIFICATIONS', JSON.stringify(newValue));
    };

    const resetProgress = () => {
        AsyncStorage.removeItem('CAPTAIN_NOTIFICATIONS')
        AsyncStorage.removeItem('PINNED_CAPTAIN_TALES')
        AsyncStorage.removeItem('CAPTAIN_SAVED_MIRRORS')
        AsyncStorage.removeItem('UNLOCKED_CAPTAIN_JOURNEYS')
        AsyncStorage.removeItem('CAPTAIN_JOURNEY_POINTS')
                        
            .then(() => console.log('Progress reset successfully'))
            .catch((error) => Alert.alert('Failed to reset progress:'));
        setCaptainResetVisible(false);
        Alert.alert('Success', 'Your progress has been reset!')
    };

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>

            <ScrollView style={{ width: '100%' }}>
                
                    <View style={[styles.row, {marginTop: 150}]}>
                        <Image
                            source={require('../pastAssets/routeIcons/captainMusic.png')}
                            style={{ width: 45, height: 45, resizeMode: 'contain', marginRight: 8 }}
                        />
                        <Image
                            source={require('../pastAssets/routeNames/shadowMusic.png')}
                            style={{ width: 84, height: 40, resizeMode: 'contain' }}
                        />
                    </View>

                    <View style={{ height: 17, justifyContent: 'center', borderRadius: 20, backgroundColor: '#BA4603', paddingHorizontal: 5, marginBottom: 53 }}>
                        <Slider
                            style={{ width: '100%' }}
                            minimumValue={0}
                            maximumValue={1}
                            step={0.01}
                            minimumTrackTintColor="#BA4603"
                            maximumTrackTintColor="#3E3E3E"
                            thumbTintColor="#FB9301"
                            value={volume}
                            onValueChange={(val) => {
                                setVolume(val);
                                if (val === 0 && isPlaying) togglePlay();
                                if (val > 0 && !isPlaying) togglePlay();
                            }}
                        />
                    </View>

                    <View style={[styles.row, {justifyContent: 'space-between'}]}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Image
                                source={require('../pastAssets/routeIcons/captainVibration.png')}
                                style={{ width: 45, height: 45, resizeMode: 'contain', marginRight: 8}}
                            />
                            <Image
                                source={require('../pastAssets/routeNames/shadowVibration.png')}
                                style={{ width: 129, height: 40, resizeMode: 'contain' }}
                            />
                    </View>
                    <View>
                        <Switch
                            value={captainNotify}
                            onValueChange={toggleNotifications}
                            trackColor={{ false: '#ccc', true: '#BA4603' }}
                            thumbColor={captainNotify ? '#FB9301' : '#00DE5D'}
                        />
                        {
                            captainNotify && (
                                <Image
                                    source={require('../pastAssets/routeIcons/onOff.png')}
                                    style={{ width: 12, height: 12, resizeMode: 'contain', position: 'absolute', left: 6, top: 10, zIndex: 10 }}
                                />
                            )
                        }
                    </View>
                </View>
                
                <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'center', marginTop: 60}}>
                    <Text style={styles.resetProgress} numberOfLines={2}>Reset Progress</Text>
                    <TouchableOpacity onPress={() => setCaptainResetVisible(true)}>
                        <Image source={require('../pastAssets/appDecor/nextBtn.png')} style={{width: 60, height: 60, resizeMode: 'contain'}} />
                    </TouchableOpacity>
                </View>
                                
                <View style={{height: 300}} />
            </ScrollView>
            
            <Modal
                animationType="fade"
                transparent
                visible={captainResetVisible}
                onRequestClose={() => setCaptainResetVisible(false)}
            >
                <View style={styles.modalLayout}>
                    <View style={styles.modalContent}>
                        <LinearGradient colors={['#BA4603', '#FB9301']} style={{width: '100%', height: '100%', borderRadius: 15}}>
                            <View style={{ width: '100%', height: '100%', borderRadius: 15, alignItems: 'center', paddingTop: 16 }}>
                                
                                <Text style={styles.resetTitle}>Reset progress?</Text>
                                <Text style={styles.resetText}>Are you sure you want to reset your progress?</Text>
                                <View style={{flexDirection: 'row'}}>
                                    <TouchableOpacity style={[styles.resetBtn, {borderRightColor: '#fff', borderRightWidth: 1}]} onPress={() => setCaptainResetVisible(false)}>
                                        <Text style={styles.resetBtnText}>Cancel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.resetBtn} onPress={resetProgress}>
                                        <Text style={[styles.resetBtnText, {fontWeight: '600', color: '#B71304'}]}>Reset</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </LinearGradient>
                    </View>
                </View>
            </Modal>
        
      </View>
    )
};

const styles = StyleSheet.create({

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: 30
    },

    resetProgress: {
        fontSize: 28,
        lineHeight: 30,
        fontWeight: '400',
        color: '#fff',
        marginRight: 12,
        width: 120,
        textAlign: 'center',
        fontStyle: 'italic'
    },

    modalLayout: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    modalContent: {
        width: 273,
        height: 146,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#fff'
    },

    resetTitle: {
        fontSize: 17,
        lineHeight: 22,
        fontWeight: '600',
        color: '#fff',
        marginBottom: 2,
        width: '80%',
        textAlign: 'center'
    },

    resetText: {
        fontSize: 13,
        lineHeight: 18,
        fontWeight: '500',
        color: '#fff',
        marginBottom: 16,
        width: '85%',
        textAlign: 'center'
    },

    resetBtn: {
        width: '50%',
        borderTopColor: '#fff',
        borderTopWidth: 1,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center'
    },

    resetBtnText: {
        fontSize: 17,
        lineHeight: 22,
        fontWeight: '500',
        color: '#fff',
    }
  
});

export default CaptainSettings;