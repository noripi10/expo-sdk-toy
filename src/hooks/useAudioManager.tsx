import { useEffect, useState } from 'react';
import { AVPlaybackStatusSuccess, Audio } from 'expo-av';

import audio from '@/libs/audio';

export const useAudioManager = () => {
  const [sound, setSound] = useState<Audio.Sound>();
  const [audioState, setAudioState] = useState<AVPlaybackStatusSuccess>();
  const [status, setStatus] = useState<'play' | 'stop' | 'pause'>('stop');

  useEffect(() => {
    const setupAudio = async () => {
      await Audio.setAudioModeAsync({
        // allowsRecordingIOS: false,
        // interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
        // interruptionModeIOS: InterruptionModeIOS.DoNotMix,
        // playThroughEarpieceAndroid: false,
        playsInSilentModeIOS: true,
        // shouldDuckAndroid: true,
        staysActiveInBackground: true,
      });

      const { sound } = await Audio.Sound.createAsync(require('@assets/sounds/bgm.wav'));

      setSound(sound);
      // if (!('error' in audioStatus)) {
      //   console.info({ sound, audioState });
      //   setAudioState(audioState as AVPlaybackStatusSuccess);
      // }
    };

    setupAudio();

    return () => {
      // sound?.stopAsync();
    };
  }, []);

  const playAsync = async () => {
    if (!sound) return;
    if (status === 'play') return;

    await sound.setIsLoopingAsync(true);
    const avPlaybackStatus = await sound.playAsync();
    if (!('error' in avPlaybackStatus)) {
      setAudioState(avPlaybackStatus as AVPlaybackStatusSuccess);
    }
    setStatus('play');
  };

  const pauseAsync = async () => {
    if (!sound) return;
    if (status !== 'play') return;

    const avPlaybackStatus = await sound.pauseAsync();
    if (!('error' in avPlaybackStatus)) {
      setAudioState(avPlaybackStatus as AVPlaybackStatusSuccess);
    }
    setStatus('pause');
  };

  const stopAsync = async () => {
    if (!sound) return;
    if (status === 'stop') return;

    const avPlaybackStatus = await sound.stopAsync();
    if (!('error' in avPlaybackStatus)) {
      setAudioState(avPlaybackStatus as AVPlaybackStatusSuccess);
    }
    setStatus('stop');
  };

  return { isReady: !!sound, playAsync, pauseAsync, stopAsync, status, audioState };
};
