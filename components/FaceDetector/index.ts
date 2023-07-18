import { Platform } from 'react-native';
import FaceDetecterWeb from './FaceDetector.web';
import FaceDetectorNative from './FaceDetector.native';

const FaceDetector = Platform.OS === 'web' ? FaceDetecterWeb : FaceDetectorNative;
export default FaceDetector;
