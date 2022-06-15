import { View, FlatList, StyleSheet, SectionList, Text } from "react-native";
import React, { useEffect, useCallback } from "react";
import globalStyles from "../constants/globalStyles";
import CustomInput from "../components/CustomInput";
import { callApi } from "../midleware";
import ListItem from "../components/ListItem";
import { debounce } from "lodash";
import { COLOR_FILTERS, ORIENTATIONS } from "../constants/constants";
import CustomBadge from "../components/CustomBadge";
import shallow from "zustand/shallow";
import useStore from "../zustand";

const perPage = 10;

const Home = (props: any) => {
  // getting function from  zustand store

  const { setSelectedImageData } = useStore(
    (state: any) => ({
      setSelectedImageData: state.setSelectedImageData,
    }),
    shallow
  );

  const [searchedText, setSearchedText] = React.useState("");
  const [images, setImages] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const navigation = props?.navigation;

  const [selectedColorFilters, setSelectedColorFilters] = React.useState(null);
  const [selectedOrientationFilters, setSelectedOrientationFilters] =
    React.useState(null);

  const getImages = async (params?: any) => {
    setIsLoading(true);
    callApi({
      name: "GET_IMAGES",
      url: "search/photos",
      method: "GET",
      data: params,
      auth: true,
      client: "main",
    })
      .then((response: any) => {
        if (params?.page == 1) {
          setImages(response?.results ?? []);
        } else {
          let newImages = images.concat(response?.results ?? []);
          setImages(newImages);
        }
        console.log(response);
      })
      .catch((error: any) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onSelectItem = (item?: any) => {
    setSelectedImageData(item);
    navigation.navigate("Details");
  };

  useEffect(() => {
    getImagesWithCurrentQuery({
      query: searchedText,
      page: 1,
      perPage: perPage,
    });
    return () => {};
  }, [selectedColorFilters, selectedOrientationFilters]);

  const getImagesWithCurrentQuery = (data?: any) => {
    const { query = "", page = 1, per_page = perPage } = data;
    let otherParams = {
      ...(selectedColorFilters !== null && { color: selectedColorFilters }),
      ...(selectedOrientationFilters !== null && {
        orientation: selectedOrientationFilters,
      }),
    };
    let querySelection = {
      query: query,
      page: page,
      per_page: per_page,
      ...otherParams,
    };
    getImages(querySelection);
  };

  const handleSearch = useCallback(
    debounce((text) => {
      getImagesWithCurrentQuery({ query: text, page: 1, per_page: 10 });
    }, 1000),
    []
  );

  return (
    <View style={globalStyles.container}>
      <CustomInput
        mainStyle={{ marginVertical: 12 }}
        focused
        placeholder={"Search Images"}
        value={searchedText}
        onChangeText={(text: string) => {
          setSearchedText(text);
          handleSearch(text);
        }}
      />
      {/* filters section */}
      <View style={styles.filtersContainer}>
        <Text style={styles.filterTitle}>
          Filters -{" "}
          <Text style={styles.miniTitle}>
            (click and un-click the badge to apply filter)
          </Text>
        </Text>
        <Text style={styles.filterSubTitle}>Colors:</Text>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={COLOR_FILTERS}
          renderItem={({ item }) => (
            <CustomBadge
              label={item.name}
              isActive={selectedColorFilters === item.value}
              onPress={() => {
                if (selectedColorFilters === item.value) {
                  setSelectedColorFilters(null);
                } else {
                  setSelectedColorFilters(item.value as never);
                }
              }}
            />
          )}
          horizontal
          keyExtractor={(item: any) => item?.value}
        />
        <Text style={styles.filterSubTitle}>Orientation:</Text>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={ORIENTATIONS}
          renderItem={({ item }) => (
            <CustomBadge
              label={item.name}
              isActive={selectedOrientationFilters === item.value}
              onPress={() => {
                if (selectedOrientationFilters === item.value) {
                  setSelectedOrientationFilters(null);
                } else {
                  setSelectedOrientationFilters(item.value as never);
                }
              }}
            />
          )}
          horizontal
          keyExtractor={(item: any) => item?.value}
        />
      </View>

      {/* section list for data rendering */}
      <FlatList
        data={images}
        refreshing={isLoading}
        onRefresh={() => {
          getImagesWithCurrentQuery({
            query: searchedText,
            page: 1,
            per_page: perPage,
          });
        }}
        onEndReached={() => {
          !isLoading &&
            getImagesWithCurrentQuery({
              query: searchedText,
              page: images.length / perPage + 1,
              per_page: perPage,
            });
        }}
        renderItem={({ item }) => (
          <ListItem item={item} onSelectItem={onSelectItem} />
        )}
        // ListEmptyComponent={<EmptyList title={'Images not found, Search for more Images!'} />} i suggested to add empty list component but did not work on it lack of time
        keyExtractor={(item: any) => item?.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  filtersContainer: {
    width: "100%",
    backgroundColor: "white",
    minHeight: 100,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 8 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 2,
    padding: 10,
    paddingVertical: 16,
    marginBottom: 10,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  filterSubTitle: {
    fontSize: 14,
    marginVertical: 12,
  },
  miniTitle: {
    fontSize: 12,
    color: "#d6d3d1",
    marginLeft: 10,
  },
});

export default Home;
