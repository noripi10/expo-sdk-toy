import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av';

class AudioManager {
  private isSetup = false;
  private sound: Audio.Sound | undefined = undefined;

  initialize = async () => {
    const result = await Audio.setAudioModeAsync({
      // allowsRecordingIOS: false,
      // interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
      // interruptionModeIOS: InterruptionModeIOS.DoNotMix,
      // playThroughEarpieceAndroid: false,
      playsInSilentModeIOS: true,
      // shouldDuckAndroid: true,
      staysActiveInBackground: true,
    });
    this.isSetup = true;
    return result;
  };

  setupSound = async () => {
    const { sound } = await Audio.Sound.createAsync(require('@assets/sounds/bgm.wav'));
    this.sound = sound;
  };

  play = async () => {
    await this.initialize();
    await this.setupSound();

    if (!this.sound || !this.isSetup) {
      return;
    }
    this.sound.setIsLoopingAsync(true);
    await this.sound.playAsync();
  };

  stop = async () => {
    if (!this.sound || !this.isSetup) {
      return;
    }
    await this.sound.stopAsync();
  };
}

export default new AudioManager();
