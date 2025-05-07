//styles modal + unify logic + music

import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet, Modal, Alert, ScrollView, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Slider from '@react-native-community/slider';
import { useMusic } from '../shadowsHelpers/CaptainMusic.jsx';

const CaptainSettings = () => {
    const [resetModalVisible, setResetModalVisible] = useState(false);
    const { isPlaying, togglePlay, volume, setVolume } = useMusic();
    const [notificationsEnabled, setNotificationsEnabled] = useState(false);

    useEffect(() => {
        const loadNotificationSetting = async () => {
            const stored = await AsyncStorage.getItem('CAPTAIN_NOTIFICATIONS');
            if (stored !== null) setNotificationsEnabled(JSON.parse(stored));
        };
        loadNotificationSetting();
    }, []);

    const toggleNotifications = async () => {
        const newValue = !notificationsEnabled;
        setNotificationsEnabled(newValue);
        await AsyncStorage.setItem('CAPTAIN_NOTIFICATIONS', JSON.stringify(newValue));
    };

    const resetProgress = () => {
        AsyncStorage.removeItem('PINNED_CAPTAIN_TALES')
            .then(() => console.log('Progress reset successfully'))
            .catch((error) => Alert.alert('Failed to reset progress:'));
        setResetModalVisible(false);
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
                            maximumTrackTintColor="#BA4603"
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
                        <Switch
                            value={notificationsEnabled}
                            onValueChange={toggleNotifications}
                            trackColor={{ false: '#ccc', true: '#BA4603' }}
                            thumbColor={notificationsEnabled ? '#FB9301' : '#00DE5D'}
                        />
                </View>
                
                <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'center', marginTop: 60}}>
                    <Text style={styles.resetProgress} numberOfLines={2}>Reset Progress</Text>
                    <TouchableOpacity onPress={() => setResetModalVisible(true)}>
                        <Image source={require('../pastAssets/appDecor/nextBtn.png')} style={{width: 60, height: 60, resizeMode: 'contain'}} />
                    </TouchableOpacity>
                </View>
                                
                <View style={{height: 300}} />
            </ScrollView>
            
            <Modal
                animationType="fade"
                transparent
                visible={resetModalVisible}
                onRequestClose={() => setResetModalVisible(false)}
            >
                <View style={styles.modalLayout}>
                    <View style={styles.modalContent}>
                        <Text style={styles.resetTitle}>Reset progress?</Text>
                        <Text style={styles.resetText}>Are you sure you want to reset your progress?</Text>
                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity style={[styles.resetBtn, {borderRightColor: '#5d092a', borderRightWidth: 0.4}]} onPress={() => setResetModalVisible(false)}>
                                <Text style={styles.resetBtnText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.resetBtn} onPress={resetProgress}>
                                <Text style={[styles.resetBtnText, {fontWeight: '600', color: '#ff0000'}]}>Reset</Text>
                            </TouchableOpacity>
                        </View>
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
        borderRadius: 15,
        backgroundColor: '#ff9e36',
        alignItems: 'center',
        paddingTop: 16
    },

    resetTitle: {
        fontSize: 17,
        lineHeight: 22,
        fontWeight: '600',
        color: '#5d092a',
        marginBottom: 2,
        width: '80%',
        textAlign: 'center'
    },

    resetText: {
        fontSize: 13,
        lineHeight: 18,
        fontWeight: '500',
        color: '#5d092a',
        marginBottom: 16,
        width: '80%',
        textAlign: 'center'
    },

    resetBtn: {
        width: '50%',
        borderTopColor: '#5d092a',
        borderTopWidth: 0.4,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center'
    },

    resetBtnText: {
        fontSize: 17,
        lineHeight: 22,
        fontWeight: '500',
        color: '#5d092a',
    }
  
});

export default CaptainSettings;