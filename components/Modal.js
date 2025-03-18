import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Modal, Image, ImageBackground } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CustomModal = ({ modalVisible, recurso, setModalVisible, setRecurso }) => {
  const getImageSource = (image) => {
    if (typeof image === 'string') {
      return { uri: image };
    }
    return image;
  };

  return (
    <Modal visible={modalVisible} transparent animationType="slide">
      <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {recurso ? (
              <>
                <Text style={styles.modalTitle}>Recurso Encontrado</Text>
                <Text style={styles.modalText}>Código: {recurso.codigo}</Text>
                <Text style={styles.modalText}>Nombre: {recurso.nombre}</Text>
                <Text style={styles.modalText}>Marca: {recurso.marca}</Text>
                <Text style={styles.modalText}>Modelo: {recurso.modelo}</Text>
                <Text style={styles.modalText}>Número de Serie: {recurso.nSerie}</Text>
                <Image source={getImageSource(recurso.image)} style={styles.imagenRec} />
              </>
            ) : (
              <Text style={styles.modalText}>No se encontró ningún recurso.</Text>
            )}
            <TouchableOpacity style={styles.closeButton} onPress={() => { setModalVisible(false) }}>
              <MaterialCommunityIcons name="close-circle" size={34} color="white" style={styles.closeButtonText} />
            </TouchableOpacity>
          </View>
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
    width: '100%',
    height: '60%',
    backgroundColor: "rgb(21, 37, 103)",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 40,
    alignItems: "flex-start",
  },
  modalTitle: { fontSize: 25, fontWeight: "bold", marginBottom: 10, alignSelf: 'center', color: 'white' },
  modalText: { fontSize: 14, color: "#ffff" },
  closeButton: {
    position: "absolute",
    top: 30,
    right: 10,
    width: 40,
    height: 40,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    color: "#ffff",
    fontWeight: "bold",
    right: 5,
    top: 8
  },
  imagenRec: {
    height: 200,
    width: 200,
    alignSelf: 'center',
    top: 10
  }
});

export default CustomModal;