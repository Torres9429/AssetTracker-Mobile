import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Modal } from "react-native";
import { getResponsable } from "../api/responsablesApi";

const CustomModal = ({ modalVisible, recurso, setModalVisible }) => {
  const [responsable, setResponsable] = useState(null);

  useEffect(() => {
    if (!recurso || !recurso.responsable || !recurso.responsable.id) {
      setResponsable(null);
      return;
    }

    const fetchResponsable = async () => {
      try {
        console.log("Buscando responsable con id", recurso.responsable.id);
        const response = await getResponsable(recurso.responsable.id);
        
        if (response?.data?.result?.nombre) {
          console.log("Nombre completo:", response.data.result.nombre);
          setResponsable(response.data.result.nombre);
        } else {
          setResponsable("No encontrado");
        }
      } catch (error) {
        console.error("Error obteniendo responsable:", error);
        setResponsable("Error al obtener");
      }
    };

    fetchResponsable();
  }, [recurso]); // Dependencia actualizada

  return (
    <Modal visible={modalVisible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {recurso && recurso.codigo ? (
            <>
              <Text style={styles.modalTitle}>Recurso Encontrado</Text>
              <Text style={styles.modalText}>Código: {recurso.codigo || 'NA'}</Text>
              <Text style={styles.modalText}>Nombre: {recurso.descripcion || "Sin descripción"}</Text>
              <Text style={styles.modalText}>Marca: {recurso.marca || "NA"}</Text>
              <Text style={styles.modalText}>Modelo: {recurso.modelo || "NA"}</Text>
              <Text style={styles.modalText}>Número de Serie: {recurso.numeroSerie || "NA"}</Text>
              <Text style={styles.modalText}>Responsable: {responsable || "No encontrado"}</Text>
            </>
          ) : (
            <Text style={[styles.modalText, { alignSelf: 'center' }]}>
              No se encontró ningún recurso.
            </Text>
          )}

          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalBackground: {
    width: '100%',
    height: '100%',
    justifyContent: "flex-end",
  },
  modalContent: {
    //flex: 1,
    width: '100%',
    height: '60%',
    //backgroundColor: "rgb(21, 37, 103)",
    backgroundColor: "white",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 40,
    alignItems: "flex-start",
  },
  modalTitle: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
    //alignSelf: 'center', 
    //color: 'white' 
    color: '#152567',

  },
  modalText: {
    fontSize: 18,
    //color: "#ffff" 
    //borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 10,
    width: '100%',
  },
  closeButton: {
    //position: "absolute",
    /*top: 30,
    right: 10,
    width: 40,
    height: 40,*/
    borderRadius: 15,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#152567",
    padding: 10,
    marginTop: 20,
    width: '100%',
    alignSelf: 'flex-end'
  },
  closeButtonText: {
    color: "#ffff",
    //color: "blue",
    fontWeight: "bold",
    right: 5,
    fontSize: 18,
    //top: 8
  },
  imagenRec: {
    height: 200,
    width: 200,
    alignSelf: 'center',
    top: 10
  }
});

export default CustomModal;