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
import { getEspacios } from '../api/espaciosApi';

const { width, height } = Dimensions.get('window');

export default function EspaciosScreen() {
    const [search, setSearch] = useState('');
    const navigation = useNavigation();
    const [espacios, setEspacios] = useState([]);
    const [loading, setLoading] = useState(true); // Estado para manejar la carga
    const route = useRoute();
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

    const { edificio } = route.params;

    // Obtiene los edificios desde la API
    useEffect(() => {
        console.log('Edificio ID recibido:', edificio);
        const fetchEspacios = async () => {
            try {
                const response = await getEspacios();
                const allEspacios = response.data.result || [];
                console.log('Espacios recibidos:', allEspacios);
    
                // Filtra los espacios por el edificio seleccionado
                const filteredEspacios = allEspacios.filter(
                    (espacio) => espacio.edificio.id === edificio
                );
    
                console.log('Espacios filtrados:', filteredEspacios);
                setEspacios(filteredEspacios);
            } catch (error) {
                console.error('Error al obtener los espacios:', error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchEspacios();
    }, [edificio]);
     // Escucha cambios en edificioId

    const filteredEspacios = espacios.filter((espacio) =>
        espacio.nombre.toLowerCase().includes(search.toLowerCase())
    );

    const handleCardPress = (item) => {
        navigation.navigate('Inventarios', { espacio: item });
    };

    const renderEspacio = ({ item }) => (
        <TouchableOpacity style={styles.espacioContainer} onPress={() => handleCardPress(item)}>
            {item.imagen && <Image source={{ uri: item.imagen }} style={styles.espacioImagen} />}
            <Text style={styles.espacioNombre}>{item.nombre}</Text>
            <Text style={styles.espacioDescripcion}>{item.descripcion}</Text>
        </TouchableOpacity>
    );

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1 }}>
                    <ImageBackground
                        source={require('../assets/backgroundSecondary.png')}
                        style={styles.container}
                        resizeMode={keyBoardVisible ? 'cover' : 'cover'}
                        imageStyle={{ width: keyBoardVisible ? width : 'auto', height: keyBoardVisible ? height : '100%' }}
                    >
                        {/* Header */}
                        <View style={styles.header}>
                            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                                <Ionicons name="arrow-back" size={24} color="white" />
                            </TouchableOpacity>
                            <View style={styles.searchBarContainer}>
                                <Ionicons name="search" size={20} color="#416FDF" style={styles.searchIcon} />
                                <TextInput
                                    style={styles.searchBar}
                                    placeholder="Buscar espacio..."
                                    placeholderTextColor="#999"
                                    value={search}
                                    onChangeText={setSearch}
                                />
                            </View>
                        </View>
                        <View style={styles.containerData}>
                            {/* Espacios */}
                            <Text style={styles.sectionTitle}>Espacios</Text>
                            <FlatList
                                data={filteredEspacios}
                                renderItem={renderEspacio}
                                keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
                                contentContainerStyle={styles.listContent}
                                showsVerticalScrollIndicator={false}
                                numColumns={2}
                                columnWrapperStyle={{ justifyContent: 'space-between' }}
                            />
                        </View>
                    </ImageBackground>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
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
});
