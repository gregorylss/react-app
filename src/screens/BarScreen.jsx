import React, { useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const BarScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);

  const getFavoritesFromStorage = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const filteredKeys = keys.filter((key) => key !== 'EXPO_CONSTANTS_INSTALLATION_ID');
      const favoritesData = await AsyncStorage.multiGet(filteredKeys);

      const favoritesObjects = favoritesData.map(([key, value]) => {
        try {
          return JSON.parse(value);
        } catch (error) {
          console.error(`Erreur lors de l'analyse JSON pour la clé ${key}:`, error);
          return null;
        }
      });

      const validFavorites = favoritesObjects.filter((fav) => fav !== null);
      setFavorites(validFavorites);
    } catch (error) {
      console.error('Erreur lors de la récupération des favoris :', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getFavoritesFromStorage();
    }, [])
  );

  const removeFromFavorites = async (cocktailId) => {
    try {
      await AsyncStorage.removeItem(cocktailId);
      getFavoritesFromStorage();
    } catch (error) {
      console.error('Erreur lors de la suppression du cocktail des favoris :', error);
    }
  };

  if (!favorites || favorites.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Favorites</Text>
        <Text style={styles.message}>No favorites yet!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorites</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item, index) => `${item.idDrink}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemName}>{item.strDrink}</Text>
            {item.strDrinkThumb && (
              <Image
                source={{ uri: item.strDrinkThumb }}
                style={styles.itemImage}
              />
            )}
            <TouchableOpacity
              onPress={() => removeFromFavorites(item.idDrink)}
              style={styles.removeButton}
            >
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  message: {
    fontSize: 16,
    color: "#555",
  },
  itemContainer: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 10,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
});

export default BarScreen;
