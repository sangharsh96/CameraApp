// CameraComponent.js
import React, {useRef, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {RNCamera} from 'react-native-vision-camera';

const CameraComponent = () => {
  const cameraRef = useRef();
  const [isRecording, setIsRecording] = useState(false);

  const takePhoto = async () => {
    if (cameraRef.current) {
      const options = {quality: 0.5, base64: true};
      const data = await cameraRef.current.takePictureAsync(options);
      console.log('Photo data:', data);
      // Handle the photo data as needed
    }
  };

  const toggleRecording = async () => {
    if (cameraRef.current) {
      if (isRecording) {
        const data = await cameraRef.current.stopRecording();
        console.log('Video data:', data);
        // Handle the video data as needed
      } else {
        const data = await cameraRef.current.recordAsync();
        console.log('Recording started:', data);
      }

      setIsRecording(!isRecording);
    }
  };

  return (
    <View style={{flex: 1}}>
      <RNCamera
        ref={cameraRef}
        style={{flex: 1}}
        type={RNCamera.Constants.Type.back}
        captureAudio={true}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginBottom: 20,
          }}>
          <TouchableOpacity onPress={takePhoto} style={{marginBottom: 16}}>
            <Text style={{fontSize: 20, marginBottom: 10, color: 'white'}}>
              Capture Photo
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleRecording}>
            <Text style={{fontSize: 20, color: 'white'}}>
              {isRecording ? 'Stop Recording' : 'Start Recording'}
            </Text>
          </TouchableOpacity>
        </View>
      </RNCamera>
    </View>
  );
};

export default CameraComponent;
