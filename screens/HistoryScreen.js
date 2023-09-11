import React, {useState} from 'react';
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  View,
  Image,
  Text,
} from 'react-native';

export default ListPosts = () => {
  const data = [
    {
      id: 1,
      description: 'Luxury Villa',
      date: '2023-09-09 10:17',
      color: '#4B0082',
      completed: 0,
      image:
        'https://www.dreamexoticrentals.com/images/US/Florida/miami/TheViews/1.jpg',
    },
    {
      id: 2,
      description: 'Cozy Cottage',
      date: '2023-09-9 10:16',
      color: '#2Baa82',
      completed: 0,
      image:
        'https://www.newyorkupstate.com/resizer/53hhXoP4W9p3yV5OBVVGJKsVO9Q=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/3VT7UMDYINFIPKPZFQAWRVW3I4.jpg',
    },
    {
      id: 3,
      description: 'Kuala Villa',
      date: '2019-09-09 10:16',
      color: '#dd0022',
      completed: 0,
      image:
        'https://firstclasse.com.my/wp-content/uploads/2021/03/Villa-Resort-KL-Selangor-featured.jpg',
    },
  ];

  const [posts, setPosts] = useState(data);

  const clickEventListener = item => {
    Alert.alert('Item selected: ' + item.description);
  };

  const __getDescriptionStyle = item => {
    if (item.completed == 1) {
      return {
        textDecorationLine: 'line-through',
        fontStyle: 'italic',
        color: '#808080',
      };
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.tasks}
        columnWrapperStyle={styles.listContainer}
        data={posts}
        keyExtractor={item => {
          return item.id;
        }}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={[styles.card, {borderColor: item.color}]}
              onPress={() => clickEventListener(item)}>
              <View style={styles.box}>
                <Image style={styles.image} source={{uri: item.image}} />
              </View>
              <View style={styles.cardContent}>
                <Text style={[styles.description, __getDescriptionStyle(item)]}>
                  {item.description}
                </Text>
                <Text style={styles.date}>{item.date}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    backgroundColor: '#eeeeee',
  },
  tasks: {
    flex: 1,
  },
  box: {
    marginTop: 0,
    marginHorizontal: 0,
    backgroundColor: 'white',
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 1,
      width: -2,
    },
    elevation: 2,
  },
  cardContent: {
    marginLeft: 20,
    marginTop: 10,
  },
  image: {
    width: 100,
    height: 60,
  },

  card: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor: 'white',
    flexBasis: '46%',
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderLeftWidth: 6,
  },

  description: {
    fontSize: 18,
    flex: 1,
    color: '#008080',
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
    flex: 1,
    color: '#696969',
    marginTop: 5,
  },
});
