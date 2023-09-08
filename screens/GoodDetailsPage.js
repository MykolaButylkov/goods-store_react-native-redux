import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import * as Icon from "react-native-feather";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    marginBottom: 16,
  },
  arrowIcon: {
    marginRight: 8,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "cover",
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    color: "#FF5733",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "#666",
  },
});

export default function GoodDetails({ navigation, route }) {
  const { good } = route.params;

  const handleGoBack = () => {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={{ flex: 1, alignItems: 'flex-start' }}
          onPress={() => handleGoBack()}
        >
          <Icon.ArrowLeft style={styles.arrowIcon} />
        </TouchableOpacity>
        <View>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Good Details</Text>
        </View>
      </View>

      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{
            uri: good.image,
          }}
        />
      </View>

      <View style={styles.detailsContainer}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', gap: 10}}>
          <Text style={styles.title}>{good.title}</Text>
          <Text style={styles.price}>{good.price}$</Text>
        </View>
        <Text style={styles.description}>{good.description}</Text>
      </View>
    </View>
  );
}
