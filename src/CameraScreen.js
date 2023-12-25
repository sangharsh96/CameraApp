import React, {useEffect, useState,useRef} from 'react';
import {View, TouchableOpacity, Text, Platform} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

const CameraScreen = () => {
  const [cameraPermission, setCameraPermission] = useState(null);
  const devices = useCameraDevices();
  const device = devices.back;
  const camera = useRef<Camera>(null);

  useEffect(() => {
    checkCameraPermission();
  }, []);

  const checkCameraPermission = async () => {
    const permissionResult = await check(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA,
    );

    setCameraPermission(permissionResult);
  };

  const requestCameraPermission = async () => {
    const permissionResult = await request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA,
    );

    setCameraPermission(permissionResult);
  };

  const capturePhoto = async () => {
    if (camera.current) {
      const photoResult = await camera.current.takePhoto({
        quality: 'high',
        saveToGallery: true, // Change to false if you don't want to save to the gallery
      });
      console.log('Photo captured:', photoResult);
    }
  };

  const recordVideo = async () => {
    if (camera.current) {
      const videoResult = await camera.current.recordVideo({
        quality: '720p', // Set the desired video quality
        saveToGallery: true, // Change to false if you don't want to save to the gallery
      });
      console.log('Video recorded:', videoResult);
    }
  };

  if (cameraPermission === RESULTS.UNAVAILABLE) {
    return (
      <View>
        <Text>Camera permission is not available on this device.</Text>
      </View>
    );
  }

  if (cameraPermission === RESULTS.DENIED) {
    return (
      <View>
        <Text>
          Camera permission has not been granted. Please grant the permission to
          use the camera.
        </Text>
        <TouchableOpacity onPress={requestCameraPermission}>
          <Text>Request Camera Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (
    cameraPermission === RESULTS.GRANTED ||
    cameraPermission === RESULTS.BLOCKED
  ) {
    return (
      <View style={{flex: 1}}>
        <Camera
          ref={camera}
          style={{flex: 1}}
          device={device}
          isActive={true}
          photo={true}
        />
        <View>
          <TouchableOpacity onPress={capturePhoto}>
            <Text>Capture Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={recordVideo}>
            <Text>Record Video</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return null;
};

export default CameraScreen;
