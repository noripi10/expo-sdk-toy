import { Platform, useWindowDimensions } from 'react-native';

export const useWidth = () => {
  const { width } = useWindowDimensions();

  const os = Platform.OS;
  if (os !== 'web') {
    return width;
  }

  if (width > 1920) {
    return 1920;
  } else if (width > 1024) {
    return 1024;
  } else if (width > 768) {
    return 768;
  } else if (width > 540) {
    return 540;
  } else {
    return 320;
  }
};
