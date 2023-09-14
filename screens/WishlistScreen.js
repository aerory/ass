import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';

import {Button, Snackbar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {ref, set, get} from 'firebase/database';
import {auth, db} from '../components/firebase';

const Wishlist = ({navigation}) => {
  const [venueData, setVenues] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  const [isSnackbarVisible, setisSnackbarVisible] = useState(false);

  const currentSessionEmail = auth.currentUser?.email.split('@')[0];
  const wishlistRef = ref(db, 'wishlist/' + currentSessionEmail);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getUserWishlist();
    });

    return unsubscribe;
  }, [navigation]);

  const renderItem = ({item}) => (
    <TouchableOpacity style={styles.card}>
      <Image source={{uri: item.img}} style={styles.image} />
      <View style={styles.cardBody}>
        <Text style={styles.name}>{item.venueName}</Text>
        <TouchableOpacity
          style={{position: 'absolute', right: 10, top: 10}}
          onPress={() => removeFromWishlist(item.venueID)}>
          <Icon
            name={isFavorite ? 'heart-outline' : 'heart'} // Use the heart or heart-outline icon based on the favorite state
            size={24}
            color={isFavorite ? 'black' : 'red'} // Change the color based on the favorite state
          />
        </TouchableOpacity>
        <Text style={styles.address}>
          {item.venueAddress + ', ' + item.venueCity + ', ' + item.venueState}
        </Text>
        <Text style={styles.price}>MYR {item.pricePerNight} / night</Text>
      </View>
      <View style={styles.cardFooter}>
        <Text style={styles.specialty}>{item.specialty}</Text>
      </View>
    </TouchableOpacity>
  );

  // read wishlish from user and update in wishlistIndex

  const getUserWishlist = async () => {
    try {
      const wishlistIndex = [];
      const snapshot = await get(wishlistRef);

      if (snapshot.exists()) {
        snapshot.forEach(childSnapshot => {
          console.log(childSnapshot.val());
          wishlistIndex.push(childSnapshot.val());
          console.log('getUWL', wishlistIndex);
        });
      } else {
        console.log(currentSessionEmail, 'has no wishlist');
        console.log(wishlistIndex);
      }

      readVenueData(wishlistIndex);
    } catch (error) {
      console.error(error);
    }
  };

  const readVenueData = wishlistIndex => {
    const venueData = [];
    console.log('rvd', wishlistIndex);
    get(ref(db, 'venue/'))
      .then(snapshot => {
        if (snapshot.exists()) {
          snapshot.forEach(childSnapshot => {
            const obj = childSnapshot.val();
            obj.venueID = childSnapshot.key;
            if (wishlistIndex.includes(obj.venueID)) {
              venueData.push(obj);
              console.log(wishlistIndex);
            }
            // console.log(obj.venueID);
            // console.log('readVD', venueData);
            setVenues(venueData);
          });
        } else {
          console.log('WL: Error reading venue data');
          setVenues(venueData);
        }
        console.log(venueData);
      })
      .catch(error => {
        console.error('Error getting venue:', error);
      });
  };

  const removeFromWishlist = venueID => {
    setIsFavorite(!isFavorite);
    //check wishlistsssss
    const wishlistRef = ref(db, 'wishlist/' + currentSessionEmail);
    const wishlistSet = new Set(); // use set so no non-unique venue ids
    const jsonObject = {};

    get(wishlistRef)
      .then(snapshot => {
        if (snapshot.exists()) {
          snapshot.forEach(childSnapshot => {
            wishlistSet.add(childSnapshot.val());
          });
          console.log(wishlistSet);
          if (wishlistSet.has(venueID)) {
            console.log('WL: Venue in wishlist; remove from wishlist');
            wishlistSet.delete(venueID);
          }

          const wishlistArr = Array.from(wishlistSet);

          wishlistArr.forEach((value, index) => {
            jsonObject[index.toString()] = value;
          });

          console.log(wishlistSet);

          set(wishlistRef, jsonObject);
        } else {
          console.log(currentSessionEmail, 'has no wishlist');
        }

        getUserWishlist();
        showSnackbar();
      })
      .catch(error => {
        console.error('Error getting wishlist:', error);
      });
  };

  const showSnackbar = () => {
    setisSnackbarVisible(true);
    console.log('harh');
    // hide the Snackbar after 1 second
    // setTimeout(() => {
    //   setisSnackbarVisible(false);
    // }, 10000);
  };

  if (venueData.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}> No item in wishlist found.</Text>
        <Text style={styles.loadingText}> Start by adding one!</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.venueListContainer}
          data={venueData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
        <View>
          <Snackbar
            visible={isSnackbarVisible}
            onDismiss={() => setisSnackbarVisible(false)}
            duration={10000}>
            Removed from wishlist
          </Snackbar>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
  },
  venueListContainer: {
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    height: 150,
    marginBottom: 10,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  cardBody: {
    marginBottom: 10,
    padding: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  address: {
    fontSize: 16,
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    marginBottom: 0,
    color: '#666',
  },
  cardFooter: {
    padding: 10,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#dcdcdc',
    justifyContent: 'space-between',
  },
  specialty: {
    fontSize: 14,
    color: '#3eab2a',
    fontWeight: 'bold',
  },
});

export default Wishlist;
