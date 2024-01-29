  import React, { useState, useEffect } from "react";
  import {
    StatusBar,
    View,
    Text,
    TextInput,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    Alert,
  } from "react-native";
  import { useNavigation } from "@react-navigation/native";
  import AsyncStorage from '@react-native-async-storage/async-storage';

  function SearchScreen() {
    const [searchTerm, setSearchTerm] = useState("");
    const [cocktails, setCocktails] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const navigation = useNavigation();
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
      searchCocktails();
    }, [searchTerm]);


    const searchCocktails = async () => {
      try {
        const data = await fetchData();
        if (data.drinks) {
          setCocktails(data.drinks);
          setCurrentPage(1);
        } else {
          setCocktails([]);
          setCurrentPage(1);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const handleNextPage = async () => {
      try {
        const data = await fetchData();
        if (data.drinks) {
          const allCocktails = data.drinks;
          const startIndex = currentPage * 8;
          const endIndex = startIndex + 8;
          const newCocktails = allCocktails.slice(startIndex, endIndex);
          setCocktails([...cocktails, ...newCocktails]);
          setCurrentPage(currentPage + 1);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchData = async () => {
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`
      );
      return response.json();
    };

    const handlePrevPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };

    const handleCocktailPress = (cocktailId) => {
      navigation.navigate("CocktailDetailsScreen", { cocktailId });
    };

  const addToFavorites = async (cocktail) => {
    try {
      const isAlreadyAdded = favorites.some(favorite => favorite.idDrink === cocktail.idDrink);

      if (!isAlreadyAdded) {
        const cocktailString = JSON.stringify(cocktail);
        await AsyncStorage.setItem(cocktail.idDrink, cocktailString);
        setFavorites([...favorites, cocktail]);
        console.log('Cocktail ajouté aux favoris !');
      } else {
        // Retirer le cocktail des favoris
        const updatedFavorites = favorites.filter(favorite => favorite.idDrink !== cocktail.idDrink);
        await AsyncStorage.removeItem(cocktail.idDrink);
        setFavorites(updatedFavorites);
        console.log('Cocktail retiré des favoris !');
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout ou de la suppression du cocktail aux favoris :', error);
    }
  };


    const renderCocktails = () => {
      const startIndex = (currentPage - 1) * 8;
      const endIndex = startIndex + 8;
      const currentCocktails = cocktails.slice(startIndex, endIndex);

      return (
        <View style={styles.cocktailsContainer}>
          {currentCocktails.map((item, index) => {
            const isFavorite = favorites.some(favorite => favorite.idDrink === item.idDrink);

            return (
              <TouchableOpacity
                style={styles.cocktailCard}
                key={`${item.idDrink}-${index}`}
                onPress={() => handleCocktailPress(item.idDrink)}
              >
                <Text style={styles.cocktailName}>{item.strDrink}</Text>
                {item.strDrinkThumb && (
                  <Image
                    source={{ uri: item.strDrinkThumb }}
                    style={styles.cocktailImage}
                  />
                )}
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => addToFavorites(item)}
                  disabled={isFavorite}
                >
                  <Text style={styles.btnText}>
                    {isFavorite ? "Already Added" : "Add to Favorites"}
                  </Text>
                </TouchableOpacity>
              </TouchableOpacity>
            );
          })}
        </View>
      );
    };

    return (
      <View style={styles.container}>
        <Text style={styles.subtitle}>What are you looking for ? </Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Search cocktails..."
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
          />
        </View>
        <ScrollView>
          {renderCocktails()}
          <View style={styles.paginationContainer}>
            <TouchableOpacity style={styles.btn} onPress={handlePrevPage}>
              <Text style={styles.btnText}>Prev</Text>
            </TouchableOpacity>
            <Text>{`Page ${currentPage}`}</Text>
            <TouchableOpacity style={styles.btn} onPress={handleNextPage}>
              <Text style={styles.btnText}>Next</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <StatusBar style="auto" />
      </View>
    );
  }


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      padding: 15,
    },
    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 20,
    },
    cocktailsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      marginTop: 10,
      width: "100%",
    },
    cocktailCard: {
      width: "48%",
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
    subtitle: {
      fontSize: 38,
      marginBottom: 20,
    },
    input: {
      height: 40,
      width: "100%",
      borderColor: "#DDDDDD",
      borderWidth: 1,
      marginRight: 10,
      borderRadius: 5,
      color: "#000",
      paddingHorizontal: 10,
    },
    paginationContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 15,
    },
    btn: {
      backgroundColor: "#7FFF00",
      padding: 10,
      borderRadius: 5,
      marginHorizontal: 5,
    },
    btnText: {
      color: "#fff",
      fontWeight: "bold",
      textTransform: "uppercase",
      textAlign: "center",
    },
  });

  export default SearchScreen;
