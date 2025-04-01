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

const { width, height } = Dimensions.get('window');

export default function InventariosScreen() {
    const [search, setSearch] = useState('');
    const navigation = useNavigation();
    const route = useRoute();
    const [expandedIndex, setExpandedIndex] = useState(null);  // Estado para manejar el índice expandido
    const { inventario } = route.params;

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
    if (!Array.isArray(inventario)) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>No se encontraron inventarios.</Text>
            </View>
        );
    }

    const filteredInventarios = inventario.filter((recurso) =>
        recurso.nombre && recurso.nombre.toLowerCase().includes(search.toLowerCase())
    );

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
                    {item.codigo || 'Sin código'} - {item.nombre || 'Sin nombre'}
                </Text>
            </TouchableOpacity>
            {expandedIndex === index && (
                <View style={styles.detalleContainer}>
                    <Text style={styles.detalleTexto}>Código: {item.codigo || 'Sin código'}</Text>
                    <Text style={styles.detalleTexto}>Marca: {item.marca || 'Desconocida'}</Text>
                    <Text style={styles.detalleTexto}>Modelo: {item.modelo || 'Desconocido'}</Text>
                    <Text style={styles.detalleTexto}>Responsable: {item.responsable || 'Sin responsable'}</Text>
                    <Text style={styles.detalleTexto}>
                        Ubicación: {item.ubicacion?.edificio || 'Sin edificio'} -{' '}
                        {item.ubicacion?.espacios || 'Sin espacio'}
                    </Text>
                </View>
            )}
        </View>
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
                            <TouchableOpacity style={{ backgroundColor: '#152567', left: 10, padding: 12, flexDirection: 'row', borderRadius: 25 }} onPress={() => navigation.navigate('CameraScreen')}>
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
                    </ImageBackground>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
    },
    errorText: {
        fontSize: 18,
        color: 'red',
    },
    header: {
        marginTop: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingLeft: 20,
        paddingRight: 30,
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
        maxHeight: 50,
        minWidth: '40%',
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
