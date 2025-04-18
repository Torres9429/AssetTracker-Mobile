import React, { useCallback, useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    FlatList,
    ImageBackground,
    TouchableOpacity,
    Dimensions,
    KeyboardAvoidingView,
    Keyboard,
    Platform,
    TouchableWithoutFeedback,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { contarRecursos, getRecursoId, getRecursos } from '../api/recursosApi';
import { getResponsable } from '../api/responsablesApi';
import { getEdificiosId } from '../api/edificios';
import { getEspacios, getEspaciosId } from '../api/espaciosApi';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { updateInventario } from '../api/inventariosApi';
import * as FileSystem from 'expo-file-system';

const { width, height } = Dimensions.get('window');

export default function InventariosScreen() {
    const [search, setSearch] = useState('');
    const navigation = useNavigation();
    const [recursos, setRecursos] = useState([]);
    const [loading, setLoading] = useState(true); // Estado para manejar la carga
    const [responsable, setResponsable] = useState('');
    const route = useRoute();
    const [expandedIndex, setExpandedIndex] = useState(null);  // Estado para manejar el índice expandido
    const { inventario, photoUri } = route.params || {};
    const [foto, setFoto] = useState(null);  // Estado para manejar la foto

    const [keyBoardVisible, setKeyBoardVisible] = useState();
    const [espacioNombre, setEspacioNombre] = useState('');
    const [edificioNombre, setEdificioNombre] = useState('');
    const [modoEdicion, setModoEdicion] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setKeyBoardVisible(true);
        });

        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyBoardVisible(false);
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    // Verifica que inventarios sea un array
    /*if (!Array.isArray(inventario)) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>No se encontraron inventarios.</Text>
            </View>
        );
    }*/


    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                if (!inventario || !inventario.id) {
                    console.error('Error: El parámetro inventario no está definido correctamente.');
                    return;
                }

                try {
                    console.log('Inventario ID recibido:', inventario.id);

                    // Obtener el espacio
                    const espacioId = inventario.espacio.id;
                    const espacioResponse = await getEspaciosId(espacioId);
                    const espacioData = espacioResponse.data.result;
                    setEspacioNombre(espacioData.nombre);

                    // Obtener el edificio
                    const edificioId = espacioData.edificio.id;
                    const edificioResponse = await getEdificiosId(edificioId);
                    const edificioData = edificioResponse.data.result;
                    setEdificioNombre(edificioData.nombre);

                    // Obtener recursos del inventario
                    const response = await getRecursoId(inventario.id);
                    const allRecursosResponse = response.data.result || [];

                    const filteredRecursos = allRecursosResponse.filter(
                        (recurso) => inventario.id === recurso.inventarioLevantado.id
                    );

                    const recursosConResponsables = await Promise.all(
                        filteredRecursos.map(async (recurso) => {
                            if (recurso.responsable && recurso.responsable.id) {
                                try {
                                    const response = await getResponsable(recurso.responsable.id);
                                    const nombre = response?.data?.result?.nombre || 'No encontrado';
                                    return { ...recurso, nombreResponsable: nombre };
                                } catch {
                                    return { ...recurso, nombreResponsable: 'Error al obtener' };
                                }
                            } else {
                                return { ...recurso, nombreResponsable: 'Sin responsable' };
                            }
                        })
                    );

                    setRecursos(recursosConResponsables);
                    if (photoUri) {
                        setFoto(photoUri);  // Asegúrate de que esto sea la URI y no el objeto completo.
                        console.log('Foto tomada:', photoUri);  // Revisa si la URI de la foto está llegando correctamente.
                    }
                } catch (error) {
                    setRecursos([]);
                } finally {
                    setLoading(false);
                }
            };

            fetchData();

            // No cleanup needed
        }, [inventario?.id])
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

                const response = await updateInventario(inventario.id, file);
                console.log('Respuesta de actualizar inventario:', response.data);

                if (response.data && response.data.result) {
                    const updatedId = response.data.result.id;
                    console.log('Inventario actualizado con ID:', updatedId);

                    navigation.goBack(); // Regresar a la pantalla anterior
                }
                setModoEdicion(false); // Cambiar a modo no edición
            } catch (error) {
                console.error("Error actualizando el inventario:", error);
            }
        } else {
            alert('No se ha tomado una foto.');
        }
    };

    const filteredInventarios = recursos.filter((recurso) => {
        const codigo = recurso.codigo ? recurso.codigo.toLowerCase() : '';
        const descripcion = recurso.descripcion ? recurso.descripcion.toLowerCase() : '';
        const searchText = search.toLowerCase();

        return codigo.includes(searchText) || descripcion.includes(searchText);
    });

    const handleToggleDetails = (index) => {
        if (expandedIndex === index) {
            setExpandedIndex(null);  // Si ya está expandido, lo colapsamos
        } else {
            setExpandedIndex(index);  // Expande el detalle del recurso
        }
    };

    const handleTakePhoto = (uri) => {
        console.log('Foto recibida en CrearInventarioScreen:', uri);
        setFoto(uri);  // Guardar la URI de la foto en el estado
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
                resizeMode={keyBoardVisible ? 'cover' : 'cover'}
                imageStyle={{ width: keyBoardVisible ? width : '100%', height: keyBoardVisible ? height : '100%' }}
            >
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={{ flex: 1 }}>
                            {/* Header */}
                            <View style={styles.header}>
                                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                                    <Ionicons name="arrow-back" size={24} color="white" />
                                </TouchableOpacity>
                                <View style={styles.searchBarContainer}>
                                    <Ionicons name="search" size={20} color="#416FDF" style={styles.searchIcon} />
                                    <TextInput
                                        style={styles.searchBar}
                                        placeholder="Buscar recurso..."
                                        placeholderTextColor="#999"
                                        value={search}
                                        onChangeText={setSearch}
                                    />
                                </View>
                                {/* Botones condicionales */}
                                {!modoEdicion ? (
                                    <TouchableOpacity onPress={() => setModoEdicion(true)} style={{ backgroundColor: '#152567', padding: 12, flexDirection: 'row', borderRadius: 25, alignContent: 'center', justifyContent: 'center' }}>
                                        {/*<Ionicons name="pencil" size={24} color="white" />*/}
                                        <MaterialCommunityIcons name="pencil" size={24} color="white" />
                                    </TouchableOpacity>
                                ) : (
                                    <View style={styles.editActions}>
                                        <TouchableOpacity onPress={() => navigation.navigate('Agregar', { inventarioId: inventario.id })} style={{ backgroundColor: '#152567', padding: 12, flexDirection: 'row', borderRadius: 25, marginRight: 5 }}>
                                            <Ionicons name="add" size={24} color="white" />
                                        </TouchableOpacity>

                                        <TouchableOpacity style={{ backgroundColor: '#152567', padding: 12, flexDirection: 'row', borderRadius: 25, marginRight: 5 }} onPress={() => navigation.navigate('CameraScreen', { onPhotoTaken: handleTakePhoto })}>
                                            <Ionicons name="camera" size={24} color="white" />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={handleSaveInventario} style={{ backgroundColor: '#152567', padding: 12, flexDirection: 'row', borderRadius: 25 }}>
                                            {/*<Ionicons name="save-outline" size={24} color="white" />*/}
                                            <MaterialCommunityIcons name="content-save-edit" size={24} color="white" />
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </View>

                            <View style={styles.containerData}>
                                {/* Inventarios */}
                                <Text style={styles.sectionTitle}>Recursos del inventario</Text>
                                <FlatList
                                    data={filteredInventarios}
                                    renderItem={renderRecurso}
                                    keyExtractor={(item, index) => index.toString()}
                                    contentContainerStyle={styles.listContent}
                                    showsVerticalScrollIndicator={false}
                                />
                            </View>
                            {/* Muestra la foto si se ha tomado */}
                            {foto && <Image source={{ uri: foto.uri }} style={styles.foto} />}
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </ImageBackground>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    errorText: {
        fontSize: 18,
        color: 'red',
    },
    header: {
        marginTop: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
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
        //paddingVertical: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
        flex: 1,
        marginRight: 10,
        maxWidth: '100%',
        maxHeight: 47,
        minWidth: '40%',
        minHeight: 47,
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
    editActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    containerData: {
        flex: 1,
        marginBottom: 80,
        width: '100%',
    },
    listContent: {
        paddingBottom: 30,
        paddingHorizontal: 10,
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
    },
    foto: {
        width: 200,
        height: 200,
        borderRadius: 10,
        marginVertical: 10,
        alignSelf: 'center',
        bottom: 70,
    },
});
