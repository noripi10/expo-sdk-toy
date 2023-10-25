import { Audio } from 'expo-av';

class AudioManager {
  private isSetup: boolean = false;
  private sound: Audio.Sound | undefined = undefined;

  initialize = async () => {
    const result = await Audio.setAudioModeAsync({
      playThroughEarpieceAndroid: false,
      shouldDuckAndroid: true,
      allowsRecordingIOS: false,
      playsInSilentModeIOS: true,
    });
    this.isSetup = true;
    return result;
  };

  setupSound = async () => {
    const { sound } = await Audio.Sound.createAsync(require('@assets/sounds/bgm.mp3'));
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
