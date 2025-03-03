import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TextInput, ImageBackground, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import edificios from '../data/edificios';

const EdificiosScreen = () => {
    const [search, setSearch] = useState('');

    const filteredEdificios = edificios.filter((edificio) =>
        edificio.nombre.toLowerCase().includes(search.toLowerCase())
    );

    const renderEdificio = ({ item }) => (
        <View style={styles.edificioContainer}>
            {item.imagen && <Image source={{ uri: item.imagen }} style={styles.edificioImagen} />}
            <View style={styles.edificioInfo}>
                <Text style={styles.edificioNombre}>{item.nombre}</Text>
                <Text style={styles.edificioPisos}>Pisos: {item.pisos}</Text>
            </View>
        </View>
    );

    return (
        <ImageBackground
            source={require('../assets/welcomeBackground.png')}
            style={styles.background}
            resizeMode="cover"
        >
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.container}>
                    {/* Barra de búsqueda */}
                    <View style={styles.searchBarContainer}>
                        <Ionicons name="search" size={20}  style={styles.searchIcon} />
                        <TextInput
                            style={styles.searchBar}
                            placeholder="Buscar edificio..."
                            placeholderTextColor="white"
                            value={search}
                            onChangeText={setSearch}
                        />
                    </View>
                    <View style={styles.card}>
                        <Text style={styles.title}>Edificios</Text>
                        <FlatList
                            data={filteredEdificios}
                            renderItem={renderEdificio}
                            keyExtractor={(edificio) => edificio.id.toString()}
                            contentContainerStyle={styles.listContent}
                        />
                    </View>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        width: "100%",
    },
    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(58, 60, 193, 0.34)', // Fondo semi-transparente
        borderRadius: 15,
        paddingHorizontal: 20,
        paddingVertical: 8,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        margin: 10,
        padding: 10,
        width: '90%',
    },
    searchIcon: {
        marginRight: 8,
        color: 'white',
    },
    searchBar: {
        flex: 1,
        fontSize: 16,
        color: 'white',
    },
    card: {
        width: "100%",
        height: "90%",
        //backgroundColor: "#f5f5f5",
        //backgroundColor: "white",
        //backgroundColor: "rgba(53, 68, 204, 0.45)",
        backgroundColor: "rgb(239, 242, 249)",
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        padding: 25,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        //color: "#2B50EC",
        color: "#416FDF",
        marginBottom: 20,
        paddingLeft: 16,
    },
    listContent: {
        width: '100%',
        paddingBottom: 16,
        paddingLeft: 16,
        paddingRight: 16,
    },
    edificioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        width: '100%',
    },
    edificioImagen: {
        width: 70,
        height: 70,
        borderRadius: 8,
    },
    edificioInfo: {
        marginLeft: 16,
        flex: 1,
    },
    edificioNombre: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    edificioPisos: {
        fontSize: 16,
        color: '#757575',
        fontWeight: '600',
        marginTop: 10,
    },
});

export default EdificiosScreen;