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
    Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { getInventarios } from '../api/inventariosEspaciosApi';
import { contarRecursos } from '../api/recursosApi';
import { saveInventario } from '../api/inventariosApi';

const { width, height } = Dimensions.get('window');

export default function InventariosEspacioScreen() {
    const [search, setSearch] = useState('');
    const navigation = useNavigation();
    const [inventarios, setInventarios] = useState([]);
    const [loading, setLoading] = useState(true); // Estado para manejar la carga
    const route = useRoute();
    const { espacio } = route.params;
    const [keyBoardVisible, setKeyBoardVisible] = useState();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImagePress = (imageUrl) => {
        setSelectedImage(imageUrl);
        setModalVisible(true); // Abre el modal
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setSelectedImage(null);
    };


    const handleCreateInventario = async () => {
        console.log('Espacio ID:', espacio.id);  // Verifica que el id del espacio se recibe correctamente
        try {
            // Crear el inventario con el id del espacio
            const data = { espacio: espacio.id };  // Aquí solo estamos enviando el id del espacio
            const response = await saveInventario(data);
            console.log('Respuesta de crear inventario:', response.data);  // Verifica la respuesta del servidor
            const newInventarioId = response.data.result.id;  // Suponemos que la respuesta contiene el id del nuevo inventario
            console.log('Nuevo inventario creado con ID:', newInventarioId);  // Verifica que el nuevo id se recibe correctamente
            // Redirigir a CrearInventarioScreen con el id del inventario
            navigation.navigate('CrearInventario', { inventarioId: newInventarioId });
        } catch (error) {
            console.error("Error creando inventario:", error);
        }
    };

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
    useFocusEffect(
        useCallback(() => {
          console.log('Espacio ID recibido:', espacio.id);
          
          const fetchEspacios = async () => {
            try {
              const response = await getInventarios();
              const allInventarios = response.data.result || [];
              console.log('Inventarios recibidos:', allInventarios);
      
              const filteredEspacios = allInventarios.filter(
                (inventario) => inventario.espacio.id === espacio.id
              );
      
              console.log('Inventarios filtrados:', filteredEspacios);
              setInventarios(filteredEspacios);
            } catch (error) {
              console.error('Error al obtener los Inventarios:', error);
            } finally {
              setLoading(false);
            }
          };
      
          fetchEspacios();
        }, [espacio])
      );

    const filteredInventarios = inventarios.filter((inventario) =>
        inventario.fechaCreacion.toLowerCase().includes(search.toLowerCase())
    );
    const handleCardPress = (item) => {
        navigation.navigate('Recursos', { inventario: item });
    };



    const renderInventario = ({ item }) => {
        // Convertir la fecha al formato deseado
        const fechaFormateada = new Date(item.fechaCreacion).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
        console.log('Fecha formateada:', fechaFormateada); // Verifica la fecha formateada
        console.log('Imagen URL:', item.imagenUrl); // Verifica la URL de la imagen


        return (
            <TouchableOpacity style={styles.inventarioContainer} onPress={() => handleCardPress(item)}>

                {item.imagenUrl ? (
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity onPress={() => handleImagePress(item.imagenUrl)}>
                            <Image source={{ uri: item.imagenUrl }} style={styles.inventarioImagen} />
                        </TouchableOpacity>
                    </View>
                ) : (
                    <Text style={{height:0}}></Text>  // Muestra un mensaje si no hay imagen
                )}

                <Text style={styles.inventarioFecha}>{fechaFormateada}</Text>
                {/*<Text style={styles.inventarioCantidad}>{numeroRecursos}</Text>*/}
            </TouchableOpacity>
        );
    };



    return (

        <View style={{ flex: 1 }}>
            <ImageBackground
                source={require('../assets/backgroundSecondary.png')}
                style={styles.container}
                resizeMode={keyBoardVisible ? 'cover' : 'cover'}
                imageStyle={{ width: keyBoardVisible ? width : 'auto', height: keyBoardVisible ? height : '100%' }}
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
                                        placeholder="Buscar inventario..."
                                        placeholderTextColor="#999"
                                        value={search}
                                        onChangeText={setSearch}
                                    />
                                </View>
                                {<TouchableOpacity
                                    style={{ backgroundColor: '#152567', padding: 12, flexDirection: 'row', borderRadius: 25, marginHorizontal: 5 }}
                                    //onPress={() => navigation.navigate('CrearInventario', { espacio: espacio })}
                                    onPress={handleCreateInventario}
                                >
                                    <Ionicons name="add" size={20} color="white" />
                                    <Text style={{ color: 'white', fontSize: 16 }}>Nuevo</Text>
                                </TouchableOpacity>}
                            </View>
                            <View style={styles.containerData}>
                                {/* Inventarios */}
                                <Text style={styles.sectionTitle}>Inventarios</Text>
                                <FlatList
                                    data={filteredInventarios}
                                    renderItem={renderInventario}
                                    keyExtractor={(inventario) => inventario.id}
                                    contentContainerStyle={styles.listContent}
                                    showsVerticalScrollIndicator={false}
                                    numColumns={2}
                                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                                />
                            </View>
                            {/* Modal para mostrar la imagen en grande */}
                            <Modal
                                visible={modalVisible}
                                transparent={true}
                                animationType="fade"
                                onRequestClose={handleCloseModal}
                            >
                                <TouchableOpacity
                                    style={styles.modalBackground}
                                    onPress={handleCloseModal}
                                >
                                    <View style={styles.modalContainer}>
                                        {selectedImage && (
                                            <Image
                                                source={{ uri: selectedImage }}
                                                style={styles.modalImage}
                                            />
                                        )}
                                    </View>
                                </TouchableOpacity>
                            </Modal>

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
    header: {
        marginTop: 50,
        marginHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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
    inventarioContainer: {
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
    inventarioImagen: {
        width: 100,
        height: 70,
        borderRadius: 12,
        marginBottom: 8,
    },
    inventarioFecha: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        //marginTop: 8,
    },
    inventarioCantidad: {
        fontSize: 14,
        color: '#757575',
        fontWeight: '500',
        marginTop: 4,
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalContainer: {
        width: '90%',
        height: '80%',
    },
    modalImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
});

