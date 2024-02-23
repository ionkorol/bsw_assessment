import React from "react";
import { Image } from "expo-image";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useAppDispatch } from "../../store";
import { setPhotoPreview } from "../../store/slices/main-slice";
import { image_blurhash } from "../../utils/image.utils";

interface IProps {
  image_url: string;
}

export const AlbumDetailsImageItem = React.memo(
  ({ image_url }: IProps) => {
    /* ******************** Hooks ******************** */
    const dispatch = useAppDispatch();

    /* ******************** Variables ******************** */
    /* ******************** Functions ******************** */
    const on_press = () => {
      dispatch(setPhotoPreview(image_url));
    };

    /* ******************** Effects ******************** */
    /* ******************** JSX ******************** */
    return (
      <TouchableOpacity onPress={on_press} style={styles.image_container}>
        <Image source={{ uri: image_url }} placeholder={image_blurhash} style={styles.image_item} />
      </TouchableOpacity>
    );
  },
  (prev_props, next_props) => prev_props.image_url === next_props.image_url
);

AlbumDetailsImageItem.displayName = "AlbumDetailsImageItem";

const styles = StyleSheet.create({
  image_container: {
    aspectRatio: 1,
    flex: 1 / 3,
    borderRadius: 8,
  },
  image_item: {
    aspectRatio: 1,
    flex: 1,
    borderRadius: 8,
  },
});
