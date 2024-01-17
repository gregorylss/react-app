import React, { useState } from "react";
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
import { useNavigation } from "@react-navigation/native";

function SearchScreen() {
  const [searchTerm, setSearchTerm] = useState("");
  const [cocktails, setCocktails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Utilisez le hook 'useNavigation' pour obtenir l'objet de navigation
  const navigation = useNavigation();

  const searchCocktails = async () => {
    try {
      const data = await fetchData();
      if (data.drinks) {
        const slicedCocktails = data.drinks.slice(0, 8);
        setCocktails(slicedCocktails);
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
    navigation.navigate("CocktailDetails", { cocktailId });
  };

  const renderCocktails = () => {
    const startIndex = (currentPage - 1) * 8;
    const endIndex = startIndex + 8;
    const currentCocktails = cocktails.slice(startIndex, endIndex);

    return currentCocktails.map((item) => (
      <TouchableOpacity
        style={styles.cocktailCard}
        key={item.idDrink}
        onPress={() => handleCocktailPress(item.idDrink)}
      >
        <Text style={styles.cocktailName}>{item.strDrink}</Text>
        {item.strDrinkThumb && (
          <Image
            source={{ uri: item.strDrinkThumb }}
            style={styles.cocktailImage}
          />
        )}
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search cocktails..."
        value={searchTerm}
        onChangeText={(text) => setSearchTerm(text)}
      />
      <Button title="Search" onPress={searchCocktails} />
      <ScrollView>
        <View style={styles.cocktailsContainer}>{renderCocktails()}</View>
        <View style={styles.paginationContainer}>
          <Button title="Prev" onPress={handlePrevPage} />
          <Text>{`Page ${currentPage}`}</Text>
          <Button title="Next" onPress={handleNextPage} />
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
    padding: 10,
  },
  cocktailCard: {
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
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default SearchScreen;
