import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, TextInput, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import ScannerCamera from '../components/ScannerCamera';

export default function AgregarRecursoScreen() {
    const [category, setCategory] = useState('');
    const [scanned, setScanned] = useState(false);
    const [code, setCode] = useState('');
    const navigation = useNavigation();
    const [key, setKey] = useState(0);
    useFocusEffect(
        useCallback(() => {
            console.log("Pantalla enfocada, reiniciando scanner...");
            setScanned(false); // Reactivar el escáner
            setCode('');

            return () => {
                console.log("Pantalla desenfocada, limpiando scanner...");
                setScanned(false); // Limpia el estado solo si la pantalla cambia
            };
        }, [])
    );



    const handleBarCodeScanned = (event) => {
        if (!event || !event.data) {
            console.warn("Código escaneado es inválido:", event);
            return;
        }
        setScanned(true);
        setCode(event.data);
    };



    return (
        <ImageBackground source={require('../assets/backgroundSecondary.png')} style={styles.container} resizeMode='cover'>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.title}>Agregar nuevo recurso</Text>
            </View>

            <View style={styles.containerData}>
                <ScrollView contentContainerStyle={styles.containerScroll}>
                    {/* Formulario */}
                    <View style={styles.form}>
                        <Text style={styles.scanText}>Escanear código</Text>
                        <View style={styles.card}>
                            {!scanned && (
                                <ScannerCamera
                                    key={scanned ? 'scanned' : 'not-scanned'}
                                    scanned={scanned}
                                    handleBarCodeScanned={handleBarCodeScanned}
                                    continuousScan={true}
                                />
                            )}
                        </View>
                        <Text style={styles.textInput}>Código</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Código"
                            value={code}
                            onChangeText={setCode}
                        />
                        <Text style={styles.textInput}>Descripción</Text>
                        <TextInput style={styles.input} placeholder="Descripción" />
                        <Text style={styles.textInput}>Marca</Text>
                        <TextInput style={styles.input} placeholder="Marca" />
                        <Text style={styles.textInput}>Modelo</Text>
                        <TextInput style={styles.input} placeholder="Modelo" />
                        <Text style={styles.textInput}>Observaciones</Text>
                        <TextInput style={styles.input} placeholder="Observaciones" />
                        <Text style={styles.textInput}>Categoría de recurso</Text>
                        <Picker
                            selectedValue={category}
                            onValueChange={(itemValue) => setCategory(itemValue)}
                            style={styles.input}
                        >
                            <Picker.Item label="Silla" value="Silla" />
                            <Picker.Item label="Mesa" value="Mesa" />
                        </Picker>
                        <TouchableOpacity style={styles.registerButton}>
                            <Text style={styles.registerButtonText}>Guardar</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    header: {
        marginTop: 50,
        marginHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
        left: 10
    },
    containerScroll: {
        paddingBottom: 10,
        marginBottom: 100
    },
    backButton: {
        marginRight: 10,
    },
    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 25,
        paddingHorizontal: 20,
        paddingVertical: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
        flex: 1,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchBar: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginHorizontal: 20,
        marginTop: 20,
    },
    containerData: {
        flex: 1,
        marginBottom: 80,
    },
    listContent: {
        paddingBottom: 30,
        paddingHorizontal: 10,

    },
    espacioContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        margin: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 3,
    },
    espacioImagen: {
        width: 70,
        height: 70,
        borderRadius: 12,
    },
    espacioNombre: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 8,
    },
    espacioDescripcion: {
        fontSize: 14,
        color: '#757575',
        fontWeight: '500',
        marginTop: 4,
    },
    scanText: {
        color: '#133E87',
        fontSize: 16,
        marginBottom: 10,
    },
    card: {
        width: '100%', // Ajusta el ancho al 100% del contenedor padre
        height: 300, // Ajusta la altura según sea necesario
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        overflow: 'hidden', // Asegúrate de que el contenido no se desborde
    },
    barcode: {
        width: 200,
        height: 100,
        resizeMode: 'contain',
    },
    form: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 0,
        paddingLeft: 20,
        paddingRight: 20
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#FFFF',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 10,
        color: '#637594',
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4
    },
    textInput: {
        color: '#133E87',
        fontSize: 16,
        textAlign: 'left',
        alignSelf: 'flex-start',
        margin: 5
    },
    registerButton: {
        backgroundColor: '#133E87',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginTop: 10,
    },
    registerButtonText: {
        color: '#FFF',
        fontSize: 16,
    },
});