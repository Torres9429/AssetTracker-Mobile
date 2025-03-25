import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function CambiarContrasenaScreen() {
    const navigation = useNavigation();
    const [contrasenaActual, setContrasenaActual] = useState('');
    const [nuevaContrasena, setNuevaContrasena] = useState('');
    const [confirmarContrasena, setConfirmarContrasena] = useState('');
    const [error, setError] = useState('');

    const handleSave = () => {
        if (nuevaContrasena !== confirmarContrasena) {
            setError('Las contraseñas no coinciden');
            return;
        }
        if (nuevaContrasena.length < 6) {
            setError('La nueva contraseña debe tener al menos 6 caracteres');
            return;
        }
        setError('');
        console.log('Contraseña cambiada correctamente');
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Cambiar Contraseña</Text>
            </View>

            <View style={styles.profileCard}>
                <Ionicons name="lock-closed-outline" color="#416FDF" size={100} />
                <View style={styles.formContainer}>
                    <Text style={styles.label}>Contraseña Actual</Text>
                    <TextInput
                        style={styles.input}
                        value={contrasenaActual}
                        onChangeText={setContrasenaActual}
                        placeholder="Ingresa tu contraseña actual"
                        placeholderTextColor="#999"
                        secureTextEntry
                    />

                    <Text style={styles.label}>Nueva Contraseña</Text>
                    <TextInput
                        style={styles.input}
                        value={nuevaContrasena}
                        onChangeText={setNuevaContrasena}
                        placeholder="Ingresa tu nueva contraseña"
                        placeholderTextColor="#999"
                        secureTextEntry
                    />

                    <Text style={styles.label}>Confirmar Nueva Contraseña</Text>
                    <TextInput
                        style={styles.input}
                        value={confirmarContrasena}
                        onChangeText={setConfirmarContrasena}
                        placeholder="Confirma tu nueva contraseña"
                        placeholderTextColor="#999"
                        secureTextEntry
                    />

                    {error ? <Text style={styles.errorText}>{error}</Text> : null}

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
    errorText: {
        color: 'red',
        fontSize: 14,
        marginBottom: 10,
    },
});
