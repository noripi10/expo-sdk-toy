import { Platform } from 'react-native';
import FaceDetectorNative from './FaceDetector.native';
import FaceDetecterWeb from './FaceDetector.web';

const FaceDetector = Platform.OS === 'web' ? FaceDetecterWeb : FaceDetectorNative;
export default FaceDetector;
