import { View, Text, Linking, StyleSheet, ImageBackground } from "react-native";
import React, { useEffect, useState } from "react";
import globalStyles from "../constants/globalStyles";
import useStore from "../zustand";
import shallow from "zustand/shallow";
import Touchable from "../components/Touchable";

const Details = () => {
  const { selectedImageData, setSelectedImageData } = useStore(
    (state: any) => ({
      selectedImageData: state?.main?.selectedImageData,
      setSelectedImageData: state.setSelectedImageData,
    }),
    shallow
  );

  useEffect(() => {
    return () => {
      setSelectedImageData(null);
    };
  }, []);

  return (
    <View style={[globalStyles.container, { paddingHorizontal: 0 }]}>
      <ImageBackground
        source={{ uri: selectedImageData?.urls?.full }}
        style={styles.imageBackground}
      >
        <View style={styles.detailBox}>
          {/* user name */}
          <View style={styles.innerContainer}>
            <View style={styles.flex1}>
              <Text style={styles.key}>User Name:</Text>
            </View>
            <View style={styles.flex2}>
              <Text style={styles.title}>
                {selectedImageData?.user?.name ?? "N/A"}
              </Text>
            </View>
          </View>

          {/* likes */}
          <View style={styles.innerContainer}>
            <View style={styles.flex1}>
              <Text style={styles.key}>Total Likes:</Text>
            </View>
            <View style={styles.flex2}>
              <Text style={styles.title}>
                {selectedImageData?.likes ?? "N/A"}
              </Text>
            </View>
          </View>
          {/* description */}
          <View style={styles.innerContainer}>
            <View style={styles.flex1}>
              <Text style={styles.key}>Description:</Text>
            </View>
            <View style={styles.flex2}>
              <Text style={styles.title}>
                {selectedImageData?.description ?? "N/A"}
              </Text>
            </View>
          </View>

          {/* download */}

          <View style={styles.innerContainer}>
            <View style={styles.flex1} />
            <View style={styles.flex2}>
              <Touchable
                onPress={() => {
                  Linking.openURL(
                    `${selectedImageData?.links?.download}&force=true`
                  );
                }}
              >
                <Text style={styles.download}>Download</Text>
              </Touchable>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  key: {
    fontSize: 16,
    color: "white",
    paddingHorizontal: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    paddingHorizontal: 5,
  },
  download: {
    fontSize: 16,
    fontWeight: "bold",
    color: "blue",
    padding: 8,
    textDecorationLine: "underline",
  },
  imageBackground: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "contain",
  },
  detailBox: {
    width: "90%",
    backgroundColor: "rgba(0,0,0,0.5)",
    minHeight: 100,
    borderRadius: 8,
    position: "absolute",
    bottom: 50,
    marginHorizontal: "5%",
    padding: 10,
  },
  innerContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  flex1: {
    flex: 0.4,
    alignItems: "flex-end",
  },
  flex2: {
    flex: 0.6,
  },
});

export default Details;
