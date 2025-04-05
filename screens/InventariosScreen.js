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
import { getEdificiosId } from '../api/edificios';
import { getEspacios, getEspaciosId } from '../api/espaciosApi';

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
    const [espacioNombre, setEspacioNombre] = useState('');
    const [edificioNombre, setEdificioNombre] = useState('');


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
                    console.log('Espacio:', espacioData);
        
                    // Obtener el edificio
                    const edificioId = espacioData.edificio.id;
                    console.log('Edificio ID recibido:', edificioId);
                    const edificioResponse = await getEdificiosId(edificioId);
                    const edificioData = edificioResponse.data.result;
                    setEdificioNombre(edificioData.nombre);
                    console.log('Edificio:', edificioData);
        
                    // Obtener recursos del inventario
                    const response = await getRecursoId(inventario.id);
                    //console.log('Recursos obtenidos:', response.data.result);
                    if (response && response.data && response.data.result) {
                        console.log(response.data.result);
                    } else {
                        console.log("No se encontró 'result' en la respuesta");
                    }
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
                } catch (error) {
                    //console.error('Error al obtener datos del inventario:', error);
                    setRecursos([]);  // Establecer recursos como vacío en caso de error
                } finally {
                    setLoading(false);
                }
            };
        
            fetchData();
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
