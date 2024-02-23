import React, { useLayoutEffect } from "react";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import { MainRouterScreenProps } from "../types/navigation.types";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useGetPhotosQuery } from "../store/apis/photos-api";
import { AntDesign } from "@expo/vector-icons";
import { AlbumDetailsImageItem } from "../components/album-details/album-details-image-item";
import { AlbumDetailsImagePreview } from "../components/album-details/album-details-image-preview";

export const AlbumDetailsScreen = () => {
  /* ******************** Hooks ******************** */
  const navigation = useNavigation<MainRouterScreenProps<"AlbumDetails">["navigation"]>();
  const {
    params: { album_id, album_title },
  } = useRoute<MainRouterScreenProps<"AlbumDetails">["route"]>();

  const [show_all_photos, _set_show_all_photos] = React.useState<boolean>(false);
  const { data: photos = [] } = useGetPhotosQuery(show_all_photos ? undefined : album_id);

  /* ******************** Variables ******************** */
  const sorted_photos = [...photos].sort((a, b) =>
    a.albumId === album_id && b.albumId !== album_id ? -1 : b.albumId === album_id && a.albumId !== album_id ? 1 : 0
  );

  /* ******************** Functions ******************** */
  /* ******************** Effects ******************** */
  useLayoutEffect(() => {
    navigation.setOptions({
      title: show_all_photos ? "All Photos" : album_title,
      headerBackTitleVisible: false,
      headerRight: () => (
        <AntDesign name={show_all_photos ? "staro" : "star"} size={24} onPress={() => _set_show_all_photos((prevState) => !prevState)} color="blue" />
      ),
    });
  }, [show_all_photos]);

  /* ******************** JSX ******************** */
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={sorted_photos}
        renderItem={({ item }) => <AlbumDetailsImageItem image_url={item.thumbnailUrl} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        windowSize={42}
        maxToRenderPerBatch={21}
        initialNumToRender={21}
        contentContainerStyle={{
          rowGap: 10,
          padding: 10,
        }}
        columnWrapperStyle={{
          columnGap: 10,
        }}
      />
      <AlbumDetailsImagePreview />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image_item: {
    aspectRatio: 1,
    flex: 1 / 3,
  },
});
