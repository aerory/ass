import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import {Button, TextInput} from 'react-native-paper';
import {DatePickerModal} from 'react-native-paper-dates';
import {ref, set, onValue} from 'firebase/database';
import {auth, db} from '../components/firebase';
import Icon from 'react-native-vector-icons/Ionicons';

import {styles, VenueStyles, ShownStyles} from '../styles/HomeStyle';

const HomeScreen = ({navigation}) => {
  const [searchText, setSearchText] = useState('');
  const [query, setQuery] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [range, setRange] = useState({
    startDate: undefined,
    endDate: undefined,
  });
  const [venues, setVenues] = useState([]);

  const currentSessionEmail = auth.currentUser?.email.split('@')[0];
  console.log(currentSessionEmail);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      readVenueData();
    });

    return unsubscribe;
  }, []);

  const searchTextHandler = () => {
    const queryResult = venues.filter(item => {
      return item.venueName.toLowerCase().includes(searchText.toLowerCase());
    });
    if (queryResult.length > 0) {
      setVenues(queryResult);
    } else {
      readVenueData();
    }
  };

  // const handleSearch = text => {
  //   setSearchText(text);
  // };

  // const filteredData = venueData.filter(item => {
  //   return item.venueName.toLowerCase().includes(searchText.toLowerCase());
  // });

  {
    /* <View style={styles.searchInputContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search wishlist"
            onChangeText={handleSearch}
            value={searchText}
          />
        </View> */
  }

  const writeVenueData = (venueID, name, address, price, city, state) => {
    const reference = ref(db, 'venues/' + venueID);
    set(reference, {
      venueName: name,
      venueAddress: address,
      venueCity: city,
      venueState: state,
      pricePerNight: price,
    })
      .then(() => {
        //success callback
        console.log('venue data logged successfully');
      })
      .catch(error => {
        //error callback
        console.log('venue writing error ', error);
      });
  };

  const readVenueData = () => {
    const newVenues = [];
    const reference = ref(db, 'venue/');
    onValue(reference, snapshot => {
      snapshot.forEach(childSnapshot => {
        const obj = childSnapshot.val();
        obj.venueID = childSnapshot.key;
        newVenues.push(obj);
      });
    });
    setVenues(newVenues);
  };

  const VenueDisplay = () => {
    const [showAll, setShowAll] = useState('initial');
    const [showVenue, setShowVenue] = useState('none');
    const [open, setOpen] = useState(false);
    const [range, setRange] = useState({
      startDate: undefined,
      endDate: undefined,
    });
    const [shownVenue, setShownVenue] = useState([]);

    const onDismiss = () => {
      setOpen(false);
    };

    const onConfirm = (startDate, endDate) => {
      setOpen(false);
      setRange({startDate, endDate});
    };

    const OpenVenue = venue => {
      setShownVenue([venue]);
      setShowAll('none');
      setShowVenue('initial');
    };

    const CloseVenue = () => {
      setShowAll('initial');
      setShowVenue('none');
    };

    const checkWishlist = venueID => {
      //check wishlist
      const wishlistRef = ref(db, 'wishlist/' + currentSessionEmail);
      const wishlistSet = new Set(); // use set so no non-unique venue ids
      const jsonObject = {};

      onValue(wishlistRef, snapshot => {
        if (snapshot.exists()) {
          snapshot.forEach(childSnapshot => {
            wishlistSet.add(childSnapshot.val());
          });
        } else {
          console.log(currentSessionEmail, 'has no wishlist');
        }
      });

      if (wishlistSet.has(venueID)) {
        console.log('Venue in wishlist; remove from wishlist');
        wishlistSet.delete(venueID);
      } else {
        console.log('Venue not in wishlist; add to wishlist');
        wishlistSet.add(venueID);
      }

      const wishlistArr = Array.from(wishlistSet);
      console.log(wishlistArr);

      wishlistArr.forEach((value, index) => {
        jsonObject[index.toString()] = value;
      });

      console.log(wishlistSet);

      set(wishlistRef, jsonObject);
    };
    const isFavorite = false;

    return (
      <View>
        <ScrollView
          contentContainerStyle={{flexDirection: 'column'}}
          style={{height: 610, display: showAll}}>
          {/* Custom header */}
          {venues.map(venue => (
            <TouchableHighlight
              key={venue.venueID}
              onPress={() => OpenVenue(venue)}
              underlayColor="white">
              <View style={VenueStyles.container}>
                <Image source={{uri: venue.img}} style={VenueStyles.image} />
                <View style={VenueStyles.infoContainer}>
                  <Text style={VenueStyles.venueName}>{venue.venueName}</Text>

                  <Text style={VenueStyles.cityState}>
                    {venue.venueCity + ', ' + venue.venueState}
                  </Text>
                  <Text style={VenueStyles.venueDescription}>
                    {venue.specialty}
                  </Text>
                  <Text style={VenueStyles.price}>
                    MYR {venue.pricePerNight} / night
                  </Text>
                </View>
              </View>
            </TouchableHighlight>
          ))}
        </ScrollView>
        <View display={showVenue}>
          {shownVenue.map(venue => (
            <View key={venue.venueID} style={ShownStyles.container}>
              <Image style={ShownStyles.image} source={{uri: venue.img}} />
              <Text style={ShownStyles.name} numberOfLines={1}>
                {venue.venueName}
              </Text>
              <TouchableOpacity
                style={{position: 'absolute', right: 12, top: 8}}
                onPress={() => checkWishlist(venue.venueID)}>
                <Icon
                  name={isFavorite ? 'heart-outline' : 'heart'} // Use the heart or heart-outline icon based on the favorite state
                  size={24}
                  color={isFavorite ? 'black' : 'red'} // Change the color based on the favorite state
                />
              </TouchableOpacity>
              <Text style={ShownStyles.cityState} numberOfLines={1}>
                {venue.venueCity + ', ' + venue.venueState}
              </Text>
              <Text style={ShownStyles.longDescription} numberOfLines={6}>
                {venue.description}
                <Text style={ShownStyles.price} numberOfLines={1}>
                  {'\n\n'}
                  MYR {venue.pricePerNight}{' '}
                </Text>
                / night
              </Text>
              <Button
                onPress={() => setOpen(true)}
                uppercase={false}
                mode="outlined">
                Book Venue
              </Button>
              <Button onPress={CloseVenue} mode="outlined">
                Close
              </Button>

              <DatePickerModal
                locale="en"
                presentationStyle="pageSheet"
                mode="range"
                visible={open}
                onDismiss={onDismiss}
                startDate={range.startDate}
                endDate={range.endDate}
                onConfirm={() => onConfirm(range.startDate, range.endDate)}
              />
              <View style={ShownStyles.Buttons}></View>
            </View>
          ))}
        </View>
        {/* <ScrollView
          contentContainerStyle={{flexDirection: 'column'}}
          style={{height: 610}}
          display={showVenue}>
          {shownVenue.map(venue => (
            <View key={venue.venueName} style={VenueStyles.container}>
              <Image source={{uri: venue.url}} style={VenueStyles.image} />
              <View style={VenueStyles.infoContainer}>
                <Text style={VenueStyles.venueName}>{venue.venueName}</Text>
                <Text style={VenueStyles.cityState}>{venue.venueCity}</Text>
                <Text style={VenueStyles.venueDescription}>
                  {venue.Description}
                </Text>
                <Text style={VenueStyles.price}>
                  ${venue.pricePerNight} / night
                </Text>
              </View>
              <View style={{padding: 10}}>
                <Text style={VenueStyles.venueName}>Booking Information</Text>
                <Text style={VenueStyles.venueName}>
                  Date: {range.startDate} to {range.endDate}
                </Text>
                <Text style={VenueStyles.venueName}>
                  Days: {range.endDate - range.startDate}
                </Text>
                <Text style={VenueStyles.venueName}>
                  Total:{' '}
                  {(range.endDate - range.startDate) * venue.pricePerNight}
                </Text>
              </View>
              <View style={ShownStyles.Buttons}>
                <Button title="cancel" onPress={CloseVenue}></Button>
                <Button title="pay"></Button>
              </View>
            </View>
          ))}
        </ScrollView> */}
      </View>
    );
  };
  if (venues.length === 0) {
    return (
      <View style={styles.refreshButton}>
        <Button
          icon="refresh"
          mode="contained-tonal"
          onPress={() => readVenueData()}>
          Refresh
        </Button>
      </View>
    );
  } else {
    return (
      <SafeAreaView>
        <View style={{flexDirection: 'row'}}>
          <TextInput
            style={styles.label}
            placeholder="search..."
            mode="outlined"
            value={searchText}
            onChangeText={text => setSearchText(text)}
          />
          <View
            style={{
              paddingTop: 5,
              width: 80,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Button
              icon="magnify" // Replace "magnify" with your desired icon
              mode="contained-tonal"
              onPress={() => searchTextHandler()}
              style={{width: '75%', height: '50%'}}
            />
          </View>
        </View>
        <View>
          <VenueDisplay />
        </View>
      </SafeAreaView>
    );
  }
};

export default HomeScreen;
