import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, ImageBackground, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import CustomModal from '../components/Modal';

export default function InventariosScreen() {
    const [search, setSearch] = useState('');
    const navigation = useNavigation();
    const route = useRoute();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedRecurso, setSelectedRecurso] = useState(null);
    const { inventario } = route.params;

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

    const handleShowRecurso = (recurso) => {
        setSelectedRecurso(recurso);
        setModalVisible(true);
    };

    const renderRecurso = ({ item }) => (
        <TouchableOpacity style={styles.recursoContainer} onPress={() => handleShowRecurso(item)}>
            <Text style={styles.recursoTexto}>{item.codigo} - {item.nombre}</Text>
        </TouchableOpacity>
    );

    return (
        <ImageBackground source={require('../assets/backgroundSecondary.png')} style={styles.container} resizeMode='cover'>
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
                <TouchableOpacity style={{backgroundColor: '#152567', padding: 12, flexDirection: 'row', borderRadius: 25}} onPress={() => navigation.navigate('Agregar')}>
                    <Ionicons name="add" size={20} color="white" />
                    <Text style={{ color: 'white', fontSize: 16,  }}>Nuevo</Text>
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
            <CustomModal
                modalVisible={modalVisible}
                recurso={selectedRecurso}
                setModalVisible={setModalVisible}
                setRecurso={setSelectedRecurso}
            />
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute'
    },
    errorText: {
        fontSize: 18,
        color: 'red',
    },
    header: {
        marginTop: 50,
        marginLeft: 30,
        marginRight: 30,
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'space-between',
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
        marginRight: 10,
        maxWidth: '55%',
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
        width: 70,
        height: 70,
        borderRadius: 12,
    },
    inventarioFecha: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 8,
    },
    inventarioCantidad: {
        fontSize: 14,
        color: '#757575',
        fontWeight: '500',
        marginTop: 4,
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
        //color: '#333',
        color: '#152567',
        marginTop: 4,
        fontWeight: '600',
    },
    recursoListContent: {
        paddingBottom: 10,
    },
    
});