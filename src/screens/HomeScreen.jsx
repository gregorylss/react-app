import React, {useState, useEffect} from "react";
import {
  StatusBar,
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {NavigationContainer} from "@react-navigation/native";
import {Ionicons} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

function HomeScreen() {
    const [randomCocktail, setRandomCocktail] = useState(null);
  
    useEffect(() => {
      const loadRandomCocktail = async () => {
        try {
          const responseRandom = await fetch(
            "https://www.thecocktaildb.com/api/json/v1/1/random.php",
          );
          const dataRandom = await responseRandom.json();
          const randomCocktailId = dataRandom.drinks[0].idDrink;
          const responseDetails = await fetch(
            `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${randomCocktailId}`,
          );
          const dataDetails = await responseDetails.json();
  
          setRandomCocktail(dataDetails.drinks[0]);
        } catch (error) {
          console.error("Error fetching random cocktail details:", error);
        }
      };
  
      loadRandomCocktail();
    }, []);
  
    const renderIngredients = (cocktail) => {
      const ingredients = [];
      for (let i = 1; i <= 15; i++) {
        const ingredientName = cocktail[`strIngredient${i}`];
        if (!ingredientName) break;
  
        ingredients.push(
          <Text key={ingredientName} style={styles.ingredientText}>
            {ingredientName}
          </Text>,
        );
      }
      return ingredients;
    };
  
    return (
      <View style={styles.container}>
        {randomCocktail ? (
          <View style={styles.cardContainer}>
            <Text style={styles.title}>Cocktail of the Day</Text>
            <Text style={styles.cocktailName}>{randomCocktail.strDrink}</Text>
            {randomCocktail.strDrinkThumb && (
              <Image
                source={{uri: randomCocktail.strDrinkThumb}}
                style={styles.cocktailImage}
              />
            )}
            <Text style={styles.ingredientsTitle}>Ingredients:</Text>
            {renderIngredients(randomCocktail)}
          </View>
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
    );
  }


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      padding: 10,
    },
    cardContainer: {
      width: "100%",
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "#ddd",
      padding: 10,
      marginBottom: 10,
    },
    cocktailName: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 10,
      textAlign: "center",
    },
    cocktailImage: {
      width: "100%",
      height: 200,
      borderRadius: 8,
      marginBottom: 10,
    },
    ingredientsTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginTop: 10,
      marginBottom: 5,
    },
    ingredientText: {
      fontSize: 16,
      marginBottom: 5,
    },
    containerprofil: {
      flex: 1,
      alignItems: "center",
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 20,
    },
    input: {
      height: 40,
      width: "80%",
      borderColor: "gray",
      borderWidth: 1,
      marginBottom: 20,
      paddingHorizontal: 10,
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 20,
    },
    pickImageText: {
      color: "blue",
      marginBottom: 20,
    },
  });
  
  export default HomeScreen;