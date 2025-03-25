import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function EdicionPerfilScreen({ route }) {
    const { usuario } = route.params;
    const [nombre, setNombre] = useState(usuario.nombre);
    const [apellidos, setApellidos] = useState(usuario.apellidos);

    const navigation = useNavigation();

    const handleSave = () => {
        console.log('Datos guardados:', { nombre, apellidos });
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Editar Perfil</Text>
            </View>

            <View style={styles.profileCard}>
                <Ionicons name="person-circle" color="#416FDF" size={100} />
                <View style={styles.formContainer}>
                    <Text style={styles.label}>Nombre</Text>
                    <TextInput
                        style={styles.input}
                        value={nombre}
                        onChangeText={setNombre}
                        placeholder="Ingresa tu nombre"
                        placeholderTextColor="#999"
                    />

                    <Text style={styles.label}>Apellidos</Text>
                    <TextInput
                        style={styles.input}
                        value={apellidos}
                        onChangeText={setApellidos}
                        placeholder="Ingresa tus apellidos"
                        placeholderTextColor="#999"
                    />

                    <Text style={styles.label}>Correo</Text>
                    <TextInput
                        style={[styles.input, styles.disabledInput]}
                        value={usuario.correo}
                        editable={false}
                    />

                    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                        <Text style={styles.saveButtonText}>Guardar Cambios</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#416FDF',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        top: 40,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 10,
    },
    profileCard: {
        width: "100%",
        height: "100%",
        top: 40,
        backgroundColor: "white",
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        padding: 25,
        paddingTop: 50,
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    formContainer: {
        width: '100%',
        marginTop: 20,
    },
    label: {
        fontSize: 14,
        color: '#333',
        marginBottom: 5,
        fontWeight: 'bold',
    },
    input: {
        backgroundColor: 'white',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 14,
        color: '#333',
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    disabledInput: {
        backgroundColor: '#e0e0e0',
        color: '#757575',
    },
    saveButton: {
        backgroundColor: '#416FDF',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    saveButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
