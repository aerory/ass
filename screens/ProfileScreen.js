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

import { auth, db } from '../components/firebase';
import { ref, get } from 'firebase/database';

const ProfileScreen = ({ navigation }) => {
    const userEmail = auth.currentUser?.email;
    const [userProfile, setUserProfile] = useState({
        avatar: 'https://www.bootdey.com/img/Content/avatar/avatar4.png',
        name: '',
        phoneNumber: '',
        bio: '',
        age: '',
        dateOfBirth: '',
    });

    const handleSignOut = async () => {
        try {
            const currentSessionEmail = auth.currentUser?.email;
            await auth.signOut();
            console.log('Logged out of:', currentSessionEmail);
            navigation.navigate('LoginScreen'); 
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            readUserData();
        });

        return unsubscribe;
    }, [navigation]);

    const readUserData = async () => {
        try {
            const currentSessionEmail = auth.currentUser?.email;
            console.log(currentSessionEmail);
            if (currentSessionEmail) {
                const profileRef = ref(
                    db,
                    'profile/' + currentSessionEmail.split('@')[0]
                );

                const snapshot = await get(profileRef);

                if (snapshot.exists()) {
                    const profileData = snapshot.val();
                    setUserProfile(profileData);
                } else {
                    console.log('Profile data does not exist.');
                }
            }
        } catch (error) {
            console.error('Error fetching user profile data:', error);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.avatarContainer}>
                <Image
                    style={styles.avatar}
                    source={{ uri: userProfile.avatar }}
                />
            </View>
            <Text style={styles.label}>Email:</Text>
            <TextInput style={styles.input}
                value={userEmail}
                editable={false} />

            <Text style={styles.label}>Name:</Text>
            <TextInput style={styles.input}
                value={userProfile.name}
                editable={false} />

            <Text style={styles.label}>Phone Number:</Text>
            <TextInput
                style={styles.input}
                value={userProfile.phoneNumber}
                editable={false}
            />

            <Text style={styles.label}>Age:</Text>
            <TextInput style={styles.input}
                value={userProfile.age}
                editable={false} />

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

            <View style={styles.buttonContainer}>
            <Button
                title="Sign Out"
                    onPress={handleSignOut} />
            <View style={{ width: 10 }} />
            <Button
                title="Edit Profile"
                onPress={() =>
                    navigation.navigate('EditProfileScreen', { userProfile: userProfile }) }/>
            </View>
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
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
});

export default ProfileScreen;