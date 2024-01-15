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

function ProfileScreen() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [profileImage, setProfileImage] = useState(null);
  
    const handleSaveProfile = () => {
      console.log("Profil sauvegardé:", { firstName, lastName, username, profileImage });
    };
  
    const handleImagePick = async () => {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.cancelled) {
        setProfileImage(result.uri);
      }
    };
  
    return (
      <View style={styles.containerprofil}>
        <Text style={styles.title}>Profile Screen</Text>
  
        {profileImage && (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        )}
  
        <TouchableOpacity onPress={handleImagePick}>
          <Text style={styles.pickImageText}>Pick a Profile Image</Text>
        </TouchableOpacity>
  
        <TextInput
          style={styles.input}
          placeholder="Nom"
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
        />
  
        <TextInput
          style={styles.input}
          placeholder="Prénom"
          value={lastName}
          onChangeText={(text) => setLastName(text)}
        />
  
        <TextInput
          style={styles.input}
          placeholder="Pseudo"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
  
        <Button title="Save Profile" onPress={handleSaveProfile} />
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

  export default ProfileScreen; 