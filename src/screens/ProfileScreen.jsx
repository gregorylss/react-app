import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

// Composant de bouton réutilisable
const Button = ({ onPress, title = 'Save' }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
);

const ProfileScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [showProfileInfo, setShowProfileInfo] = useState(false);

  const handleSaveProfile = () => {
    console.log('Profil sauvegardé:', { firstName, lastName, username, profileImage });
    // Ajoutez ici la logique de sauvegarde du profil si nécessaire
    setShowProfileInfo(true); // Afficher les informations du profil après avoir appuyé sur "Save"
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
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.topContainer}>
        {profileImage && (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        )}

        {showProfileInfo && (
          <>
            {/* Afficher le nom complet */}
            <Text style={styles.profileName}>
              {firstName} {lastName}
            </Text>

            {/* Afficher l'adresse e-mail */}
            <Text style={styles.profileUser}>
              @{username}
            </Text>
          </>
        )}

        <TouchableOpacity onPress={handleImagePick}>
          <Text style={styles.pickImageText}>
            {profileImage ? 'Change your profile pick' : 'Pick a Profile Image'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.label}>Nom</Text>
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
        />

        <Text style={styles.label}>Prénom</Text>
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={(text) => setLastName(text)}
        />

        <Text style={styles.label}>Pseudo</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={(text) => setUsername(text)}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>

      <Button onPress={handleSaveProfile} title="Save your profile" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  topContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "#DDDDDD",
    backgroundColor: '#F9F9F9',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 100,
  },
  pickImageText: {
    color: "blue",
  },
  label: {
    alignSelf: "flex-start",
    marginBottom: 5,
    marginLeft: 5,
    color: "#A1A1A1",
    textTransform: 'uppercase',
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  profileUser: {
    fontSize: 17,
    color: "#333333",
  },
  button: {
    backgroundColor: 'transparent',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#00FF29',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 32,
    width: '100%',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#00FF29',
  },
});

export default ProfileScreen;
