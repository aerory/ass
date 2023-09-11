import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Button,
  Text,
  View,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';

const ProfileScreen = ({ navigation, route }) => {
  const [avatarIndex, setAvatarIndex] = useState(0);
  const [userProfile, setUserProfile] = useState({
    avatar: 'https://www.bootdey.com/img/Content/avatar/avatar4.png',
    name: '',
    email: 'owen@gmail.com',
    phoneNumber: '',
    bio: '',
    age: '',
    dateOfBirth: '',
    avatarOptions: [
      'https://www.bootdey.com/img/Content/avatar/avatar1.png',
      'https://www.bootdey.com/img/Content/avatar/avatar2.png',
      'https://www.bootdey.com/img/Content/avatar/avatar3.png',
      'https://www.bootdey.com/img/Content/avatar/avatar4.png',
      'https://www.bootdey.com/img/Content/avatar/avatar5.png',
      'https://www.bootdey.com/img/Content/avatar/avatar6.png',
      'https://www.bootdey.com/img/Content/avatar/avatar7.png',
    ],
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const updatedUserProfile = route.params?.updatedUserProfile;

      if (updatedUserProfile) {
        setUserProfile(updatedUserProfile);
      }
    });

    return unsubscribe;
  }, [navigation, route.params]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.avatarContainer}>
        <Image
          style={styles.avatar}
          source={{ uri: userProfile.avatarOptions[avatarIndex] }}
        />
      </View>
      <Text style={styles.label}>Email:</Text>
      <TextInput style={styles.input} value={userProfile.email} editable={false} />

      <Text style={styles.label}>Name:</Text>
      <TextInput style={styles.input} value={userProfile.name} editable={false} />

      <Text style={styles.label}>Phone Number:</Text>
      <TextInput
        style={styles.input}
        value={userProfile.phoneNumber}
        editable={false}
      />

      <Text style={styles.label}>Age:</Text>
      <TextInput style={styles.input} value={userProfile.age} editable={false} />

      <Text style={styles.label}>Date of Birth:</Text>
      <TextInput
        style={styles.input}
        value={userProfile.dateOfBirth}
        editable={false}
      />

      <Text style={styles.label}>Bio:</Text>
      <View style={styles.bioInputContainer}>
        <TextInput
          style={styles.bioInput}
          value={userProfile.bio}
          multiline={true}
          numberOfLines={6}
          maxLength={200}
          editable={false}
        />
      </View>

      <Button
        title="Edit Profile"
        onPress={() =>
          navigation.navigate('EditProfileScreen', { userProfile: userProfile })
        }
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 20,
  },
  label: {
    fontSize: 16,
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginLeft: 0,
    marginTop: 10,
    fontWeight: 'bold',
    color: 'black',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 0,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 18,
    color: 'black',
  },
  bioInputContainer: {
    width: '100%',
    height: 120,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
  },
  bioInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 18,
    color: 'black',
  },
  avatarContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  changeAvatarButton: {
    marginTop: 10,
  },
  changeAvatarButtonText: {
    color: '#1E90FF',
    fontSize: 18,
  },
});

export default ProfileScreen;