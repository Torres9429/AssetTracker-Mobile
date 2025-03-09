import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, FlatList, ImageBackground, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function InventariosEspacioScreen() {
    const [search, setSearch] = useState('');
    const navigation = useNavigation();
    const route = useRoute();
    const { espacio } = route.params;

    const filteredInventarios = espacio.inventarios.filter((inventario) =>
        inventario.fecha.toLowerCase().includes(search.toLowerCase())
    );
    const handleCardPress = (item) => {
        navigation.navigate('Recursos', { inventario: item.recursos });
      };

    const renderInventario = ({ item }) => (
        <TouchableOpacity style={styles.inventarioContainer} onPress={() => handleCardPress(item)}>
            {item.imagen && <Image source={{ uri: item.imagen }} style={styles.inventarioImagen} />}
            <Text style={styles.inventarioFecha}>{item.fecha}</Text>
            <Text style={styles.inventarioCantidad}>Cantidad: {item.cantidad}</Text>
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
                        placeholder="Buscar inventario..."
                        placeholderTextColor="#999"
                        value={search}
                        onChangeText={setSearch}
                    />
                </View>
            </View>
            <View style={styles.containerData}>
                {/* Inventarios */}
                <Text style={styles.sectionTitle}>Inventarios</Text>
                <FlatList
                    data={filteredInventarios}
                    renderItem={renderInventario}
                    keyExtractor={(inventario) => inventario.fecha}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: 'space-between' }} 
                />
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
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
});

