import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MainRouterScreenProps } from "../../types/navigation.types";
import { useGetPhotosQuery } from "../../store/apis/photos-api";
import { Ionicons } from "@expo/vector-icons";
import { useAppDispatch } from "../../store";
import { setDeleteAlbumId } from "../../store/slices/main-slice";
import { Image } from "expo-image";
import { image_blurhash } from "../../utils/image.utils";

interface IProps {
  album_id: number;
  album_title: string;
}

export const AlbumListAlbumItem = React.memo(
  ({ album_id, album_title }: IProps) => {
    /* ******************** Hooks ******************** */
    const navigation = useNavigation<MainRouterScreenProps<"AlbumList">["navigation"]>();
    const { data: photos = [] } = useGetPhotosQuery(album_id);
    const dispatch = useAppDispatch();

    /* ******************** Variables ******************** */
    const first_photo = photos.length ? photos[0] : null;

    /* ******************** Functions ******************** */
    const on_album_press = () => {
      navigation.navigate("AlbumDetails", { album_id, album_title });
    };

    const on_delete_press = () => {
      dispatch(setDeleteAlbumId(album_id));
    };

    /* ******************** Effects ******************** */
    /* ******************** JSX ******************** */
    return (
      <TouchableOpacity onPress={on_album_press} style={styles.container}>
        <Image source={{ uri: first_photo?.thumbnailUrl }} placeholder={image_blurhash} style={styles.cover_image} />
        <View style={styles.description_container}>
          <Text numberOfLines={1} style={styles.name_text}>
            {album_title}
          </Text>
          <Text style={styles.photo_count_text}>{photos.length} photos</Text>
        </View>
        <TouchableOpacity onPress={on_delete_press}>
          <Ionicons name="remove-circle-outline" size={24} color="red" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  },
  (prev_props, next_props) => prev_props.album_id === next_props.album_id
);

AlbumListAlbumItem.displayName = "AlbumListAlbumItem";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    columnGap: 10,
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginHorizontal: 10,
    alignItems: "center",
  },
  name_text: {
    fontSize: 18,
  },
  description_container: {
    flex: 1,
  },
  photo_count_text: {
    color: "gray",
  },
  cover_image: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
});
