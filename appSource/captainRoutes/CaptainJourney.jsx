import React, { useState, useEffect, useRef, useMemo } from "react";
import { View, Text, Image, TouchableOpacity, Dimensions, StyleSheet, ScrollView, PanResponder, Animated, Modal, Alert } from "react-native"
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LinearGradient from "react-native-linear-gradient";

const { height } = Dimensions.get('window');

const ship = require('../pastAssets/captainJourney/ship.png');
const captainPoint = require('../pastAssets/captainJourney/point.png');
const obstacles = [
    require('../pastAssets/captainJourney/obstacles/crash.png'),
    require('../pastAssets/captainJourney/obstacles/island.png'),
    require('../pastAssets/captainJourney/obstacles/rock.png'),
];

const CaptainJourney = () => {
    const navigation = useNavigation();
    const [captainStep, setCaptainStep] = useState(0);
    const [points, setPoints] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [gameActive, setGameActive] = useState(true);

    //game settings

    const gameHeight = height * 0.7;
    const gameWidth = Dimensions.get('window').width;

    const [shipPosition] = useState(new Animated.ValueXY({ x: (gameWidth - 70) / 2, y: gameHeight - 114 }));
    const shipBasePosition = useRef({ x: (gameWidth - 70) / 2, y: gameHeight - 114 });
    const shipRef = useRef({ x: (gameWidth - 70) / 2, y: gameHeight - 114 });

    const [obstacleList, setObstacleList] = useState([]);
    const obstacleRef = useRef([]);
    obstacleRef.current = obstacleList;

    const [pointList, setPointList] = useState([]);
    const pointRef = useRef([]);
    pointRef.current = pointList;

    const isOverlapping = (a, b) => {
        return !(a.x + a.width < b.x || b.x + b.width < a.x || a.y + a.height < b.y || b.y + b.height < a.y);
    };

    //ship

    const panResponder = useMemo(() => PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
            if (!gameActive) return;
            shipBasePosition.current = { x: shipRef.current.x, y: shipRef.current.y };
        },
        onPanResponderMove: (e, gestureState) => {
            if (!gameActive) return;

            let newX = shipBasePosition.current.x + gestureState.dx;
            let newY = shipBasePosition.current.y + gestureState.dy;

            const shipBox = { x: newX, y: newY, width: 70, height: 114 };
            const collision = obstacleRef.current.some(ob => isOverlapping(shipBox, ob));

            if (collision) {
                handleGameOver();
                return;
            }

            newX = Math.max(0, Math.min(newX, gameWidth - 70));
            newY = Math.max(0, Math.min(newY, gameHeight - 114));

            shipPosition.setValue({ x: newX, y: newY });
            shipRef.current.x = newX;
            shipRef.current.y = newY;

            setPointList(prev => {
                const remaining = prev.filter(p => !isOverlapping(shipBox, p));
                const collected = prev.length - remaining.length;
                if (collected > 0) setPoints(pt => pt + collected);
                return remaining;
            });
        },
    }), [gameActive]);

    // obstacles

    const spawnObstacle = () => {
        if (!gameActive) return;

        setObstacleList(currentList => {
            const existing = [...currentList];
            if (existing.length >= 5) return existing;

            const obsWidth = 130;
            const obsHeight = 130;
            let attempt = 0;
            const maxAttempts = 20;

            while (existing.length < 5 && attempt < maxAttempts) {
                const x = Math.floor(Math.random() * (gameWidth - obsWidth));
                const y = Math.floor(Math.random() * (gameHeight - obsHeight));
                const candidate = { x, y, width: obsWidth, height: obsHeight };
                const shipBox = { x: shipRef.current.x, y: shipRef.current.y, width: 70, height: 114 };

                const overlapsShip = isOverlapping(shipBox, candidate);
                const overlapsOthers = existing.some(o => isOverlapping(o, candidate));

                if (!overlapsShip && !overlapsOthers) {
                    const id = Date.now() + Math.random();
                    const obstacle = {
                        ...candidate,
                        id,
                        image: obstacles[Math.floor(Math.random() * obstacles.length)],
                    };

                    const newList = [...existing, obstacle];

                    setTimeout(() => {
                        setObstacleList(current => current.filter(o => o.id !== id));
                    }, 2000 + Math.random() * 2000);

                    return newList;
                }
                attempt++;
            }
            return existing;
        });
    };

    useEffect(() => {
        if (!gameActive) return;

        const timers = [];
        const loop = () => {
            const delay = 1000 + Math.random() * 2000;
            const timerId = setTimeout(() => {
                spawnObstacle();
                loop();
            }, delay);
            timers.push(timerId);
        };

        spawnObstacle();
        loop();

        return () => timers.forEach(clearTimeout);
    }, [gameActive]);

    // points 

    const spawnPoint = () => {
        if (!gameActive) return;

        setPointList(currentList => {
            const existing = [...currentList];
            if (existing.length >= 4) return existing;

            const ptSize = 38;
            let attempt = 0;
            const maxAttempts = 20;

            while (existing.length < 4 && attempt < maxAttempts) {
                const x = Math.floor(Math.random() * (gameWidth - ptSize));
                const y = Math.floor(Math.random() * (gameHeight - ptSize));
                const candidate = { x, y, width: ptSize, height: ptSize };

                const overlapsObstacle = obstacleRef.current.some(o => isOverlapping(o, candidate));
                const overlapsOthers = existing.some(p => isOverlapping(p, candidate));

                if (!overlapsObstacle && !overlapsOthers) {
                    const id = Date.now() + Math.random();
                    const point = { ...candidate, id };
                    const newList = [...existing, point];

                    setTimeout(() => {
                        setPointList(current => current.filter(p => p.id !== id));
                    }, 2000 + Math.random() * 2000);

                    return newList;
                }
                attempt++;
            }
            return existing;
        });
    };

    useEffect(() => {
        if (!gameActive) return;

        const loop = () => {
            const delay = 2000 + Math.random() * 2000;
            setTimeout(() => {
                spawnPoint();
                loop();
            }, delay);
        };
        loop();
    }, [gameActive]);

    // Reset game
    const resetGame = () => {
        setGameOver(false);
        setGameActive(true);
        setPoints(0);
        setObstacleList([]);
        setPointList([]);
        
        shipPosition.setValue({ x: (gameWidth - 70) / 2, y: gameHeight - 114 });
        shipRef.current = { x: (gameWidth - 70) / 2, y: gameHeight - 114 };
        shipBasePosition.current = { x: (gameWidth - 70) / 2, y: gameHeight - 114 };
    };

    const savePoints = async () => {
        try {
            const storedPoints = await AsyncStorage.getItem('CAPTAIN_JOURNEY_POINTS');
            const currentPoints = storedPoints ? parseInt(storedPoints) : 0;
            await AsyncStorage.setItem('CAPTAIN_JOURNEY_POINTS', (currentPoints + points).toString());
        } catch (error) {
            Alert.alert('Error', 'Error saving points:');
        }
    };

    useEffect(() => {
        if (gameOver) {
            savePoints();
        }
    }, [gameOver]);

    // Handle game over
    const handleGameOver = () => {
        setGameActive(false);
        setGameOver(true);
    };

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>

            {
                captainStep === 0 && (
                    <View style={[styles.row, {marginBottom: 24}]}>
                        <TouchableOpacity onPress={() => navigation.navigate('CaptainJourneyShopRoute')}>
                            <Image
                                source={require('../pastAssets/routeIcons/captainShop.png')}
                                style={{ width: 22, height: 20, resizeMode: 'contain' }}
                            />
                        </TouchableOpacity>
                        <Image
                            source={require('../pastAssets/routeNames/captainJourney.png')}
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
                                    You are the captain of your ship, and ahead of you lie storms 🌩️ and obstacles ⛵! Your journey is filled with dangers ⚔️, but the reward for each mile you conquer is unique stories 📖 about great captains of the past.
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
                    <View style={{ width: '100%', flexGrow: 1, paddingBottom: 150 }}>
                        
                        <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end', marginBottom: height * 0.05 }}>
                            <Image
                                source={captainPoint}
                                style={{ width: 25, height: 25, resizeMode: 'contain', marginRight: 10 }}
                            />
                            <Text style={styles.points}>{points}</Text>
                        </View>

                        {/* game area */}
                        <View style={{ width: '100%', height: gameHeight, borderWidth: 2, borderColor: '#BA4603', borderRadius: 22 }}>
                            
                            <Animated.Image
                                {...panResponder.panHandlers}
                                source={ship}
                                style={{
                                    width: 70,
                                    height: 114,
                                    position: 'absolute',
                                    transform: shipPosition.getTranslateTransform()
                                }}
                            />

                           {obstacleList.map(ob => (
                                <Image
                                    key={ob.id}
                                    source={ob.image}
                                    style={{
                                        position: 'absolute',
                                        left: ob.x,
                                        top: ob.y,
                                        width: ob.width,
                                        height: ob.height,
                                        resizeMode: 'contain',
                                    }}
                                />
                           ))}
                            
                            {pointList.map(p => (
                                <Image
                                    key={p.id}
                                    source={captainPoint}
                                    style={{ position: 'absolute', left: p.x, top: p.y, width: 38, height: 38, resizeMode: 'contain' }}
                                />
                            ))}

                        </View>

                    </View>
                )
            }

            <Modal
                visible={gameOver}
                transparent={true}
                animationType="fade"
            >
                <View style={styles.modalContainer}>

                    <View style={styles.gradient}>
                        <LinearGradient colors={['#BA4603', '#FB9301']} style={styles.gradient}>

                            <View style={styles.modalContent}>
                                <Image
                                    source={require('../pastAssets/captainJourney/gameOverTitle.png')}
                                    style={{ width: '100%', height: 117, resizeMode: 'contain', marginBottom: 13 }}
                                />
                                <Image
                                    source={require('../pastAssets/captainJourney/gameOverShip.png')}
                                    style={{ width: '100%', height: 291, resizeMode: 'contain' }}
                                />
                            </View>

                        </LinearGradient>
                    </View>

                    <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end', marginTop: 20, marginRight: 20}}>
                        <Text style={styles.tryAgainText}>Try again</Text>
                        <TouchableOpacity onPress={resetGame}>
                            <Image source={require('../pastAssets/appDecor/nextBtn.png')} style={{width: 60, height: 60, resizeMode: 'contain'}} />
                        </TouchableOpacity>
                    </View>

                </View>
            </Modal>
            
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

    points: {
        fontSize: 24,
        fontWeight: '400',
        fontStyle: 'italic',
        color: '#BA4603',
        lineHeight: 26,
    },

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

    gradient: {
        width: '95%',
        height: 492,
        borderRadius: 32,
        alignSelf: 'center'
    },

    modalContent: {
        paddingVertical: 18,
        paddingHorizontal: 20,
        borderRadius: 32,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    
    tryAgainText: {
        fontSize: 28,
        lineHeight: 30,
        fontWeight: '400',
        color: '#fff',
        marginRight: 12,
        width: 120,
        textAlign: 'center',
        fontStyle: 'italic'
    }
})

export default CaptainJourney;