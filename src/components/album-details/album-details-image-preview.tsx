import React from "react";
import { Modal, SafeAreaView, StyleSheet, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../store";
import { setPhotoPreview } from "../../store/slices/main-slice";
import { Image } from "expo-image";

export const AlbumDetailsImagePreview = () => {
  /* ******************** Hooks ******************** */
  const { photo_preview } = useAppSelector((state) => state.main);
  const dispatch = useAppDispatch();

  /* ******************** Variables ******************** */
  const is_visible = Boolean(photo_preview);

  /* ******************** Functions ******************** */
  const on_close = () => {
    dispatch(setPhotoPreview(null));
  };

  /* ******************** Effects ******************** */

  /* ******************** JSX ******************** */
  if (!photo_preview) return null;

  return (
    <Modal visible={is_visible} onRequestClose={on_close} transparent animationType="fade" supportedOrientations={["landscape", "portrait"]}>
      <SafeAreaView onTouchEnd={on_close} style={styles.container}>
        <View style={styles.content}>
          <Image source={{ uri: photo_preview }} style={[styles.image_item]} />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  image_item: {
    borderRadius: 8,
    aspectRatio: 1,
    maxWidth: "100%",
    maxHeight: "100%",
  },
});
