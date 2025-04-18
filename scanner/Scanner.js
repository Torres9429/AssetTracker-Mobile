import { CameraView, useCameraPermissions } from "expo-camera";
import React, { useState } from "react";
import {
  StyleSheet, Text, TouchableOpacity, View, Modal, TextInput, Alert, Image, KeyboardAvoidingView,
  ScrollView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback, ImageBackground
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import edificios from '../data/edificios';
import CustomModal from "../components/Modal";
import ScannerCamera from "../components/ScannerCamera";

export default function Scanner() {
  const [scanned, setScanned] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [modalVisible, setModalVisible] = useState(false);
  const [code, setCode] = useState('');
  const [recurso, setRecurso] = useState(null);
  const navigation = useNavigation();

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Necesitamos acceso a la cámara</Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Conceder Permiso</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const buscarRecurso = (codigo) => {
    for (const edificio of edificios) {
      for (const espacio of edificio.espacios) {
        for (const inventario of espacio.inventarios || []) {
          if (inventario.recursos) {
            const recursoEncontrado = inventario.recursos.find((recurso) => recurso.codigo === codigo);
            if (recursoEncontrado) {
              return recursoEncontrado;
            }
          }
        }
      }
    }
    return null; // Solo devolver null si no se encontró en toda la estructura
  };
  
  function handleBarCodeScanned({ type, data }) {
    if (!scanned) {
      setScanned(true);
      
      const recursoEncontrado = buscarRecurso(data);
      setRecurso(recursoEncontrado); // Guardar el recurso (si se encontró o null)
  
      if (recursoEncontrado) {
        setModalVisible(true); // Solo abrir el modal si el recurso fue encontrado
      } else {
        Alert.alert("Recurso no encontrado", "No se encontró ningún recurso con ese código.");
      }
  
      setTimeout(() => {
        setScanned(false);
      }, 3000);
    }
  }
  

  const handleIngresarCodigo = () => {
    const recursoEncontrado = buscarRecurso(code);
    if (recursoEncontrado) {
      setRecurso(recursoEncontrado);
      setModalVisible(true);
    } else {
      Alert.alert('Recurso no encontrado', 'No se encontró ningún recurso con ese código.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            {/*<CameraView
            style={styles.camera}
            barcodeScannerSettings={{
              barcodeTypes: ['qr', 'ean13', 'code128', 'upc_a'],
            }}
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          >
            {/* Overlay Oscuro }
            <View style={styles.overlay}>
              <View style={styles.scanBox}>
                {/* Esquinas del cuadro }
                <View style={[styles.corner, styles.topLeft]} />
                <View style={[styles.corner, styles.topRight]} />
                <View style={[styles.corner, styles.bottomLeft]} />
                <View style={[styles.corner, styles.bottomRight]} />
              </View>
            </View>
          </CameraView>*/}
            <ScannerCamera
              scanned={scanned}
              handleBarCodeScanned={handleBarCodeScanned}
              handleRecursoEncontrado={setRecurso} // Actualiza el estado en Scanner
              edificios={edificios}
            />

            {/* Botón de acción */}
            <View style={styles.inputContainer}>
              <MaterialCommunityIcons name="barcode" size={24} color="#555" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Ingrese el código"
                placeholderTextColor="#777"
                value={code}
                onChangeText={setCode}
              />
            </View>
            <TouchableOpacity style={styles.actionButton} onPress={handleIngresarCodigo}>
              <Text style={styles.actionButtonText}>→</Text>
            </TouchableOpacity>

            {/* Modal para información 
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
                <TouchableOpacity style={styles.closeButton} onPress={() => (setModalVisible(false), setRecurso(null))}>
                  <MaterialCommunityIcons name="close-circle" size={34} color="white" style={styles.closeButtonText} />
                </TouchableOpacity>
                
              </View>
            </View>
          </Modal>*/}
            {/**/<CustomModal
              modalVisible={modalVisible}
              recurso={recurso}
              setModalVisible={setModalVisible}
            />}
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView >
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", backgroundColor: "white" },
  camera: { flex: 1, top: 0 },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0)", // Más oscuro
  },
  scanBox: {
    width: 250,
    height: 120,
    position: "relative",
    backgroundColor: "transparent", // Totalmente transparente
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0)",
  },
  corner: {
    position: "absolute",
    width: 25,
    height: 25,
    borderColor: "white",
  },
  mainButton: {
    backgroundColor: '#152567',
    padding: 12,
    borderRadius: 25,
    alignItems: 'center',
    width: '100%',
    marginTop: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    position: 'absolute'
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputContainer: {
    bottom: 80,
    right: 31,
    backgroundColor: "#ff3b30",
    width: 40,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
    width: '80%',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    position: 'absolute',
    alignSelf: 'center'
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    color: '#333',
    width: '60%'
  },
  icon: {
    marginRight: 10,
  },
  topLeft: { top: 0, left: 0, borderTopWidth: 4, borderLeftWidth: 4 },
  topRight: { top: 0, right: 0, borderTopWidth: 4, borderRightWidth: 4 },
  bottomLeft: { bottom: 0, left: 0, borderBottomWidth: 4, borderLeftWidth: 4 },
  bottomRight: { bottom: 0, right: 0, borderBottomWidth: 4, borderRightWidth: 4 },
  actionButton: {
    position: "absolute",
    bottom: 80,
    right: 29,
    backgroundColor: "#152567",
    width: 50,
    height: 50,
    borderTopEndRadius: 10,
    borderBottomEndRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  actionButtonText: { fontSize: 24, color: "white", fontWeight: "bold" },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalBackground: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "cover",
  },
  modalContent: {
    width: '100%',
    height: '60%',
    backgroundColor: "#152567",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
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
