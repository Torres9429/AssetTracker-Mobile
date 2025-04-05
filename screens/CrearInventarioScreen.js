import React, { useEffect, useState } from 'react';
import * as FileSystem from 'expo-file-system';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, TextInput, Dimensions, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { saveInventario, updateInventario } from '../api/inventariosApi';  // Asegúrate de importar la API de inventarios
import { saveRecurso, getRecursos, getRecursoId } from '../api/recursosApi';  // Asegúrate de importar la API de recursos

const { width, height } = Dimensions.get('window');

export default function CrearInventarioScreen() {
    const [foto, setFoto] = useState(null); // Estado para guardar la foto
    const [newRecurso, setNewRecurso] = useState(''); // Estado para nuevo recurso

    const route = useRoute();
    const { espacioId, photoUri, inventarioId  } = route.params; 
    const [expandedIndex, setExpandedIndex] = useState(null);  // Estado para manejar el índice expandido

    const [recursos, setRecursos] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    console.log("Inventario creado con ID (recibido):", inventarioId);  // Verifica que el id del inventario se recibe correctamente
    
    useFocusEffect(
        React.useCallback(() => {
            const fetchRecursos = async () => {
                try {
                    const response = await getRecursoId(inventarioId);
                    console.log("Recursos obtenidos:", response.data.result);
                    setRecursos(response.data.result || []); // Asegúrate de que sea un array
                    setLoading(false);
                } catch (error) {
                    //console.error("Error obteniendo los recursos:", error);
                    setLoading(false);

                }
            };
    
            // Si hay una foto nueva, actualiza el estado
            if (photoUri) {
                setFoto(photoUri);  // Asegúrate de que esto sea la URI y no el objeto completo.
                console.log('Foto tomada:', photoUri);  // Revisa si la URI de la foto está llegando correctamente.
            }
    
            fetchRecursos();
        }, [photoUri])  // Dependencia para recargar si cambia la foto
    );

const handleSaveInventario = async () => {
    if (foto) {
        console.log('Guardando foto en el inventario:', foto);
        try {
            console.log('URI de la foto:', foto.uri);
            console.log('Tipo de la foto:', foto.type);
            console.log('Nombre de la foto:', foto.name);
            // Leer la foto como base64
            const fileData = await FileSystem.readAsStringAsync(foto.uri, {
                encoding: FileSystem.EncodingType.Base64,
            });

            const file = {
                uri: foto.uri,
                type: foto.type || 'image/jpeg', // Asegúrate del tipo
                name: foto.name || 'foto.jpg',
                base64: fileData, // Agregar base64 al archivo
            };
            console.log('Datos del archivo:', file);

            const response = await updateInventario(inventarioId, file);
            console.log('Respuesta de actualizar inventario:', response.data);

            if (response.data && response.data.result) {
                const updatedId = response.data.result.id;
                console.log('Inventario actualizado con ID:', updatedId);

                navigation.goBack(); // Regresar a la pantalla anterior
            }
        } catch (error) {
            console.error("Error actualizando el inventario:", error);
        }
    } else {
        alert('No se ha tomado una foto.');
    }
};

    
    

    const handleSaveRecurso = async (recursoData) => {
        try {
            // Guardar el recurso asociado al inventario
            await saveRecurso({ inventarioId: espacioId, ...recursoData });
            console.log("Recurso guardado.");
        } catch (error) {
            console.error("Error guardando recurso:", error);
        }
    };

    const handleTakePhoto = (uri) => {
        console.log('Foto recibida en CrearInventarioScreen:', uri);
        setFoto(uri);  // Guardar la URI de la foto en el estado
      };
      

    const agregarRecurso = () => {
        if (newRecurso.trim()) {
            const recursoData = { nombre: newRecurso }; // Aquí puedes agregar más detalles del recurso
            handleSaveRecurso(recursoData);
            setNewRecurso('');
        } else {
            alert("Por favor ingrese un nombre para el recurso.");
        }
    };
    const renderRecurso = ({ item, index }) => (
            <View style={styles.recursoContainer}>
                <TouchableOpacity onPress={() => handleToggleDetails(index)}>
                    <Text style={styles.recursoTexto}>
                        {item.codigo || 'Sin código'} - {item.descripcion || 'Sin descripción'}
                    </Text>
                </TouchableOpacity>
                {expandedIndex === index && (
                    <View style={styles.detalleContainer}>
                        <Text style={styles.detalleTexto}>Código: {item.codigo || 'Sin código'}</Text>
                        <Text style={styles.detalleTexto}>Marca: {item.marca || 'Desconocida'}</Text>
                        <Text style={styles.detalleTexto}>Modelo: {item.modelo || 'Desconocido'}</Text>
                        <Text style={styles.detalleTexto}>Número de serie: {item.numeroSerie || 'Desconocido'}</Text>
                        <Text style={styles.detalleTexto}>Observaciones: {item.observaciones || 'Sin observaciones'}</Text>
                        <Text style={styles.detalleTexto}>Responsable: {item.nombreResponsable || 'No encontrado'}</Text>
                        <Text style={styles.detalleTexto}>Espacio: {espacioNombre || 'Sin espacio'}</Text>
                        <Text style={styles.detalleTexto}>Edificio: {edificioNombre || 'Sin edificio'}</Text>
                    </View>
                )}
            </View>
        );

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground
                source={require('../assets/backgroundSecondary.png')}
                style={styles.container}
                resizeMode="cover"
            >
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </TouchableOpacity>
                    <TextInput
                        style={styles.input}
                        placeholder="Nuevo recurso"
                        value={newRecurso}
                        onChangeText={setNewRecurso}
                    />
                    <TouchableOpacity
                        style={{ backgroundColor: '#152567', padding: 12, flexDirection: 'row', borderRadius: 25 }}
                        onPress={() => navigation.navigate('Agregar', {inventarioId: inventarioId})}
                    >
                        <Ionicons name="add" size={20} color="white" />
                        <Text style={{ color: 'white', fontSize: 16 }}>Recurso</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ backgroundColor: '#152567', left: 10, padding: 12, flexDirection: 'row', borderRadius: 25 }} onPress={() => navigation.navigate('CameraScreen', { onPhotoTaken: handleTakePhoto })}>
                        <Ionicons name="camera" size={20} color="white" />
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={recursos}
                    renderItem={renderRecurso}
                    keyExtractor={(item, index) => index.toString()}
                />

                {/* Muestra la foto si se ha tomado */}
                {foto && <Image source={{ uri: foto.uri }} style={styles.foto} />}


                <TouchableOpacity style={styles.saveButton} onPress={handleSaveInventario}>
                    <Text style={styles.saveText}>Guardar Inventario</Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        marginTop: 50,
        marginHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingHorizontal: 10,
    },
    addButton: {
        backgroundColor: '#152567',
        padding: 10,
        borderRadius: 20,
    },
    recurso: {
        fontSize: 18,
        color: '#152567',
        marginBottom: 10,
    },
    foto: {
        width: 200,
        height: 200,
        borderRadius: 10,
        marginVertical: 10,
        alignSelf: 'center',
        bottom:70,
    },
    saveButton: {
        backgroundColor: '#416FDF',
        padding: 12,
        borderRadius: 25,
        alignItems: 'center',
        marginTop: 20,
        bottom: 80,
    },
    saveText: {
        color: 'white',
        fontSize: 16,
    },
    recursoContainer: {
        alignSelf: 'flex-start',
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        padding: 10,
        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 3,
        width: '100%',
    },
    recursoTexto: {
        fontSize: 20,
        color: '#152567',
        marginTop: 4,
        fontWeight: '600',
    },
    detalleContainer: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
    },
    detalleTexto: {
        fontSize: 16,
        color: '#333',
        marginBottom: 6,
        fontWeight: '400',
    },containerData: {
        flex: 1,
        marginBottom: 80,
        width: '100%',
    },
    listContent: {
        paddingBottom: 30,
        paddingHorizontal: 10,
    },
});
