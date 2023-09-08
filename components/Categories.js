import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import React from 'react';

export const categories = [
  { value: "women's clothing", text: "Women's clothing" },
  { value: "men's clothing", text: "Men's clothing" },
  { value: "jewelery", text: "Jewelery" },
  { value: "electronics", text: "Electronics" },
];

function Categories({ setFilterByCategory, filterByCategory }) {
  const handleSetCategory = (category) => {

    setFilterByCategory((prev) => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {categories.map((category) => (
        <TouchableOpacity
          key={category.value}
          style={[
            styles.button,
            { backgroundColor: filterByCategory.includes(category.value) ? '#cf3917' : '#ff5733' }
          ]}
          onPress={() => handleSetCategory(category.value)}
        >
          <Text style={styles.buttonText}>{`${category.text} ${filterByCategory.includes(category.value) ? '\u{1F680}' : ' '}`}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  button: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
  },
  buttonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});

export default React.memo(Categories);
