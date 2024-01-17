// CocktailDetailsScreen.jsx

import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const CocktailDetailsScreen = ({ route }) => {
  const { cocktailId } = route.params;
  const [cocktailDetails, setCocktailDetails] = useState(null);

  // Fonction pour récupérer les détails du cocktail en fonction de l'ID
  const fetchCocktailDetails = async () => {
    try {
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailId}`
      );
      const data = await response.json();
      if (data.drinks) {
        setCocktailDetails(data.drinks[0]);
      }
    } catch (error) {
      console.error('Error fetching cocktail details:', error);
    }
  };

  useEffect(() => {
    fetchCocktailDetails();
  }, []);

  // Afficher un indicateur de chargement si les détails sont en cours de chargement
  if (!cocktailDetails) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const renderIngredients = () => {
    const ingredients = [];
    for (let i = 1; i <= 15; i++) {
      const ingredientKey = `strIngredient${i}`;
      const measureKey = `strMeasure${i}`;
      if (cocktailDetails[ingredientKey]) {
        ingredients.push(
          <View key={i} style={styles.ingredientItem}>
            <Text style={styles.ingredientText}>{`${cocktailDetails[measureKey] ? cocktailDetails[measureKey] + ' ' : ''}${cocktailDetails[ingredientKey]}`}</Text>
          </View>
        );
      }
    }
    return ingredients;
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.cocktailName}>{cocktailDetails.strDrink}</Text>
      {cocktailDetails.strDrinkThumb && (
        <Image
          source={{ uri: cocktailDetails.strDrinkThumb }}
          style={styles.cocktailImage}
        />
      )}
      <Text style={styles.instructions}>{cocktailDetails.strInstructions}</Text>
      <Text style={styles.ingredientsTitle}>Ingredients:</Text>
      <View style={styles.ingredientsContainer}>{renderIngredients()}</View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  cocktailName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  cocktailImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  instructions: {
    fontSize: 16,
    marginBottom: 10,
  },
  ingredientsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  ingredientsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
    gap: 10,
  },
  ingredientItem: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
  },
  ingredientText: {
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CocktailDetailsScreen;
