import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, TextInput, Dimensions, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { saveInventario } from '../api/inventariosApi';  // Asegúrate de importar la API de inventarios
import { saveRecurso, getRecursos } from '../api/recursosApi';  // Asegúrate de importar la API de recursos

const { width, height } = Dimensions.get('window');

export default function CrearInventarioScreen() {
    const [foto, setFoto] = useState(null); // Estado para guardar la foto
    const [newRecurso, setNewRecurso] = useState(''); // Estado para nuevo recurso

    const route = useRoute();
    const { espacioId, photoUri  } = route.params;  // Obtener el id del espacio
   // const { photoUri } = route.params || {};

    const [recursos, setRecursos] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useFocusEffect(
        React.useCallback(() => {
            const fetchRecursos = async () => {
                try {
                    const response = await getRecursos();
                    setRecursos(response.data);
                    setLoading(false);
                } catch (error) {
                    console.error("Error obteniendo los recursos:", error);
                }
            };
    
            // Si hay una foto nueva, actualiza el estado
            if (photoUri) {
                setFoto(photoUri);  // Asegúrate de que esto sea la URI y no el objeto completo.
                console.log('Foto tomada:', photoUri);  // Revisa si la URI de la foto está llegando correctamente.
            }
    
            fetchRecursos();
        }, [photoUri])  // Dependencia para recargar si cambia la foto
    );
    

    const handleSaveInventario = async () => {
        if (photo) {
            // Lógica para guardar la foto (por ejemplo, subirla a un servidor o guardarla en el inventario)
            console.log('Guardando foto en el inventario:', photo);
            try {
                // Crear un nuevo inventario con el id del espacio
                const data = { espacioId };  // Aquí solo se necesita el id del espacio
                const response = await saveInventario(data);
    
                if (response.data && response.data.id) {
                    const inventarioId = response.data.id;
    
                    // Redirigir a CrearInventarioScreen con el nuevo id de inventario
                    navigation.navigate('CrearInventarioScreen', { inventarioId });
                }
            } catch (error) {
                console.error("Error creando el inventario:", error);
            }
            // Aquí deberías hacer la llamada API o lógica para guardar el recurso
          } else {
            alert('No se ha tomado una foto.');
          }
        
    };

    const handleSaveRecurso = async (recursoData) => {
        try {
            // Guardar el recurso asociado al inventario
            await saveRecurso({ inventarioId: espacioId, ...recursoData });
            console.log("Recurso guardado.");
        } catch (error) {
            console.error("Error guardando recurso:", error);
        }
    };

    const handleTakePhoto = (uri) => {
        console.log('Foto recibida en CrearInventarioScreen:', uri);
        setFoto(uri);  // Guardar la URI de la foto en el estado
      };
      

    const agregarRecurso = () => {
        if (newRecurso.trim()) {
            const recursoData = { nombre: newRecurso }; // Aquí puedes agregar más detalles del recurso
            handleSaveRecurso(recursoData);
            setNewRecurso('');
        } else {
            alert("Por favor ingrese un nombre para el recurso.");
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground
                source={require('../assets/backgroundSecondary.png')}
                style={styles.container}
                resizeMode="cover"
            >
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </TouchableOpacity>
                    <TextInput
                        style={styles.input}
                        placeholder="Nuevo recurso"
                        value={newRecurso}
                        onChangeText={setNewRecurso}
                    />
                    <TouchableOpacity
                        style={{ backgroundColor: '#152567', padding: 12, flexDirection: 'row', borderRadius: 25 }}
                        onPress={() => navigation.navigate('Agregar')}
                    >
                        <Ionicons name="add" size={20} color="white" />
                        <Text style={{ color: 'white', fontSize: 16 }}>Recurso</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ backgroundColor: '#152567', left: 10, padding: 12, flexDirection: 'row', borderRadius: 25 }} onPress={() => navigation.navigate('CameraScreen', { onPhotoTaken: handleTakePhoto })}>
                        <Ionicons name="camera" size={20} color="white" />
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={recursos}
                    renderItem={({ item }) => <Text style={styles.recurso}>{item.nombre}</Text>}
                    keyExtractor={(item, index) => index.toString()}
                />

                {/* Muestra la foto si se ha tomado */}
                {foto && <Image source={{ uri: foto }} style={styles.foto} />}


                <TouchableOpacity style={styles.saveButton} onPress={handleSaveInventario}>
                    <Text style={styles.saveText}>Guardar Inventario</Text>
                </TouchableOpacity>
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
    },
    backButton: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingHorizontal: 10,
    },
    addButton: {
        backgroundColor: '#152567',
        padding: 10,
        borderRadius: 20,
    },
    recurso: {
        fontSize: 18,
        color: '#152567',
        marginBottom: 10,
    },
    foto: {
        width: 200,
        height: 200,
        borderRadius: 10,
        marginVertical: 10,
        alignSelf: 'center',
        bottom:70,
    },
    saveButton: {
        backgroundColor: '#416FDF',
        padding: 12,
        borderRadius: 25,
        alignItems: 'center',
        marginTop: 20,
        bottom: 80,
    },
    saveText: {
        color: 'white',
        fontSize: 16,
    },
});
