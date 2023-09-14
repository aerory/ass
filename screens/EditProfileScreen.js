import React, { useState } from 'react';
import {
    StyleSheet,
    Button,
    Text,
    View,
    TextInput,
    Image,
    ScrollView,
    TouchableOpacity,
} from 'react-native';

import { auth, db } from '../components/firebase';
import { ref, set } from 'firebase/database';

const EditProfileScreen = ({ navigation, route }) => {
    const { userProfile } = route.params;
    const [state, setState] = useState({
        avatar: userProfile.avatar,
        name: userProfile.name,
        phoneNumber: userProfile.phoneNumber,
        bio: userProfile.bio,
        age: userProfile.age,
        dateOfBirth: userProfile.dateOfBirth,
        avatarIndex: 0,
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

    const toggleAvatar = () => {
        const nextIndex = (state.avatarIndex + 1) % state.avatarOptions.length;
        setState((prevState) => ({
            ...prevState,
            avatarIndex: nextIndex,
            avatar: state.avatarOptions[nextIndex], 
        }));
    };

    const saveChanges = () => {
        console.log('Changes have been saved');
        navigation.navigate('ProfileScreen', { updatedUserProfile: state });
    };

    const combFunc = () => {
        if (validateInputs()) {
            writeUserData();
        } else {
            console.log('Input validation failed');
        }
    };

    const validateInputs = () => {
        if (state.name.trim() === '') {
            console.log('Name is required');
            return false;
        }
        if (!/^\d{3}-\d{7}$/.test(state.phoneNumber)) {
            console.log('Invalid Phone Number format');
            return false;
        }
        if (!/^\d{2}$/.test(state.age)) {
            console.log('Invalid Age format');
            return false;
        }
        if (!/^\d{2}-\d{2}-\d{4}$/.test(state.dateOfBirth)) {
            console.log('Invalid Date of Birth format');
            return false;
        }
        return true;
    };

    const writeUserData = () => {
        const reference = ref(
            db,
            'profile/' + auth.currentUser?.email.split('@')[0]
        );

        set(reference, {
            avatar: state.avatar,
            name: state.name,
            phoneNumber: state.phoneNumber,
            bio: state.bio,
            age: state.age,
            dateOfBirth: state.dateOfBirth,
        })
            .then(() => {
                console.log('Data updated successfully for: ', auth.currentUser?.email);
                saveChanges();
            })
            .catch((error) => {
                console.log('Error updating data: ', error);
            });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.avatarContainer}>
                <Image
                    style={styles.avatar}
                    source={{ uri: state.avatar }}
                />
            </View>
            <TouchableOpacity
                style={styles.changeAvatarButton}
                onPress={toggleAvatar}
            >
                <Text style={styles.changeAvatarButtonText}>Change Avatar</Text>
            </TouchableOpacity>

            <Text style={styles.title}>Edit Profile</Text>

            <Text style={styles.label}>Name:</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your name: "
                value={state.name}
                onChangeText={(text) => setState({ ...state, name: text })}
            />
            <Text style={styles.label}>Phone Number:</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your Phone Number: "
                value={state.phoneNumber}
                onChangeText={(text) => setState({ ...state, phoneNumber: text })}
            />

            <Text style={styles.label}>Age:</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your Age: "
                value={state.age}
                onChangeText={(text) => setState({ ...state, age: text })}
            />

            <Text style={styles.label}>Date of Birth:</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your Date Of Birth: "
                value={state.dateOfBirth}
                onChangeText={(text) => setState({ ...state, dateOfBirth: text })}
            />

            <Text style={styles.label}>Bio:</Text>
            <View style={styles.bioInputContainer}>
                <TextInput
                    style={styles.bioInput}
                    placeholder="Enter your bio"
                    value={state.bio}
                    multiline={true}
                    numberOfLines={6}
                    maxLength={200}
                    onChangeText={(text) => setState({ ...state, bio: text })}
                />
            </View>

            <View style={styles.buttonContainer}>
                <Button title="Back" onPress={() => navigation.goBack()} />
                <View style={{ width: 10 }} />
                <Button title="Save Changes" onPress={combFunc} />
            </View>
        </ScrollView>
    );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 20,
    },
  buttonContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingHorizontal: 20, 
    },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
    color: 'black',
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
    borderWidth: 1,
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

