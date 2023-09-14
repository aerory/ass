import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
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
  label: {
    marginTop: 1,
    marginLeft: 5,
    textAlignVertical: 'center',
    height: 50,
    width: 340,
    fontSize: 20,
    backgroundColor: 'white',
  },
  refreshButton: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
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
  cityState: {
    fontSize: 16,
    color: 'black',
  },
  price: {
    fontSize: 16,
    color: 'grey',
    fontWeight: 'bold',
  },
});

const ShownStyles = StyleSheet.create({
  container: {
    margin: 10,
  },
  image: {
    width: 370,
    aspectRatio: 3 / 2,
    resizeMode: 'cover',
    borderRadius: 10,
    alignItems: 'center',
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

export {styles, VenueStyles, ShownStyles};
