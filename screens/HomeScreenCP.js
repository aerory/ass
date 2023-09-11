import React, { Component } from 'react';
import { AppButton } from '../UI.js';
import {
  StyleSheet,
  Button,
  Text,
  View,
  Image,
  TouchableNativeFeedback,
  SafeAreaView,
} from 'react-native';
import { ScrollView, TextInput, TouchableHighlight } from 'react-native-gesture-handler';
import DatePicker from 'react-native-date-picker'
import { DatePickerModal } from 'react-native-paper-dates';
import { ref, set, onValue, child } from "firebase/database";
import Icon from 'react-native-vector-icons/Ionicons'
import { db } from '../firebase'

const venues = [];

function removeVenueData(key){
  const reference = ref(db, 'venue/' + key);
  const venueKey = key;
  reference.child(venueKey).remove()
    .then(() => {
      console.log("Venue deleted successfully");
    })
    .catch((error) => {
      console.error("Error deleting venue: " + error.message);
    });
}

export default class HomeScreen extends Component<Props> {
  static navigationOptions = {
    title: 'Home Screen',
  };

  constructor(props) {
      super(props);

      this.state = {
        searchText: '',
        query: '',
      }

      this.writeVenueData = this.writeVenueData.bind(this);
      this.readVenueData = this.readVenueData.bind(this);
      this.readVenueData();
      console.log('[+] <HomeScreen> constructor() invoked');
  }

  componentDidMount() {
    console.log('[+] <HomeScreen> componentDidMount() invoked')
  }

  componentDidUpdate() {
    console.log('[+] <HomeScreen> componentDidUpdate() invoked')
  }

  componentWillUnmount() {
    console.log('[+] <HomeScreen> componentWillUnmount() invoked')
  }

  searchText = () => {
    console.log('perform search')
    console.log(this.state.searchText)
    venues.forEach(venue => {
      console.log(venue)
      if(venue.venueName == this.state.searchText){
        this.setState({query: venue.venueID})
      }
      else if(venue.venueAddress == this.state.searchText){
        this.setState({query: venue.venueID})
      }
      else if(venue.venueCity == this.state.searchText){
        this.setState({query: venue.venueID})
      }
      else if(venue.venueState == this.state.searchText){
        this.setState({query: venue.venueID})
      }
    });
    console.log(this.state.query)
    this.readVenueData(this.state.query)
    
  }

  writeVenueData(venueID, name, address, price, city, state){
    const reference = ref(db, 'venues/' + venueID);
    set(reference, {
      venueName: name,
      venueAddress: address,
      venueCity: city,
      venueState: state,
      pricePerNight: price,
    })
    console.log('data written');
  }

  readVenueData() {
    for(i in venues){
      venues.pop();
    }
    const reference = ref(db, 'venues/');
    onValue(reference, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        let obj = childSnapshot.val()
        obj['venueID'] = childSnapshot.key
        console.log(obj)
        venues.push(obj);
        
      });
      
    });
    console.log(venues)
  }

  // readVenueData(key) {
  //   const reference = ref(db, 'venues/' + key);
  //   onValue(reference, (snapshot) => {
  //     snapshot.forEach((childSnapshot) => {
  //       const childKey = childSnapshot.key;
  //       venues.push(childSnapshot.val());
  //     });
  //   });
  //   console.log(venues)
  // }


  render() {
    console.log('[+] <HomeScreen> render() invoked');
    
    return (
      <SafeAreaView >
        <View style={{flexDirection: 'row'}}>
          <TextInput
            style={styles.label}
            placeholder="search..."
            value={this.state.searchText}
            onChangeText={searchText =>
            this.setState({searchText: searchText})
          }>
          </TextInput>
          <AppButton
            style={styles.searchButton}
            title={'go'}
            onPress={() => {
              this.forceUpdate()
              //this.searchText()
            }}
          />
        </View>
        <View>
          <VenueDisplay></VenueDisplay>
        </View>
      </SafeAreaView>
    );
    
  }
}

const ShownVenue = [];

export class VenueDisplay extends Component<Props> {

  constructor(props){
    super(props)

    this.state = {
      showAll: 'initial',
      showVenue: 'none',
      showBooking: 'none',
      open: false,
      start: undefined,
      end: undefined,
      range:{ startDate: undefined, endDate: undefined },
    }
    
    this.OpenVenue = this.OpenVenue.bind(this);
    this.CloseVenue = this.CloseVenue.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
  }

  componentDidMount(){
    console.log("venue componentDidMount called")
  }

  onDismiss() {
    this.setState({open: false});
  }

  onConfirm(startDate, endDate){
    this.setState({open: false});
    this.setState({ range: { ...this.state.range, startDate: startDate, ...this.state.range, endDate: endDate }});
    console.log(this.state.range)
  }

  OpenVenue(venue) {
    for(i in ShownVenue){
      ShownVenue.pop();
    }
    this.setState({showAll: 'none'})
    this.setState({showVenue: 'initial'})
    ShownVenue.push(venue);
  }

  CloseVenue() {
    this.setState({showAll: 'initial'})
    this.setState({showVenue: 'none'})
  }

  OpenBooking() {
    this.setState({showVenue: 'none'})
    this.setState({showBooking: 'initial'})
  }

  CloseBooking() {
    this.setState({showVenue: 'initial'})
    this.setState({showBooking: 'none'})
  }

  AddToWishlist(id){
    //
  }

  render(){
    return(
      <View>
        <ScrollView contentContainerStyle={{ flexDirection:"column" }} style={{height: 610, display: this.state.showAll}}>
          {venues.map((venue) => (
            console.log('venue displayed'),
            <TouchableHighlight key={venue.venueID} onPress={() => this.OpenVenue(venue)} underlayColor="white">
              <View style={VenueStyles.container}>
                <Image
                  source={{ uri: venue.url }}
                  style={VenueStyles.image}
                />
                <View style={VenueStyles.infoContainer}>
                  <Text style={VenueStyles.venueName}>{venue.venueName}</Text>
                  <Text style={VenueStyles.city}>{venue.venueCity}</Text>
                  <Text style={VenueStyles.venueDescription}>{venue.Description}</Text>
                  <Text style={VenueStyles.price}>${venue.pricePerNight} / night</Text>
                </View>
              </View>
            </TouchableHighlight>
          ))}
        </ScrollView>
        <ScrollView display={this.state.showVenue}>
          {ShownVenue.map((venue) => (
            <View key={venue.venueID} style={ShownStyle.container}>
                
              {/* Image  */}
              <Image
                style={ShownStyle.image}
                source={{uri: venue.url}}
              />
              
              {/* Venue Name */}
              <Text style={ShownStyle.name} numberOfLines={1}>
                {venue.venueName}
              </Text>

              {/* City */}
              <Text style={ShownStyle.city} numberOfLines={1}>
                {venue.venueCity}
              </Text>
              
              {/* Type & Description */}
              <Text style={ShownStyle.longDescription} numberOfLines={4}>
                {venue.Description}

              {/*  Price Per Night} */}
              <Text>
                <Text style={ShownStyle.price} numberOfLines={1}>  ${venue.pricePerNight} </Text>/ night</Text>
              </Text>

              <Button style={{color: 'red'}} title='Choose Date' onPress={() => this.setState({open: true})} uppercase={false} mode="outlined">
              </Button>
              <DatePickerModal
                locale='en'
                presentationStyle="pageSheet"
                mode="range"
                visible={this.state.open}
                onDismiss={this.onDismiss}
                startDate={this.state.start}
                endDate={this.state.end}
                onConfirm={() => this.onConfirm(this.state.start, this.state.end)}
              />
              <View style={ShownStyle.Buttons}>
                <Button title='cancel' onPress={() => this.CloseVenue()}>
                  
                </Button>
                <Button title='book' onPress={() => this.OpenBooking()}>

                </Button>
                <Button title='Add to Wishlist' onPress={() => this.AddToWishlist(venue.venueID)}>

                </Button>
              </View>
          </View>
          ))}
        </ScrollView>
        <ScrollView contentContainerStyle={{ flexDirection:"column" }} style={{height: 610}} display={this.state.showBooking}>
          {ShownVenue.map((venue) => (
            <View key={venue.venueName} style={VenueStyles.container}>
              <Image
                source={{ uri: venue.url }}
                style={VenueStyles.image}
              />
              <View style={VenueStyles.infoContainer}>
                <Text style={VenueStyles.venueName}>{venue.venueName}</Text>
                <Text style={VenueStyles.city}>{venue.venueCity}</Text>
                <Text style={VenueStyles.venueDescription}>{venue.Description}</Text>
                <Text style={VenueStyles.price}>${venue.pricePerNight} / night</Text>
              </View >
              <View style={{padding: 10}}>
                <Text style={VenueStyles.venueName}>Booking Information</Text>
                <Text style={VenueStyles.venueName}>Date: {this.state.range.startDate} to {this.state.range.endDate}</Text>
                <Text style={VenueStyles.venueName}>Days: {this.state.range.endDate - this.state.range.startDate}</Text>
                
                <Text style={VenueStyles.venueName}>Total: {(this.state.range.endDate - this.state.range.startDate) * venue.pricePerNight}</Text>
              </View>
              <View style={ShownStyle.Buttons}>
              <Button title='cancel' onPress={() => this.CloseVenue()}>   
                </Button>
                <Button title='pay' onPress={() => this.pay()}>

                </Button>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    )
  }
}

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
    backgroundColor:'white',
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
    shadowOffset: { width: 0, height: 2 },
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
  venueDescription: {

  },
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
    color: 'black'
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
  }
});