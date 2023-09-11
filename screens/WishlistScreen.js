import React, {Component, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';

const wishlistVenues = [];

export default class WishlistScreen extends Component<Props> {
  static navigationOptions = {
    title: 'Wishlist',
  };

  constructor(props) {
    super(props);

    this.state = {};

    console.log('[+] <WishlistScreen> constructor() invoked');
  }

  componentDidMount() {
    console.log('[+] <WishlistScreen> componentDidMount() invoked');
  }

  componentDidUpdate() {
    console.log('[+] <WishlistScreen> componentDidUpdate() invoked');
  }

  componentWillUnmount() {
    console.log('[+] <WishlistScreen> componentWillUnmount() invoked');
  }

  render() {
    console.log('[+] <WishlistScreen> render() invoked');

    // const filteredData = propertyData.filter(item => {
    //   return item.address.toLowerCase().includes(searchText.toLowerCase());
    // });

    return (
      <View style={styles.container}>
        {/* <View style={styles.searchInputContainer}>
          <TextInput
          style={styles.searchInput}
          placeholder="Search properties..."
          onChangeText={handleSearch}
          value={searchText}
        />
        </View>
        <FlatList
          contentContainerStyle={styles.wishlistContainer}
          // data={filteredData}
          data = {wishlistVenues}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 20,
  },
  searchInputContainer: {
    paddingHorizontal: 20,
  },
  searchInput: {
    height: 20,
    borderWidth: 1,
    borderColor: '#dcdcdc',
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  wishlistContainer: {
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
  venueName: {
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
    marginBottom: 5,
    color: '#666',
  },
  cardFooter: {
    padding: 10,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#dcdcdc',
    justifyContent: 'space-between',
  },
  beds: {
    fontSize: 14,
    color: '#ffa500',
    fontWeight: 'bold',
  },
  baths: {
    fontSize: 14,
    color: '#ffa500',
    fontWeight: 'bold',
  },
  parking: {
    fontSize: 14,
    color: '#ffa500',
    fontWeight: 'bold',
  },
});
