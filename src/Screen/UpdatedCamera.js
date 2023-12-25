import React, {useState, useEffect, useRef} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
  FlatList,
  ScrollView,
  Dimensions,
} from 'react-native';
import {
  Camera,
  useCameraDevices,
  useFrameProcessor,
} from 'react-native-vision-camera';
import Video from 'react-native-video';
const UpdatedCamera = () => {
  const camera = useRef(null);
  const [cameraPermission, setCameraPermission] = useState();
  const [photoPath, setPhotoPath] = useState();
  const [videoPath, setVideoPath] = useState();
  const [galleryItems, setGalleryItems] = useState([]);
  const [isVideoStart, setIsVideoStart] = useState(false);
  const [isGalleryModalVisible, setIsGalleryModalVisible] = useState(false);

  useEffect(() => {
    (async () => {
      const cameraPermissionStatus = await Camera.requestCameraPermission();
      setCameraPermission(cameraPermissionStatus);
    })();
  }, []);

  const devices = useCameraDevices();
  const cameraDevice = devices?.back;

  const handleTakePhoto = async () => {
    console.log('Take Photo');
    try {
      const photo = await camera.current.takePhoto({
        flash: 'on',
      });

      setPhotoPath(photo.path);

      setPhotoPath(photo.path);
      const updatedGalleryItems = [
        ...galleryItems,
        {type: 'photo', path: photo.path},
      ];
      setGalleryItems(updatedGalleryItems);
      await AsyncStorage.setItem(
        'galleryItems',
        JSON.stringify(updatedGalleryItems),
      );
      console.log(photo.path, ' Photo Path');
    } catch (e) {
      console.log(e, 'Error');
    }
    try {
      const photo = await camera.current.takePhoto();
      setPhotoPath(photo.path);
      console.log(photo.path, 'Photo Path');
    } catch (e) {
      console.log(e);
    }
  };

  const handleStopVideo = async () => {
    setIsVideoStart(false);
    try {
      await camera.current.stopRecording();
    } catch (e) {
      console.log(e);
    }
  };

  const handleRecordVideo = async () => {
    console.log('Record Video');
    try {
      setIsVideoStart(true);
      camera.current.startRecording({
        flash: 'on',
        onRecordingFinished: video => {
          setVideoPath(video.path);
          const updatedGalleryItems = [
            ...galleryItems,
            {type: 'video', path: video.path},
          ];
          setGalleryItems(updatedGalleryItems);
          AsyncStorage.setItem(
            'galleryItems',
            JSON.stringify(updatedGalleryItems),
          );
        },
        onRecordingError: error => console.error(error),
      });
    } catch (e) {
      console.log(e);
    }
  };

  console.log(videoPath, 'Vi path');
  console.log(galleryItems, 'Galary');

  return (
    <ScrollView>
      <View
        style={{
          height: 60,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#0083A3',
          marginBottom: 10,
        }}>
        <Text style={{fontSize: 18, color: 'white'}}>Camera App</Text>
      </View>
      {camera && cameraDevice && (
        <Camera
          ref={camera}
          style={[styles.camera, styles.photoAndVideoCamera]}
          device={cameraDevice}
          isActive
          photo
          video
        />
      )}
      <View>
        <View style={styles.btnGroup}>
          <TouchableOpacity style={styles.btn} onPress={handleTakePhoto}>
            <Text style={styles.btnText}>Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={isVideoStart ? handleStopVideo : handleRecordVideo}>
            <Text style={styles.btnText}>
              {isVideoStart ? 'Stop Video' : 'Record Video'}
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => setIsGalleryModalVisible(true)}>
            <Text style={styles.btnText}>Open Gallery</Text>
          </TouchableOpacity>
        </View>

        <Modal
          animationType="slide"
          transparent={false}
          visible={isGalleryModalVisible}
          onRequestClose={() => setIsGalleryModalVisible(false)}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity
              style={{
                height: 60,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#0083A3',
              }}
              onPress={() => setIsGalleryModalVisible(false)}>
              <Text style={{fontSize: 18, color: 'white'}}>Back To Home</Text>
            </TouchableOpacity>
            <FlatList
              data={galleryItems.filter(
                item => item.type === 'photo' || item.type === 'video',
              )}
              keyExtractor={(item, index) => index.toString()}
              numColumns={2}
              renderItem={({item}) => {
                return (
                  <View
                    style={{
                      width: Dimensions.get('window').width / 2 - 20,
                      height: 200,
                      borderRadius: 10,
                      backgroundColor: '#A4E0EB',
                      margin: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {item.type === 'photo' ? (
                      <Image
                        source={{uri: 'file://' + item.path}}
                        style={{width: '95%', height: '95%'}}
                      />
                    ) : (
                      <Video
                        source={{uri: item.path}}
                        style={{width: '95%', height: '95%'}}
                        resizeMode="cover"
                        controls
                      />
                    )}
                  </View>
                );
              }}
            />
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};
export default UpdatedCamera;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
  },

  caption: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captionText: {
    color: '#100F0F',
    fontSize: 16,
    fontWeight: '600',
  },
  camera: {
    height: 460,
    width: '92%',
    alignSelf: 'center',
  },

  image: {
    marginHorizontal: 16,
    paddingTop: 8,
    width: 80,
    height: 80,
  },

  btnGroup: {
    margin: 16,
    flexDirection: 'row',
  },
  btn: {
    backgroundColor: '#0083A3',
    margin: 13,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 8,
  },
  btnText: {
    color: '#ffffff',
    fontSize: 20,
    textAlign: 'center',
  },
});
