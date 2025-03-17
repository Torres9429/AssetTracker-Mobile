import React from "react";
import { View, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";

const Background = ({ children }) => {
  return (
    <View style={styles.container}>
      {/* Degradado con curva */}
      <LinearGradient colors={["#74B9FF", "#3B7EF5"]} style={styles.header} />

      {/* Contenedor del contenido */}
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
  },
  header: {
    width: "100%",
    height: "30%",
    borderBottomLeftRadius: 70,
    borderBottomRightRadius: 100,
    position: "absolute",
    top: 0,
  },
  content: {
    flex: 1,
    marginTop: "30%", // Ajusta el contenido debajo del fondo curvado
    paddingHorizontal: 20,
  },
});

export default Background;
