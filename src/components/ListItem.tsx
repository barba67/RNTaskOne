import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { ListTypes } from "../constants/types";
import Touchable from "./Touchable";

const ListItem: React.FC<ListTypes> = ({ item, onSelectItem }) => {
  return (
    <View style={styles.mainContainer}>
      <Touchable style={{ zIndex: 9999 }} onPress={() => onSelectItem(item)}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.imageStyle}
            source={{ uri: item?.urls?.thumb }}
          />
        </View>
      </Touchable>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {},
  imageContainer: {
    marginVertical: 10,
    borderRadius: 10,
  },
  imageStyle: {
    height: 200,
    width: "100%",
    resizeMode: "cover",
    borderRadius: 10,
  },
});

export default ListItem;
