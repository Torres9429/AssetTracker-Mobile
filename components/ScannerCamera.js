import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useFocusEffect } from "@react-navigation/native";

export default function ScannerCamera({ scanned, handleBarCodeScanned, handleRecursoEncontrado, edificios }) {
    const [codigoEscaneado, setCodigoEscaneado] = useState(null);
    /*useEffect(() => {
      return () => {
        cameraRef?.current?.pausePreview?.(); // Asegura que se detenga
      };
    }, []);*/
  
    // Función para buscar el recurso en la lista de edificios
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
      return null;
    };
  
    // Ejecuta la búsqueda automática cuando se escanea un código
    useEffect(() => {
        if (codigoEscaneado) {
          const recursoEncontrado = buscarRecurso(codigoEscaneado) || {}; // Asegura que sea un objeto
          handleRecursoEncontrado(recursoEncontrado);
          setCodigoEscaneado(null);
        }
      }, [codigoEscaneado]);
      
  
      function handleScan({ type, data }) {
        if (!scanned && data) { // Solo ejecuta si data no es undefined
          //setCodigoEscaneado(data);
          handleBarCodeScanned({ type, data });         
        }
      }
      
    

    return (
        <CameraView
            style={styles.camera}
            barcodeScannerSettings={{
                barcodeTypes: ['qr', 'ean13', 'code128', 'upc_a'],
              }}
              onBarcodeScanned={scanned ? undefined : handleScan}
        >
            {/* Overlay Oscuro */}
            <View style={styles.overlay}>
                <View style={styles.scanBox}>
                    {/* Esquinas del cuadro */}
                    <View style={[styles.corner, styles.topLeft]} />
                    <View style={[styles.corner, styles.topRight]} />
                    <View style={[styles.corner, styles.bottomLeft]} />
                    <View style={[styles.corner, styles.bottomRight]} />
                </View>
            </View>
        </CameraView>
    );
};

const styles = StyleSheet.create({
    camera: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0)', // Más oscuro
    },
    scanBox: {
        width: 250,
        height: 120,
        position: 'relative',
        backgroundColor: 'transparent', // Totalmente transparente
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0)', // Borde ligero
    },
    corner: {
        position: 'absolute',
        width: 25,
        height: 25,
        borderColor: 'white',
    },
    topLeft: { top: 0, left: 0, borderTopWidth: 4, borderLeftWidth: 4 },
    topRight: { top: 0, right: 0, borderTopWidth: 4, borderRightWidth: 4 },
    bottomLeft: { bottom: 0, left: 0, borderBottomWidth: 4, borderLeftWidth: 4 },
    bottomRight: { bottom: 0, right: 0, borderBottomWidth: 4, borderRightWidth: 4 },
});
