import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons'

const propertyData = [
  {
    id: '1',
    Description:
      "Experience Miami's finest in our Luxury Villa. Ocean views, a private pool, and a rooftop terrace for cocktails. Minutes from South Beach and nightlife.",
    url: 'https://www.dreamexoticrentals.com/images/US/Florida/miami/TheViews/1.jpg',
    venueName: '$250,000',
    venueAddress: '123 Main St',
    pricePerNight: '150',

    Description:
      'Discover rustic charm in upstate New York with a stay at our Cozy Cottage. Relax by the fireplace or explore nearby trails. A perfect escape from the city.',
    pricePerNight: '120.00',
    url: 'https://www.newyorkupstate.com/resizer/53hhXoP4W9p3yV5OBVVGJKsVO9Q=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/3VT7UMDYINFIPKPZFQAWRVW3I4.jpg',
    venueAddress: '123 Main Street',
    venueCity: 'New York',
    venueName: 'Cozy Cottage',
    venueState: 'NY',
  },
  // {
  //   id: '2',
  //   Description:
  //     "Experience Miami's finest in our Luxury Villa. Ocean views, a private pool, and a rooftop terrace for cocktails. Minutes from South Beach and nightlife.",
  //   pricePerNight: '250.00',
  //   url: 'https://www.dreamexoticrentals.com/images/US/Florida/miami/TheViews/1.jpg',
  //   venueAddress: '456 Beachfront Road',
  //   venueCity: 'Miami',
  //   venueName: 'Luxury Villa',
  //   venueState: 'FL',
  // },
  // {
  //   id: '3',
  //   Description:
  //     "An oasis of luxury in Kuala Lumpur. Modern comforts, private pool, and serene gardens. Ideal for exploring the city's culture and landmarks. Perfect for both couples and families.",
  //   pricePerNight: '250.00',
  //   url: 'https://firstclasse.com.my/wp-content/uploads/2021/03/Villa-Resort-KL-Selangor-featured.jpg',
  //   vanueCity: 'Miami',
  //   venueAddress: '456 Beachfront Road',
  //   venueName: 'Kuala Villa',
  //   venueState: 'FL',
  // },
  {
    id: '4',
    Description:
      'Elevate your adventure at our Mountain Resort. Spa, dining, golf, and panoramic mountain views. Year-round Rocky Mountain luxury.',
    pricePerNight: '180.00',
    url: 'https://www.travelandleisure.com/thmb/cbisMFejjbdT8Ybw2RaT9bXoKCE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/viceroy-snowmass-colorado-00-CORESORTHOTELSWB22-face6d74fefd43238efc548d33ca1278.jpg',
    venueAddress: '789 Pine Ridge Trail',
    venueCity: 'Denver',
    venueName: 'Mountain Resort',
    venueState: 'CO',
  },
];



const Wishlist = () => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = text => {
    setSearchText(text);
  };

  const renderItem = ({item}) => (
    <TouchableOpacity style={styles.card}>
      <Image source={{uri: item.url}} style={styles.image} />
      <View style={styles.cardBody}>
        <Text style={styles.venueName}>{item.venueName}</Text>
        <TouchableOpacity
          style={{ position: 'absolute', right: 10, top: 10 }}
          onPress={toggleFavorite}
        >
          <Icon
            name={isFavorite ? 'heart' : 'heart-outline'} // Use the heart or heart-outline icon based on the favorite state
            size={24}
            color={isFavorite ? 'red' : 'black'} // Change the color based on the favorite state
          />
        </TouchableOpacity>
        <Text style={styles.address}>{item.venueAddress}</Text>
        <Text style={styles.price}>MYR {item.pricePerNight}/night</Text>
      </View>
      <View style={styles.cardFooter}>
        <Text style={styles.beds}>{item.Description}</Text>
        {/* <Text style={styles.baths}>{item.baths} baths</Text> */}
        {/* <Text style={styles.parking}>{item.parking} parking</Text> */}
      </View>
    </TouchableOpacity>
  );

  const [isFavorite, setIsFavorite] = useState(false); // State to track whether the item is marked as a favorite

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite); // Toggle the favorite state when the heart icon is clicked
  };

  const filteredData = propertyData.filter(item => {
    return item.venueName.toLowerCase().includes(searchText.toLowerCase());
  });

  return (
    <View style={styles.container}>
      <View style={styles.searchInputContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search wishlist..."
          onChangeText={handleSearch}
          value={searchText}
        />
      </View>
      <FlatList
        contentContainerStyle={styles.propertyListContainer}
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  searchInputContainer: {
    paddingHorizontal: 20,
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#dcdcdc',
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  propertyListContainer: {
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
    color: '#feaeee',
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

export default Wishlist;
