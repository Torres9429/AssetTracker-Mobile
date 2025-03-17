import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import Scanner from '../scanner/Scanner';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import edificios from '../data/edificios';

export default function EscanearScreen() {
    const [isScanning, setIsScanning] = useState(false);
    const [code, setCode] = useState('');
    const [recurso, setRecurso] = useState(null);

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

    const handleIngresarCodigo = () => {
        const recursoEncontrado = buscarRecurso(code);
        if (recursoEncontrado) {
            setRecurso(recursoEncontrado);
            Alert.alert('Recurso encontrado', `Código: ${recursoEncontrado.codigo}\nNombre: ${recursoEncontrado.nombre}`);
        } else {
            Alert.alert('Recurso no encontrado', 'No se encontró ningún recurso con ese código.');
        }
    };

    return (
        <View style={styles.container}>
            {/* Mostrar fondo solo cuando NO se escanea */}
            {!isScanning && (
                <ImageBackground
                    source={require('../assets/backgroundSecondary.png')}
                    style={styles.background}
                    resizeMode='cover'
                >
                    <View style={styles.overlay}>
                        <View style={styles.inputWrapper}>
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
                            <TouchableOpacity style={styles.mainButton} onPress={handleIngresarCodigo}>
                                <Text style={styles.buttonText}>Buscar</Text>
                            </TouchableOpacity>
                            {recurso && (
                                <View style={styles.recursoContainer}>
                                    <Text style={styles.recursoTexto}>Código: {recurso.codigo}</Text>
                                    <Text style={styles.recursoTexto}>Nombre: {recurso.nombre}</Text>
                                    <Text style={styles.recursoTexto}>Marca: {recurso.marca}</Text>
                                    <Text style={styles.recursoTexto}>Modelo: {recurso.modelo}</Text>
                                    <Text style={styles.recursoTexto}>Número de Serie: {recurso.nSerie}</Text>
                                </View>
                            )}
                        </View>
                    </View>
                </ImageBackground>
            )}

            {/* Mostrar el Scanner cuando está activo */}
            {isScanning && <Scanner />}

            {/* Los botones SIEMPRE visibles */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.switchButton, !isScanning && styles.activeButton]}
                    onPress={() => setIsScanning(false)}
                >
                    <Text style={[styles.buttonText, !isScanning && styles.activeText]}>Ingresar Código</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.switchButton, isScanning && styles.activeButton]}
                    onPress={() => setIsScanning(true)}
                >
                    <Text style={[styles.buttonText, isScanning && styles.activeText]}>Escanear Código</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f1f1f1', 
    },
    inputWrapper: {
        width: '100%',
        alignItems: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 10,
        paddingHorizontal: 15,
        height: 50,
        width: '100%',
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    input: {
        flex: 1,
        padding: 10,
        fontSize: 16,
        color: '#333',
    },
    icon: {
        marginRight: 10,
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
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        marginBottom: 80, // Espacio abajo para evitar que tape el escáner
        width: '100%',
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0)', // Fondo semi-transparente
        padding: 10,
    },
    switchButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 25,
        alignItems: 'center',
        marginHorizontal: 5,
        backgroundColor: '#ccc',
        elevation: 2,
    },
    activeButton: {
        backgroundColor: '#416FDF',
    },
    activeText: {
        color: 'white',
        fontWeight: 'bold',
    },
    recursoContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    recursoTexto: {
        fontSize: 16,
        marginBottom: 5,
    },
});
