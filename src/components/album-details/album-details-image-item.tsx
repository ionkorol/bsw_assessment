import React from "react";
import { Image } from "expo-image";
import { Alert, StyleSheet, TouchableOpacity } from "react-native";
import { useAppDispatch } from "../../store";
import { setPhotoPreview } from "../../store/slices/main-slice";
import { image_blurhash } from "../../utils/image.utils";
import { useSaveImageModule } from "../../hooks/useSaveImageModule";

interface IProps {
  image_url: string;
}

export const AlbumDetailsImageItem = React.memo(
  ({ image_url }: IProps) => {
    /* ******************** Hooks ******************** */
    const dispatch = useAppDispatch();
    const { save_image } = useSaveImageModule();

    /* ******************** Variables ******************** */
    /* ******************** Functions ******************** */
    const on_press = () => {
      dispatch(setPhotoPreview(image_url));
    };

    const url_to_base64 = async (url: string): Promise<string> => {
      const response = await fetch(url);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = reject;
        reader.onload = () => {
          resolve(reader.result as string);
        };
        reader.readAsDataURL(blob);
      });
    };

    const on_long_press = async () => {
      let base64_image = await url_to_base64(image_url);
      base64_image = base64_image.replace("data:application/octet-stream;base64,", "");
      await save_image(base64_image);
      Alert.alert("Image saved to gallery");
    };

    /* ******************** Effects ******************** */
    /* ******************** JSX ******************** */
    return (
      <TouchableOpacity onLongPress={on_long_press} onPress={on_press} style={styles.image_container}>
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
