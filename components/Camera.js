import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function CameraComponent() {
  const [facing, setFacing] = useState('back');
  const cameraRef = useRef(null);
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [pictureTaken, setPictureTaken] = useState(false);
  const navigation = useNavigation();
const route = useRoute();
  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  /*async function handlePictureTaken() {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        console.log("Photo taken:", photo.uri);
        setPictureTaken(true);
      } catch (error) {
        console.error("Error taking picture:", error);
      }
    }
  }*/
    /*async function handlePictureTaken() {
      if (cameraRef.current) {
        try {
          
          const photo = await cameraRef.current.takePictureAsync();
        console.log("Photo taken:", photo.uri);
        setPictureTaken(true);

        // Llama al callback pasado desde la pantalla anterior
        const { onPhotoTaken } = route.params || {};
        if (onPhotoTaken) {
          onPhotoTaken(photo.uri);
        }
        // Regresa a la pantalla anterior
        navigation.goBack();
        } catch (error) {
          console.error("Error taking picture:", error);
        }
      }
    }*/
      async function handlePictureTaken() {
        if (cameraRef.current) {
          try {
            const photo = await cameraRef.current.takePictureAsync();
            console.log("Photo taken:", photo.uri);
            setPictureTaken(true);
      
            // Llama al callback pasado desde la pantalla anterior
            const { onPhotoTaken } = route.params || {};
            if (onPhotoTaken) {
              onPhotoTaken(photo.uri);  // Pasa la URI de la foto al callback
            }
      
            // Regresa a la pantalla anterior
            navigation.goBack();
          } catch (error) {
            console.error("Error taking picture:", error);
          }
        }
      }
      
    

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} mode='picture' ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={40} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handlePictureTaken}>
            <Ionicons name="radio-button-on" size={40} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Ionicons name="sync" size={40} color="white" />
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',  // Asegura que el fondo sea negro
  },
  camera: {
    flex: 1,
    width: '100%',
    height: '100%',  // Ocupa toda la pantalla
  },
  buttonContainer: {
    position: 'absolute',  // Asegura que los botones se ubiquen sobre la cámara
    bottom: 50,  // Ajusta la distancia desde el fondo
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  button: {
    padding: 10,
    alignSelf: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
