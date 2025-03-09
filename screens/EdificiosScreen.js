import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, FlatList, ImageBackground, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import edificios from '../data/edificios';
import { useNavigation } from '@react-navigation/native';

export default function EdificiosScreen() {
    const [search, setSearch] = useState('');
    const navigation = useNavigation();

    const filteredEdificios = edificios.filter((edificio) =>
        edificio.nombre.toLowerCase().includes(search.toLowerCase())
    );

    const handleCardPress = (item) => {
        navigation.navigate('Espacios', { edificio: item });
      };

    const renderEdificio = ({ item }) => (
        <TouchableOpacity style={styles.edificioContainer} onPress={() => handleCardPress(item)}>
            {item.imagen && <Image source={{ uri: item.imagen }} style={styles.edificioImagen} />}
            <Text style={styles.edificioNombre}>{item.nombre}</Text>
            <Text style={styles.edificioPisos}>Pisos: {item.pisos}</Text>
        </TouchableOpacity>
    );

    return (
        <ImageBackground source={require('../assets/backgroundSecondary.png')} style={styles.container} resizeMode='cover'>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.searchBarContainer}>
                    <Ionicons name="search" size={20} color="#416FDF" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchBar}
                        placeholder="Buscar edificio..."
                        placeholderTextColor="#999"
                        value={search}
                        onChangeText={setSearch}
                    />
                </View>
            </View>
            <View style={styles.containerData}>
                {/* Edificios */}
                <Text style={styles.sectionTitle}>Edificios</Text>
                <FlatList
                    data={filteredEdificios}
                    renderItem={renderEdificio}
                    keyExtractor={(edificio) => edificio.id.toString()}
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
        justifyContent: 'space-between',
        alignItems: 'center',
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
    edificioContainer: {
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
        //borderColor: '#416FDF',
        //borderWidth: 1,
    },
    edificioImagen: {
        width: 70,
        height: 70,
        borderRadius: 12,
    },
    edificioNombre: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 8,
    },
    edificioPisos: {
        fontSize: 14,
        color: '#757575',
        fontWeight: '500',
        marginTop: 4,
    },
});
