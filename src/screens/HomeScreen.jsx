import React, { useState, useEffect } from "react";
import { ScrollView, Text, StyleSheet, Image, TouchableOpacity, View } from "react-native";

function HomeScreen() {
  const [randomCocktail, setRandomCocktail] = useState(null);
  const [showCocktail, setShowCocktail] = useState(true);
  const [newCocktails, setNewCocktails] = useState([]);
  const [isCocktailSelected, setIsCocktailSelected] = useState(true);
  const [isNewSelected, setIsNewSelected] = useState(false);
  const [drinkCategories, setDrinkCategories] = useState([]);

  useEffect(() => {
    const loadRandomCocktail = async () => {
      try {
        const responseRandom = await fetch(
          "https://www.thecocktaildb.com/api/json/v1/1/random.php"
        );
        const dataRandom = await responseRandom.json();
        const randomCocktailId = dataRandom.drinks[0].idDrink;
        const responseDetails = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${randomCocktailId}`
        );
        const dataDetails = await responseDetails.json();

        setRandomCocktail(dataDetails.drinks[0]);
      } catch (error) {
        console.error("Error fetching random cocktail details:", error);
      }
    };

    const loadDrinkCategories = async () => {
      try {
        const response = await fetch(
          "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list"
        );
        const data = await response.json();
        setDrinkCategories(data.drinks);
      } catch (error) {
        console.error("Error fetching drink categories:", error);
      }
    };

    if (showCocktail) {
      loadRandomCocktail();
    }

    loadDrinkCategories();
  }, [showCocktail]);

  const loadNewCocktails = async () => {
    try {
      const newCocktailsArray = [];
      for (let i = 0; i < 10; i++) {
        const responseRandom = await fetch(
          "https://www.thecocktaildb.com/api/json/v1/1/random.php"
        );
        const dataRandom = await responseRandom.json();
        const newCocktail = dataRandom.drinks[0];
        newCocktailsArray.push(newCocktail);
      }
      setNewCocktails(newCocktailsArray);
    } catch (error) {
      console.error("Error fetching new cocktails:", error);
    }
  };

  const renderIngredients = (cocktail) => {
    const ingredients = [];
    for (let i = 1; i <= 15; i++) {
      const ingredientName = cocktail[`strIngredient${i}`];
      if (!ingredientName) break;
  
      ingredients.push(
        <View key={ingredientName} style={styles.ingredientItem}>
          <Text style={styles.ingredientText}>{ingredientName}</Text>
        </View>
      );
    }
    return ingredients;
  };
  
  

  const getDrinkCategory = (category) => {
    const foundCategory = drinkCategories.find((cat) => cat.strCategory === category);
    return foundCategory ? foundCategory.strCategory : category;
  };

  const handleCocktailPress = () => {
    setShowCocktail(true);
    setNewCocktails([]);
    setIsCocktailSelected(true);
    setIsNewSelected(false);
  };

  const handleNewCocktailsPress = () => {
    loadNewCocktails();
    setShowCocktail(false);
    setIsCocktailSelected(false);
    setIsNewSelected(true);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Hi drinker !</Text>
      <Text style={styles.title2}>Discover amazing cocktails</Text>

      <View style={styles.triggerContainer}>
        <TouchableOpacity
          onPress={handleCocktailPress}
          style={[
            styles.cocktailTriggerButton,
            isCocktailSelected && styles.selectedButton,
          ]}
        >
          <Text
            style={[
              styles.cocktailTriggerText,
              isCocktailSelected && styles.selectedText,
            ]}
          >
            Cocktail of the Day
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleNewCocktailsPress}
          style={[
            styles.cocktailTriggerButton,
            isNewSelected && styles.selectedButton,
          ]}
        >
          <Text
            style={[
              styles.cocktailTriggerText,
              isNewSelected && styles.selectedText,
            ]}
          >
            New
          </Text> 
        </TouchableOpacity>
      </View>

      {showCocktail && randomCocktail ? (
        <View style={styles.cardContainer}>
  <Text style={[styles.drinkname]}>
    {randomCocktail.strDrink}, <Text style={styles.drinkcategory}>{getDrinkCategory(randomCocktail.strCategory)}</Text>
  </Text>

  {randomCocktail.strDrinkThumb && (
    <Image
      source={{ uri: randomCocktail.strDrinkThumb }}
      style={styles.cocktailImage}
    />
  )}
  <Text style={styles.ingredientsTitle}>Ingredients:</Text>
  <View style={styles.ingredientsContainer}>{renderIngredients(randomCocktail)}</View>
</View>

      ) : null}

      {newCocktails.length > 0 && (
        <View style={styles.newCocktailsContainer}>
          {newCocktails.map((cocktail, index) => (
            <View key={index} style={styles.newCocktailCard}>
              <Text>{cocktail.strDrink}</Text>
              {cocktail.strDrinkThumb && (
                <Image
                  source={{ uri: cocktail.strDrinkThumb }}
                  style={styles.cocktailImageNew}
                />
              )}
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 10,
  },
  title2: {
    fontSize: 42,
    fontWeight: "light",
    marginBottom: 10,
  },
  drinkname: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  drinkcategory: {
    fontWeight: "lighter",
    color: "grey",
  },
  cocktailImage: {
    width: 300,
    height: 300,
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
  triggerContainer: {
    flexDirection: 'row',
    gap: 20,
    marginVertical: 10,
  },
  cocktailTriggerText: {
    fontSize: 20,
    color: '#202020',
  },
  selectedText: {
    fontWeight: 'bold',
    color: '#00FF29',
    textDecorationLine: 'underline',
    borderRadius: 5,
  },
  newCocktailsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  newCocktailCard: {
    width: '48%',
    padding: 10,
    marginBottom: 10,
  },
  cocktailImageNew: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  ingredientsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
    gap: 10,
  },

  ingredientItem: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    borderRadius: 5,
  },

  ingredientText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default HomeScreen;
