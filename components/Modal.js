import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Modal, Image, ImageBackground } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { useAnimatedStyle, withSpring } from 'react-native-reanimated';

const CustomModal = ({ modalVisible, recurso, setModalVisible, setRecurso }) => {
  const [modalHeight, setModalHeight] = useState(); // Iniciar el modal con un tamaño predeterminado
  const [dragY, setDragY] = useState(0); // Posición de desplazamiento Y

  const handleGestureEvent = (event) => {
    const { translationY } = event.nativeEvent;
    if (translationY < 0) {
      setModalHeight(Math.min("80%", `${Math.max(60, dragY + translationY)}%`)); // Limitar el tamaño máximo
    } else if (translationY > 100) {
      // Si se desliza hacia abajo más de un umbral, cerrar el modal
      setModalVisible(false);
    }
    setDragY(translationY); // Actualizar la posición de deslizamiento
  };

  /*const modalAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: withSpring(modalHeight), // Ajustar el tamaño animado del modal
    };
  });*/
  const getImageSource = (image) => {
    if (typeof image === 'string') {
      return { uri: image };
    }
    return image;
  };

  return (
    <Modal visible={modalVisible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        {/*<PanGestureHandler onGestureEvent={handleGestureEvent}>*/}
          <View style={[styles.modalContent, modalHeight]}>
            {recurso ? (
              <>
                <Text style={styles.modalTitle}>Recurso Encontrado</Text>
                <Text style={styles.modalText}>Código: {recurso.codigo}</Text>
                <Text style={styles.modalText}>Nombre: {recurso.nombre}</Text>
                <Text style={styles.modalText}>Marca: {recurso.marca}</Text>
                <Text style={styles.modalText}>Modelo: {recurso.modelo}</Text>
                <Text style={styles.modalText}>Número de Serie: {recurso.nSerie}</Text>
              </>
            ) : (
              <Text style={[styles.modalText, {alignSelf: 'center',} ]}>No se encontró ningún recurso.</Text>
            )}
            <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "center", width: '100%' }}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => {
                  setModalVisible(false);
                }}
              >
                <Text style={styles.closeButtonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        {/*</PanGestureHandler>*/}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalBackground: {
    width: '100%',
    height: '100%',
    justifyContent: "flex-end",
  },
  modalContent: {
    //flex: 1,
    width: '100%',
    height: '60%',
    //backgroundColor: "rgb(21, 37, 103)",
    backgroundColor: "white",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 40,
    alignItems: "flex-start",
  },
  modalTitle: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
    //alignSelf: 'center', 
    //color: 'white' 
    color: '#152567',

  },
  modalText: {
    fontSize: 18,
    //color: "#ffff" 
    //borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 10,
    width: '100%',
  },
  closeButton: {
    //position: "absolute",
    /*top: 30,
    right: 10,
    width: 40,
    height: 40,*/
    borderRadius: 15,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#152567",
    padding: 10,
    marginTop: 20,
    width: '100%',
    alignSelf: 'flex-end'
  },
  closeButtonText: {
    color: "#ffff",
    //color: "blue",
    fontWeight: "bold",
    right: 5,
    fontSize: 18,
    //top: 8
  },
  imagenRec: {
    height: 200,
    width: 200,
    alignSelf: 'center',
    top: 10
  }
});

export default CustomModal;