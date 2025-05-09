import React, { createContext, useContext, useEffect, useState } from 'react';
import TrackPlayer, { RepeatMode } from 'react-native-track-player';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MusicContext = createContext();

export const useMusic = () => useContext(MusicContext);

export const MusicProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const setupPlayer = async () => {
      try {
        await TrackPlayer.setupPlayer();

        await TrackPlayer.add({
          id: '1',
          url: require('../pastAssets/captainMusic2.mp3'),
          title: 'Shadow of Captain Past Music',
        });

        await TrackPlayer.setRepeatMode(RepeatMode.Track);

        const savedState = await AsyncStorage.getItem('CAPTAIN_MUSIC_LOUDNESS');
        if (savedState !== null) {
          const parsedState = JSON.parse(savedState);
          setIsPlaying(parsedState);
          parsedState ? await TrackPlayer.play() : await TrackPlayer.pause();
        } else {
          await TrackPlayer.play();
        }

        await TrackPlayer.setVolume(volume);
      } catch (error) {
        console.log('Error setting up TrackPlayer', error);
      }
    };

    setupPlayer();

    return () => {
      TrackPlayer.stop();
    };
  }, []);

  useEffect(() => {
    isPlaying ? TrackPlayer.play() : TrackPlayer.pause();
  }, [isPlaying]);

  useEffect(() => {
    TrackPlayer.setVolume(volume);
  }, [volume]);

  const togglePlay = async () => {
    const newState = !isPlaying;
    setIsPlaying(newState);
    await AsyncStorage.setItem('CAPTAIN_MUSIC_LOUDNESS', JSON.stringify(newState));
  };

  return (
    <MusicContext.Provider value={{ isPlaying, togglePlay, volume, setVolume }}>
      {children}
    </MusicContext.Provider>
  );
};