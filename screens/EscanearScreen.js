import { CameraView, useCameraPermissions } from "expo-camera";
import React, { useCallback, useState } from "react";
import {
  StyleSheet, Text, TouchableOpacity, View, Modal, TextInput, Alert, Image, KeyboardAvoidingView,
  ScrollView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback, ImageBackground
} from "react-native";
import { useFocusEffect, useIsFocused, useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import edificios from '../data/edificios';
import CustomModal from "../components/Modal";
import ScannerCamera from "../components/ScannerCamera";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { getRecursos } from "../api/recursosApi";

export default function EscanearScreen() {
  const [scanned, setScanned] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [modalVisible, setModalVisible] = useState(false);
  const [code, setCode] = useState('');
  const [recurso, setRecurso] = useState(null);
  const navigation = useNavigation();
  const [key, setKey] = React.useState(0);
  const isFocused = useIsFocused(); // Hook para verificar si la pantalla está enfocada

  const reiniciarComponente = () => setKey(prevKey => prevKey + 1);

  //Reiniciar componentes para evitar fallas
  useFocusEffect(
    useCallback(() => {
      console.log("Pantalla enfocada, reiniciando scanner...");
      setScanned(false); // Restablece el estado del escáner
      setModalVisible(false);
      setCode('');
      setRecurso(null);

      return () => {
        console.log("Pantalla desenfocada, limpiando scanner...");
        setScanned(false); // Opcional: asegurarse de que se limpie
      };
    }, [])
  );

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

  const buscarRecurso = async (codigo) => {
    const response = await getRecursos();
    const allRecursos = response.data.result || []; // Asegurar que sea un array
    console.log("Recursos obtenidos:", allRecursos);

    // Buscar el recurso que coincida con el código
    const recursoEncontrado = allRecursos.find(recurso => recurso.codigo === codigo);
    console.log("Recurso encontrado:", recursoEncontrado);

    if (recursoEncontrado && recursoEncontrado.length > 0 || recursoEncontrado != null || undefined || "") {  
      setRecurso(recursoEncontrado); // Guardar el recurso encontrado
      return recursoEncontrado; // Retorna el recurso encontrado

    }
    return null; // Retorna null si no se encontró ningún recurso
};



async function handleBarCodeScanned({ type, data }) {
  if (!scanned) {
    setScanned(true);

    const recursoEncontrado = await buscarRecurso(data);
    console.log("Recurso encontrado:", recursoEncontrado); // Verifica el recurso encontrado
    if (recursoEncontrado && recursoEncontrado.length > 0 || recursoEncontrado != null || undefined || "") {
      setRecurso(recursoEncontrado); // Guardar el recurso encontrado
    }
    //setRecurso(recursoEncontrado); 

    if (recursoEncontrado) {
      setModalVisible(true);
    } else {
      setRecurso(null); // Si no se encuentra el recurso, establece null
      setModalVisible(true);  
    }

    setTimeout(() => {
      setScanned(false); // Permitir escanear nuevamente
    }, 1500); // Aumenta un poco el tiempo para evitar doble escaneo
  }
}



  const handleIngresarCodigo = () => {
    const recursoEncontrado = buscarRecurso(code);
    if (recursoEncontrado != null || undefined || "" || recursoEncontrado.length > 0) {
      setRecurso(recursoEncontrado);
      setModalVisible(true);
    } else {
      //Alert.alert('Recurso no encontrado', 'No se encontró ningún recurso con ese código.');
      setRecurso(null);
      setModalVisible(true)
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
          <View style={styles.container} key={key}>
            {/* Componente del scanner|cámara */}
            <ScannerCamera
              scanned={scanned}
              handleBarCodeScanned={handleBarCodeScanned}
              handleRecursoEncontrado={setRecurso} // Actualiza el estado en Scanner
              edificios={edificios}
              key={key}
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

            {/* Modal para información  (componente) */}
            <CustomModal
              modalVisible={modalVisible}
              recurso={recurso}
              setModalVisible={setModalVisible}
            />
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
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  scanBox: {
    width: 250,
    height: 120,
    position: "relative",
    backgroundColor: "transparent",
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
    alignContent: "center",
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
