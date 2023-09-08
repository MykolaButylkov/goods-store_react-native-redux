import React, { useEffect } from 'react';
import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { incrementAsync as fetchGoods } from '../slices/goodsSlice';
import { useNavigation } from '@react-navigation/native';

export const GoodsList = ({ filterByCategory, searchQuery }) => {
  const dispatch = useDispatch();
  const goods = useSelector((state) => state.goods.value);
  const navigation = useNavigation();
  const handleItemPress = (item) => {
    navigation.navigate('Good details', { good: item });
  };

  const visibleGoods = goods.filter((good) => {
    const categoryMatch = filterByCategory.length === 0 || filterByCategory.includes(good.category);
    const titleMatch = good.title.toLowerCase().includes(searchQuery.toLowerCase());

    return categoryMatch && titleMatch;
  })
  useEffect(() => {
    if (goods.length === 0) {
      dispatch(fetchGoods());
    }
  }, []);

  if (visibleGoods.length === 0) {
    return <Text>No matching goods found.</Text>;
  }

  return (
    <FlatList
      style={styles.container}
      data={visibleGoods}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => handleItemPress(item)}>

          <View style={styles.itemContainer}>
            <Image
              style={styles.itemImage}
              source={{
                uri: item.image,
              }}
            />
            <View style={styles.itemTextContainer}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemPrice}>{item.price}$</Text>
            </View>
          </View>
        </TouchableOpacity>

      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    backgroundColor: '#fff',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  itemTextContainer: {
    flex: 1,
    marginLeft: 16,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  itemPrice: {
    fontSize: 16,
    color: '#FF5733',
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
});
