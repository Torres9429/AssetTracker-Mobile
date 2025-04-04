import React, { useEffect, useState } from 'react';
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
import { useNavigation, useRoute } from '@react-navigation/native';
import { contarRecursos, getRecursoId, getRecursos } from '../api/recursosApi';
import { getResponsable } from '../api/responsablesApi';

const { width, height } = Dimensions.get('window');

export default function InventariosScreen() {
    const [search, setSearch] = useState('');
    const navigation = useNavigation();
    const [recursos, setRecursos] = useState([]);
    const [loading, setLoading] = useState(true); // Estado para manejar la carga
    const [responsable, setResponsable] = useState('');
    const route = useRoute();
    const [expandedIndex, setExpandedIndex] = useState(null);  // Estado para manejar el índice expandido
    const { inventario } = route.params || {};

    const [keyBoardVisible, setKeyBoardVisible] = useState();

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

    useEffect(() => {
        console.log('Inventario ID recibido:', inventario.id);
        if (!inventario || !inventario.id) {
            console.error('Error: El parámetro inventario no está definido correctamente.');
            return;
        }

        const fetchEspacios = async () => {
            try {
                const response = await getRecursos();
                const allRecursosResponse = response.data.result || []; // Accede a la propiedad "result"
                console.log("Recursos obtenidos:", allRecursosResponse);

                // Filtra los recursos por el inventario seleccionado
                const filteredRecursos = allRecursosResponse.filter(
                    (recurso) => inventario.id === recurso.inventarioLevantado.id
                );

                console.log('Recursos filtrados:', filteredRecursos);
                setRecursos(filteredRecursos); // Guarda los recursos filtrados en el estado

                // Iterar sobre los recursos para obtener el responsable
                for (const recurso of filteredRecursos) {
                    if (recurso.responsable && recurso.responsable.id) {
                        try {
                            console.log("Buscando responsable con id", recurso.responsable.id);
                            const response = await getResponsable(recurso.responsable.id);

                            if (response?.data?.result?.nombre) {
                                console.log("Nombre completo del responsable:", response.data.result.nombre);
                                setResponsable(response.data.result.nombre);
                            } else {
                                setResponsable("No encontrado");
                            }
                        } catch (error) {
                            console.error("Error obteniendo responsable:", error);
                            setResponsable("Error al obtener");
                        }
                    } else {
                        //console.log("El recurso no tiene un responsable asociado.");
                    }
                }
            } catch (error) {
                //console.error('Error al obtener los Recursos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEspacios();
    }, [inventario.id]);


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
                    <Text style={styles.detalleTexto}>Responsable: {responsable || 'No encontrado'}</Text>
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
                                <TouchableOpacity
                                    style={{ backgroundColor: '#152567', padding: 12, flexDirection: 'row', borderRadius: 25 }}
                                    onPress={() => navigation.navigate('Agregar')}
                                >
                                    <Ionicons name="add" size={20} color="white" />
                                    <Text style={{ color: 'white', fontSize: 16 }}>Nuevo</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ backgroundColor: '#152567', left: 10, padding: 12, flexDirection: 'row', borderRadius: 25 }} onPress={() => navigation.navigate('CameraScreen', { onFotoTomada: handleTakePhoto })}>
                                    <Ionicons name="camera" size={20} color="white" />
                                </TouchableOpacity>
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
        maxWidth: '65%',
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
});
