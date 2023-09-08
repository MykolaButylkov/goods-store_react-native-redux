import { StyleSheet, View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { GoodsList } from "../components/GoodsList"
import * as Icon from "react-native-feather";
import Categories from "../components/Categories";
import AddGoodForm from "../components/AddGoodForm";
import { useDispatch } from "react-redux";
import { addNewGood } from "../slices/goodsSlice";

export default function HomeScreen() {
  const [filterByCategory, setFilterByCategory] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddGoodFormVisible, setAddGoodFormVisible] = useState(false);
  const dispatch = useDispatch();

  const handleAddGood = (newGood) => {
    dispatch(addNewGood(newGood));
  };
  const handleSearchBarChange = (text) => {
    setSearchQuery(text);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to Our Store</Text>
      </View>
      <View style={styles.header}>
        <Icon.Search style={styles.searchIcon} />
        <TextInput
          placeholder="Search..."
          style={styles.searchInput}
          onChangeText={handleSearchBarChange}
          value={searchQuery}
        />
        <TouchableOpacity onPress={() => setAddGoodFormVisible(true)}>
          <Icon.PlusCircle style={styles.addIcon} />
        </TouchableOpacity>
      </View>

      <View
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 20
        }}
      >
        <Categories
          setFilterByCategory={setFilterByCategory}
          filterByCategory={filterByCategory}
        />
      </View>


      <GoodsList
        filterByCategory={filterByCategory}
        searchQuery={searchQuery}
      />

      <AddGoodForm
        isVisible={isAddGoodFormVisible}
        onClose={() => setAddGoodFormVisible(false)}
        onSubmit={handleAddGood}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 50,

  },
  title: {
    margin: 'auto',
    fontSize: 24,
    fontWeight: "bold",
  },
  searchIcon: {
    height: 25,
    width: 25,
    borderColor: "black",
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    fontSize: 16,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

