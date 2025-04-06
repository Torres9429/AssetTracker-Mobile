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
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getEdificios } from '../api/edificios';

const { width, height } = Dimensions.get('window');

export default function EdificiosScreen() {
  const [search, setSearch] = useState('');
  const [edificios, setEdificios] = useState([]); // Estado para almacenar los edificios
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const [keyBoardVisible, setKeyBoardVisible] = useState(false); // Inicializado correctamente
  const navigation = useNavigation();
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

  // Escucha eventos del teclado para ocultar/mostrar el teclado
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

  // Obtiene los edificios desde la API
  useEffect(() => {
    const fetchEdificios = async () => {
      try {
        const response = await getEdificios(); // Llama a la API para obtener los edificios
        console.log('Edificios:', response.data.result); // Muestra los edificios en la consola

        setEdificios(response.data.result || []); // Almacena los edificios en el estado
      } catch (error) {
        console.error('Error al obtener los edificios:', error);
      } finally {
        setLoading(false); // Finaliza el estado de carga
      }
    };

    fetchEdificios();
  }, []);

  // Filtra los edificios según la búsqueda
  const filteredEdificios = edificios.filter((edificio) =>
    edificio.nombre.toLowerCase().includes(search.toLowerCase())
  );

  // Navega a la pantalla de espacios al presionar un edificio
  const handleCardPress = (item) => {
    navigation.navigate('Espacios', { edificio: item.id });
  };

  // Renderiza un edificio individual
  const renderEdificio = ({ item }) => (
    <TouchableOpacity style={styles.edificioContainer} onPress={() => handleCardPress(item)}>
      {item.urlImagen ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity onPress={() => handleImagePress(item.urlImagen)}>
            <Image source={{ uri: item.urlImagen }} style={styles.edificioImagen} />
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={{height:0}}> </Text>  // Muestra un mensaje si no hay imagen
      )}
      <Text style={styles.edificioNombre}>{item.nombre}</Text>
      <Text style={styles.edificioPisos}>Pisos: {item.numeroPisos}</Text>
    </TouchableOpacity>
  );

  // Muestra pantalla de carga si aún no se obtienen los edificios
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Cargando edificios...</Text>
      </View>
    );
  }

  return (

    <View style={{ flex: 1, height: keyBoardVisible ? height : '100%', }}>
      <ImageBackground
        source={require('../assets/backgroundSecondary.png')}
        style={styles.container}
        //resizeMode={keyBoardVisible ? 'cover' : 'cover'}
        imageStyle={{ width: keyBoardVisible ? '100%' : width, height: keyBoardVisible ? height : '100%' }}
      >
        <KeyboardAvoidingView
          style={{ flex: 1, height: keyBoardVisible ? height : '100%' }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1 }}>
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
  },
  edificioImagen: {
    width: 100,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#333',
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
