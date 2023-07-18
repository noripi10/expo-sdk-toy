import { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

import { Camera, CameraType, FaceDetectionResult } from 'expo-camera';
import * as Device from 'expo-device';
// import * as ExpoFaceDetector from 'expo-face-detector';

export default function FaceDetector() {
  const [status, requestPermission] = Camera.useCameraPermissions();
  const [cameraType, setCameraType] = useState(CameraType.back);
  const [pause, setPause] = useState(true);

  const cameraRef = useRef<Camera>(null);

  useEffect(() => {
    requestPermission();
  }, []);

  if (!Device.isDevice) {
    return (
      <View>
        <Text>Only Real Device</Text>
      </View>
    );
  }

  if (!status?.granted) {
    return (
      <View>
        <Text>Permission Cofirm or Denied</Text>
      </View>
    );
  }

  const typeChageHandler = () => {
    setCameraType((prev) => (prev === CameraType.front ? CameraType.back : CameraType.front));
  };

  const captureHandler = async () => {
    if (!cameraRef.current) {
      return;
    }
    const result = await cameraRef.current.takePictureAsync();
    console.info({ result });
  };

  // const faceDetectorHandler = async (faces: FaceDetectionResult) => {
  //   const millseconds = new Date().getMilliseconds();
  //   if (millseconds % 13 === 0) {
  //     console.info(faces);
  //   }
  // };

  return (
    <View style={styles.wrapCamera}>
      {pause ? (
        <>
          <Pressable style={styles.pauseButton} onPress={() => setPause(false)}>
            {(props) => <MaterialIcons name='multiple-stop' color={props.pressed ? 'yellow' : 'orange'} size={48} />}
          </Pressable>
        </>
      ) : (
        <Camera
          ref={cameraRef}
          style={styles.camera}
          type={cameraType}
          // faceDetectorSettings={{
          //   mode: ExpoFaceDetector.FaceDetectorMode.fast,
          //   detectLandmarks: ExpoFaceDetector.FaceDetectorLandmarks.none,
          //   runClassifications: ExpoFaceDetector.FaceDetectorClassifications.none,
          //   minDetectionInterval: 100,
          //   tracking: true,
          // }}
          // onFacesDetected={faceDetectorHandler}
        >
          <Pressable style={styles.cameraTypeButton} onPress={typeChageHandler}>
            {(props) => (
              <MaterialIcons
                name={cameraType === CameraType.front ? 'camera-rear' : 'camera-front'}
                color={props.pressed ? 'yellow' : 'orange'}
                size={48}
              />
            )}
          </Pressable>
          <Pressable style={styles.pauseButton} onPress={() => setPause(true)}>
            {(props) => <MaterialIcons name='multiple-stop' color={props.pressed ? 'yellow' : 'orange'} size={48} />}
          </Pressable>
          <Pressable style={styles.captureButton} onPress={captureHandler}>
            {(props) => <MaterialIcons name='camera' color={props.pressed ? 'yellow' : 'orange'} size={48} />}
          </Pressable>
        </Camera>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapCamera: {
    flex: 1,
  },
  camera: {
    flex: 1,
    position: 'relative',
  },
  cameraTypeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  pauseButton: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  captureButton: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
});
