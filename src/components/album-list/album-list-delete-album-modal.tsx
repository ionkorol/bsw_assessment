import React from "react";
import { Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAppSelector } from "../../store";
import { useDispatch } from "react-redux";
import { deleteAlbum, setDeleteAlbumId } from "../../store/slices/main-slice";

export const AlbumListDeleteAlbumModal = () => {
  /* ******************** Hooks ******************** */
  const { delete_album_id } = useAppSelector((state) => state.main);
  const dispatch = useDispatch();

  /* ******************** Variables ******************** */
  const is_visible = Boolean(delete_album_id);

  /* ******************** Functions ******************** */
  const on_close = () => dispatch(setDeleteAlbumId(null));
  const on_delete = () => {
    dispatch(deleteAlbum());
  };

  /* ******************** Effects ******************** */
  /* ******************** JSX ******************** */
  return (
    <Modal visible={is_visible} onRequestClose={on_close} animationType="slide" transparent supportedOrientations={["landscape", "portrait"]}>
      <SafeAreaView onTouchEnd={on_close} style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity onPress={on_delete} style={styles.item_container}>
            <Text style={[styles.item_text, styles.delete_text]}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={on_close} style={styles.item_container}>
            <Text style={styles.item_text}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  content: {
    padding: 10,
    rowGap: 10,
  },
  item_container: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  item_text: {
    fontSize: 22,
  },
  delete_text: {
    color: "red",
  },
});
