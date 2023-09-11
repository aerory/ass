import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Button,
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {DatePickerModal} from 'react-native-paper-dates';
import {ref, set, onValue} from 'firebase/database';
import {auth, db} from '../firebase';

const HomeScreen = ({navigation}) => {
  const [searchText, setSearchText] = useState('');
  const [query, setQuery] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [showVenue, setShowVenue] = useState(false);
  const [open, setOpen] = useState(false);
  const [range, setRange] = useState({
    startDate: undefined,
    endDate: undefined,
  });
  const [venues, setVenues] = useState([]);

  const currentSessionEmail = auth.currentUser?.email;

  const searchTextHandler = () => {
    const queryResult = venues.find(venue =>
      Object.values(venue).some(value =>
        value.toLowerCase().includes(searchText.toLowerCase()),
      ),
    );
    if (queryResult) {
      setQuery(queryResult.venueID);
    }
    readVenueData();
  };

  const writeVenueData = (venueID, name, address, price, city, state) => {
    const reference = ref(db, 'venues/' + venueID);
    set(reference, {
      venueName: name,
      venueAddress: address,
      venueCity: city,
      venueState: state,
      pricePerNight: price,
    });
    console.log('Data written');
  };

  const readVenueData = () => {
    const newVenues = [];
    const reference = ref(db, 'venues/');
    onValue(reference, snapshot => {
      snapshot.forEach(childSnapshot => {
        const obj = childSnapshot.val();
        obj.venueID = childSnapshot.key;
        newVenues.push(obj);
      });
    });
    setVenues(newVenues);
  };

  useEffect(() => {
    readVenueData();
  }, []);

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

    const AddToWishlist = id => {
      // Implement your logic here
    };

    return (
      <View>
        <ScrollView
          contentContainerStyle={{flexDirection: 'column'}}
          style={{height: 610, display: showAll}}>
          {venues.map(venue => (
            <TouchableHighlight
              key={venue.venueID}
              onPress={() => OpenVenue(venue)}
              underlayColor="white">
              <View style={VenueStyles.container}>
                <Image source={{uri: venue.url}} style={VenueStyles.image} />
                <View style={VenueStyles.infoContainer}>
                  <Text style={VenueStyles.venueName}>{venue.venueName}</Text>
                  <Text style={VenueStyles.city}>{venue.venueCity}</Text>
                  <Text style={VenueStyles.venueDescription}>
                    {venue.Description}
                  </Text>
                  <Text style={VenueStyles.price}>
                    ${venue.pricePerNight} / night
                  </Text>
                </View>
              </View>
            </TouchableHighlight>
          ))}
        </ScrollView>
        <ScrollView display={showVenue}>
          {shownVenue.map(venue => (
            <View key={venue.venueID} style={ShownStyle.container}>
              <Image style={ShownStyle.image} source={{uri: venue.url}} />
              <Text style={ShownStyle.name} numberOfLines={1}>
                {venue.venueName}
              </Text>
              <Text style={ShownStyle.city} numberOfLines={1}>
                {venue.venueCity}
              </Text>
              <Text style={ShownStyle.longDescription} numberOfLines={4}>
                {venue.Description}
                <Text style={ShownStyle.price} numberOfLines={1}>
                  {' '}
                  ${venue.pricePerNight}{' '}
                </Text>
                / night
              </Text>
              <Button
                style={{color: 'red'}}
                title="Choose Date"
                onPress={() => setOpen(true)}
                uppercase={false}
                mode="outlined"></Button>
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
              <View style={ShownStyle.Buttons}>
                <Button title="cancel" onPress={CloseVenue}></Button>
                <Button title="book"></Button>
                <Button
                  title="Add to Wishlist"
                  onPress={() => AddToWishlist(venue.venueID)}></Button>
              </View>
            </View>
          ))}
        </ScrollView>
        <ScrollView
          contentContainerStyle={{flexDirection: 'column'}}
          style={{height: 610}}
          display={showVenue}>
          {shownVenue.map(venue => (
            <View key={venue.venueName} style={VenueStyles.container}>
              <Image source={{uri: venue.url}} style={VenueStyles.image} />
              <View style={VenueStyles.infoContainer}>
                <Text style={VenueStyles.venueName}>{venue.venueName}</Text>
                <Text style={VenueStyles.city}>{venue.venueCity}</Text>
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
              <View style={ShownStyle.Buttons}>
                <Button title="cancel" onPress={CloseVenue}></Button>
                <Button title="pay"></Button>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <View style={{flexDirection: 'row'}}>
        <TextInput
          style={styles.label}
          placeholder="search..."
          value={searchText}
          onChangeText={text => setSearchText(text)}
        />
        <Button
          style={styles.searchButton}
          title="Go"
          onPress={searchTextHandler}
        />
      </View>
      <View>
        <VenueDisplay />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 20,
  },
  searchButton: {
    height: 50,
  },
  label: {
    marginTop: 1,
    textAlignVertical: 'center',
    height: 50,
    width: 340,
    fontSize: 22,
    backgroundColor: 'white',
  },
});

const VenueStyles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 380,
    height: 200,
  },
  infoContainer: {
    flex: 1,
    padding: 10,
  },
  venueName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  venueDescription: {},
  city: {
    fontSize: 16,
    color: 'black',
  },
  price: {
    fontSize: 16,
    color: 'grey',
    fontWeight: 'bold',
  },
});

const ShownStyle = StyleSheet.create({
  container: {
    margin: 10,
  },
  image: {
    width: 380,
    aspectRatio: 3 / 2,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  name: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: 'bold',
    color: 'black',
  },
  city: {
    fontSize: 16,
    lineHeight: 26,
  },
  prices: {
    fontSize: 18,
    marginVertical: 10,
  },
  price: {
    fontWeight: 'bold',
  },
  totalPrice: {
    color: '#5b5b5b',
    textDecorationLine: 'underline',
  },
  longDescription: {
    marginVertical: 20,
    fontSize: 16,
    lineHeight: 24,
  },
  Buttons: {
    flexDirection: 'row',
    marginTop: 70,
  },
});

export default HomeScreen;
