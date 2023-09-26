import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { StyleSheet, Pressable } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

import { useIsFocused } from '@react-navigation/native';
import Animated from 'react-native-reanimated';
import { Camera, CameraType, FaceDetectionResult } from 'expo-camera';
import * as Device from 'expo-device';
import * as ExpoFaceDetector from 'expo-face-detector';
import { FaceFeature } from 'expo-face-detector';

import { keyMapping } from '@/libs/object';
import { Text, View } from '../Themed';

export default function FaceDetector() {
  const [status, requestPermission] = Camera.useCameraPermissions();
  const [cameraType, setCameraType] = useState(CameraType.back);
  const [pause, setPause] = useState(true);

  const [faces, setFaces] = useState<FaceFeature[]>();

  const cameraRef = useRef<Camera>(null);

  const isFucus = useIsFocused();

  useEffect(() => {
    requestPermission();

    if (!isFucus) {
      setPause(true);
    }
  }, [isFucus]);

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
    // console.info({ result });
  };

  const faceDetectorHandler = async (result: FaceDetectionResult) => {
    // console.info(JSON.stringify(result.faces, null, 2));
    setFaces(result.faces as FaceFeature[]);
  };

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
          faceDetectorSettings={{
            mode: ExpoFaceDetector.FaceDetectorMode.fast,
            detectLandmarks: ExpoFaceDetector.FaceDetectorLandmarks.all,
            runClassifications: ExpoFaceDetector.FaceDetectorClassifications.all,
            minDetectionInterval: 1500,
            tracking: true,
          }}
          onFacesDetected={faceDetectorHandler}
        >
          {faces?.map((face, index) => (
            <>
              <Animated.View
                key={index.toString()}
                style={{
                  position: 'absolute',
                  top: face.bounds.origin.y,
                  left: face.bounds.origin.x,
                  width: face.bounds.size.width,
                  height: face.bounds.size.height,
                  backgroundColor: 'rgba(0, 255, 225, 0.3)',
                  borderRadius: 4,
                  transform: [
                    { perspective: 600 },
                    { rotateZ: `${(face.rollAngle ?? 0).toFixed(0)}deg` },
                    // { rotateY: `${(face.yawAngle ?? 0).toFixed(0)}deg` },
                  ],
                  borderWidth: 1,
                  borderColor: 'rgba(0, 255, 225, 1)',
                }}
              />
              {keyMapping(face).map((pos) => {
                if (!pos.includes('Position')) {
                  return <React.Fragment key={pos} />;
                }
                const point = face[pos] as ExpoFaceDetector.Point;

                return (
                  <Animated.View
                    key={pos}
                    style={{
                      position: 'absolute',
                      top: point.y,
                      left: point.x,
                      width: 8,
                      height: 8,
                      borderRadius: 999,
                      backgroundColor: 'rgba(0, 255, 225, 1)',
                    }}
                  />
                );
              })}
            </>
          ))}

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
